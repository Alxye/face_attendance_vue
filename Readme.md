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
**字典**
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
**数据监听 **
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
* 与组员统一了数据库打卡时间的对象格式，部门打卡时间为Time格式及24小时时分秒，考勤打卡的时间为DateTime
* 将时间戳在前后端传递与显示的模块修正为Date对象在前后端传递与显示  
`前端采用TimePicker组件 ： src/views/main/department/mangeInfo.vue`
```angular2html
// 其中clockin & clockout 绑定两个TimePicker，reactive用于响应
let form = reactive({
      id: data.id,
      name: data.name,
      notice: data.notice,
      staff_count: data.staff_count,
      ///// 用于时间戳
      // clockin: value_clockin,
      // clockout: value_clockout,
      clockin: [new Date("2023-01-01 " + data.clock_in_start), new Date("2023-01-01 " + data.clock_in_end)],
      clockout: [new Date("2023-01-01 " + data.clock_out_start), new Date("2023-01-01 " + data.clock_out_end)],
      disabled: data.id != store.state.user.info.department_id
    })
// 与昨日同，采用watch()监听树节点传递的值，并更新卡片组件值
watch(
        () => props.dic,
        (newValue, oldValue) => {
          ///// 用于时间戳
          // value_clockin.value[0].setTime(newValue.clock_in_start)
          // value_clockin.value[1].setTime(newValue.clock_in_end)
          // value_clockout.value[0].setTime(newValue.clock_out_start)
          // value_clockout.value[1].setTime(newValue.clock_out_end)
          // form.clockin = [value_clockin.value[0],value_clockin.value[1]]
          // form.clockout = [value_clockout.value[0],value_clockout.value[1]]
          // form.disabled = newValue.id != store.state.user.info.department_id;
          
          // Ts Date对象创造需有年月日，故看似赘余实则必要
          form.clockin = [new Date("2023-01-01 " + newValue.clock_in_start), new Date("2023-01-01 " + newValue.clock_in_end)],
          form.clockout = [new Date("2023-01-01 " + newValue.clock_out_start), new Date("2023-01-01 " + newValue.clock_out_end)],
          form.disabled = newValue.id != store.state.user.info.department_id;
        }
// getTime() 用于处理request提交的time值由Date对象转变为字符串
function getTime(date:Date){
      const sign2 = ":";
      let hour = date.getHours(); // 时
      let minutes = date.getMinutes(); // 分
      let seconds = date.getSeconds(); //秒
      // 给一位数的数据前面加 “0”
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      return hour + sign2 + minutes + sign2 + seconds;
    }
```
`后端采用借助time.strptime将字符串"01:23:45"转化为time.struct_time用于更新操作`
```angular2html
# ./routes/department.py
clock_in_start = time.strptime("2023-01-01 " + data['clock_in_start'], "%Y-%m-%d %H:%M:%S")
# ./models/department.py ---> department.model 模型构建列属性为Time故更新时分秒
clock_in_start = db.Column(db.Time, nullable=False)
```
* 本人负责的模块已完成，进入数据库整合阶段