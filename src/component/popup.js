/* eslint-disable camelcase */
import { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import isEqual from 'deep-equal'
import L7 from '@antv/l7'

export default class Popup extends Component {
  static contextTypes = {
    layer: PropTypes.object,
    scene: PropTypes.object
  }
  static propTypes = {
    lnglat: PropTypes.array,
    text: PropTypes.string,
    html: PropTypes.string,
    onClose: PropTypes.bool,
    children: PropTypes.element
  }
  addPopup(props) {
    const { option, lnglat, html, text } = props
    this.popup = new L7.Popup(option)
    if (lnglat) {
      this.popup.setLnglat(lnglat)
    }
    if (html) {
      this.popup.setHtml(html)
    }
    if (text) {
      this.popup.setText(text)
    }
    if (props.children) {
      this.renderChildren(props)
      this.popup.setDOMContent(this.el)
    }
    this.popup.addTo(this.context.scene)
  }
  componentDidMount() {
    this.el = document.createElement('div')
    this.el.className = 'react-l7-popup'
    Object.assign(this.el.style, {
      position: 'relative',
      display: 'inline-block'
    })
    this.addPopup(this.props)
  }
  shouldComponentUpdate (nextProps, nextState) {
    return (
      !isEqual(this.props, nextProps) ||
      !isEqual(this.state, nextState)
    )
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      !isEqual(this.props, nextProps) ||
      !isEqual(this.props.html, nextProps.html) ||
      !isEqual(this.props.text, nextProps.text) ||
      !isEqual(this.props.onClose, nextProps.onClose)
    ) {
      this.removePopup()
      this.addPopup(nextProps)
      return
    }

    // Otherwise update the current popup.
    if (!isEqual(this.props.lnglat, nextProps.lnglat)) {
      this.popup.setLnglat(nextProps.lnglat)
    }
    if (this.props.children !== nextProps.children) {
      this.renderChildren(nextProps)
    }
  }
  removePopup () {
    if (this.popup.isOpen()) {
      this.popup.off('close')
      this.popup.remove()
    }
    this.popup = null
  }
  componentWillUnmount() {
    this.popup.remove()
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
  render() {
    return null
  }
}
