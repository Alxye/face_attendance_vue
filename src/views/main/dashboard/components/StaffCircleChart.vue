<template>
  <div class="box">
    <Chart :option="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Chart from '@/components/charts/index.vue'
import option from './circle'
import {hideLoading, showLoading} from "@/utils/system/loading";
import {getStaffDistribution} from "@/api/corporation";
import router from "@/router";
export default defineComponent({
  components: {
    Chart
  },
  setup() {
    // const getStaffDistributionOp = (init: boolean) => {
    //   showLoading()
    //   getStaffDistribution()
    //       .then(res => {
    //         // option.series[0].data=res.data
    //         // console.log(typeof(option.series[0].data))
    //         // console.log(options.series[0].data)
    //         // console.log(typeof(res.data))
    //         // console.log(res.data )
    //         // console.log(store.state.corp.info)
    //         // console.log(store.state.corp.info.name)
    //       })
    //       .catch(error => {
    //         hideLoading()
    //         router.push('/404')
    //       })
    //       .finally(() => {
    //         hideLoading()
    //       })
    // }
    // getStaffDistributionOp(true)
    const options = reactive(option)
    // 获取公司信息
    console.log(options.series)
    return {
      options
    }
  }
})
</script>

<style lang="scss" scoped>
  .box {
    width: calc(100% - 0px);
    height: 256px;
    background: var(--system-page-background);
    overflow: hidden;
    align-items: center;
    display:flex;
    padding: 20px 20px 10px;
    margin: 20px auto 0;
  }
</style>