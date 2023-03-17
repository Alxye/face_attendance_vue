<template>
  <div class="box">
    <Chart :option="options"/>
  </div>

</template>

<script lang="ts">
import {defineComponent, reactive, toRaw} from 'vue'
import Chart from '@/components/charts/index.vue'
// import {Getop} from './circle'
import option from './circle'
import {hideLoading, showLoading} from "@/utils/system/loading";
import {getStaffDistribution} from "@/api/corporation";
// import {useStore} from "vuex";
// import store from "@/store";

export default defineComponent({
  components: {
    Chart
  },
  setup() {
    // let option = {
    //   title: {
    //     text: '员工部门分布',
    //   },
    //   series: [
    //     {
    //       name: '访问来源',
    //       type: 'pie',
    //       radius: ['50%', '100%'],
    //       avoidLabelOverlap: true,
    //       itemStyle: {
    //         borderRadius: 10,
    //         borderColor: '#fff',
    //         borderWidth: 10
    //       },
    //       label: {
    //         show: false,
    //         position: 'center'
    //       },
    //       emphasis: {
    //         label: {
    //           show: true,
    //           fontSize: '26',
    //           fontWeight: 'bold',
    //           formatter: (p: { name: string; value: string; }) => {
    //             let dom = `<div backgroundColor="red">1</div>`
    //             return p.name + '\n' + p.value
    //           }
    //         }
    //       },
    //       labelLine: {
    //         show: true
    //       },
    //       data:[{}]
    //
    //     }
    //   ]
    // };

    const options = reactive(option)
    // const store = useStore()

    getStaffDistribution()
        .then(res => {
          let arr = [];
          for (const key in res.data) {
            if (!res.data.hasOwnProperty(key)) {
              continue;
            }
            const item = res.data[key];
            arr.push(item);
          }
          // const isEqual = (a, b) => {
          //   if (Object.keys(a).length !== Object.keys(b).length) {
          //     return false;
          //   }
          //
          //   return Object.keys(a).every(i => {
          //     return typeof (a[i]) === typeof (b[i]) && (() => {
          //       if (typeof (a[i]) === 'object' && a[i] != null) {
          //         return isEqual(a[i], b[i])
          //       } else {
          //         return a[i] === b[i]
          //       }
          //     })()
          //   })
          // }
          options.series[0].data=arr
          // store.dispatch('corp/SaveStaffDistribution', arr)
          // if (!isEqual(arr, toRaw(store.state.corp.StaffDistribution))) {
          //   console.log('update!')
          //   store.dispatch('corp/SaveStaffDistribution', arr)
          //   location.reload()
          // }
        })
        .catch(error => {
          hideLoading()
          // router.push('/404')
        })
        .finally(() => {
          hideLoading()
        })

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
  display: flex;
  padding: 20px 20px 10px;
  margin: 20px auto 0;
}
</style>