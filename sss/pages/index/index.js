//index.js
var http = require('../../utils/httpHelper.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    if(this.data.phone){
      app.globalData.phone=this.data.phone,
    wx.navigateTo({
      // url: '../logs/logs'
      url: '../logs/logs'
    })
    }
    else wx.showModal({
      content: '请填写手机号码开始测试',
      showCancel: false,
    })
    
  },
  onLoad: function () {
    wx.login({
      success :function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code)
          wx.request({
            url: 'https://tjyddx.cn:8777/ap/user/getOpenId',
            data: {
              code: res.code
            },
            success :function (res) {
              console.log(res.data.openid);
              app.globalData.openid=res.data.openid;
            }
          })
          // http.httpGet("user/getOpenId", res.code, function (res) {
          //   if (res.statusCode == '200') {
          //     console.log(res.openid);
              
          //   }
          // });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  inputPhone: function(e){
      this.setData({phone:e.detail.value})
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
