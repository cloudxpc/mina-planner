// templates/calendar.js

const util = require('../../utils/util.js');

Component({
  externalClasses: ['grid-icon', 'line-icon'],
  /**
   * 组件的属性列表
   */
  properties: {
    dateStr: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) {

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentDate: null,
    currentYear: 0,
    currentMonth: 0,
    selectedDate: null,
    items: [],
    inlineItems: [],
    inline: true,
    inlineToView: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    createItem: function (year, month, day) {
      var date = new Date(year, month, day);
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        week: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
        date: date,
        dateStr: util.formatDate(date)
      };
    },
    refreshCalendar: function () {
      var date = this.data.currentDate;
      var maxDate = util.getMaxDateInMonth(date.getFullYear(), date.getMonth() + 1);
      var lastMonthMaxDate = util.getMaxDateInMonth(date.getFullYear(), date.getMonth());
      var firstWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

      var count = 0;
      var row = [];
      var items = [];
      var inlineItems = [];
      for (var j = lastMonthMaxDate - firstWeek + 1; j <= lastMonthMaxDate; j++) {
        row.push(this.createItem(date.getFullYear(), date.getMonth() - 1, j));
        count++;
      }
      for (var i = 1; i <= maxDate; i++) {
        row.push(this.createItem(date.getFullYear(), date.getMonth(), i));
        inlineItems.push(this.createItem(date.getFullYear(), date.getMonth(), i));
        count++;
        if (count == 7) {
          items.push(row);
          row = [];
          count = 0;
        }
      }

      for (var m = 1; count > 0 && m <= 7 - count; m++) {
        row.push(this.createItem(date.getFullYear(), date.getMonth() + 1, m));
      }
      if (row.length) {
        items.push(row);
        row = [];
        count = 0;
      }
      this.setData({
        items: items,
        inlineItems: inlineItems
      });
    },
    changeCurrentDate: function (date) {
      this.setData({
        currentDate: date,
        currentYear: date.getFullYear(),
        currentMonth: date.getMonth() + 1
      });
      this.refreshCalendar();
    },
    changeSelectedDate: function (date, preventEmit) {
      this.setData({
        selectedDate: date
      });
      if (!this.data.currentDate || this.data.selectedDate.getFullYear() != this.data.currentDate.getFullYear() || this.data.selectedDate.getMonth() != this.data.currentDate.getMonth()) {
        this.changeCurrentDate(date);
      }
      if (!preventEmit) {
        var eventOption = {};
        this.triggerEvent('select', this.data.selectedDate, eventOption);
      }
    },
    previousMonth: function () {
      var date = this.data.currentDate;
      this.changeCurrentDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
    },
    nextMonth: function () {
      var date = this.data.currentDate;
      this.changeCurrentDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
    },
    bindDateChange: function (e) {
      var date = util.parseDate(e.detail.value);
      this.changeCurrentDate(date);
    },
    cellClick: function (e) {
      if (e.target.dataset.text) {
        this.changeSelectedDate(util.parseDate(e.target.dataset.text));
      }
    },
    showToday: function () {
      var now = new Date();
      this.changeSelectedDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
      this.scrollToView(this.data.selectedDate);
    },
    toggle: function () {
      this.scrollToView(this.data.selectedDate);
      this.setData({
        inline: !this.data.inline
      });
    },
    scrollToView: function (date) {
      var d = date.getDate() - 3;
      d = d < 1 ? 1 : d;
      this.setData({
        inlineToView: 'ic-' + d
      });
    }
  },
  attached: function () {
    if (this.data.dateStr) {
      this.changeSelectedDate(util.parseDate(this.data.dateStr));
    } else {
      this.showToday();
    }
  }
})
