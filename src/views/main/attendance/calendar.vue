<template>
  <el-calendar>
    <template #dateCell="{ data }">
      <div @click="ss(data.day)">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      </p>
    </div>
    </template>
  </el-calendar>
</template>
<script lang="ts">
import type { LayerType } from "@/components/layer/index.vue";
import { defineComponent, ref } from "vue";
import { add, update } from "@/api/attendance";
import { selectData, typeData ,signData} from "./enum";
import Layer from "@/components/layer/index.vue";
export default defineComponent({
  setup(props, ctx) {
  },
  methods: {
    ss(q:any) {
      console.log(q);
      this.$router.push({
 path: '/attendance/manage',
 query: {
  date:q
 }
})
    }
    // 新增提交事件
    
}});
</script>
<style>
.is-selected {
  color: #1989aa;
}
</style>
