/* eslint-disable camelcase */
import React from 'react'
import BaseLayer from './baseLayer'
export default class Polygon extends BaseLayer {
  static defaultProps = Object.assign(BaseLayer.defaultProps, {
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
  })
  initLayer() {
    const { scene } = this.context
    if (this.layer) scene.removeLayer(this.layer)
    const { options = {} } = this.props
    this.layer = scene.PolygonLayer(options)
  }
  render() {
    return <div>
      { this.state.layer ? this.renderChildren() : null}
    </div>
  }
}
