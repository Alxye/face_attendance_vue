import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/attendance',
    component: Layout,
    redirect: '/attendance/index',
    meta: { title: '考勤管理', icon: 'sfont system-document' },
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
      {
        path: 'index',
        component: createNameComponent(() => import('@/views/main/attendance/index.vue')),
        meta: { title: '入口' }
      }
    ]
  }
]

export default route