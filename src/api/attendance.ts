import request from '@/utils/system/request'

// 获取数据api
export function getData(data: object) {
  return request({
    url: '/attendance/list',
    method: 'post',
    data
  })
}

// 新增
export function add(data: object) {
  return request({
    url: '/attendance/create',
    method: 'post',
    data
  })
}

// 编辑
export function update(data: object) {
  return request({
    url: '/attendance/update',
    method: 'post',
    data
  })
}

// 删除
export function del(data: object) {
  return request({
    url: '/attendance/delete',
    method: 'post',
    data
  })
}