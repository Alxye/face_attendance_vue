import request from '@/utils/system/request'

/** 获取公司数据api */
export function getDepartmentInfo() {
  return request({
    url: '/department/info',
    method: 'get'
  })
}
/** 获取公司数据api */
export function addDepartment(data:object) {
  return request({
    url: '/department/add',
    method: 'post',
    data
  })
}
/** 获取公司数据api */
export function departmentUpdate(data:object) {
  return request({
    url: '/department/update',
    method: 'post',
    data
  })
}
