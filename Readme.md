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
* 完成了公司info卡片的展示以及公司信息的修正，新增`src/api/corporation.ts`用于公司模块request请求
* 设计loading动画，当获取服务器端数据时load页面，超时则404，代码：`src/utils/system/loading.ts`<br/>
  具体用法：

```angular2html
> ...vue & ts
<script>
    import {showLoading, hideLoading} from '@/utils/system/loading'

    ...
    showLoading()
    ...
    hideLoading()
</script>
```

| 待解决：pieChart传值问题，初始chart值为const，端口传值类型相同但...@_@

## 2023.3.15

* pieChart传值问题解决了，在后端接口返回json的时候，前端处理成array即可
* pieChart新问题：request请求好了之后，组件内部data没有变，sad（没有直接的解决方式），原有的option本就是常量，option已经是Porxy类型了，但是没有用，emo了
* pieChart解决方法：干脆简单粗暴，request部门分布信息存入store中，然后每次request的时候判断一下信息有没有变，变了则reload
* Big Problem：request请求后，页面数据一点没变 <br/> Solution：引入reactive()就能解决了，瑞斯拜
* `首页做完哩！`
* 开始做公司信息管理了，设计思路

````angular2html
-信息管理
    -部门信息管理
    -新增部门
    -删除已有部门
    -修改部门信息
    -删除已有部门（部门无人则删除，有人则不能删）
    -修改部门信息（部门名称、部门公告）
-打卡时间设置
````

* 设计了部门信息管理初步框架，待完善功能：修改部门信息，待添加功能：删除已有部门/新增部门

## 2023.3.16

* 今日组会，不多搞了
* 新增部门有了，但是还要加不可增加已存在部门，就酱
* 大成功！！！新增部门+更新部门信息全部完成，还弄了一个卡片组件与父子传值与监听变更 WIN
* 部门信息管理写完了，在考虑要不要将打卡时间设计也放部门信息管理里面
* 今日代码：卡片组件与传值<br/>
  ` 组件应用src/views/main/department/manage.vue`

```angular2html
<template>
<el-tree
        :data="data"
        :props="defaultProps"
        :highlight-current="true"
        @node-click="handleNodeClick"
>
</el-tree>
<mange-info v-if="layer.show" :layer="layer" v-for="(row, key) in [active]" :dic="row" :key="key"></mange-info>

<script>
    // 引入子组件 用于展示选中列表项的部门信息
    components: {
        MangeInfo
    }
    ,
    // 卡片内容随列表选中变更
    const handleNodeClick = (row: object) => {
        layer.show = true
        active.value = row
        console.log("row:", row);
    }
```

`组件设计：src/views/main/department/mangeInfo.vue`

```angular2html
字典
<script>
    props: {
        dic: {
            type: Object,
        default:
            () => {
                return {
                    name: '',
                    notice: '',
                    staff_count: 0,
                    id: 0
                }
            }
        }
    ,
    }
    **
    数据监听 **
    watch(
            () => props.dic,
            (newValue, oldValue) => {
            ...
            }
    )
```
* 加入了打卡时间设置，但有一个问题，new Data().setTime(时间戳)返回的是number对象，而不是Data对象无法在TimePicker里面显示（悲
## 2023.3.17 zxx
* 解决了获取数据库时间戳，打卡时间不正常显示的问题，只需要传递Date对象即可，Date.setTime()后传递Date
* 本人负责的模块已完成，进入数据库整合阶段