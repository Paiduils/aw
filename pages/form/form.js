// pages/form/form.js
const formMethods = require('../../utils/formMethods.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: [
      { label: '四个大字', submitName: 'input1', type: 'input', inputType: 'text', value: '', requied: true, placeholder: '自定义placeholder',
      rule: { required: true }, 
      message: { required: '请输入用户名' }},
      { label: '最多支持六字', submitName: 'input2', type: 'input', inputType: 'text', value: ''},
      { label: '再多就隐藏了呀', submitName: 'input3', type: 'input', inputType: 'text', value: '', requied: true, BtnText: '默认色'},
      { label: '按钮换个颜色', submitName: 'input4', type: 'input', inputType: 'text', value: '', requied: true, BtnText: '验证码呀', BtnBgCol: 'bg-red'},
      { label: '加个图标', submitName: 'input5', type: 'input', inputType: 'text', value: '', requied: true, icon: 'cuIcon-locationfill' },
      { label: '图标换色', submitName: 'input6', type: 'input', inputType: 'text', value: '', requied: true, icon: 'cuIcon-favorfill', iconColor: 'text-blue'},
      { label: '静态-数组', submitName: 'picker1', type: 'picker', mode: 'selector', value: '', requied: true, range: ['是', '否']},
      { label: '静态json', submitName: 'picker2', type: 'picker', mode: 'selector', value: '', requied: true,
rangeKey: 'name', range: [
        { id: '01', name: '美国' },
        { id: '02', name: '中国' },
        { id: '03', name: '巴西' },
        { id: '04', name: '日本' }
      ]},
      { label: '动态json', submitName: 'picker3', type: 'picker', mode: 'selector', value: '', requied: true, dictField: 'choose', range: [], rangeKey: 'name'},
      { label: '时间选择', submitName: 'picker4', type: 'picker', mode: 'time', value: '', requied: true, start: '05:05', end: '07:10'},
      { label: '日期选择', submitName: 'picker5', type: 'picker', mode: 'date', value: '', requied: true, start: '2021-01-01', end: '2025-01-01', fields: ''}
    ]
    /**
     * 格式为：['中国', '美国'] 等数组类型的，value值为数组里的item
     * 格式为：[{name: '中国', id: '01'}, {name: '美国', id: '02'}]等json数组的，value值为json里的id
     * 
    */
  },

  // 验证提交数据
  submitForm: function() {
    const self = this;
    const { form } = this.data;
    const formValidate = {};
    /**
     * submitName字段是唯一的，一般是与后端约定的数据提交的字段名
     * 例如：
     *    前端展示名称    后端存储名称
     *      姓名            name
     *      年龄            age
     *      性别            sex
     * */
    form.forEach(item => {if (item.type === 'input' && item.submitName) formValidate[item.submitName] = item.value;});
    /**
     * 传入表单数据，调用验证方法
     * ！！！
     * requied为true时，会默认校验是否必填；当自己增加校验规则时，会覆盖该默认方法
     * */ 
    if (!self.WxValidate.checkForm(formValidate)) {
      const error = self.WxValidate.errorList[0];
      wx.showToast({ title: error.msg, icon: 'none' });
      return false
    };
    // 验证其他数据
    for (let item of form) {
      // 验证picker
      if(item.type === 'picker') {
        // console.log(item);
        if (item.requied && (item.value === '' || item.value == null || item.value.length === 0)) {
          return wx.showToast({ title: item.label + '是必填项', icon: 'none' });
        };
        let pickerValue = item.range ? item.range[item.value] : item.value;
        if (item.range && item.rangeKey) {
          formValidate[item.submitName] = pickerValue.id;
        } else {
          formValidate[item.submitName] = pickerValue;
        }
      }
    };
    // 数据校验完毕，可发起提交请求
    console.log(formValidate);
    wx.showToast({ title: '验证完毕' });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // input验证
    formMethods.initValidate(this.data.form, this);
    // picker 批量获取动态数据
    formMethods.getFormDict(this.data.form, this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})