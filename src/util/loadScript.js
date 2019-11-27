export default function loadScript (src) {
  return new Promise((resolve, reject) => {
    try {
      var script = document.createElement('script')
      script.src = src
      script.onload = () => {
        setTimeout(resolve, 10)
      }
      script.onerror = reject
      document.head.appendChild(script)
    } catch (err) {
      reject(err)
    }
  })
}
