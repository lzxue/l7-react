import React from 'react'
import PropTypes from 'prop-types'

class LayerEvent extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static contextTypes = {
    layer: PropTypes.object
  }

  componentDidMount () {
    const {layer} = this.context
    layer.on(this.props.type, this.props.onChange)
  }

  componentWillUnmount () {
    const {layer} = this.context
    layer.off(this.props.type, this.props.onChange)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { layer } = this.context
    if (
      (this.props.type !== nextProps.type) ||
      (this.props.onChange !== nextProps.onChange)
    ) {
      layer.off(this.props.type, this.props.onChange)
      layer.on(nextProps.type, nextProps.onChange)
    }
  }

  render () {
    return null
  }
}

export default LayerEvent
