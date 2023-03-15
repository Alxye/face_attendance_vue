<template>
  <div class="layout-container">
    <h1 style="margin-top: 30px">部门信息管理</h1>
    <el-row :gutter="12">
      <el-col :span="12" class="el-col-tree-box">
        <h2>部门结构</h2>
        <div class="custom-tree">
          <el-tree
              :data="data"
              :props="defaultProps"
              :highlight-current="true"
              @node-click="handleNodeClick"
          >
            <template #default="{ data }">
              <div class="custom-tree-node">
<!--                <i :class="data.children ? 'el-icon-files': 'el-icon-document'"></i>-->
<!--                <span>{{ node.name }}</span>-->
                <span>{{ data.name }}</span>
              </div>
            </template>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="12" class="el-col-tree-box">
        <h2>部门信息</h2>
        <div class="custom-tree des" >
          <mange-info v-if="layer.show" :layer="layer" v-for="(row, key) in active.des" :dic="row" :key="key">{{ row }}</mange-info>
          <p v-if="!layer.show">点击左侧部门，可查看并管理到每个部门的信息</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue'
// import { data } from './dir'
import {getDepartmentInfo} from "@/api/department";
import {radioData, selectData} from "@/views/main/pages/categoryTable/enum";
import {hideLoading, showLoading} from "@/utils/system/loading";
import {getCorpData} from "@/api/corporation";
import router from "@/router";
import MangeInfo from "@/views/main/department/mangeInfo.vue";

export default defineComponent({
  components: {
    MangeInfo
  },
  setup() {
    // const defaultProps = {
    //   children: 'children',
    //   label: 'label'
    // }
    const layer = reactive({
      width: "30%",
      show: false,
      showButton: true
    })
    let active = ref({des: ['点击左侧部门信息，可查看并管理到每个部门的信息']}) as any

    const handleNodeClick = (row: object) => {
      layer.show=true
      active.value = row
      console.log(row);
    }
    let data = ref([
      {name:"dasff"}
    ])
    console.log(data)
    console.log(typeof (data))
    const getDepartmentInfoOp = (init: boolean) => {
      showLoading()
      getDepartmentInfo()
          .then(res => {
            console.log(res)
            let arr = [];
            for (const key in res.data) {
              if (!res.data.hasOwnProperty(key)) {
                continue;
              }
              const item = res.data[key];
              arr.push(item);
            }
            data.value=reactive(arr)
            console.log(data)
            console.log(typeof (data))
          })
          .catch(error => {
            hideLoading()
            // router.push('/404')
          })
          .finally(() => {
            hideLoading()
          })
    }

    getDepartmentInfoOp(true)


    return {
      data,
      // defaultProps,
      active,
      handleNodeClick,
      layer
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-container {
  padding: 15px;
  box-sizing: border-box;

  .el-row {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
  }

  .custom-tree {
    border: 1px solid #eee;
    padding: 15px;
    overflow-y: auto;
    flex: 1;

    .el-tree {
      width: 100%;
    }

    :deep(.el-tree-node__content) {
      height: 36px;
    }

    &.des {
      p {
        text-align: left;
        line-height: 29px;
        text-indent: 2em;
        margin-top: 0;
      }
    }
  }

  .custom-tree-node {
    i {
      margin-right: 10px;
    }
  }

  .el-col-tree-box {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}

h1 {
  margin: 0;
}

h2 {

}
</style>