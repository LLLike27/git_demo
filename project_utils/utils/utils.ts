import { excludeParseEventKeyList, excludeParseEventValueList } from '@/enums/eventEnum'

/**
 * * JSON序列化，支持函数和 undefined
 * @param data
 */
export const JSONStringify = <T>(data: T) => {
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
export const JSONParse = (data: string) => {
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
export const evalFn = (fn: string) => {
  var Fun = Function // 一个变量指向Function，防止前端编译工具报错
  return new Fun('return ' + fn)()
}
/**
 * * 修改顶部标题
 * @param title
 */
export const setTitle = (title?: string) => {
  title && (document.title = title)
}

//显示本地图片
export const getLogo = (clogo: string) => {
  if (clogo?.toString().indexOf('/src/assets/logo/defaultavatar') > -1) {
    const name = clogo.substring(clogo.indexOf('defaultavatar'))
    return new URL(`/src/assets/logo/${name}`, import.meta.url).href
  } else {
    if (clogo?.toString().indexOf('upload_file') == -1) {
      return new URL(`/src/assets/logo/defaultPerson.svg`, import.meta.url).href

    } else
      return clogo
  }
}

//显示交易等级Svg
export const getTradeLevelSvg = (level: any) => {
  switch (Number(level)) {
    case 1:
      return {
        name: "TradeLevel1",
        width: 20,
        height: 20
      }
      break;
    case 2:
      return {
        name: 'TradeLevel2',
        width: 20,
        height: 20
      }
      break;
    case 3:
      return {
        name: 'TradeLevel3',
        width: 16,
        height: 21
      }
      break;
      break;
    case 4:
      return {
        name: 'TradeLevel4',
        width: 18,
        height: 23
      }
      break;
      break;
    case 5:
      return {
        name: 'TradeLevel5',
        width: 25,
        height: 19
      }
      break;
      break;
    default:
      return {
        name: 'TradeLevel1',
        width: 20,
        height: 20
      }
      break;
  }
}
