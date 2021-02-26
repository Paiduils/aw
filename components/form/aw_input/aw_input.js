// components/form/aw_input/aw_input.js
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
     * 当且仅当 type === 'input' 显示该组件
     * 
     * ---参数说明---
     * topLine            默认没有上划线，可加
     * clearBottomLine    默认有下划线，可删
     * label              输入框标题(最大长度为6，溢出隐藏)
     * requied            是否必填（显示红星）
     * inputType          input框的类型，默认text
     * disabled           是否禁用
     * value              input值
     * password           是否是密码类型，默认为否
     * maxLen             input框最大长度，默认40
     * placeholder + noPlaceholder        默认为“‘请输入’ + 输入框标题（label）” 通过placeholder可自定义
     *                                    也可通过noPlaceholder 来清除默认placeholder
     * icon               input框右侧是否添加icon（color UI: 如："cuIcon-locationfill",colorUI的图标）
     * iconColor          icon颜色，默认橘色 "text-orange"
     * BtnText            加按钮的文本（最多四字，溢出隐藏）
     * BtnBgCol           按钮的背景色
     * rule + message     结合“WxValidate.js” 验证输入文本是否符合规则
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputChange: function(e) {
      const { formItem } = this.data;
      const index = e.currentTarget.dataset.key;
      const value = e.detail.value;
      formItem.value = value;
      this.setData({ formItem });
      common.getPrepPage().setData({ ['form['+ index +']']: formItem});
    }
  }
})
