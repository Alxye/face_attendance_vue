# 智慧考勤管理 - 后台管理系统
用户验证、公司信息管理、部门管理  
负责人：赵茜茜
## 2023.3.13 zxx
* 确认使用vue3+Ts开发web前端，传递json数据与后端flask程序交互
* 完成管理员登录验证与token存取，store.modules.user下存取管理员token与登录信息
* 完成管理员密码修改功能
* 修改store.user.info结构，并入存储用户非敏感信息
* 设计主页的布局格式
## 2023.3.14 zxx
* 设计弹窗功能，新增width参数调整弹窗大小自适应`src/components/layer/index.vue`
> `src/layout/Header/passwordLayer.vue` 
> ```  
> const layer = reactive({
>    width:"30%",
>    show: false,
>    showButton: true
> }) 
> ```
* 将公司信息存储至store，配合vuex