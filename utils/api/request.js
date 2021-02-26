// 微信toast封装
const toast = function(title, icon = 'none', options) {
  wx.showToast({
    title: title || '',
    icon: icon,
    duration: (options && options.duration) || 1500,
    image: (options && options.image) || '',
    mask: (options && options.mask) || false,
  });
};
// 开发地址
const allurl = {
  baseUrl: 'https://test.cn' //记得改地址呀
}

// request 封装
const requestConfig = (url, data, methods, noLoading) => {
  if (!noLoading) {
    wx.showLoading({
      title: '请等待',
    });
  }
  if (methods === 'getRequest') {
    let keys = Object.keys(data).filter(item => data[item] && item.trim())
    keys = keys.map(item => `${item}=${data[item]}`)
    url += `?${keys.join('&')}`
  };
  return new Promise((resolve, reject) => {
    /**
     * 发起请求
     */
    wx.request({
      url: allurl.baseUrl + url,
      // [methods === 'getRequest' ? param : data]: data,
      data: methods === 'getRequest' ? {} : data,
      header: {
        'content-type': methods === 'postRequest' ? 'application/x-www-form-urlencoded' : 'application/json', // 默认值
        'Authorization': wx.getStorageSync('Authorization') || ''
      },
      method: methods === 'postRequest' ? 'post' : methods === 'getRequest' ? 'get' : methods,
      /**
       * 收到开发者服务成功返回的回调函数
       */
      success: function(res) {
        wx.hideLoading();
        // if (res.data.code === 401) {
        //   wx.clearStorageSync('Authorization');
        //   wx.showToast({
        //     title: '未登录或登录超时,请重新登录',
        //     icon: 'none',
        //     duration: 2000
        //   })
        //   // _app.globalData.isLogin = false
        //   wx.closeSocket({
        //     success(res) { },
        //     fail(res) { }
        //   })
        //   wx.redirectTo({
        //     url: '/pages/login/login',
        //   })
        //   return;
        // }
        if (res.data.code === 0) {
          resolve(res);
        } else {
          if (res.data.msg) toast(res.data.msg);
          resolve(res);
        }
      },
      /**
       * 接口调用失败的回调函数
       */
      fail: function(error) {
        wx.hideLoading();
        console.log('error', error)
        toast('网络异常');
        reject(error);
      },
    })
  });
};

const request = {
  get: async(url, noLoading = false) => {
    // console.log(noLoading);
    let result = await requestConfig(url, {}, 'GET', noLoading).then();
    return result.data;
  },
  getRequest: async(url, data, noLoading = false) => {
    let result = await requestConfig(url, data, 'getRequest', noLoading).then();
    return result.data;
  },
  post: async(url, data, noLoading = false) => {
    let result = await requestConfig(url, data, 'POST', noLoading);
    return result.data;
  },
  postRequest: async(url, data, noLoading = false) => {
    let result = await requestConfig(url, data, 'postRequest', noLoading);
    return result.data;
  }
};

module.exports = {
  allurl,
  request
}