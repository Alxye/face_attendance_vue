import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/employee',
    component: Layout,
    redirect: '/employee/manage',
    meta: { title: '员工管理', icon: 'sfont system-document' },
    children: [
      {
        path: 'manage',
        component: createNameComponent(() => import('@/views/main/employee/manage.vue')),
        meta: { title: '员工信息管理' }
      },
    ]
  }
]

export default route