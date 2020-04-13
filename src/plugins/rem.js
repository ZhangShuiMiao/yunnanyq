(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize'
  var recalc = function () {
    var whdef = 100 / 1920
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = whdef * clientWidth + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
