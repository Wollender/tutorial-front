const util = {
  searchFun () {
    // var str = window.location.search //  ?userName=zhanghao&userId=123
    var urlStr = window.location.href
    if (urlStr.indexOf('from=')!= -1 || urlStr.indexOf('isappinstalled=')!=-1) {
      let str1 = urlStr.substring(0, urlStr.indexOf('?'))
      let str2 = urlStr.substring(urlStr.indexOf('#'))
      window.location.href = str1 + str2
      urlStr = window.location.href
    }
    let str = urlStr.indexOf('?') >= 0 ? urlStr.substring(urlStr.indexOf('?')) : ''
    if (str) {
      let url = str.substr(1)
      let arr = url.split('&')
      let len = arr.length
      let i = 0
      let request = {}
      for (; i < len; i++) {
        request[arr[i].split('=')[0]] = arr[i].split('=')[1]
      }
      return request
    } else {
      console.log('没有传递参数')
    }
  }
}
export default util
