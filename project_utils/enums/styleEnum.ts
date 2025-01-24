// 主题
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light'
}

// 语言
/*
阿拉伯语=Arabia
英语=en
波斯语=Farsi
法语=French
德语=German
印尼语=Indonesian
意大利语=Italian
日语=Japanese
韩语=Korean
葡萄牙语=Portuguese
俄语=Russian
西班牙语=Spanish
泰语=Thai
越南语=Vietnamese
中文=zh-cn
*/
export enum LangEnum {
  ZH = 'zh-cn',
  EN = 'en',
  AR = 'Arabia',
  DE = 'German',
  ES = 'Spanish',
  FA = 'Farsi',
  FR = 'French',
  HI = 'Indonesian',
  IT = 'Italian',
  JA = 'Japanese',
  KO = 'Korean',
  PT = 'Portuguese',
  RU = 'Russian',
  VI = 'Vietnamese',
}

//底部tabbar
export const footerList = [
  {
    name: 'Dashboard',
    to: '/Dashboard',
    iconClick: 'dashboardClick',
    iconNoClick: 'dashboardNoClick',
    width: 20,
    height: 20
  },
  {
    name: 'Markets',
    to: '/Markets',
    iconClick: 'marketsClick',
    iconNoClick: 'marketsNoClick',
    width: 20,
    height: 20
  },
  {
    name: 'Positions',
    to: '/Positions',
    iconClick: 'positionsClick',
    iconNoClick: 'positionsNoClick',
    width: 20,
    height: 20
  },
  {
    name: 'Social',
    to: '/Social',
    iconClick: 'socialClick',
    iconNoClick: 'socialNoClick',
    width: 25,
    height: 24
  },
  {
    name: 'Funds',
    to: '/Funds',
    iconClick: 'fundsClick',
    iconNoClick: 'fundsNoClick',
    width: 23,
    height: 20
  },

]
