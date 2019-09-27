import React from 'react'
import PropTypes from 'prop-types'
import loadScript from '../util/loadScript'
class AMapProvider extends React.PureComponent {
  static propTypes = {
    token: PropTypes.string,
    plugin: PropTypes.string,
    version: PropTypes.string
  }

  static defaultProps = {
    plugin: 'Map3D',
    version: '1.4.15',
  }

  static childContextTypes = {
    AMap: PropTypes.object
  }

  state = {
    loaded: null
  }

  getChildContext = () => ({
    AMap: this.state.AMap
  })

  componentDidMount () {
    this.loadAMap().then(() => {
      this.setState({loaded:true})
    }).catch((err) => {
      throw err
    })
  }


  loadAMap () {
    let { token, version, plugin} = this.props
    return loadScript(`https://webapi.amap.com/maps?v=${version}&key=${token}&plugin=${plugin}`)
  }

  render () {
    return this.state.loaded ? this.props.children : null
  }
}

export default AMapProvider