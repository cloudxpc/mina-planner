// pages/main/main.js

const recorder = require('../../utils/recorder.js');
const audioContext = require('../../utils/audiocontext.js');
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  dateSelected: function (e) {
    console.log(e.detail);
  },
  startRecord: function () {
    recorder.start((res) => {
      var date = new Date();
      var items = this.data.items.slice(0);
      items.push({
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        timeStr: util.formatTime(date.getHours(), date.getMinutes(), date.getSeconds()),
        src: res.tempFilePath
      });
      this.setData({
        items: items
      });
    });
  },
  stopRecord: function () {
    recorder.stop();
  },
  playAudio: function (e) {
    audioContext.play(e.detail, () => {
      console.log('start')
    });
  }
})