<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
      </div>
      <div class="layout-container-form-search">
        <el-input
          v-model="query.input"
          :placeholder="$t('message.common.searchID')"
          @change="getTableData(true)"
        ></el-input>
        <el-button
          type="primary"
          :icon="Search"
          class="search-btn"
          @click="getTableData(true)"
          >{{ $t("message.common.search") }}</el-button
        >
      </div>
    </div>
    <div class="layout-container-table">
      <Table
        ref="table"
        v-model:page="page"
        v-loading="loading"
        :data="tableData"
        @getTableData="getTableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="申述编号" align="center" />
        <el-table-column prop="staff_id" label="工号" align="center" />
        <el-table-column prop="date" label="日期" align="center" />
        <el-table-column prop="time_state" label="时间" align="center" :formatter="changeState" />
        <el-table-column prop="category" label="类型" align="center" :formatter="changeCategory" />
        <el-table-column prop="appeal_reason" label="申诉理由" align="center" />
        <el-table-column prop="state" label="申诉状态" align="center" :formatter="changeType"/>
        <el-table-column prop="reject_reason" label="驳回理由" align="center" />
        <!-- <el-table-column prop="chooseName" label="选择器" align="center" />
          <el-table-column prop="radioName" label="单选框" align="center" /> -->
        <el-table-column
          :label="$t('message.common.handle')"
          align="center"
          fixed="right"
          width="200"
        >
          <template #default="scope">
            <el-popconfirm
              :title="$t('message.common.allowTip')"
              @confirm="handleAllow([scope.row])"
            >
            <template #reference>
                <el-button>{{
                  $t("message.common.allow")
                }}</el-button>
              </template>
          </el-popconfirm>
            <el-popconfirm
              :title="$t('message.common.rejTip')"
              @confirm="handleEdit(scope.row)"
            >
              <template #reference>
                <el-button type="danger">{{
                  $t("message.common.reject")
                }}</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </Table>
      <Layer :layer="layer" @getTableData="getTableData" v-if="layer.show" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import Table from "@/components/table/index.vue";
import { Page } from "@/components/table/type";
import { getData, del } from "@/api/appeal";
import Layer from "./layer.vue";
import { ElMessage } from "element-plus";
import type { LayerInterface } from "@/components/layer/index.vue";
import { selectData, radioData, typeData } from "./enum";
import { Plus, Search, Delete } from "@element-plus/icons";
import { add, update } from "@/api/appeal";
export default defineComponent({
  name: "crudTable",
  components: {
    Table,
    Layer,
  },
  setup() {
    const changeCategory= (row: any)=>{
      return row.time_state == 0 ? "打卡失败" : "考勤补卡";
    };
    const changeState= (row: any)=>{
      return row.time_state == 0 ? "上班" : "下班";
    };
    const changeType = (row: any)=>{
      return row.state == 0 ? "待审核" : row.state == 1 ? "同意" : "驳回";
    };
    // 存储搜索用的数据
    const query = reactive({
      input: "",
    });
    // 弹窗控制器
    const layer: LayerInterface = reactive({
      show: false,
      title: "新增",
      showButton: true,
    });
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 10,
      total: 0,
    });
    const loading = ref(true);
    const tableData = ref([]);
    const chooseData = ref([]);
    const handleSelectionChange = (val: []) => {
      chooseData.value = val;
    };
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init: boolean) => {
      loading.value = true;
      if (init) {
        page.index = 1;
      }
      let params = {
        page: page.index,
        pageSize: page.size,
        ...query,
        did:localStorage.getItem('did'),
      };
      getData(params)
        .then((res) => {
          console.log(res);
          let data = res.data;
          if (Array.isArray(data)) {
            data.forEach((d) => {
              const select = selectData.find(
                (select) => select.value === d.choose
              );
              select
                ? (d.chooseName = select.label)
                : (d.chooseName = d.choose);
              const radio = radioData.find(
                (select) => select.value === d.radio
              );
              radio ? (d.radioName = radio.label) : d.radio;
            });
          }
          tableData.value = res.data;
          page.total = Number(res.total);
        })
        .catch((error) => {
          console.log("获取表格数据出错");
          tableData.value = [];
          page.index = 1;
          page.total = 0;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    // 删除功能
    const handleDel = (data: any) => {
      console.log(data[0].staff_id);
      let params = {
        id: data[0].id,
      };
      del(params).then((res) => {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        getTableData(tableData.value.length === 1 ? true : false);
      });
    };
    //驳回
    const handleAllow = (data: any) => {
      console.log(data[0].id);
      console.log(data[0]);
      let params = {
        id: data[0].id,
        reject_reason:"",
        staff_id:data[0].staff_id,
        category:data[0].category,
        date:data[0].date,
        time_state:data[0].time_state,
      };
      update(params).then((res) => {
        ElMessage({
          type: "success",
          message: "操作成功",
        });
        getTableData(tableData.value.length === 1 ? true : false);
      });
    };
    // 编辑弹窗功能
    const handleEdit = (row: object) => {
      layer.title = "编辑数据";
      layer.row = row;
      layer.show = true;
    };
    getTableData(true);
    return {
      Plus,
      Search,
      Delete,
      query,
      tableData,
      chooseData,
      loading,
      page,
      layer,
      handleSelectionChange,
      // handleAdd,
      handleEdit,
      handleDel,
      getTableData,
      changeType,
      changeState,
      changeCategory,
      handleAllow,
    };
  },
});
</script>

<style lang="scss" scoped></style>
