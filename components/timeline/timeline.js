// components/timeline/timeline.js

const util = require('../../utils/util.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        this.refreshTimeline();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lines: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    createLine: function (h, m, s) {
      return {
        h: h,
        m: m,
        s: s,
        timeStr: util.formatTime(h, m, s),
        contents: []
      };
    },
    refreshTimeline: function () {
      var lines = [];
      var hours = 24;
      for (var i = 0; i < hours; i++) {
        for (var j = 0; j < 60; j += 30) {
          lines.push(this.createLine(i, j));
        }
      }
      for (var m = 0; m < this.data.items.length; m++) {
        var item = this.data.items[m];
        for (var n = 0; n < lines.length; n++) {
          var currentLine = lines[n];
          var nextLine = (n + 1) < lines.length ? lines[n + 1] : null;
          if (!nextLine || item.h < nextLine.h || (item.h === nextLine.h && item.m < nextLine.m)) {
            currentLine.contents.push(item);
            break;
          }
        }
      }
      this.setData({
        lines: lines
      });
    },
    contentClick: function (e) {
      if (e.target.dataset.src) {
        this.triggerEvent('contentclick', e.target.dataset.src);
      }
    }
  }
})
