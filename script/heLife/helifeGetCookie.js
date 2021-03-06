/**
 *@Author summer
 *@Date 2020/5/1  上午 10:36
 *@Describe github.com/dreverlyu
 *
 *[task_local]
 * # 山西移动和生活app签到
 * 09  * * * https://github.com/dreverlyu/quantumultX/blob/master/script/heLife/helife10086.js
 * [rewrite_local]
 * # Get Cookie
 * ^http:\/\/he\.sx\.chinamobile\.com\/h\/rest\/v1\/sign\/query url script-request-header  https://github.com/dreverlyu/quantumultX/blob/master/script/heLife/helifeGetCookie.js
 * # MITM = he.sx.chinamobile.com
 * 山西移动和生活获取cookie,访问我的，每日签到页面即可
 */
const cookieName = 'CookieHeLife_'
const cookieKey = 'glory_cookie_HE10086'
const glory = init()
const cookieVal = $request.headers['Cookie']
if (cookieVal) {
  if (glory.setdata(cookieVal, cookieKey)) {
    glory.msg(`${cookieName}`, '获取Cookie: 成功', '')
    glory.log(`[${cookieName}] 获取Cookie: 成功, cookie: ${cookieVal}`)
  }
}
function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
glory.done()