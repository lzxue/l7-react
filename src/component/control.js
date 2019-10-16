import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'deep-equal'

class Control extends React.PureComponent {
  static controlOption = {
    zoom: {
      name: 'Zoom',
      position: 'topleft'
    },
    scale: {
      name: 'Scale',
      position: 'bottomleft'
    },
    attribution: {
      name: 'Attribution',
      position: 'bottomright'
    }
  }
  static propTypes = {
    option: PropTypes.object
  }
  static contextTypes = {
    scene: PropTypes.object,
    L7: PropTypes.object
  }

  createControl (props) {
    let { L7, scene } = this.context
    const { option } = this.props
    const ctr = Control.controlOption[option.type]
    this.ctr = new L7.Control[ctr.name]({
      position: option.position || ctr.position
    }).addTo(scene)
    scene.set(props.type, this.ctr)
  }

  componentDidMount () {
    this.createControl(this.props)
  }

  componentWillUnmount () {
    this.ctr.remove()
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.ctr.remove()
      this.createControl(nextProps)
    }
  }

  render () {
    return null
  }
}

export default Control
