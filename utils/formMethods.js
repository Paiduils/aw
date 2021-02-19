const app = getApp();
import WxValidate from './WxValidate';
// input验证
const initValidate = function(form, context) {
  let rules = {};
  let messages = {};
  for (let item of form) {
    if (item.type === 'input') {
      if (item.rule && item.message) {
        rules[item.submitName] = item.rule;
        messages[item.submitName] = item.message;
      } else if (item.requied) {
        rules[item.submitName] = { required: true };
        messages[item.submitName] = { required: '请输入' + item.label };
      }
    }
  };
  // 创建实例对象
  context.WxValidate = new WxValidate(rules, messages)
};

module.exports = { 
  initValidate
};
