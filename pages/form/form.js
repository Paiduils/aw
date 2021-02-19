// pages/form/form.js
const formMethods = require('../../utils/formMethods.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: [
      { label: '四个大字', submitName: 'name', type: 'input', inputType: 'text', value: '', requied: true,    placeholder: '自定义placeholder',rule: { required: true },message: { required: '请输入用户名' }},
      { label: '最多支持六字', submitName: 'adress2', type: 'input', inputType: 'text', value: '', password: true},
      { label: '再多就隐藏了呀', submitName: 'adress', type: 'input', inputType: 'text', value: '', requied: true, BtnText: '默认色'},
      { label: '按钮换个颜色', submitName: 'adress3', type: 'input', inputType: 'text', value: '', requied: true, BtnText: '验证码呀', BtnBgCol: 'bg-red'},
      { label: '加个图标', submitName: 'adress4', type: 'input', inputType: 'text', value: '', requied: true, icon: 'cuIcon-locationfill' },
      { label: '图标换色', submitName: 'adres5s', type: 'input', inputType: 'text', value: '', requied: true, icon: 'cuIcon-favorfill', iconColor: 'text-blue'}
    ]
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
    form.forEach(item => { formValidate[item.submitName] = item.value});
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
    // 数据校验完毕，可发起提交请求
    wx.showToast({ title: '验证完毕' });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // input验证
    formMethods.initValidate(this.data.form, this);
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