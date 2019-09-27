import BaseLayer from './baseLayer'
export default class PolyLine extends BaseLayer {
  static defaultProps = {
    source: {
      data: null
    },
    color: {
      field: '#4eb3d3'
    },
    size: {
      field: 2
    },
    shape: {
      field: 'line'
    },
    style: {
      opacity: 1.0
    }
  }
  initLayer() {
    const { scene } = this.context
    if (this.layer) scene.removeLayer(this.layer)
    this.layer = scene.LineLayer()
  }
}
