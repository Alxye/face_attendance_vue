<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="公司名称：" prop="name">
        {{form.userId}}
      </el-form-item>
      <el-form-item label="原密码：" prop="old">
        <el-input v-model="form.old" placeholder="请输入原密码" show-password></el-input>
      </el-form-item>
			<el-form-item label="新密码：" prop="new">
			  <el-input v-model="form.new" placeholder="请输入新密码" show-password></el-input>
			</el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type { LayerType } from '@/components/layer/index.vue'
import type { Ref } from 'vue'
import type { ElFormItemContext } from 'element-plus/lib/el-form/src/token'
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { passwordChange } from '@/api/user'
import Layer from '@/components/layer/index.vue'
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
    const ruleForm: Ref<ElFormItemContext|null> = ref(null)
    const layerDom: Ref<LayerType|null> = ref(null)
    const store = useStore()
    let form = ref({
      userId: store.state.user.info.staff_id,
      name: store.state.user.info.name,
      old: '',
      new: ''
    })
    const rules = {
      old: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
      new: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    }
    function submit() {
      if (ruleForm.value) {
        ruleForm.value.validate((valid) => {
          if (valid) {
            let params = {
              staff_id: form.value.userId,
              old: form.value.old,
              new: form.value.new
            }
            console.log(params)
            passwordChange(params)
            .then(res => {
              ElMessage({
                type: 'success',
                message: '密码修改成功，即将跳转到登录页面'
              })
              layerDom.value && layerDom.value.close()
              setTimeout(() => {
                store.dispatch('user/loginOut')
              }, 2000)
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
      layerDom,
      ruleForm,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>