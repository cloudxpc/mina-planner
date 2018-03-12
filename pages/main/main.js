// pages/main/main.js

const util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: []
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
    this.initRecorderManager();
    this.initAudioContext();
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
  initRecorderManager: function () {
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onStart(() => {
      wx.showLoading({
        title: '正在录音'
      });
    });
    this.recorderManager.onStop((res) => {
      wx.hideLoading();
      this.addItem(res.tempFilePath);
    });
  },
  startRecord: function () {
    this.recorderManager.start();
  },
  stopRecord: function () {
    this.recorderManager.stop();
  },
  initAudioContext: function () {
    this.audioContext = wx.createInnerAudioContext();
    this.audioContext.onPlay(() => {
      
    });
    this.audioContext.onError((res) => {
      wx.showToast({
        title: res.errMsg + ' ' + res.errCode,
        icon: 'none'
      });
    });
  },
  playAudio: function (e) {
    this.audioContext.src = e.detail;
    this.audioContext.play();
  },
  stopAudio: function () {
    this.audioContext.stop();
  },
  dateSelected: function (e) {
    console.log(e.detail);
  },
  addItem: function (tempFilePath) {
    var date = new Date();
    var items = this.data.items.slice(0);
    items.push({
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      timeStr: util.formatTime(date.getHours(), date.getMinutes(), date.getSeconds()),
      src: tempFilePath
    });
    this.setData({
      items: items
    });
  }
})