const formatDateTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
}

const formatYearMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return [year, month].map(formatNumber).join('/')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getMaxDateInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
}

const parseDate = dateStr => {
  var str = dateStr.split(/[\/|\-|\.]/);
  var now = new Date();
  var year = str[0] ? parseInt(str[0]) : now.getFullYear();
  var month = str[1] ? parseInt(str[1]) : (now.getMonth() + 1);
  var day = str[2] ? parseInt(str[2]) : 1;
  return new Date(year, month - 1, day);
}

module.exports = {
  formatDateTime: formatDateTime,
  formatDate: formatDate,
  formatYearMonth: formatYearMonth,
  getMaxDateInMonth: getMaxDateInMonth,
  parseDate: parseDate
}
