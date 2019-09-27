export default class APILoader {
  getScriptSrc() {
    return 'https://webapi.amap.com/maps?v=1.4.15&key=15cd8a57710d40c9b7c0e3cc120f1200&plugin=Map3D'
  }

  buildScriptTag(src) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.src = src
    return script
  }

  getAmapuiPromise() {
    const script = this.buildScriptTag(`${this.protocol}//webapi.amap.com/ui/1.0/main-async.js`)
    const p = new Promise(resolve => {
      script.onload = () => {
        resolve()
      }
    })
    document.body.appendChild(script)
    return p
  }

  getMainPromise() {
    const script = this.buildScriptTag(this.getScriptSrc(this.config))
    const p = new Promise(resolve => {
      script.onload = () => {
        resolve()
      }
    }
    )
    document.body.appendChild(script)
    return p
  }

  load() {
    return this.getMainPromise()
  }
}
