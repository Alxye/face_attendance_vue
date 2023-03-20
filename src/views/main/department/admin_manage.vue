<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
        <el-button type="primary" :icon="Plus" @click="handleAdd">{{ $t('message.common.add') }}</el-button>
<!--        <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel(chooseData)">-->
<!--          <template #reference>-->
<!--            <el-button type="danger" :icon="Delete" :disabled="chooseData.length === 0">{{ $t('message.common.delBat') }}</el-button>-->
<!--          </template>-->
<!--        </el-popconfirm>-->
      </div>
<!--      <div class="layout-container-form-search">-->
<!--        <el-input v-model="query.input" :placeholder="$t('message.common.searchTip')" @change="getTableData(true)"></el-input>-->
<!--        <el-button type="primary" :icon="Search" class="search-btn" @click="getTableData(true)">{{ $t('message.common.search') }}</el-button>-->
<!--      </div>-->
    </div>
    <div class="layout-container-table">
      <Table
        ref="table"
        v-model:page="page"
        v-loading="loading"
        :showIndex="true"
        :showSelection="true"
        :data="tableData"
        @getTableData="getTableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="staff_id" label="工号" align="center" />
        <el-table-column prop="type_name" label="类型" align="center" />
        <el-table-column prop="department_name" label="部门所属" align="center" />
<!--        <el-table-column prop="radioName" label="单选框" align="center" />-->
        <el-table-column :label="$t('message.common.handle')" align="center" fixed="right" width="200">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">{{ $t('message.common.update') }}</el-button>
            <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel([scope.row])">
              <template #reference>
                <el-button type="danger">{{ $t('message.common.del') }}</el-button>
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
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/admin_table/index.vue'
import { Page } from '@/components/admin_table/type'
import { getAdminData, delAdmin, } from '@/api/corporation'
import { deleteAdmin } from '@/api/user'
import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
import type { LayerInterface } from '@/components/layer/index.vue'
// import { selectData, radioData } from './enum'
import { Plus, Search, Delete } from '@element-plus/icons'
import {useStore} from "vuex";
export default defineComponent({
  name: 'crudTable',
  components: {
    Table,
    Layer
  },
  setup() {
    const store = useStore()
    // 存储搜索用的数据
    const query = reactive({
      input: ''
    })
    // 弹窗控制器
    const layer: LayerInterface = reactive({
      show: false,
      title: '新增',
      showButton: true
    })
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 20,
      total: 0
    })
    const loading = ref(true)
    const tableData = ref([])
    const chooseData = ref([])
    const handleSelectionChange = (val: []) => {
      chooseData.value = val
    }
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        page: page.index,
        pageSize: page.size,
        ...query
      }
      getAdminData()
      .then(res => {
        let data = res.data.list
        let arr = [];
            for (const key in res.data.list) {
              if (!res.data.list.hasOwnProperty(key)) {
                continue;
              }
              const item = res.data.list[key];
              arr.push(item);
            }
        // if (Array.isArray(data)) {
        //   data.forEach(d => {
        //     const select = selectData.find(select => select.value === d.choose)
        //     select ? d.chooseName = select.label : d.chooseName = d.choose
        //     const radio = radioData.find(select => select.value === d.radio)
        //     radio ? d.radioName = radio.label : d.radio
        //   })
        // }
        tableData.value = arr
        page.total = Number(res.data.pager.total)
      })
      .catch(error => {
        tableData.value = []
        page.index = 1
        page.total = 0
      })
      .finally(() => {
        loading.value = false
      })
    }
    // 删除功能
    const handleDel = (data: object[]) => {
      let params = {
        staff_id: data.map((e:any)=> {
          return e.staff_id
        }).join(',')
      }
      console.log(params)
      if(params.staff_id==store.state.user.info.staff_id){
        ElMessage({
          type: 'warning',
          message: '不可删除自己！'
        })
      }
      else{
        deleteAdmin(params)
      .then(res => {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        getTableData(tableData.value.length === 1 ? true : false)
      })
      }

    }
    // 新增弹窗功能
    const handleAdd = () => {

      layer.title = '新增管理员'
      layer.show = true
      delete layer.row
    }
    // 编辑弹窗功能
    const handleEdit = (row: object) => {
      if(layer.staff_id==store.state.user.info.staff_id){
        ElMessage({
          type: 'warning',
          message: '无权限！'
        })
      }
      else{
      // layer.staff_id=store.state.user.info.staff_id
      // console.log(store.state.user.info.staff_id, "3233")
      layer.title = '编辑管理员'
      layer.row = row
      layer.show = true
      }
    }
    getTableData(true)
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
      getTableData
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>