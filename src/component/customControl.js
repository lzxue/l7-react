import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import isEqual from 'deep-equal'
export default class CustomControl extends React.PureComponent {
  static contextTypes = {
    scene: PropTypes.object,
    L7: PropTypes.object
  }
  static propTypes = {
    option: PropTypes.object
    // children: PropTypes.element
  }

  createControl (props) {
    let { L7, scene } = this.context
    const { position } = this.props.option
    const control = new L7.Control.Base({
      position
    })
    if (props.children) {
      this.renderChildren(props)
    }
    control.onAdd = () => { return this.el }
    control.addTo(scene)
    this.ctr = control
    // scene.set(props.type, this.ctr)
  }
  renderChildren (props) {
    if (this.component) {
      ReactDOM.unmountComponentAtNode(this.el)
    }
    if (props.children) {
      this.component = ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        props.children,
        this.el
      )
    }
  }
  componentDidMount () {
    this.el = document.createElement('div')
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
