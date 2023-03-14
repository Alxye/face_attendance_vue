<template>
  <el-row :gutter="20">
    <el-col :lg="14" :md="24">
      <el-card class="box-card">
        <template #header>
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
        <div class="box" v-bind="form">
          <div class="item">
            <h4>公司名</h4>
            <p>{{ form.corp_name }}</p>
          </div>
          <div class="item">
            <h4>公司地址</h4>
            <p>{{ form.corp_address }}</p>
          </div>
          <div class="item">
            <h4>公司员工数目</h4>
            <p>{{ form.staff_total }}</p>
          </div>
          <div class="item">
            <h4>公司公告</h4>
            <p style="text-align: left">{{ form.corp_notice }}</p>
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

  <CorpInfoChangeLayer :layer="layer" v-if="layer.show"/>

</template>

<script lang="ts">
import {defineComponent, reactive,ref} from 'vue'
import Row from "@/views/main/dashboard/components/card/row.vue";
import CorpInfoChangeLayer from './CorpInfoChange.vue'
import StaffCircleChart from './StaffCircleChart.vue'
import {getCorpData} from "@/api/corporation";
import {useStore} from "vuex";
import router from "@/router";

export default defineComponent({
  components: {
    StaffCircleChart,
    Row,
    CorpInfoChangeLayer
  },
  setup() {
    const store = useStore()
    const loading = ref(true)
    const form = reactive({
      corp_name: '',
      corp_address: '',
      staff_total: '0',
      corp_notice: '',
    })
    const layer = reactive({
      width: "30%",
      show: false,
      showButton: true
    })
    const ChangeCorpInfo = () => {
      layer.show = true
    }
    // 获取公司信息
    const getCorpInfoOp = (init: boolean) => {
      loading.value = true
      getCorpData()
      .then(res => {
        form.corp_name=res.data.name
        form.corp_address=res.data.address
        form.corp_notice=res.data.notice
        let params = {
          name:form.corp_name,
          address:form.corp_address,
          notice:form.corp_notice
        }
        console.log(params)
        store.dispatch('corp/SaveInfo',params)
        console.log(store.state.corp.info)
      })
      .catch(error => {
        router.push('/404')
      })
      .finally(() => {
        loading.value = false
      })
    }
    getCorpInfoOp(true)
    return {
      layer,
      ChangeCorpInfo,
      form
    }
  }
})
</script>

<style lang="scss" scoped>
.chart-card {
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
  align-items: center;

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