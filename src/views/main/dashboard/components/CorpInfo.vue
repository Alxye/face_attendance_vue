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
            <h4>公司名:</h4>
            <p>{{ form.corp_name}}</p>
          </div>
          <div class="item">
            <h4>公司地址:</h4>
            <p>{{ form.corp_address}}</p>
          </div>
          <div class="item">
            <h4>公司员工数目:</h4>
            <p>{{form.staff_total}}</p>
          </div>
          <div class="item">
            <h4>公司公告:</h4>
            <p>{{form.corp_notice}}</p>
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
import {defineComponent,ref, reactive} from 'vue'
import Row from "@/views/main/dashboard/components/card/row.vue";
import CorpInfoLayer from './CorpInfoChange.vue'
import StaffCircleChart from './StaffCircleChart.vue'
import {useStore} from "vuex";
import {getCorpData} from "@/api/corporation";
import {radioData, selectData} from "@/views/main/pages/crudTable/enum";
import {TRUE} from "sass";

export default defineComponent({
  components: {
    StaffCircleChart,
    Row,
    CorpInfoLayer
  },
  setup() {
    const store = useStore()
    const form = reactive({
      corp_name: '',
      corp_address:'',
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
    const loading = ref(true)
    // 存储公司信息数据
    const CorpData = ref([])
    // 获取公司信息数据
    const getCorpOp = (init: boolean) => {
      loading.value = true
      getCorpData()
      .then(res => {
        let data = res.data.list
        console.log(res)
        if (Array.isArray(data)) {
          data.forEach(d => {
            const select = selectData.find(select => select.value === d.choose)
            select ? d.chooseName = select.label : d.chooseName = d.choose
            const radio = radioData.find(select => select.value === d.radio)
            radio ? d.radioName = radio.label : d.radio
          })
        }
        CorpData.value = res.data.list
        // page.total = Number(res.data.pager.total)
      })
      .catch(error => {
        CorpData.value = []
      })
      .finally(() => {
        loading.value = false
      })
    }
    getCorpOp(true)
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