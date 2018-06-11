function isEmpty(s){
  return s === null || s === undefined || s === ''
}

function showToast(s){
  wx.showToast({
    title: s,
    icon:'none'
  })
}

module.exports = {
  isEmpty: isEmpty,
  showToast
}