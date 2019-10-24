
import React, { Component } from 'react'
import * as d3 from 'd3-fetch'
import { AMapProvider,
  Scene,
  Polygon,
  Line, Point,
  LayerEvent,
  Control,
  CustomControl,
  LoadImage,
  Popup
} from 'l7-react'
import 'antd/dist/antd.css'
import { Table } from 'antd'
export default class App extends Component {
  state = {

  }
  componentDidMount() {
    Promise.all([
      d3.json('https://gw.alipayobjects.com/os/basement_prod/d2e0e930-fd44-4fca-8872-c1037b0fee7b.json')
    ]).then(result => {
      const [ data ] = result
      let labelData = data.features.map((feature) => {
        return feature.properties
      })
      labelData = labelData.filter((item) => {
        return item.center !== undefined
      })
      this.setState({
        data: data,
        labelData: labelData,
        textAllowOverlap: true

      })
    })
  }
  _renderPopup() {
    const { popup } = this.state
    const columns = [
      {
        title: '字段',
        dataIndex: 'field'
      },
      {
        title: '值',
        dataIndex: 'value'
      }
    ]
    const data = [
      {
        key: 0,
        field: popup.text,
        value: Math.random() * 10
      }
    ]
    return <Popup
      lnglat={popup.lnglat}
    >
      <Table showHeader={false} title={() => popup.text} columns={columns} dataSource={data} size='small' bordered={false} pagination={false} />

    </Popup>
  }
  layerClickHander=(e) => {
    const { textAllowOverlap } = this.state
    console.log(textAllowOverlap)
    this.getChildData(e.feature.properties.code)
    this.setState({
      feature: e.feature,
      textAllowOverlap: !textAllowOverlap
    })
  }
  getChildData(code) {
    d3.json(`http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/children/${code}.json`).then(data => {
      this.setState({child: data})
    })
  }
  addChildLayer(data) {
    return <Polygon source={{
      data: data
    }}
    // eslint-disable-next-line indent
      options={{
      zIndex: 1000
    }}
    // eslint-disable-next-line indent
      color={{
      field: 'name',
      value: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2']
    }}
    // eslint-disable-next-line indent
      shape={{
      field: 'fill'
    }}
    // eslint-disable-next-line indent
      style={{
      opacity: 0.8
    }}
    />
  }
  showPopup= (e) => {
    const { feature, lnglat } = e
    this.setState({
      popup: {
        lnglat: [lnglat.lng, lnglat.lat],
        text: feature.properties.name
      }
    })
  }
  renderHighlightlayer() {
    const { data, feature } = this.state
    return <Line
      source={{
        data: data
      }}
      color={{
        field: 'rgb(75,163,235)'
      }}
      size={{
        field: 2
      }}
      filter={{
        id: feature.properties.name,
        field: 'name',
        value: (name) => {
          return feature.properties.name === name
        }
      }}
      shape={{
        field: 'line'
      }}
      style={{
        lineType: 'dash',
        dashArray: 20,
        dashOffset: 0.2,
        dashRatio: 0.5
      }}
    />
  }
  render() {
    const { data, labelData, textAllowOverlap } = this.state
    return (
      <div>
        <AMapProvider token={'15cd8a57710d40c9b7c0e3cc120f1200'} version={'1.4.15'} plugin={'Map3D'} >
          <Scene mapView={
            {
              zoom: 10,
              mapStyle: 'dark'

            }
          }
          // eslint-disable-next-line indent
          >
            {
              this.state.popup ? this._renderPopup() : null
            }
            <Polygon source={{
              data: data
            }}
            // eslint-disable-next-line indent
              options={{
              autoFit: true,
              visible: true,
              minZoom: 2,
              maxZoom: 10,
              zIndex: 0
            }}
            // eslint-disable-next-line indent
              color={{
              field: 'name',
              value: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2']
            }}
            // eslint-disable-next-line indent
              active= {{
              fill: '#f00'
            }}
            // eslint-disable-next-line indent
              style={{
              opacity: 0.5
            }} >

              <LayerEvent type='mousedown' onChange={this.layerClickHander} />
            </Polygon>
            <Line
              source={{
                data: data
              }}
              color={{
                field: '#111'
              }}
              size={{
                field: 2
              }}
              shape={{
                field: 'line'
              }}
              style={{
                opacity: 1.0
              }}
            />

            <Point
              source={{
                data: labelData,
                parser: {
                  type: 'json',
                  coordinates: 'center'
                }
              }}
              color={{
                field: '#ff0'
              }}
              size={{
                field: 14
              }}
              shape={{
                field: 'triangle'

              }}
              style={{
                opacity: 0.8,
                textAnchor: 'top'
              }}
            />
            <Point
              source={{
                data: labelData,
                parser: {
                  type: 'json',
                  coordinates: 'center'

                }
              }}
              color={{
                field: '#fff'
              }}
              size={{
                field: 14
              }}
              shape={{
                field: 'name',
                value: 'text'

              }}
              style={{
                opacity: 1.0,
                textAllowOverlap: textAllowOverlap,
                textAnchor: 'top',
                textOffset: [0, 40]
              }}
            />
            {/* this.state.feature ? this.renderHighlightlayer() : null */}
            { /* this.state.child ? this.addChildLayer(child) : null */}

          </Scene>
        </AMapProvider>
      </div>
    )
  }
}
