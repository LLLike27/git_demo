import { LangEnum, ThemeEnum } from "@/enums/styleEnum";

export interface SystemStateType {
  // 当前语言
  lang: LangEnum,
  theme: ThemeEnum,
  isSidebarShow: boolean,
  showMarket: boolean,
  showSocial: boolean,
  showFundsSocial: boolean,
  GuideStep:number,
  hasShowGuide:boolean
  showGuideUser:string
}
export type CoinDetail = {
  baseCurrency: string,
  id: number,
  name: string,
  quoteCurrency: string,
  symbol: string,
  icon: string,
  icon2: string,
  initAsk?: number,
  initBid?: number,
  isHoliday?: boolean,
  initSpread?: number
}
export type symbolSocketDetail = {
  "symbol": string,
  "time": string,
  "timestamp": number,
  "bid": number,
  "ask": number,
  "spread": number,

}
export type symbolDetail = {
  symbol: string,//	品种名	string(string)	string(string)
  type: string,//		品种类型ID	string(string)	string(string)
  type_nm: string,//		品种类型名称——证券名称	string(string)	string(string)
  point_specification: number,//		点规格	integer(int)	integer(int)
  stop_loss: number, //	止损水平	integer(int)	integer(int)
  lever: number, //		杠杆	integer(int)	integer(int)
  contract_specification: number, //		合约规格	integer(int)	integer(int)
  min_size: number, //		最小交易量	number(float64)	number(float64)
  max_size: number, //		最大交易量	number(float64)	number(float64)
  scale: number, //		交易步长	number(float64)	number(float64)
  buy_inventory_cost: number, //		多单库存费	number(float64)	number(float64)
  sell_inventor_cost: number, //		空单库存费	number(float64)	number(float64)
  inventory_cost_type: number, //		库存费类型	string(string)	string(string)
  point_value: number, //		点值	number(float64)	number(float64)
  expected_margin: number, //		预计保证金	number(float64)	number(float64)

}
export type UserLogin = {
  Email: string,
  Pwd: string
}
export type UserToken = {
  token: string
}
export type UserInfo = {
  cid: number,//	ID	integer(int)
  cuorgcode: string //	组织码	string(string)
  ccreatorid: string //	创建人	string(string)
  ccreatetime: string //	创建时间	string(*gtime.Time)
  clastupdateuserid: string //	最后修改人	string(string)
  clastupdatetime: string //	最后修改时间	string(*gtime.Time)
  cuserid: string //	用户	string(string)
  cmerchantnoid: string //	商户号	string(string)
  cmemberno: string //	会员号	string(string)
  cname: string //	名称	string(string)
  clogo: string //	头像	string(string)
  cphone: string //	手机号	string(string)
  cinvitecode: string //	推荐码	string(string)
  cparentid: string //	推荐人	string(string)
  firsttime: string //首充时间	string(*gtime.Time)
  withdrawstatus: number,//	提现状态：1可提 2不可提	integer(int)
  vip: number,//	vip等级	integer(int)
  type: number,//	类型：1 正常 2 虚拟 3客服 4博主	integer(int)
  followuserid: string //	跟单用户id	string(string)
  email: string //	邮箱	string(string)
  sharestatus: number,//	分润状态：1允许 2禁止	integer(int)
}
export type UserDetail = {
  userId: string,//	用户id	integer(int64)	integer(int64)
  enableMargin: number,//	可用保证金	number(float64)	number(float64)
  currMargin: number,//	占用保证金	number(float64)	number(float64)
  available: number,//	余额	number(float64)	number(float64)
  netFunds: number,//	净值	number(float64)	number(float64)
  positionProfit: number,//	浮动盈亏	number(float64)	number(float64)
  creditFunds: number,//	信用	number(float64)	number(float64)
  cname: string,//	用户名	string(string)	string(string)
  email: string,//	邮箱	string(string)	string(string)
  ccreatetime: string,//	创建时间	string(*gtime.Time)	string(*gtime.Time)
  cmemberno: string,//	邀请码	string(string)	string(string)
  tradelevel: string,//	交易等级	integer(int)	integer(int)
  tradeLevelName:string,//交易等级名称
  starlevel: string,//	交易星级	integer(int)	integer(int)
  risklevel: string,//	风险等级	integer(int)	integer(int)
  earningRate: number,//	收益率	number(float64)	number(float64)
  successRate: number,//	成功率	number(float64)	number(float64)
  dailyEarningRate: number,//	每日收益率	number(float64)	number(float64)
  maxWithdrawalRate: number,//	最大回撤率	number(float64)	number(float64)
  profitLossRatio: number,//	交易大师盈亏比	number(float64)	number(float64)
  avgDailyProfitLoss: number,//	平均每日损益	number(float64)	number(float64)
  position: number,//	仓位	number(float64)	number(float64)
  maxPosition: number,//	最佳仓位	number(float64)	number(float64)
  minPosition: number,//	最差仓位	number(float64)	number(float64)
  dyas: string,//	系统中的天数	integer(int64)	integer(int64)
  auditStatus: number,//	实名认证状态  0代表认证失败 1代表认证通过 2待审核 3待提交 4未保存，未认证 5保存	integer(int)	integer(int)
  status: number,//	跟单状态	string(string)	string(string)
  inviteConnection: string,//	邀请链接	string(string)	string(string)
  clogo: string,//	头像
  communityStatus: number,//	社区状态 0未加入社区 1已加入社区
}
export type Assets = {
  Authorization: string,//	Bearer {{token}}	string(string)	string(string)
  id: number,//		integer(int64)	integer(int64)
  userId: number,//		integer(int64)	integer(int64)
  createdAt: string //	string(*gtime.Time)	string(*gtime.Time)
  updatedAt: string //	string(*gtime.Time)	string(*gtime.Time)
  enableMargin: any,//	可用保证金	number(float64)	number(float64)
  currMargin: number,//	占用保证金	number(float64)	number(float64)
  available: number,//	余额 = 总入金（充值+盈利） - 总出金（手续费+亏损+提现）	number(float64)	number(float64)
  netFunds: any //	净值 =（余额+浮动盈亏-点差手续费）	string(string)	string(string)
  positionProfit: number,	//浮动盈亏(持仓盈亏)	number(float64)	number(float64)
  creditFunds: string //	信用
  risk_ratio: any//风险比例
}

export type HoldAssets = {
  amount: number,//
  commission: number,//
  copiedFrom: string,//
  currPrice: number,//
  direction: string,
  holdContractId: number,//
  openPrice: number,//
  openTime: string,
  profit: number,//
  stopLoss: number,//
  swap: number,//
  symbol: string,
  takeProfit: number,//
  userId: number,//
  Timestamp: string
}
export type OrderDetail = {
  orderid: string //"订单id"~
  symbol: string // "品种"°
  offset_flag: string //"开平仓点位”
  trade_hand: number//"交易量”
  trade_time: string //“开仓时间"°
  trade_point_open: number //“开仓价格"°
  closing_position_time: string //"平仓时间"°
  trade_point: number//“平仓价格"
  profit: number// "利润"
  commission: string //佣金"
  direction: string //"多空标志"°
  direction_nm: string //"多空名称”。
  profit_price: string //止盈价格”°
  loss_price: string //"止损价格"
  timestamp: string
  swap: number//库存费
  icon: string//币对图片
  iconTwo: string//币对图片
  allHandPrice :number//	成交额（预计保证金）	number(float64)
  riskRatio	 :number//保证金水平	number(float64)

  profit_price_cache: string //止盈价格缓存--本地自己加的，编辑用”°
  loss_price_cache: string //止损价格缓存--本地自己加的，编辑用"
  trade_hand_cache: string //持仓手数缓存--本地自己加的，平仓用"
}

export type SignsItem = {
  cid: string,
  "cname": string,
  "csymbol": string,
  "cklinedatetime": string,
  "ctradehand": number,
  "coffsetflag": string,
  "cmessage": string,
  "cpoint": number,

}
export type ProfitDetail = {
  successRate: number,//	成功率	number(float64)	number(float64)
  dyas: number,//	系统中的天数	integer(int64)	integer(int64)
  avgDailyProfitLoss: number,//	平均每日损益	number(float64)	number(float64)
  maxWithdrawalRate: number,//	最大回撤率	number(float64)	number(float64)
  maxPosition: number,//	最佳仓位	number(float64)	number(float64)
  minPosition: number,//	最差仓位	number(float64)	number(float64)
  auditStatus: number,//实名认证状态 -1未认证 0代表认证失败 1代表认证通过 2代表认证中	integer(int)	integer(int)
  list: {
    userId: number,//	用户id	integer(int64)
    cname: string,//	用户名	string(string)
    clogo: string,//	头像	string(string)
    earningRate: number,//	收益率(盈亏%)	number(float64)
    replicator: number,//	复制者	integer(int)
    rankNumber: number,//	名次	integer(int)
    joinDays: number,//	加入系统的天数	integer(int64)
    ccreatetime: string,//	创建时间	string(*gtime.Time)
    successRate: number,//	成功率	number(float64)
  }[]

}

export type recentSug = {
  tradePoint: number,//	交易价格	number(float64)
  tradeTime: string,//		交易时间	string(string)
  userName: string,//		用户名称	string(string)
  symbol: string,//		品种名称	string(string)
  profitAndLoss: number,//	盈亏百分比:number,
  followers: number,//	跟单人数	integer(int)
  directionName: string
}

export type symbolDetailItem = {
  after_usd: number,
  base_currency: string
  buy_inventory_cost: number,
  contract_specification: number,
  front_usd: number,
  inventory_cost_type: string
  lever: number,
  max_size: number,
  min_size: number,
  point_specification: number,
  quote_currency: string
  scale: number,
  sell_inventor_cost: number,
  stop_loss: number,
  symbol: string
  type: string
  type_nm: string
}
export type holdAssetsListType = {
  symbol: string,
  orderId: string,
  profit: number,
  swap: number,
  totalProfit: number
}

export type RankDetail = {
  userId: string,	//用户id	integer(int64)
  cname: string,	//	用户名	string(string)
  clogo: string,	//	头像	string(string)
  earningRate: string,	//	收益率(盈亏%)	number(float64)
  replicator: number,	//	复制者	integer(int)
  rankNumber: number,	//	名次	integer(int)
  joinDays: number,	//加入系统的天数	integer(int64)
  ccreatetime: string,	//	创建时间	string(*gtime.Time)
  successRate: number,	//成功率	number(float64)，
  profitAndLossChart: {
    yieldRate: number,//	日盈亏	number
    createdAt: string,	//		时间
  }[]  //盈亏图表
}

export type totalInviteDetail = {
  totalTransactions: number,	//	总交易笔数	integer(int64)	integer(int64)
  totalCommission: number,	//	总佣金	number(float64)	number(float64)
  totalDividendCon: number,	//	总分红贡献	number(float64)	number(float64)
  dayTotalTransactions: number,	//	昨日总交易笔数	integer(int64)	integer(int64)
  dayTotalCommission: number,	//	昨日总佣金	number(float64)	number(float64)
  dayTotalDividendCon: number,	//昨日总分红贡献
}

export type dividendDetail = {
  userId: string,	//		用户id	integer(int64)
  cname: string,	//		用户名	string(string)
  clogo: string,	//		头像	string(string)
  level: string,	//		交易等級	string(string)
  levelName: string,	//		交易等級名称	string(string)
  totalProfit: number,	//	总盈利金额	number(float64)
  totalLoss: number,	//	总亏损金额	number(float64)
  profitLossRatio: number,	//	交易大师盈亏比	number(float64)
  dividend: number,	//	分红贡献	number(float64)
}
export type InviteDataDetail = {
  totalTransactions: number,	//	Lv用户总交易笔数	integer(int64)	integer(int64)
  totalCommission: number,	//	Lv用户总佣金	number(float64)	number(float64)
  totalDividendCon: number,	//	Lv用户总分红贡献	number(float64)	number(float64)
  lvUsersInfo: {
    clogo:string,//
    cname: string,	//	昵称	string(string)
    transactions: number,	//	交易笔数	integer(int64)
    commission: number,	//	佣金	number(float64)
    dividendCon: number,	//	分红贡献	number(float64)
  }[]		//Lv用户列表

}
export type authenticationDetail = {
  userid: string,	//	用户id		false
  realName: string,	//		真实姓名		false
  phone: string,	//		//			false
  idType: string,	//		false
  frontId: string,	//		证件正面 存身份证正面 护照		false
  backId: string,	//		证件反面		false
  code: string,	//
  auditStatus: string  //审核状态 0代表为审核驳回 1代表审核通过 2代表待审核
  errorMessage: string //错误信息
  //本地添加的属性，用于上传的缓存

  backIdTmp: "", passfrontIdTmp: '', idfrontIdTmp: ''
}

export type withdrawInfoDetail = {
  id: string,	//	string(string)
  userId: string,	//		string(string)
  cashType: string,	//出金类型 0：USDT出金 1：USD出金	string(string)
  mainNetworkType: string,	//	主网类型	string(string)
  account: string,	//账户	string(string)
  accountType: string,	//	账户类型 1：PHONE 2：CPF	string(string)
  currency: string,	//	币种	string(string)
  accountName: string,	//	开户名	string(string)
  bankName: string,	//	开户行名称	string(string)
  province: string, //省份
  city: string,    //城市
  remark: string   //备注
}

export type followuserDetail = {
  userid: string,	//	用户ID		false
  followuserid: string,	//要跟单的用户ID		false
  status: string,	//	允许跟单状态 0否1是		false
  net_funds: string,	//跟单净值		false
  follow_symbols: string,	//	跟单品种
}
export type CommunityDetail = {
  userId: string,	//		用户id	integer(int64)
  cname: string,	//		用户名	string(string)
  clogo: string,	//		头像	string(string)
  tradelevel: string,	//		交易等级	integer(int)
  levelName: string,	//		等级名称	string(string)
  profitLossRatio: number,	//		交易大师盈亏比	number(float64)
  totalProfit: number,	//		总盈利金额	number(float64)
  totalProfitCount: number,	//		盈利次数	number(float64)
  totalLoss: number,	//		总亏损金额	number(float64)
  totalLossCount: number,	//		亏损次数	number(float64)
  documentaryStatus: number,	//		跟单状态：0:正在跟单 1:跟单结束  关注类型 0:关注者 1:正在关注

}

export type SocialStreamDetail = {
  userId: string,	//	用户ID	integer(int64)
  clogo: string,	//	用户头像	string(string)
  cname: string,	//用户名	string(string)
  tradePoint: number,	//	开平仓点位
  direction: string,	//多空方向值 :48(多头) 49(空头)	string(string)
  directionName: string,	//交易类型名称（多空方向）	string(string)
  symbol: string,	//	交易品种	string(string)
  profitPercentage: number,	//	盈利百分比	number(float64)
  offsetFlag: number,	//	开平标识: 48(开仓) 49(平仓)	integer(int)
  allHandPrice: number,	//	占用保证金	number(float64)
  profit: string,	//	收益	string(string)
  created_at: string
}

export type varietyProportionDetailList = {
  symbol: string,	//	标识	string(string)
  varietyProportion: number,	//占比	number(float64)
  percentage: number,	//	收益占比	number(float64)
  profitposition: number,	//	盈利仓位	integer(int)
  lossposition: number,	//	亏损仓位	integer(int)
}

export type varietyProportionDetail = {
  currentPage: number,	//	integer(int)	integer(int)
  total: number,	//interface	interface
  userId: string,	//		用户	string(string)	string(string)
  ccreatetime: string,	//	创建时间(已加入)	string(string)	string(string)
  cname: string,	//		名称	string(string)	string(string)
  replicator: number,	//	复制者	integer(int)	integer(int)
  tradelevel: string,	//		交易等级	string(string)	string(string)
  starlevel: string,	//		星级等级	string(string)	string(string)
  risklevel: string,	//		风险等级	string(string)	string(string)
  list: varietyProportionDetailList[]

}

export type NoticeDetail = {
  cid: number,//	cid	integer(int)
  ctitle: string,	//	标题	string(string)
  cdescription: string,	//	内容	string(string)
  cmainimage: string,	//主图	string(string)
  ctype: string,	//公告类型	string(string)
  clinkurl: string,	//链接	string(string)
  cautoid: string,	//	排序号	string(string)
  ccreatetime: string,	//	创建时间	string(string)
}
