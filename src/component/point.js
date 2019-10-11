import BaseLayer from './baseLayer'
export default class Point extends BaseLayer {
  static defaultProps = Object.assign(BaseLayer.defaultProps, {
    cfg: {
      visible: true
    },
    source: {
      data: null
    },
    color: {
      field: '#4eb3d3'
    },
    size: {
      field: 12
    },
    shape: {
      field: 'circle'
    },
    style: {
      fontWeight: 400,
      textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
      textOffset: [0, 0], // 文本相对锚点的偏移量 [水平, 垂直]
      spacing: 2, // 字符间距
      padding: [4, 4], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
      stroke: 'white', // 描边颜色
      strokeWidth: 2, // 描边宽度
      opacity: 1.0
    }
  })

  initLayer() {
    const { scene } = this.context
    if (this.layer) scene.removeLayer(this.layer)
    const { options = {} } = this.props
    this.layer = scene.PointLayer(options)
  }
}
