import React, { Component } from 'react'
import * as d3 from 'd3-fetch'
import { AMapProvider, Scene, Polygon, Line, Point, LayerEvent } from 'l7-react'

export default class App extends Component {
  state = {

  }
  componentDidMount(){
    d3.json('https://gw.alipayobjects.com/os/basement_prod/d2e0e930-fd44-4fca-8872-c1037b0fee7b.json').then(data=>{
      let labelData = data.features.map((feature)=>{
        return feature.properties;
      })
      labelData= labelData.filter((item) => {
        return item.center!==undefined
      })
      this.setState({
        data:data,
        labelData:labelData

      })
    });
  }
  layerClickHander(e) {
    this.setState({feature: e.feature})
  }
  renderHighlightlayer(){
    const { data,feature } = this.state;
    return <Line
        source = {{
          data: data
        }}
        color = {{
          field:'rgb(75,163,235)',
        }}
        size = {{
          field:2,
        }}
        filter = {{
          field:'name',
          value:(name)=>{
            console.log(feature.properties.name === name)
            return feature.properties.name === name
          }
        }}
        shape = {{
          field:'line'
        }}
        style ={{
          lineType: 'dash',
          dashArray: 20,
          dashOffset: 0.2,
          dashRatio: 0.5
      }}

    ></Line>
  }
  render () {
    const { data, labelData } = this.state;
    return (
      <div>
       <AMapProvider token = {'15cd8a57710d40c9b7c0e3cc120f1200'} version = {'1.4.15'} plugin = {'Map3D'} >
        <Scene mapView= {
          {
            zoom: 5
          }
        }>
        <Polygon source = {{
          data: data
        }}
        color = {{
          field:'name',
          value:['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2']

        }}
        shape = {{
          field:'fill'
        }}
        style ={{
          opacity:0.8
        }}
        >
        <LayerEvent
          type = {'click'}
          onChange = {this.layerClickHander.bind(this)}
        ></LayerEvent>
        </Polygon>
        <Line
        source = {{
          data: data
        }}
        color = {{
          field:'#fff',
        }}
        size = {{
          field:2,
        }}
        shape = {{
          field:'line'
        }}
        style ={{
          opacity: 1.0
        }}
        ></Line>
        <Point
        source = {{
          data: labelData,
          parser:{
            type:'json',
            coordinates:'center'

          }
        }}
        color = {{
          field:'#fff',
        }}
        size = {{
          field:14,
        }}
        shape = {{
          field:'name',
          value:'text'
        }}
        style ={{
          opacity: 1.0
        }}
        >
        </Point>
       { this.state.feature ? this.renderHighlightlayer():null }
        </Scene>
        </AMapProvider>
      </div>
    )
  }
}
