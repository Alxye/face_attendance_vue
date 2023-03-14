<template>
  <el-row :gutter="20">
    <el-col :lg="14" :md="24">
      <el-card class="box-card">
        <template #header v-model="form">
          <div class="card">
            <div class="card-left">
              <span>公司信息</span>
            </div>
            <div class="card-right">
              <el-icon style="font-size: 20px;cursor: pointer;" color="grey" @click="ChangeCorpInfo">
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
            <p>???</p>
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

    <el-col :lg="10" :md="24">
      <el-card class="chart-card">
        <StaffCircleChart/>
      </el-card>
    </el-col>
  </el-row>

  <CorpInfoLayer :layer="layer" v-if="layer.show"/>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue'
import Row from "@/views/main/dashboard/components/card/row.vue";
import CorpInfoLayer from './CorpInfo.vue'
import StaffCircleChart from './StaffCircleChart.vue'
import {useStore} from "vuex";

export default defineComponent({
  components: {
    StaffCircleChart,
    Row,
    CorpInfoLayer
  },
  setup() {
    const store = useStore()
    const form = reactive({
      corr_name: '',
      corp_address:'',
      staff_total: '0',
      corp_notice: '',
    })
    const layer = reactive({
      width:"30%"
      show: false,
      showButton: true
    })
    const ChangeCorpInfo = () => {
      layer.show = true
    }
    return {
      layer,
      ChangeCorpInfo,
      form
    }
  }
})
</script>

<style lang="scss" scoped>
.chart-card{
  margin: 20px auto 0;
  height: 356px;
}
.box-card {
  margin: 20px auto 0;
  height: 356px;
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
  width: 100%;
  align-items:center;
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