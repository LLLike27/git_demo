import { useRoute } from 'vue-router'
import { ErrorPageNameMap, PageEnum, isTabbarPage } from '@/enums/pageEnum'
import { clearLocalStorage, getLocalStorage } from './storage'
import router from '@/router'
import { HEYUE_USER_INFO_STORE } from "@/settings";
import { Logout } from "@/request/index";

/**
 * * 根据名字跳转路由
 * @param pageName
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByName = async (
  pageName: string,
  isReplace?: boolean,
  query?: any,
  windowOpen?: boolean
) => {
  // console.log('router.currentRoute.value.name',router.currentRoute.value,router.currentRoute.value.name)
  // if(router.currentRoute.value.name==pageName){
  //   return;
  // }
  if (windowOpen) {
    const path = fetchPathByName(pageName, 'href')
    openNewWindow(path)
    return
  }
  if (isReplace) {
    await router.replace({
      name: pageName,
    })
    //   .then((res) => {
    //   console.log('==== push=error', res)
    // }).catch((e) => {
    //   console.log('====replace=error', e)
    // })
    return
  }
  //console.log('routerrouter',router,router.hasRoute(pageName))
  await router.push({
    name: pageName,
    query: query ?? {}
  })
  // .then((res) => {
  //   console.log('==== push=error', res)
  // }).catch((e) => {
  //   console.log('=====push=error', e)
  // })
}

/**
 * * 根据名称获取路由信息
 * @param pageName
 * @param pageName
 */
export const fetchPathByName = (pageName: string, p?: string) => {
  try {
    const pathData = router.resolve({
      name: pageName,
    })
    return p ? (pathData as any)[p] : pathData
  } catch (error) {
    window['$message'].warning('查询路由信息失败，请联系管理员！')
  }
}

/**
 * * 根据路径跳转路由
 * @param path
 * @param query
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByPath = (
  path: string,
  query?: Array<string | number>,
  isReplace?: boolean,
  windowOpen?: boolean,
  params?: any
) => {
  let fullPath = path
  if (query?.length > 0) {
    fullPath = `${path}/${query.join('/')}`
  }

  console.log('fullPathfullPath', fullPath, params)

  if (windowOpen) {
    return openNewWindow(fullPath)
  }


  if (isReplace) {
    router.replace({
      path: fullPath,
      query: params ? params : ''
    }).then(res => {

    }).catch(cat => {
      console.log("=================ByPath-replace-catch", cat)

    })


    return
  }
  router.push({
    path: fullPath,
    query: params ? params : ''
  }).then(res => {

  }).catch(err => {
    console.log("====================routerpush=err", err)
  })
}

/**
 * * 错误页重定向
 * @param icon
 * @returns
 */
// export const redirectErrorPage = (code: ResultEnum) => {
//   if (!code) return false
//   const pageName = ErrorPageNameMap.get(code)
//   if (!pageName) return false
//   routerTurnByName(pageName)
// }

/**
 * * 重新加载当前路由页面
 */
export const reloadRoutePage = () => {
  routerTurnByName(PageEnum.RELOAD_NAME)
}

/**
 * * 退出
 */
export const logout = (request = false) => {
  if (request) {
    clearLocalStorage(HEYUE_USER_INFO_STORE)
    routerTurnByName(PageEnum.BASE_LOGIN_NAME, true)
  } else {
    routerTurnByName(PageEnum.BASE_LOGIN_NAME, true)
    Logout({}).then((res: any) => {
      if (res.code === 0) {
        clearLocalStorage(HEYUE_USER_INFO_STORE)
      }
    })
  }

}

/**
 * * 新开页面
 * @param url
 */
export const openNewWindow = (url: string) => {
  return window.open(url, '_blank')
}


/**
 * * 判断是否在未登录的路由
 * @returns boolean
 */
export const isNoLoginRoute = () => {
  const loginPath = ['/login', '/register', '/forgotPwd']
  const route = useRoute()
  return loginPath.indexOf(route?.path) == -1
}

/**
 * * 判断是否在tabbar的路由
 * @returns boolean
 */
export const isTabbarPageRoute = () => {
  try {
    const isPage = isTabbarPage

    const route = useRoute()
    //console.log('isPage',isPage,route,isPage.indexOf(route?.name),isPage.indexOf(route.path) !== -1 && isPage.indexOf(route?.name) !== -1)
    return isPage.indexOf(route.path) !== -1 || isPage.indexOf(route?.name) > -1

  } catch (error) {
    console.log("=============是否在tabbar的路由error", error)
  }

}


/**
 * * 判断是否是预览页
 * @returns boolean
 */
export const isPreview = () => {
  return document.location.hash.includes('preview')
}

/**
 * * 获取当前路由下的参数
 * @returns object
 */
export const fetchRouteParams = () => {
  try {
    const route = useRoute()
    return route.params
  } catch (error) {
    window['$message'].warning('查询路由信息失败，请联系管理员！')
  }
}

/**
 * * 通过硬解析获取当前路由下的参数
 * @returns object
 */
export const fetchRouteParamsLocation = () => {
  try {
    // 防止添加query参数的时候，解析ID异常
    return document.location.hash.split('?')[0].split('/').pop() || ''
  } catch (error) {
    window['$message'].warning('查询路由信息失败，请联系管理员！')
    return ''
  }
}

/**
 * * 回到主页面
 * @param confirm
 */
export const goHome = () => {
  routerTurnByName(PageEnum.BASE_HOME_NAME)
}

/**
 * * 判断是否登录（现阶段是有 login 数据即可）
 * @return boolean
 */
export const loginCheck = () => {
  try {
    const info = getLocalStorage(HEYUE_USER_INFO_STORE)
    console.log('判断是否登录', info, !info?.UserInfo?.cuserid)
    if (!info) return false
    if (!info?.UserInfo?.cuserid) return false
    return true
  } catch (error) {
    return false
  }
}

export const getCurPath = () => {
  const route = useRoute()
  console.log('route', route.path)
  return route.path
}
