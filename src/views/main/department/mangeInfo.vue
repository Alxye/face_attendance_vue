<template>
  <div @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin:20px;">
      <el-form-item label="部门名：" prop="name">
        <el-input v-model="form.name" placeholder="请输入部门名"></el-input>
      </el-form-item>
      <el-form-item label="部门公告：" prop="notice">
        <el-input v-model="form.notice" placeholder="请输入部门公告" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="部门人数：" prop="staff_count">
        <span>{{form.staff_count}} 人</span>
      </el-form-item>
    </el-form>
  </div>
  <div >
    <el-button style="width: 50%;padding: 20px" type="primary" @click="update">确认</el-button>
  </div>
  <div >
    <el-button style="width: 50%;margin-top:20px;padding: 20px" type="danger" @click="findDelete">删除</el-button>
  </div>
</template>

<script lang="ts">
import type {LayerType} from '@/components/layer/index.vue'
import type {Ref} from 'vue'
import type {ElFormItemContext} from 'element-plus/lib/el-form/src/token'
import {defineComponent, reactive, ref, watch} from 'vue'
import {ElMessage} from 'element-plus'
import {useStore} from 'vuex'
import {departmentUpdate} from '@/api/department'

// const props = defineProps({
//   dic: String
// })

export default defineComponent({
  // components: {
  //   Layer
  // },
  props: {
    dic: {
      type: Object,
      default: () => {
        return {
          name: '',
          notice: '',
          staff_count: 0,
          id:0
        }
      }
    },
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: '',
          showButton: true
        }
      }
    }
  },
  setup(props, ctx) {
    let data: any = reactive(props.dic)
    console.log(data)
    console.log(data.name)
    const ruleForm: Ref<ElFormItemContext | null> = ref(null)
    const layerDom: Ref<LayerType | null> = ref(null)
    const store = useStore()
    let form = reactive({
      id:data.id,
      name: data.name,
      notice: data.notice,
      staff_count:data.staff_count
    })
    watch(
        () => props.dic,
        (newValue, oldValue) => {
          // console.log("new:", newValue, 'old:', oldValue)
          form.id = newValue.id
          form.name = newValue.name
          form.notice = newValue.notice
          form.staff_count = newValue.staff_count
        }
    )
    const rules = {
      name: [{required: true, message: '请输入部门名', trigger: 'blur'}]
    }

    function update() {
      if (ruleForm.value) {
        ruleForm.value.validate((valid: any) => {
          if (valid) {
            if(form.name==data.name&&form.notice==data.notice){
              ElMessage({
                    type: 'warning',
                    message: '未作任何改变'
                  })
              return false;
            }
            else{
              let params = {
              id:form.id,
              name: form.name,
              notice: form.notice
            }
            departmentUpdate(params)
                .then(res => {
                  ElMessage({
                    type: 'success',
                    message: '更新成功'
                  })
                  // layerDom.value && layerDom.value.close()
                  location.reload()
                })
            }
          } else {
            return false;
          }
        });
      }
    }

    function findDelete() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmbuttontext: "确定",
        cancelbuttontext: "取消",
        type: "warning",
      }).then(() => {
          axios
            .delete("http://localhost:8913/api/papers/" + row.paperid)
            .then((res) => {
              this.$message.success("删除成功！");
              this.findall();
            })
            .catch((res) => {
              this.$message.console.error("删除失败！");
            });
        })
        .catch(() => {
          this.$message.info("已取消操作！");
        });
    },

    return {
      form,
      rules,
      layerDom,
      ruleForm,
      update
    }
  }
})
</script>

<style lang="scss" scoped>

</style>