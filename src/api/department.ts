import request from '@/utils/system/request'

/** 获取公司数据api */
export function getDepartmentInfo() {
  return request({
    url: '/department/info',
    method: 'get'
  })
}
