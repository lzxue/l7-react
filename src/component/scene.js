import APILoader from '../util/APILoader'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import L7 from '@antv/l7'

const Children = React.Children
class Scene extends Component {
  state = {
    mapLoaded: false,
    scene: null
  }
  static MapViewOption = {

    center: PropTypes.array,
    zoom: PropTypes.number,
    mapStyle: PropTypes.string,
    pitch: PropTypes.number,
    rotation: PropTypes.number

  }
  static propTypes = {
    loading: PropTypes.bool,
    mapView: PropTypes.object
    // zoomControl: PropTypes.bool,
    // scaleControl: PropTypes.bool,
    // attributionControl: PropTypes.bool,
  };
  static childContextTypes = {
    scene: PropTypes.object
  }
  static controlOption = {
    zoomControl: {
      name: 'Zoom',
      position: 'topleft'
    },
    scaleControl: {
      name: 'Scale',
      position: 'bottomleft'
    },
    attributionControl: {
      name: 'Attribution',
      position: 'bottomright'
    }
  }
  componentDidMount(){
    this.createInstance()
  }
  getChildContext = () => ({
    scene: this.state.scene
  })

  createInstance() {
    console.log(L7.version)
    const { mapView } = this.props
    this.scene = new L7.Scene({
      id: 'map',
      mapStyle: 'dark', // 样式URL
      center: [120.19382669582967, 30.258134],
      pitch: 0,
      zoom: 3,
      rotation: 0,
      ...mapView
    })
    this.scene.on('loaded', () => {
      this.setState({
        mapLoaded: true,
        scene: this.scene
      })
    })
  }

  renderChildren() {
    return Children.map(this.props.children, child => {
      if (child) {
        return React.cloneElement(child, {
          scene: this.scene
        })
      }
      return child
    })
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { scene } = this.state
    if (!scene) {
      return null
    }
    const { mapView } = this.props
    const nextMapView = nextProps.mapView
    const center = scene.getCenter()
    const zoom = scene.getZoom()
    const rotation = scene.getRotation()
    const pitch = scene.getPitch()
    const mapStyle = scene.get('mapStyle')
    this.controlUpdate(nextProps.mapView)
    const didZoomUpdate = this._needUpdate(mapView.zoom, nextMapView.zoom, zoom)
    const didCenterUpdate =
      mapView.center !== nextMapView.center &&
      ((nextMapView.center && nextMapView.center[0]) !== center.lng ||
        (nextMapView.center && nextMapView.center) !== center.lat)
    const didStyleUpdate = this._needUpdate(mapView.mapStyle, nextMapView.mapStyle, mapStyle)
    const didBearingUpdate = this._needUpdate(mapView.rotation, nextMapView.rotation, rotation)
    const didPitchUpdate = this._needUpdate(mapView.pitch, nextMapView.pitch, pitch)
    didStyleUpdate && scene.setMapStyle(nextMapView.mapStyle)
    didBearingUpdate && scene.setRotation(nextMapView.rotation)
    didCenterUpdate && scene.setCenter(nextMapView.center)
    didPitchUpdate && scene.setPitch(nextMapView.pitch)
    didZoomUpdate && scene.setZoom(nextMapView.zoom)

    // update control
  }
  controlUpdate(nextProps) {
    const { scene } = this.state
    const controls = ['zoomControl', 'scaleControl', 'attributionControl']
    controls.forEach(control => {
      const isShow = nextProps[control]
      if (!isShow && scene.get(control) && scene.get(control).isShow) { // 存在 不可见

        scene.get(control).hide()
      }
      if (isShow && scene.get(control) && !scene.get(control).isShow) {
        scene.get(control).show()
      }
      if (isShow && !scene.get(control)) { // 需要添加组件
        const option = Scene.controlOption[control]
        const ctr = new L7.Control[option.name]({
          position: option.position
        }).addTo(scene)
        scene.set(control, ctr)
      }
    })
  }
  _needUpdate(preValue, nextValue, sceneValue) {
    return preValue !== nextValue && nextValue !== sceneValue
  }

  render() {
    return (
      <div>
        <div
          id='map'
          style={{
            width: '100%',
            margin: '0',
            height: '100%',
            position: 'absolute'
          }}
          ref={div => {
            this.mapWrapper = div
          }}
        >
          {this.state.mapLoaded ? null : this.props.loading || null}
        </div>
        <div>{this.state.mapLoaded ? this.renderChildren() : null}</div>
      </div>
    )
  }
}
export default Scene
