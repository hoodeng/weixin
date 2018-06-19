function isEmpty(s){
  return s === null || s === undefined || s === ''
}

function showToast(s){
  wx.showToast({
    title: s,
    icon:'none'
  })
}

function getNextSevenDays() {
  let dd = new Date();
  let arr = [];
  arr.push((dd.getMonth() + 1) + "-" + dd.getDate())
  for (var i = 0; i < 6; i++) {
    dd.setDate(dd.getDate() + 1);
    arr.push((dd.getMonth() + 1) + "-" + dd.getDate())
  }
  return arr
}

module.exports = {
  isEmpty: isEmpty,
  showToast,
  getNextSevenDays
}