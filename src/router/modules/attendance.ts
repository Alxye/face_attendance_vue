import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/attendance',
    component: Layout,
    redirect: '/attendance/calendar',
    meta: { title: '考勤管理', icon: 'sfont system-page' },
    children: [
      {
        path: 'manage',
        component: createNameComponent(() => import('@/views/main/attendance/manage.vue')),
        meta: { title: '员工' }
      },
      {
        path: 'calendar',
        component: createNameComponent(() => import('@/views/main/attendance/calendar.vue')),
        meta: { title: '日历' }
      },
      // {
      //   path: 'department',
      //   component: createNameComponent(() => import('@/views/main/attendance/department.vue')),
      //   meta: { title: '部门' }
      // },
      // {
      //   path: 'index',
      //   component: createNameComponent(() => import('@/views/main/attendance/index.vue')),
      //   meta: { title: '考勤图' }
      // }
        {
        path: 'index',
        component: createNameComponent(() => import('@/views/main/attendance/index.vue')),
        meta: { title: '月签到概览' }
      },
      {
        path: 'index2',
        component: createNameComponent(() => import('@/views/main/attendance/index2.vue')),
        meta: { title: '月签退概览' }
      }
    ]
  }
]

export default route