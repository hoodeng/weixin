const URL = 'https://pgykeji.com'
const actions = {
  getServices: function (data, success, fail) {
    let request = require('request')
    let url = URL + '/api/dict/cat/list'
    request.request(url, data,success,fail)
  },
  getServicesType: function (data, success, fail){
    let request = require('request')
    let url = URL + '/api/dict/svr/list'
    request.request(url, data, success, fail)
  },
  getCat: function (data, success, fail){
    let request = require('request')
    let url = URL + '/api/dict/cat/list'
    request.request(url, data, success, fail)
  },
  getAddress: function (data, success, fail) {
    let request = require('request')
    let url = URL + '/api/dict/addr/list'
    request.request(url, data, success, fail)
  },
  getExpress: function (data, success, fail) {
    let request = require('request')
    let url = URL + '/api/dict/expr/com/list'
    request.request(url, data, success, fail)
  }
}

module.exports = actions