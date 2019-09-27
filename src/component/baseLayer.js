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
    source: PropTypes.object,
    color: PropTypes.object,
    size: PropTypes.object,
    shape: PropTypes.object,
    style: PropTypes.object
  };
  static childContextTypes = {
    layer: PropTypes.object
  }
  static defaultProps = {
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
    // this.addHightLayer()
  }
  initLayer() {
    const { scene } = this.context;
    if (this.layer) scene.removeLayer(this.layer);
    this.layer = scene.PolygonLayer();

  }

  addLayer() {
    const { source, color, size, shape, style, filter } = this.props
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
    shape && layer.shape(shape.field,shape.value)
    style && layer.style(style)
    this.layer.render()
    
    this.setState({layer: this.layer})
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.layer) return null
    const { source, size, color, shape, style,filter } = this.props
    const nextSource = nextProps.source
    const nextSize = nextProps.size
    const nextColor = nextProps.color
    const nextStyle = nextProps.style
    const nextShape = nextProps.shape
    const nextfilter = nextProps.filter
    if (!isEqual(source, nextSource)) {
      this.layer.setData(nextSource.data)
    }
    !isEqual(color, nextColor) && this.layer.color(nextColor.field, nextColor.value)
    !isEqual(size, nextSize) && this.layer.size(nextSize.field, nextSize.value)
    !isEqual(shape, nextShape) && this.layer.shape(nextShape.field,nextShape.value)
    !isEqual(style, nextStyle) && this.layer.style(nextStyle)
    !isEqual(filter, nextfilter) && this.layer.filter(nextfilter.field, nextfilter.value)
    this.layer.render()
  }

  componentWillUnmount() {
    const { scene } = this.context
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

  render() {
    return <div>
      { this.state.layer ? this.renderChildren() : null}
    </div>
  }
}
