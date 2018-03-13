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
      this.uploadItem(res.tempFilePath);
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
  },
  uploadItem: function (tempFilePath){
    var uploadTask = wx.uploadFile({
      url: 'https://www.uutic.com/plannerservice/api/upload',
      filePath: tempFilePath,
      name: 'file',
      header: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTIzIiwiaXNzIjoidXV0aWMiLCJwbGFuX2lkIjoiMjk4Zjk3MjUtM2U1NS00ZTc3LTllZDUtNTc5ODc1NDgzOTQ1In0.2MQA-qdbuDgEae8Astm55oxjZw0CmHQEk6bdtGjeB-g"
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function(res){
        console.log(res)
      }
    });

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    });
  }
})