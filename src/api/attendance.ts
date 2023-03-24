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

export function getCharts(data:object) {
  return request({
    url: '/attendance/dayChart',
    method: 'post',
    data
  })
}


export function getCheckin(data:object) {
  return request({
    url: '/attendance/chartCheckin',
    method: 'post',
    data
  })
}
export function getCheckin0(data:object) {
  return request({
    url: '/attendance/chartCheckin0',
    method: 'post',
    data
  })
}
export function getCheckin2(data:object) {
  return request({
    url: '/attendance/chartCheckin2',
    method: 'post',
    data
  })
}
export function getCheckout(data:object) {
  return request({
    url: '/attendance/chartCheckout',
    method: 'post',
    data
  })
}

export function getExcel(data:object) {
  return request({
    url: '/attendance/excel',
    method: 'post',
    data,
    responseType: "blob"
  })
}