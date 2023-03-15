<template>
  <div class="card-list">
    <Row v-for="row in list" :key="row.id" :row="row"/>
  </div>
</template>

<script lang="ts">

import {defineComponent, reactive} from 'vue'
import Row from './row.vue'
import {getCorpData} from "@/api/corporation";
import {hideLoading} from "@/utils/system/loading";
import router from "@/router";
import {getDashboardCardData} from "@/api/user";
import {useStore} from "vuex";

export default defineComponent({
  components: {
    Row
  },
  setup() {
    const store = useStore()
    const list = reactive([
      {id: 1, name: '我的部门', data: '是啥捏', color: '#4e73df', icon: 'sfont system-yonghu'},
      {id: 2, name: '今日', data: '', color: '#1cc88a', icon: 'sfont system-xiaoxi'},
      {id: 3, name: '部门新员工待审批', data: 0, color: '#36b9cc', icon: 'sfont system-shuliang_mianxing'},
      {id: 4, name: '考勤申述待审批', data: 0, color: '#f6c23e', icon: 'sfont system-jindutiaoshouyidaozhang'}
    ])
    var a = new Date().getTime(); //获取到当前时间戳
    var b = new Date(a); //创建一个指定的日期对象
    console.log(b);
    console.log(nowDate(b));

    function nowDate(now: Date) {
      var year = now.getFullYear(); //年份
      var month = now.getMonth() + 1; //月份（0-11）
      var date = now.getDate(); //天数（1到31）
      return (
          year + " 年 " + month + " 月 " + date + " 日"
      )
    }

    console.log(list)
    list[0].data = store.state.user.info.department_name
    list[1].data = nowDate(b)
    let params = {
      department_id: store.state.user.info.department_id
    }
    getDashboardCardData(params)
        .then(res => {
          return new Promise((resolve, reject) => {
            list[2].data = res.data.appealstaffcount
            list[3].data = res.data.appealattendancecount
          })
        })
        .catch(error => {
          hideLoading()
          router.push('/404')
        })
        .finally(() => {
          hideLoading()
        })

    return {
      list
    }
  }
})
</script>

<style lang="scss" scoped>
.card-list {
  width: calc(100% + 20px);
  margin-left: -10px;
  display: flex;
  flex-wrap: wrap;
}
</style>