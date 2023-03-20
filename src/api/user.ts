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
/** 管理员注册api */
export function Register(data: object) {
  return request({
    url: '/user/register',
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
/** 获取用户信息Api */
export function addAdmin(data: object) {
  return request({
    url: '/user/addAdmin',
    method: 'post',
    data
  })
}
/** 获取用户信息Api */
export function updateAdmin(data: object) {
  return request({
    url: '/user/updateAdmin',
    method: 'post',
    data
  })
}
/** 获取用户信息Api */
export function deleteAdmin(data: object) {
  return request({
    url: '/user/deleteAdmin',
    method: 'post',
    data
  })
}

/** 退出登录Api */
export function loginOutApi() {
  return request({
    url: '/user/logout',
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