<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="新部门名称：" prop="name">
        <el-input v-model="form.name" placeholder="请输入新部门名称"></el-input>
      </el-form-item>
      <el-form-item label="新部门公告：" prop="notice">
        <el-input v-model="form.notice" placeholder="请输入新部门公告" type="textarea"></el-input>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type {LayerType} from '@/components/layer/index.vue'
import type { FormInstance } from 'element-plus'
import type {Ref} from 'vue'
import {defineComponent, reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {useStore} from 'vuex'
import {addDepartment} from '@/api/department'
import Layer from '@/components/layer/index.vue'
import {passwordChange} from "@/api/user";

export default defineComponent({
  components: {
    Layer
  },
  props: {
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
    const ruleForm: Ref<FormInstance|null> = ref(null)
    const rules = {
      name: [{ required: true, message: '请输入新部门名称', trigger: 'blur' }],
    }
    const layerDom: Ref<LayerType | null> = ref(null)
    const store = useStore()
    const info = store.state.corp.info
    let form = ref({
      name: '',
      notice: ''
    })
    function submit() {
      if (ruleForm.value) {
        ruleForm.value.validate((valid: any) => {
          if (valid) {
            let params = {
              department_name: form.value.name,
              notice: form.value.notice
            }
            addDepartment(params)
            .then((res: any) => {
              ElMessage({
                type: 'success',
                message: '部门新增成功！'
              })
              layerDom.value && layerDom.value.close()
              location.reload()
            })
          } else {
            return false;
          }
        });
      }
    }

    return {
      form,
      rules,
      ruleForm,
      layerDom,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
