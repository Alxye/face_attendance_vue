import request from '@/utils/system/request'
/** 获取首页4卡片内容api */
export function getDashboardCardData(data: object) {
  return request({
    url: '/department/dashboardCard',
    method: 'post',
    data
  })
}
/** 登录api */
export function loginApi(data: object) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/** 获取用户信息Api */
export function getInfoApi(data: object) {
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}

/** 退出登录Api */
export function loginOutApi() {
  return request({
    url: '/user/out',
    method: 'post',
  })
}

/** 获取用户信息Api */
export function passwordChange(data: object) {
  return request({
    url: '/user/pwd_change',
    method: 'post',
    data
  })
}