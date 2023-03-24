<template>
  <el-button @click="excel"></el-button>
</template>
<script lang="ts">
import type { LayerType } from "@/components/layer/index.vue";
import { defineComponent, ref } from "vue";
import { add, update, getExcel } from "@/api/attendance";
import { selectData, typeData, signData } from "./enum";
import Layer from "@/components/layer/index.vue";
export default defineComponent({
  setup(props, ctx) {},
  methods: {
    excel(q: any) {
      let params = {
        did: "",
      };
      getExcel(params)
        .then(res=>{
          const filename = res.headers["content-disposition"]
            .split("filename=")[1]
            .split("; filename")[0];
          const url = window.URL.createObjectURL(res.data);
          const link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "导出" + filename);
          document.body.appendChild(link);
          link.click();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 新增提交事件
  },
});
</script>
<style>
.is-selected {
  color: #1989aa;
}
</style>