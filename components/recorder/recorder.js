// components/recorder/recorder.js

const recorder = require('../../utils/recorder.js');
const audioContext = require('../../utils/audiocontext.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    audios: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    startRecord: function () {
      recorder.start((res) => {
        var audios = this.data.audios;
        audios.push(res.tempFilePath);
        this.setData({
          audios: audios
        });
      });
    },
    stopRecord: function () {
      recorder.stop();
    },
    playAudio: function (e) {
      audioContext.play(e.target.dataset.src, () => {
        console.log('start')
      });
    }
  }
})
