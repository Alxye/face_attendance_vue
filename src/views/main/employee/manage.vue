<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
        <el-button type="primary" :icon="Plus" @click="handleAdd">{{
          $t("message.common.add")
        }}</el-button>
<!--        <el-popconfirm-->
<!--          :title="$t('message.common.delTip')"-->
<!--          @confirm="handleDel(chooseData)"-->
<!--        >-->
<!--          <template #reference>-->
<!--            <el-button-->
<!--              type="danger"-->
<!--              :icon="Delete"-->
<!--              :disabled="chooseData.length === 0"-->
<!--              >{{ $t("message.common.delBat") }}</el-button-->
<!--            >-->
<!--          </template>-->
<!--        </el-popconfirm>-->
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
        <el-table-column prop="staff_id" label="工号" align="center" />
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column prop="age" label="年龄" align="center" />
<!--        <el-table-column prop="department_id" label="部门" align="center" />-->
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          :formatter="changeType"
        />
        <!-- <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            {{  }}
          </template>
          </el-table-column>  -->

        <!-- <el-table-column prop="chooseName" label="选择器" align="center" />
        <el-table-column prop="radioName" label="单选框" align="center" /> -->
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
import { getData, del } from "@/api/staff";
import Layer from "./layer.vue";
import { ElMessage } from "element-plus";
import type { LayerInterface } from "@/components/layer/index.vue";
import { selectData, radioData, typeData } from "./enum";
import { Plus, Search, Delete } from "@element-plus/icons";
export default defineComponent({
  name: "crudTable",
  filter: {},
  components: {
    Table,
    Layer,
  },
  setup() {
    const changeType = (row: any)=>{
      return row.type == 0 ? "待审核" : row.type == 1 ? "员工" : "管理员";
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
        did:localStorage.getItem('did')
      };
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
    //查找部门
    var data2 = localStorage.getItem('did');
        console.log(data2);
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
      changeType,
    };
  },
});
</script>

<style lang="scss" scoped></style>
