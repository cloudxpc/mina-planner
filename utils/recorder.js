const recorderManager = wx.getRecorderManager();

recorderManager.onStart(() => {
  wx.showLoading({
    title: '正在录音'
  });
})
recorderManager.onResume(() => {
  console.log('recorder resume')
})
recorderManager.onPause(() => {
  console.log('recorder pause')
})
recorderManager.onStop((res) => {
  wx.hideLoading();
  if (callback) {
    callback(res);
  }
})
recorderManager.onFrameRecorded((res) => {
  const { frameBuffer } = res
  console.log('frameBuffer.byteLength', frameBuffer.byteLength)
})

var callback = null;

const start = func => {
  callback = func;
  recorderManager.start();
};

const stop = () => {
  recorderManager.stop();
};

module.exports = {
  start: start,
  stop: stop
};