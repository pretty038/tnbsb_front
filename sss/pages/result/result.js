// pages/result/result.js
import Canvas from '../../utils/scoreCanvas.js'
const app = getApp()
Page({
  ...Canvas.options,
  data: {
    userInfo: {},
    phone :'',
    bmi :'',
    score :'',
    uacr:'',
    ...Canvas.data
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.draw('runCanvas', options.score * 2.7, 1000, options.score);
    var that = this;
    that.setData({                             //this.setData的方法用于把传递过来的id转化成小程序模板语言
      phone: options.phone,     
      bmi: options.bmi,
      score: options.score,
      uacr:options.uacr,
      userInfo: app.globalData.userInfo
        })
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