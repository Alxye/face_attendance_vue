<template>
  <div class="layout-container" v-loading="loading">
    <div ref="dom" class="chart"></div>
  </div>
</template>

<script lang="ts">
import type { Ref } from "vue";
import { defineComponent, onMounted, ref } from "vue";
import { useEventListener } from "@vueuse/core"; //引入监听函数，监听在vue实例中可自动销毁，无须手动销毁
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { getCheckin,getCheckin0,getCheckin2,getCheckout } from "@/api/attendance";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";

import { onBeforeMount } from "vue";
// 引入options配置
import options from "./options/line";
export default defineComponent({
  setup() {
    const loading = ref(true);
    const dom: Ref<HTMLDivElement> = ref(null) as any;
    let myEchart: echarts.ECharts | null = null;
    const getdata = () => {
      let params = {
        did: localStorage.getItem("did"),
      };
      getCheckin2(params)
        .then((res) => {
          console.log(res);
          options.series[2].data = res.data
          var xdata=[]
          for(var i=1;i<31;i++)
          {
            xdata.push(i.toString())
          }
          options.xAxis[0].data=xdata
          console.log(options.xAxis[0].data);
          echarts.use([
            TitleComponent,
            TooltipComponent,
            GridComponent,
            LineChart,
            ToolboxComponent,
            LegendComponent,
            CanvasRenderer,
          ]);
          myEchart = echarts.init(dom.value);

          myEchart.setOption(options);
          useEventListener("resize", () => myEchart!.resize());
        })
        .catch((error) => {
          console.log("获取图表数据出错");
        })
        .finally(() => {
          loading.value = false;
        });
      getCheckin0(params)
        .then((res) => {
          console.log(res);
          options.series[1].data = res.data
          var xdata=[]
          for(var i=1;i<31;i++)
          {
            xdata.push(i.toString())
          }
          options.xAxis[0].data=xdata
          console.log(options.xAxis[0].data);
          echarts.use([
            TitleComponent,
            TooltipComponent,
            GridComponent,
            LineChart,
            ToolboxComponent,
            LegendComponent,
            CanvasRenderer,
          ]);
          myEchart = echarts.init(dom.value);

          myEchart.setOption(options);
          useEventListener("resize", () => myEchart!.resize());
        })
        .catch((error) => {
          console.log("获取图表数据出错");
        })
        .finally(() => {
          loading.value = false;
        });
      getCheckin(params)
        .then((res) => {
          console.log(res);
          options.series[0].data = res.data
          var xdata=[]
          for(var i=1;i<31;i++)
          {
            xdata.push(i.toString())
          }
          options.xAxis[0].data=xdata
          console.log(options.xAxis[0].data);
          echarts.use([
            TitleComponent,
            TooltipComponent,
            GridComponent,
            LineChart,
            ToolboxComponent,
            LegendComponent,
            CanvasRenderer,
          ]);
          myEchart = echarts.init(dom.value);

          myEchart.setOption(options);
          useEventListener("resize", () => myEchart!.resize());
        })
        .catch((error) => {
          console.log("获取图表数据出错");
        })
        .finally(() => {
          loading.value = false;
        });
        
        
    };
    onBeforeMount(() => {
      getdata();
      console.log("DOM即将挂载");
    });

    onMounted(() => {});
    return {
      dom,
      getdata,
      loading,
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
</style>
