import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/department',
    component: Layout,
    redirect: '/department/manage',
    meta: { title: '公司管理', icon: 'sfont system-document' },
    children: [
      {
        path: 'manage',
        component: createNameComponent(() => import('@/views/main/department/manage.vue')),
        // meta: { title: 'message.menu.document.function' } //用于国际化 @_@
        meta: { title: '部门信息管理' }
      },
      {
        path: 'admin_manage',
        component: createNameComponent(() => import('@/views/main/department/admin_manage.vue')),
        meta: { title: '管理员管理' }
      },
    ]
  }
]

export default route