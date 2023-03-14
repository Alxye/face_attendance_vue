# 智慧考勤管理 - 后台管理系统
负责人：赵茜茜、汤逸舟
## 2023.3.13 zxx
* 确认使用vue3+Ts开发web前端，传递json数据与后端flask程序交互
* 完成管理员登录验证与token存取，store.modules.user下存取管理员token与登录信息
* 完成管理员密码修改功能
* 修改store.user.info结构，并入存储用户非敏感信息
* 设计主页的布局格式
## 2023.3.14 zxx
* 设计弹窗功能，对于layer的拓展新增一个width值，实现弹窗宽度自适应  
  `src/layout/passwordLayer.vue` `src/components/layer/index.vue`
``` 
const layer = reactive({
  width:"30%",
  show: false,
  showButton: true
})
```
* 组件v-bind属性单项绑定ts数据项至vue前端显示 
