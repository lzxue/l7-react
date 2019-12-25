export default function loadScript (src) {
  return new Promise((resolve, reject) => {
    // 避免重复加载
    if (window.AMap) {
      return resolve()
    }

    try {
      var script = document.createElement('script')
      script.src = src
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    } catch (err) {
      reject(err)
    }
  })
}
