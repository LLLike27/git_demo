import { ResultEnum } from '@/enums/httpEnum'

export enum PageEnum {
  // 登录
  BASE_LOGIN = '/login',
  BASE_LOGIN_NAME = 'Login',

  //公告中心
  BASE_BULLETIN = '/bulletin',
  BASE_BULLETIN_NAME = 'Bulletin',
  //资金
  BASE_FUNDS = '/DashboardFunds',
  BASE_FUNDS_NAME = 'DashboardFunds',
  //注册
  BASE_REGISTER = '/register',
  BASE_REGISTER_NAME = 'Register',
  //忘记密码
  BASE_EDITPWD = '/forgotPwd',
  BASE_EDITPWD_NAME = 'ForgotPwd',

  //重定向
  REDIRECT = '/redirect',
  REDIRECT_NAME = 'Redirect',
  RELOAD = '/reload',
  RELOAD_NAME = 'Reload',


  // 首页
  BASE_HOME = '/Home',
  BASE_HOME_NAME = 'Home',

  // 手机端页面
  TABBAR_DASHBOADRD = '/Dashboard',
  TABBAR_DASHBOADRD_NAME = 'Dashboard',
  TABBAR_MARKETS = '/Markets',
  TABBAR_MARKETS_NAME = 'Markets',
  TABBAR_POSITIONS = '/Positions',
  TABBAR_POSITIONS_NAME = 'Positions',
  TABBAR_SOCIAL = '/Social',
  TABBAR_SOCIAL_NAME = 'Social',
  TABBAR_SOCIALPROFIT = '/SocialProfit',
  TABBAR_SOCIALPROFIT_NAME = 'SocialProfit',
  TABBAR_FUNDS = '/Funds',
  TABBAR_FUNDS_NAME = 'Funds',

  DASHBOADRD_CHAT = '/Chat',
  DASHBOADRD_CHAT_NAME = 'Chat',
  DASHBOADRD_TRADE = '/Trade',
  DASHBOADRD_TRADE_NAME = 'Trade',
  DASHBOADRD_SIGNNALS = '/Signals',
  DASHBOADRD_SIGNNALS_NAME = 'Signals',
  DASHBOADRD_BULLETINLIST = '/BulletinList',
  DASHBOADRD_BULLETINLIST_NAME = 'BulletinList',
  POSITIONS_OPEN = '/open',
  POSITIONS_OPEN_NAME = 'open',
  FUNDS_TRANSACTION = '/Transactions',
  FUNDS_TRANSACTION_NAME = 'Transactions',

  // 错误
  ERROR_PAGE_NAME_403 = 'ErrorPage403',
  ERROR_PAGE_NAME_404 = 'ErrorPage404',
  ERROR_PAGE_NAME_500 = 'ErrorPage500'
}

//是否是tabbar页面
export const isTabbarPage = [PageEnum.TABBAR_SOCIALPROFIT_NAME.toString(), PageEnum.TABBAR_DASHBOADRD.toString(), PageEnum.TABBAR_MARKETS.toString(), PageEnum.TABBAR_POSITIONS.toString(), PageEnum.TABBAR_SOCIAL.toString(), PageEnum.TABBAR_FUNDS.toString()]

export const ErrorPageNameMap = new Map([
  [ResultEnum.NOT_FOUND, PageEnum.ERROR_PAGE_NAME_404],
  [ResultEnum.SERVER_FORBIDDEN, PageEnum.ERROR_PAGE_NAME_403],
  [ResultEnum.SERVER_ERROR, PageEnum.ERROR_PAGE_NAME_500]
])
