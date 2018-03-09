const innerAudioContext = wx.createInnerAudioContext();

innerAudioContext.onPlay(() => {
  if (playCallback){
    playCallback();
  }
});

innerAudioContext.onError((res) => {
  wx.showToast({
    title: res.errMsg + ' ' + res.errCode,
    icon: 'none'
  });
});

var playCallback = null;
var stopCallback = null;

const play = (src, callback) => {
  innerAudioContext.src = src;
  playCallback = callback;
  innerAudioContext.play();
};

const stop = () => {
  innerAudioContext.stop();
};

module.exports = {
  play: play,
  stop: stop
};