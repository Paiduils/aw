import { request } from './request.js';

// 数据字典
const dictionary = {
  getdictField: param => request.getRequest(`/getdictField`, param, true) // 根据id获取数据字典
}

module.exports = {
  dictionary
}
