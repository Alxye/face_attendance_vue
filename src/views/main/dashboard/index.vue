<template>
  <div class="box">
    <CorpInfo />
    <Card />
    <Charts />
    <Communication />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CorpInfo from './components/CorpInfo.vue'
import Communication from './components/communication.vue'
import Card from './components/card/index.vue'
import Charts from './components/charts/index.vue'
import {hideLoading, showLoading} from "@/utils/system/loading";
import {getStaffDistribution} from "@/api/corporation";
import router from "@/router";
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    Card,
    Charts,
    CorpInfo,
    Communication,
  }
})
</script>

<style lang="scss" scoped>
  .box {
    padding: 0 15px 15px 15px;
  }
</style>