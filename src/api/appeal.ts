import request from '@/utils/system/request'

// 获取数据api
export function getData(data: object) {
  return request({
    url: '/appeal/list',
    method: 'post',
    data
  })
}

// 新增
export function add(data: object) {
  return request({
    url: '/appeal/create',
    method: 'post',
    data
  })
}

// 编辑
export function update(data: object) {
  return request({
    url: '/appeal/update',
    method: 'post',
    data
  })
}

// 删除
export function del(data: object) {
  return request({
    url: '/appeal/delete',
    method: 'post',
    data
  })
}