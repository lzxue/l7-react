import React from 'react'
import PropTypes from 'prop-types'

class SceneEvent extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static contextTypes = {
    scene: PropTypes.object
  }

  componentDidMount () {
    const { scene } = this.context
    scene.on(this.props.type, this.props.onChange)
  }

  componentWillUnmount () {
    const { scene } = this.context
    scene.off(this.props.type, this.props.onChange)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { scene } = this.context
    if (
      (this.props.type !== nextProps.type) ||
      (this.props.onChange !== nextProps.onChange)
    ) {
      scene.off(this.props.type, this.props.onChange)
      scene.on(nextProps.type, nextProps.onChange)
    }
  }

  render () {
    return null
  }
}

export default SceneEvent
