<template>
  <div class="box">
    <Chart :option="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Chart from '@/components/charts/index.vue'
import option from './circle'
export default defineComponent({
  components: {
    Chart
  },
  setup() {
    const options = reactive(option)
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