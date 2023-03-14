import request from '@/utils/system/request'

// 获取公司数据api
export function getCorpData() {
  return request({
    url: '/corp/info',
    method: 'get'
  })
}