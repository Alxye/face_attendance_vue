<template>
  <el-row :gutter="20">
    <el-col :lg="12" :md="24">
      <el-card class="box-card">
        <template #header>
          <div class="card">
            <div class="card-left">
              <span>公司信息</span>
            </div>
            <div class="card-right">
              <el-icon style="font-size: 20px" color="grey" @click="ChangeCorpInfo">
                <Setting/>
              </el-icon>
            </div>
          </div>
        </template>
        <div class="box">
          <div class="item">
            <h4>公司名</h4>
            <p>？？？</p>
          </div>
          <div class="item">
            <h4>公司地址</h4>
            <p>ts版本的基础模板，含国际化功能</p>
          </div>
          <div class="item">
            <h4>公司员工数目</h4>
            <p>js版本的基础模板，无国际化</p>
          </div>
          <div class="item">
            <h4>公司公告</h4>
            <p>js版本的基础模板，含国际化功能</p>
          </div>
        </div>
      </el-card>

    </el-col>

    <el-col :lg="12" :md="24">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>..</span>
            <!--        <el-link type="primary" href="http://www.github.com/cmdparkour/vue-admin-box-template" target="_blank" style="margin-left: 20px;"></el-link>-->
          </div>
        </template>
        <div class="box">

        </div>
      </el-card>
    </el-col>
  </el-row>


</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue'
import Row from "@/views/main/dashboard/components/card/row.vue";
import CorpInfoLayer from './CorpInfo.vue'

export default defineComponent({
  components: {Row},
  setup() {
    const layer = reactive({
      show: false,
      showButton: true
    })
    const showPasswordLayer = () => {
      layer.show = true
    }
  }
})
</script>

<style lang="scss" scoped>
.box-card {
  margin: 20px auto 0;

  .card-header {
    text-align: left;

  }

  .box {
    .item {
      display: flex;
      align-items: center;

      * {
        margin-right: 20px;
      }
    }
  }
}

.card {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;

  &-left {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
  }

  &-right {
    width: 10%;
    justify-content: right;
  }
}
</style>