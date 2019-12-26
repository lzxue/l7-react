export default function loadScript (src) {
  return new Promise((resolve, reject) => {
    try {
      var script = document.createElement('script')
      script.src = src
      script.onload = () => {
        console.log('AMap加载成功');
        setTimeout(resolve, 10)
      }
      script.onerror = reject
      document.head.appendChild(script)
    } catch (err) {
      console.log('AMap加载失败');
      reject(err)
    }
  })
}
