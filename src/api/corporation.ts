import request from '@/utils/system/request'

/** 获取公司数据api */
export function getCorpData() {
  return request({
    url: '/corp/info',
    method: 'get'
  })
}

/** 获取公司数据api */
export function getAdminData() {
  return request({
    url: '/corp/AdminData',
    method: 'get'
  })
}

/** 获取公司数据api */
export function delAdmin(data: object) {
  return request({
    url: '/corp/DelAdmin',
    method: 'post',
    data
  })
}


/** 更新公司数据api */
export function updateCorpData(data: object) {
  return request({
    url: '/corp/update',
    method: 'post',
    data
  })
}

/** 获取公司员工部门分布数据api */
export function getStaffDistribution() {
  return request({
    url: '/corp/getStaffDistribution',
    method: 'get'
  })
}