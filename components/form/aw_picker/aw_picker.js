// components/form/aw_picker/aw_picker.js
const app = getApp();
import { dictionary } from '../../../utils/api/basics'  // 获取数据字典的接口封装
const common = require('../utils/aw_common.js');
Component({
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {

    /**
     * 当且仅当 type === 'picker' 显示该组件
     * 
     * 参数说明
     * 公共参数：
     *      topLine            默认没有上划线，可加
     *      clearBottomLine    默认有下划线，可删
     *      label              输入框标题(最大长度为6，溢出隐藏)
     *      requied            是否必填（显示红星）
     *      submitName         向后台约定的数据提交字段名，如：姓名 —— name; 性别 —— sex; 年龄 —— age
     *      disabled           是否禁用
     *      value              选择的值
     *      placeholder + noPlaceholder        默认为“‘请选择’ + 输入框标题（label）” 通过placeholder可自定义
     *                                         也可通过noPlaceholder 来清除默认placeholder
     * 
     * 特定参数说明：
     * 当mode === 'selector'时, 选择器为单列选择器
     *      range              范围，目前支持俩种数据类型:
     *                           第一种：['中国', '美国', '日本']
     *                           第二种：[{ id: 0, name: '中国' }, { id: 1, name: '美国' }, { id: 2, name: '日本' }]
     *      rangeKey           当使用第二种jion类型时，需指定展示的字段名称，如该例子就需要指定rangeKey = 'name'
     *                         第一种类型就不要写这个参数了，切记切记
     *      dictField          如range是由接口动态获取的，那么在此配置参数，onLoad时会统一查询数据字典（详细代码已封装）
     * 
     * 当mode === 'time'时，选择器为时间选择器
     *      start - end        有效时间范围的开始or结束 默认不限制
     * 
     * 当mode === 'date'时，选择器为日期选择器
     *      start - end        有效日期范围的开始or结束 默认不限制
     *      fields             选择器的粒度，默认为day（天），可改为year（年）、month（月） 
     * 
    */
    formItem: {
      type: Object,
    },
    index: {
      type: Number
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    pickerView: false,
    pickerViewStyle: '',
    isCanConfirm: true    //是否禁止在第一列滚动期间点击确定提交数据
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 单选框/多选框  隐藏自定义picker-view
    closePicker: function() {
      const self = this;
      this.setData({pickerViewStyle: ''});
      setTimeout(()=>{self.setData({pickerView: false})},200);
    },

    // 单选框/多选框  显示自定义picker-view
    showPicker: function(e) {
      const {formItem} = this.data;
      const index = e.currentTarget.dataset.key;
      this.setData({pickerView: true, pickerPitch: formItem}, ()=> {
        this.setData({pickerViewStyle: 'show'});
      });
      // console.log(formItem);
      // console.log(formItem.range);
      if (formItem.range == null || formItem.range.length === 0) this.getRange(index);
    },

    // 自定义 picker-view 点击确定
    determinePicker: function(e){
      const self = this;
      const { formItem, index, pickerPitch } = self.data;
      // console.log(pickerPitch);
      if (pickerPitch.range && pickerPitch.range.length > 0) {
        let timer = setInterval(function(){
          if (self.data.isCanConfirm) {
            clearInterval(timer);
            const sendValue = pickerPitch.value ? pickerPitch.value : [0];
            formItem.value = sendValue;
            self.setData({formItem});
            common.getPrepPage().setData({['form['+ index +'].value']: sendValue});
            self.closePicker();
          }
        })
      } else {
        self.closePicker();
      }
      
      
    },

    // 自定义 picker-view 改变
    pickerviewChange: function(e) {
      const { pickerPitch } = this.data;
      const value = e.detail.value;
      pickerPitch.value = value;
      this.setData({pickerPitch})
    },

    chooseStart: function(e) {
      this.setData({isCanConfirm: false})
      // console.log(e);
    },

    chooseEnd: function(e) {
      this.setData({isCanConfirm: true})
      // console.log(e);
    },

    // 当数据为动态数据--唤起选择器时，重新拉取字典
    getRange: function() {
      const { formItem, index } = this.data;
      /**
       * dictionary.getdictField 是封装好的获取数据字典的请求方法，大家可以使用自己的，也可以用我在request中封装好的
       * 目的是根据“dictField”值，取后台获取数据字典，并放入range中，就算成功
       * */ 
      dictionary.getdictField({name: formItem.dictField}).then(res => {
        let list = res.data;
        this.setData({
          ['formItem.range']: list
        });
        // console.log(this.data.formItem);
        common.getPrepPage().setData({['form['+ index +'].range']: list})
      }).catch(err => {
        console.log(err);
      })
    },
    // 单列选择器改变
    bindPickerChange: function(e) {
      const { formItem } = this.data;
      if (!formItem.range || formItem.range.length > 0) {
        const index = e.currentTarget.dataset.key;
        const value = e.detail.value;
        formItem.value = value;
        // console.log(formItem);
        this.setData({formItem});
        common.getPrepPage().setData({ ['form['+ index +']']: formItem });
      }
    }
  }
})
