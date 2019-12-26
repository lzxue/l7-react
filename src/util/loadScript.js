export default function loadScript (src) {
  return new Promise((resolve, reject) => {
    // 避免重复加载
    if (window.AMap) {
      console.log('AMap已存在，返回成功');
      resolve()
    }

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
