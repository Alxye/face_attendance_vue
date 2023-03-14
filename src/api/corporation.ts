import request from '@/utils/system/request'

/** 获取公司数据api */
export function getCorpData() {
  return request({
    url: '/corp/info',
    method: 'get'
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

/** 获取公司所有员工数api */
export function CountStaff() {
  return request({
    url: '/corp/CountStaff',
    method: 'get'
  })
}