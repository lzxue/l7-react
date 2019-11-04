/* eslint-disable camelcase */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'deep-equal'
const Children = React.Children
export default class BaseLayer extends Component {
  state = {
    layer: false
  }
  static contextTypes = {
    scene: PropTypes.object
  }
  static propTypes = {
    children: PropTypes.object,
    source: PropTypes.object,
    color: PropTypes.object,
    size: PropTypes.object,
    shape: PropTypes.object,
    active: PropTypes.any,
    style: PropTypes.object,
    filter: PropTypes.object,
    options: PropTypes.object
  };
  static childContextTypes = {
    layer: PropTypes.object
  }
  static defaultProps = {
    option: {
      autoFit: false
    },
    source: {
      data: null
    },
    color: {
      field: '#4eb3d3'
    },
    size: {
      field: null
    },
    shape: {
      field: 'fill'
    },
    active: false,
    style: {
      opacity: 1.0
    }
  }
  getChildContext = () => ({
    layer: this.layer
  })
  componentDidMount() {
    this.initLayer()
    this.addLayer()
  }

  initLayer() {
    const { scene } = this.context
    if (this.layer) scene.removeLayer(this.layer)
    const { options = {} } = this.props
    this.layer = scene.PolygonLayer(options)
  }

  addLayer() {
    const { source, color, size, shape, style, filter, active, options = {} } = this.props
    if (!source.data) {
      return
    }
    const layer = this.layer
    layer.source(source.data, {
      parser: source.parser,
      transforms: source.transforms
    })
    filter && layer.filter(filter.field, filter.value)
    color && layer.color(color.field, color.value)
    size.field && layer.size(size.field, size.value)
    shape && layer.shape(shape.field, shape.value)
    active instanceof Boolean && layer.active(active)
    active instanceof Object && layer.active(active)
    style && layer.style(style)
    this.layer.render()
    if (options.autoFit) {
      this.layer.fitBounds()
    }
    this.setState({layer: this.layer})
  }
  updateLayerOption(nextOptions, options) {
    if (nextOptions.visible !== options.visible) {
      nextOptions.visible ? this.layer.show() : this.layer.hide()
    }
    if (nextOptions.autoFit !== options.autoFit && nextOptions.autoFit === true) {
      this.layer.fitBounds()
    }
    if (nextOptions.minZoom !== options.minZoom) {
      this.layer.set('minZoom', nextOptions.minZoom)
    }
    if (nextOptions.maxZoom !== options.maxZoom) {
      this.layer.set('maxZoom', nextOptions.maxZoom)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.layer) return null
    const { source, size, color, shape, style, filter, options } = this.props
    const nextSource = nextProps.source
    const nextSize = nextProps.size
    const nextColor = nextProps.color
    const nextStyle = nextProps.style
    const nextShape = nextProps.shape
    const nextfilter = nextProps.filter
    const nextOptions = nextProps.options
    if (!isEqual(source, nextSource)) {
      this.layer.setData(nextSource.data)
      nextOptions.autoFit && this.layer.fitBounds()
    }
    if (!isEqual(nextOptions, options)) {
      this.updateLayerOption(nextOptions, options)
    }
    !isEqual(color, nextColor) && this.layer.color(nextColor.field, nextColor.value)
    !isEqual(size, nextSize) && this.layer.size(nextSize.field, nextSize.value)
    !isEqual(shape, nextShape) && this.layer.shape(nextShape.field, nextShape.value)
    !isEqual(style, nextStyle) && this.layer.style(nextStyle)
    if (!this.propsEqual(filter, nextfilter)) {
      if (nextfilter) {
        this.layer.filter(nextfilter.field, nextfilter.value)
      } else {
        this.layer.filter(true)
      }
    }
    this.layer.render()
  }

  componentWillUnmount() {
    const { scene } = this.context
    if (this.layer.destroyed) return
    scene.removeLayer(this.layer)
  }
  renderChildren() {
    return Children.map(this.props.children, child => {
      if (child) {
        return React.cloneElement(child)
      }
      return child
    })
  }
  propsEqual(pre, next) {
    if (!pre || !next) {
      return isEqual(pre, next)
    }
    if (!pre.value || !pre.value) {
      return isEqual(pre, next)
    }
    if (isEqual(pre.value.toString(), next.value.toString()) && isEqual(pre.id, next.id)) {
      return true
    }
    return false
  }
  render() {
    return <div>
      { this.state.layer ? this.renderChildren() : null}
    </div>
  }
}
