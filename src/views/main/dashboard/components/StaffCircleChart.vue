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
import {useStore} from "vuex";

export default defineComponent({
  components: {
    Chart
  },
  setup() {

    const options = reactive(option)
    const store = useStore()

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
          const isEqual = (a, b) => {
              if (Object.keys(a).length !== Object.keys(b).length) {
                return false;
              }

              return Object.keys(a).every(i => {
                return typeof (a[i]) === typeof (b[i]) && (() => {
                  if (typeof (a[i]) === 'object' && a[i] != null) {
                    return isEqual(a[i], b[i])
                  } else {
                    return a[i] === b[i]
                  }
                })()
              })
            }
          // arr=toRaw(store.state.corp.StaffDistribution)
          if (!isEqual(arr, toRaw(store.state.corp.StaffDistribution))) {
            console.log('update!')
            store.dispatch('corp/SaveStaffDistribution', arr)
            location.reload()
          }
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