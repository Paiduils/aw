const app = getApp();
import WxValidate from './WxValidate';
import { dictionary } from './api/basics'
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

// picker 批量获取动态数据
const getFormDict = function(form, context) {
  form.forEach((item, index) => {
    if (item.type === 'picker' && item.dictField && item.dictField !== '') {
      /**
       * dictionary.getdictField 是封装好的获取数据字典的请求方法，大家可以使用自己的，也可以用我在request中封装好的
       * 目的是根据“dictField”值，取后台获取数据字典，并放入range中，就算成功
       * */ 
      dictionary.getdictField({name: item.dictField}).then(res => {
        if (res.code === 200) {  // onshow 获取动态字典请求成功、展示picker单选框
          let list = res.data;
          context.setData({ ['form['+ index +'].range']: list });
        } else {  // onshow 获取动态字典请求失败、展示自定义picker-view单选框,picker-view可以在点击的时候获取数据
          context.setData({ ['form['+ index +'].showPickerView']: true });
        }
      }).catch(err => { // onshow 获取动态字典请求失败、展示自定义picker-view单选框,picker-view可以在点击的时候获取数据
        console.log(err); 
        context.setData({ ['form['+ index +'].showPickerView']: true });
      })
    }
  })
};

module.exports = { 
  initValidate,
  getFormDict
};
