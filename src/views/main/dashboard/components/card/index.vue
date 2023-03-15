<template>
  <div class="card-list">
    <Row v-for="row in list" :key="row.id" :row="row" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Row from './row.vue'
export default defineComponent({
  components: {
    Row
  },
  setup() {
    const list = [
      { id: 1, name: '我的部门', data: '是啥捏', color: '#4e73df', icon: 'sfont system-yonghu' },
      { id: 2, name: '今日', data: '0', color: '#1cc88a', icon: 'sfont system-xiaoxi' },
      { id: 3, name: '部门新员工待审批', data: '0', color: '#36b9cc', icon: 'sfont system-shuliang_mianxing' },
      { id: 4, name: '考勤申述待审批', data: '0', color: '#f6c23e', icon: 'sfont system-jindutiaoshouyidaozhang' }
    ]

    return {
      list
    }
  }
})
</script>

<style lang="scss" scoped>
  .card-list {
    width: calc(100% + 20px);
    margin-left: -10px;
    display: flex;
    flex-wrap: wrap;
  }
</style>