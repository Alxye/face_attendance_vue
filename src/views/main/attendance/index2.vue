<template>
<!--  <div class="layout-container" v-loading="loading">-->
<!--    <div ref="dom" class="chart"></div>-->
<!--  </div>-->
  <div class="layout-container">
    <div class="time-selector">
        <el-date-picker
        v-model="select_month"
        popper-class="pickTime"
        type="month"
        format="YYYY-MM"
        value-format="YYYY-MM"
        placeholder="选择月度"
        @change="handelChangeMonth"
        size="10px"
        >
        </el-date-picker>
      </div>
    <Chart :option="option_bar"  class="box"/>
  </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import {defineComponent, onMounted, reactive, ref} from "vue";
import { useEventListener } from "@vueuse/core"; //引入监听函数，监听在vue实例中可自动销毁，无须手动销毁
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { getCheckout } from "@/api/attendance";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { onBeforeMount } from "vue";
import Chart from '@/components/charts/index.vue'
import option from './modules/bar2'
// 引入options配置
import options from "./options/line2";
import moment from "moment-timezone";
export default defineComponent({
  components:{
    Chart
  },
  setup() {
    // const select_month = ref('2023-03')
    const select_month = ref(moment().format('YYYY-MM'))

    const option_bar = reactive(option)

    // const loading = ref(true);
    // const dom: Ref<HTMLDivElement> = ref(null) as any;
    // let myEchart: echarts.ECharts | null = null;
    const getdata = () => {
      let params = {
        did: localStorage.getItem("did"),
        select_month:select_month.value
      };
      getCheckout(params)
        .then((res) => {
          console.log(res);
          // options.series[0].data = res.data[0];
          // options.series[1].data = res.data[1];
          // options.series[2].data = res.data[2];
          option_bar.series[0].data = res.data[1] // 1 未签
          option_bar.series[1].data = res.data[0] // 0 签到
          option_bar.series[2].data = res.data[2] // 2 早退
          // var xdata = [];
          // for (var i = 1; i < 31; i++) {
          //   xdata.push(i.toString());
          // }
          // options.xAxis[0].data = xdata;
          // console.log(options.xAxis[0].data);
          console.log(option_bar.series);
          // echarts.use([
          //   TitleComponent,
          //   TooltipComponent,
          //   GridComponent,
          //   LineChart,
          //   ToolboxComponent,
          //   LegendComponent,
          //   CanvasRenderer,
          // ]);
          // myEchart = echarts.init(dom.value);
          // myEchart.setOption(options);
          // useEventListener("resize", () => myEchart!.resize());
        })
        .catch((error) => {
          console.log("获取图表数据出错");
        })
        .finally(() => {
          // loading.value = false;
        });
    };
    onBeforeMount(() => {
      getdata();
      console.log("DOM即将挂载");
    });
    const handelChangeMonth = () =>{
      // getdata()
      console.log(select_month)
      console.log(select_month.value)
      getdata();
    }
    onMounted(() => {});
    return {
      // dom,
      getdata,
      // loading,
      option_bar,
      handelChangeMonth,
      select_month
    };
  },
});
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
.box {
    margin: 10px auto 0;
    width: calc(100% - 40px);
    background: var(--system-page-background);
    padding: 20px;
    overflow: hidden;
  }

  .time-selector {
    text-align: left;
    justify-content: left;
    background: var(--system-page-background);
    margin-top: 20px;
    margin-left: 40px;
  }
</style>