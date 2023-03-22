import request from '@/utils/system/request'

// 获取数据api
export function getData(data: object) {
  return request({
    url: '/staff/list',
    method: 'post',
    data
  })
}

// 新增
export function add(data: object) {
  return request({
    url: '/staff/create',
    method: 'post',
    data
  })
}

// 编辑
export function update(data: object) {
  return request({
    url: '/staff/update',
    method: 'post',
    data
  })
}

// 删除
export function del(data: object) {
  return request({
    url: '/staff/delete',
    method: 'post',
    data
  })
}