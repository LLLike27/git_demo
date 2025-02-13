import { excludeParseEventKeyList, excludeParseEventValueList } from './enums/eventEnum'

/**
 * @description 生成指定长度的随机字母串
 * @param {Number} size 长度
 * @return {String} size长度的随机字母串
 */
export const getRandomLetter = (size = 8) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from(
    { length: size },
    () => letters[Math.floor(Math.random() * letters.length)]
  ).join('');
};

/**
 * @description 生成指定长度的随机数字串
 * @param {Number} size 长度
 * @return {String} size长度的随机数字串
 */
export const getRandomNumber = (size = 6) => {
  return Math.floor(Math.random() * Math.pow(10, size))
    .toString()
    .padStart(size, '0');
};

/**
 * @description 生成随机ID
 * @param {Number} letterSize 字母长度
 * @param {Number} numberSize 数字长度
 * @return {String} letterSize+numberSize长度的随机数字字母串
 */
export const getUId = (letterSize = 8, numberSize = 6) => {
  const letters = letterSize > 0 ? getRandomLetter(letterSize) : '';
  const numbers = numberSize > 0 ? getRandomNumber(numberSize) : '';
  return letters && numbers ? `${letters}-${numbers}` : letters + numbers;
};

/**
 * @description UTF-16表情转码
 * @param {String} str 表情字符串
 * @return {String} 转码后的字符串
 */
export const utf16toEntities = str => {
  if (!str) return str;

  const surrogatePairRegex = /[\ud800-\udbff][\udc00-\udfff]/g;
  return str.replace(surrogatePairRegex, char => {
    if (char.length !== 2) return char;

    const highSurrogate = char.charCodeAt(0);
    const lowSurrogate = char.charCodeAt(1);
    const codePoint = ((highSurrogate - 0xd800) * 0x400) +
      (lowSurrogate - 0xdc00) +
      0x10000;

    return `&#${codePoint};`;
  });
};

/**
 * @description UTF-16表情解码
 * @param {String} str 转码字符串
 * @return {String} 解码后的字符串
 */
export const entitiestoUtf16 = str => {
  if (!str) return str;

  const htmlEntitiesRegex = /&#(\d+);/g;
  return str.replace(htmlEntitiesRegex, (_, codePoint) => {
    codePoint = parseInt(codePoint, 10);

    const highSurrogate = Math.floor((codePoint - 0x10000) / 0x400) + 0xd800;
    const lowSurrogate = ((codePoint - 0x10000) % 0x400) + 0xdc00;

    return String.fromCharCode(highSurrogate, lowSurrogate);
  });
};

/**
 * 16进制转rgb
 * @param {String} color
 * @returns {String}
 */
export const hex2rgb = (color) => {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  var sColor = color.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#"
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i <= 6; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return "rgba(" + sColorChange.join(",") + ")"
  } else {
    return sColor
  }
}

/**
 * @function rbg带透明度转16进制
 */
export const rgb2hex = (color) => {
  var values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',')
  var a = parseFloat(values[3] || 1),
    r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
    g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
    b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
  return "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2)
}

/**
 * @function 16进制转rgba
 */
export const hex2rgba = (color, opacity = 1) => {
  if (!color) return
  var theColor = color.toLowerCase()
  //十六进制颜色值的正则表达式
  var r = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是16进制颜色
  if (theColor && r.test(theColor)) {
    if (theColor.length === 4) {
      var sColorNew = "#"
      for (var i = 1; i < 4; i += 1) {
        sColorNew += theColor.slice(i, i + 1).concat(theColor.slice(i, i + 1))
      }
      theColor = sColorNew
    }
    //处理六位的颜色值
    var sColorChange = []
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + theColor.slice(i, i + 2)))
    }
    return "rgba(" + sColorChange.join(",") + "," + opacity + ")"
  }
  return theColor
}

/**
 * @function 秒转日期和时间
 */
export const handleTimestamp = (ts) => {
  let temp = new Date(ts * 1000),
    y = temp.getFullYear(),
    m = temp.getMonth() + 1,
    d = temp.getDate(),
    h = temp.getHours(),
    min = temp.getMinutes(),
    sec = temp.getSeconds();
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  h = h < 10 ? '0' + h : h;
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  return {
    year: y,
    month: m,
    day: d,
    date: `${m}-${d}`,
    time: `${h}:${min}`,
    normal_date: `${y}-${m}-${d}`,
    detail_time: `${y}-${m}-${d} ${h}:${min}`,
    second: sec,
  };
}

/**
 * @param {秒单位的时间戳} timeStamp
 * @returns {多少秒/分钟/小时/天 前/后}
 */
export const getDateDiff = (timeStamp) => {
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let month = day * 30;
  let backText = i18n.t('前');
  let result = '';

  let target = new Date(timeStamp * 1000);
  let now = new Date().getTime();
  let diffValue = now - target;
  if (diffValue < 0) {
    diffValue = -diffValue;
    backText = i18n.t('后');
  }
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  if (monthC >= 1) {
    result = parseInt(monthC) + i18n.t('个月') + backText;
  } else if (weekC >= 1) {
    result = parseInt(weekC) + i18n.t('周') + backText;
  } else if (dayC >= 1) {
    result = parseInt(dayC) + i18n.t('天') + backText;
  } else if (hourC >= 1) {
    result = parseInt(hourC) + i18n.t('个小时') + backText;
  } else if (minC >= 1) {
    result = parseInt(minC) + i18n.t('分钟') + backText;
  } else {
    if (backText == i18n.t('后')) {
      result = i18n.t('一分钟内');
    } else {
      result = i18n.t('刚刚');
    }
  }
  return result;
}

/**
 * @function 返回IOS当前系统版本 如：15，只会在真机上显示，模拟器无效
 */
export const iosSystem = window.navigator.userAgent
  .toLowerCase()
  .match(/cpu iphone os (\d+)\_(\d+)\_?(\d+)? like/)
  ? window.navigator.userAgent
    .toLowerCase()
    .match(/cpu iphone os (\d+)\_(\d+)\_?(\d+)? like/)[1]
    .replace(/_/g, '.')
  : 0;



// 获取链接所带参数(根据key获取value)
export function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return false;
}
// 判断url是否含有参数
export function hasUrlQuery(url) {
  if (!url) {
    let query = window.location.search.substring(1);
    if (query) return true;
  } else {
    let index = url.indexOf('?')
    if (index != -1) return true;
  }
  return false;
}
// 日志打印
export function devLog() {
  if (process.env.NODE_ENV == "development" || h5Page.env == 'aa' || h5Page.env == 'cc') {
    window.console.log(...arguments);
  }
}

// 一天中0时的时间戳
export function getDayZeroTimestamp(timestamp) { // 秒
  timestamp = Number(timestamp) * 1000;
  return new Date(new Date(timestamp).toLocaleDateString()).getTime();
}

/**
 * * JSON序列化，支持函数和 undefined
 * @param data
 */
export const JSONStringify = (data) => {
  return JSON.stringify(
    data,
    (key, val) => {
      // 处理函数丢失问题
      if (typeof val === 'function') {
        return `${val}`
      }
      // 处理 undefined 丢失问题
      if (typeof val === 'undefined') {
        return null
      }
      return val
    },
    2
  )
}

/**
 * * JSON反序列化，支持函数和 undefined
 * @param data
 */
export const JSONParse = (data) => {
  return JSON.parse(data, (k, v) => {
    // 过滤函数字符串
    if (excludeParseEventKeyList.includes(k)) return v
    // 过滤函数值表达式
    if (typeof v === 'string') {
      const someValue = excludeParseEventValueList.some(excludeValue => v.indexOf(excludeValue) > -1)
      if (someValue) return v
    }
    // 还原函数值
    if (typeof v === 'string' && v.indexOf && (v.indexOf('function') > -1 || v.indexOf('=>') > -1)) {
      return evalFn(`(function(){return ${v}})()`)
    } else if (typeof v === 'string' && v.indexOf && v.indexOf('return ') > -1) {
      const baseLeftIndex = v.indexOf('(')
      if (baseLeftIndex > -1) {
        const newFn = `function ${v.substring(baseLeftIndex)}`
        return evalFn(`(function(){return ${newFn}})()`)
      }
    }
    return v
  })
}
export const evalFn = (fn) => {
  var Fun = Function // 一个变量指向Function，防止前端编译工具报错
  return new Fun('return ' + fn)()
}
/**
 * * 修改顶部标题
 * @param title
 */
export const setTitle = (title) => {
  title && (document.title = title)
}

/**
 * 将对象添加当作参数拼接到URL上面
 * @param baseUrl 需要拼接的url
 * @param obj 参数对象
 * @returns {string} 拼接后的对象
 * 例子:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl, obj) {
  let parameters = '';
  let url = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters;
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters;
  }
  return url;
}


// 判断当前处于什么环境
export function envFun() {
  let url = window.location.href;
  let arr = url.split('.');

  if (process.env.NODE_ENV === 'development') {
    // 在这里调环境 'aa' 'cc' '';
    return 'aa';
  }

  if (arr[0].indexOf('aa') > -1) {
    return 'aa';
  } else if (arr[0].indexOf('cc') > -1) {
    return 'cc';
  } else {
    return '';
  }
}
