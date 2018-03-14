// pages/main/main.js

const util = require('../../utils/util.js');

const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTIzIiwiaXNzIjoidXV0aWMiLCJwbGFuX2lkIjoiMjk4Zjk3MjUtM2U1NS00ZTc3LTllZDUtNTc5ODc1NDgzOTQ1In0.2MQA-qdbuDgEae8Astm55oxjZw0CmHQEk6bdtGjeB-g";

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
    this.loadItems();
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
    this.loadItems();
    wx.stopPullDownRefresh();
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
      this.changeItemState(this.audioContext.src);
    });
    this.audioContext.onStop(() => {
      this.changeItemState();
    });
    this.audioContext.onEnded(() => {
      this.changeItemState();
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
  createItem: function (date, tempFilePath) {
    return {
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      timeStr: util.formatTime(date.getHours(), date.getMinutes(), date.getSeconds()),
      src: tempFilePath,
      isPlaying: false
    };
  },
  addItem: function (tempFilePath) {
    var items = this.data.items.slice(0);
    items.push(this.createItem(new Date(), tempFilePath));
    this.setData({
      items: items
    });
  },
  uploadItem: function (tempFilePath) {
    var uploadTask = wx.uploadFile({
      url: 'https://www.uutic.com/plannerservice/api/upload',
      filePath: tempFilePath,
      name: 'file',
      header: {
        "Authorization": token
      },
      success: res => {
        this.addItem(tempFilePath);
      },
      fail: function (res) {
        console.log(res)
      }
    });

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    });
  },
  loadItems: function () {
    wx.showLoading({
      title: '加载中',
    });
    var requestTask = wx.request({
      url: 'https://www.uutic.com/plannerservice/api/plan',
      header: {
        "Authorization": token
      },
      success: (res) => {
        if (res.data && res.data.length) {
          var items = [];
          var data = res.data.sort((a, b) => { return a.timestamp > b.timestamp; });
          for (var i = 0; i < data.length; i++) {
            items.push(this.createItem(new Date(data[i].timestamp), "http://resource.uutic.com/" + data[i].resourceName));
          }
          this.setData({
            items: items
          });
        }
      },
      complete: () => {
        wx.hideLoading();
      }
    });

    // requestTask.abort();
  },
  changeItemState: function (src) {
    for (var i = 0; i < this.data.items.length; i++) {
      if (this.data.items[i].isPlaying) {
        var prop = 'items[' + i + '].isPlaying';
        this.setData({
          [prop]: false
        });
      }

      if (src && this.data.items[i].src === src) {
        var prop = 'items[' + i + '].isPlaying';
        this.setData({
          [prop]: true
        });
      }
    }
  }
})