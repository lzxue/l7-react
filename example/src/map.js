/* eslint-disable indent */
/* eslint-disable react/jsx-indent-props */

import React, { Component } from 'react'
import * as d3 from 'd3-fetch'
import {
  AMapProvider,
  Scene,
  Polygon

} from 'l7-react'
import 'antd/dist/antd.css'
export default class App extends Component {
  state = {

  }
  componentDidMount() {
    this.getChildData()
  }
  getChildData(code) {
    d3.json(`http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/children/330000.json`).then(data => {
      this.setState({ data: data })
    })
  }
  addLayer() {
    const { data } = this.state
    return <Polygon source={{
      data: data
    }}
      options={{
        autoFit: true,
        visible: true,
        minZoom: 2,
        maxZoom: 20,
        zIndex: 0
      }}
      color={{
        field: 'name',
        value: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2']
      }}
      active={{
        fill: '#f00'
      }}
      style={{
        opacity: 0.5
      }} />
  }
  render() {
    return (
      <div>
        <AMapProvider token={'15cd8a57710d40c9b7c0e3cc120f1200'} version={'1.4.15'} plugin={'Map3D'} >
          <Scene mapView={
            {
              zoom: 3,
              mapStyle: 'dark',
              id: 'map1'
            }
          }
            style={{
              width: '50%',
              margin: '0',
              height: '50%',
              position: 'absolute'

            }}
          >
            {this.addLayer()}
          </Scene>
          <Scene mapView={
            {
              zoom: 3,
              mapStyle: 'light',
              id: 'map2'
            }
          }
            style={{
              width: '50%',
              margin: '0',
              left: '50%',
              height: '50%',
              position: 'absolute'

            }}
          >
            {this.addLayer()}
          </Scene>
        </AMapProvider>
        <AMapProvider token={'15cd8a57710d40c9b7c0e3cc120f1200'} version={'1.4.15'} plugin={'Map3D'} >
          <Scene mapView={
            {
              zoom: 3,
              mapStyle: 'dark'
            }
          }
            style={{
              width: '50%',
              margin: '0',
              left: '50%',
              top: '50%',
              height: '50%',
              position: 'absolute'

            }}
          >
            {this.addLayer()}
          </Scene>

        </AMapProvider>
        <AMapProvider token={'15cd8a57710d40c9b7c0e3cc120f1200'} version={'1.4.15'} plugin={'Map3D'} >
          <Scene mapView={
            {
              zoom: 3,
              mapStyle: 'light'
            }
          }
            style={{
              width: '50%',
              margin: '0',
              top: '50%',
              height: '50%',
              position: 'absolute'

            }}
          >
            {this.addLayer()}
          </Scene>
        </AMapProvider>
        <AMapProvider token={'15cd8a57710d40c9b7c0e3cc120f1200'} version={'1.4.15'} plugin={'Map3D'} >
          <Scene mapView={
            {
              zoom: 3,
              mapStyle: 'dark'
            }
          }
            style={{
              width: '50%',
              margin: '0',
              left: '50%',
              top: '50%',
              height: '50%',
              position: 'absolute'

            }}
          >
            {this.addLayer()}
          </Scene>
        </AMapProvider>
      </div>
    )
  }
}
