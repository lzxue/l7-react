// 加载图表标注资源
import { Component } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'deep-equal'
export default class LoadImage extends Component {
  state= {}
  static contextTypes = {
    scene: PropTypes.object
  }
  static propTypes = {
    option: PropTypes.object
  }
  componentDidMount() {
    const { option } = this.props
    this.context.scene.image.addImage(option.name, option.url)
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { option } = nextProps
    if (!isEqual(option, this.props.option)) {
      this.context.scene.image.addImage(option.name, option.url)
    }
  }
  render() {
    return null
  }
}
