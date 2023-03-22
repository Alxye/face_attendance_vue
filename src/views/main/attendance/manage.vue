<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
        <el-button @click="excel">导出</el-button>
        <el-button type="primary" :icon="Plus" @click="handleAdd">{{
          $t("message.common.add")
        }}</el-button>
        <el-popconfirm
          :title="$t('message.common.delTip')"
          @confirm="handleDel(chooseData)"
        >
          <template #reference>
            <el-button
              type="danger"
              :icon="Delete"
              :disabled="chooseData.length === 0"
              >{{ $t("message.common.delBat") }}</el-button
            >
          </template>
        </el-popconfirm>
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
        :showIndex="false"
        :showSelection="true"
        :data="tableData"
        @getTableData="getTableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="staff_id" label="工号" align="center" />
        <el-table-column
          prop="date"
          label="日期"
          :sortable="true"
          :sort-method="sortByDate"
          align="center"
        />
        <el-table-column
          prop="am_type"
          label="签到"
          align="center"
          :formatter="changeType_am"
        />
        <el-table-column prop="clock_in_time" label="上班时间" align="center" />
        <el-table-column
          prop="pm_type"
          label="签退"
          align="center"
          :formatter="changeType_pm"
        />
        <el-table-column
          prop="clock_out_time"
          label="下班时间"
          align="center"
        />
        <!-- <el-table-column prop="salary" label="日期" align="center" /> -->

        <el-table-column
          :label="$t('message.common.handle')"
          align="center"
          fixed="right"
          width="200"
        >
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">{{
              $t("message.common.update")
            }}</el-button>
            <el-popconfirm
              :title="$t('message.common.delTip')"
              @confirm="handleDel([scope.row])"
            >
              <template #reference>
                <el-button type="danger">{{
                  $t("message.common.del")
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
import { getData, del, getExcel } from "@/api/attendance";
import Layer from "./layer.vue";
import { ElMessage } from "element-plus";
import type { LayerInterface } from "@/components/layer/index.vue";
import { selectData, radioData, typeData } from "./enum";
import { Plus, Search, Delete } from "@element-plus/icons";
import { useRoute } from "vue-router";
// 2 获取实例

export default defineComponent({
  name: "crudTable",
  filter: {},

  components: {
    Table,
    Layer,
  },

  setup() {
    const route = useRoute();
    // 3 解构赋值
    const {
      query: { date },
    } = route;
    const init = () => {
      if (date) {
        console.log(date);
      }
    };
    const changeType_am = (row: any) => {
      return row.am_type == 0 ? "未签" : row.am_type == 1 ? "已签" : "迟到";
    };
    const changeType_pm = (row: any) => {
      return row.pm_type == 0 ? "未签" : row.pm_type == 1 ? "已签" : "早退";
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
    const sortByDate = (obj1: any, obj2: any) => {
      let val1 = obj1.date;
      let val2 = obj2.date;
      return val1 - val2;
    };
    const sortByAmtype = (obj1: any, obj2: any) => {
      let val1 = obj1.am_type;
      let val2 = obj2.am_type;
      return val1 - val2;
    };
    const excel = () => {
      
      let params = {
        did:localStorage.getItem('did'),
        date:date
      };
      if(date==null)
      {
        params = {
        did:localStorage.getItem('did'),
        date:""
      };
      }
      getExcel(params)
        .then((res) => {
          const filename = res.headers["content-disposition"]
            .split("filename=")[1]
            .split("; filename")[0];
          const url = window.URL.createObjectURL(res.data);
          const link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "导出" + filename);
          document.body.appendChild(link);
          link.click();
        })
        .catch(function (error) {
          console.log(error);
        });
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
        date: date,
        did:localStorage.getItem('did')
      };
      if (date == null) {
        params = {
          page: page.index,
          pageSize: page.size,
          ...query,
          date: "",
          did:localStorage.getItem('did')
        };
      }
      getData(params)
        .then((res) => {
          console.log(res);
          let data = res.data;
          // if (Array.isArray(data)) {
          //   data.forEach((d) => {
          //     const select = selectData.find(
          //       (select) => select.value === d.choose
          //     );
          //     select
          //       ? (d.chooseName = select.label)
          //       : (d.chooseName = d.choose);
          //     const radio = radioData.find(
          //       (select) => select.value === d.radio
          //     );
          //     radio ? (d.radioName = radio.label) : d.radio;
          //   });
          // }

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
        staff_id: data[0].staff_id,
        date:data[0].date
      };
      del(params).then((res) => {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        getTableData(tableData.value.length === 1 ? true : false);
      });
    };
    // 新增弹窗功能
    const handleAdd = () => {
      layer.title = "新增数据";
      layer.show = true;
      delete layer.row;
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
      handleAdd,
      handleEdit,
      handleDel,
      getTableData,
      changeType_am,
      changeType_pm,
      excel,
      sortByDate,
      sortByAmtype,
    };
  },
});
</script>

<style lang="scss" scoped></style>
