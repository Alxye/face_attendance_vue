<template>
  <div class="box">
    <corp-info />
    <Card />
    <Charts />
    <Communication />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import basicTemplate from './components/CorpInfo.vue'
import Communication from './components/communication.vue'
import Card from './components/card/index.vue'
import Charts from './components/charts/index.vue'
import CorpInfo from "@/views/main/dashboard/components/CorpInfo.vue";
export default defineComponent({
  components: {
    CorpInfo,
    Card,
    Charts,
    basicTemplate,
    Communication,
  }
})
</script>

<style lang="scss" scoped>
  .box {
    padding: 0 15px 15px 15px;
  }
</style>