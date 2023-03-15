<template>
  <div  @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin:20px;">
      <el-form-item label="管理员工号：" prop="name">
        {{test[0].msg}}
      </el-form-item>
      <el-form-item label="原密码：" prop="old">
        <el-input v-model="form.old" placeholder="请输入原密码" show-password></el-input>
      </el-form-item>
			<el-form-item label="新密码：" prop="new">
			  <el-input v-model="form.new" placeholder="请输入新密码" show-password></el-input>
			</el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import type { LayerType } from '@/components/layer/index.vue'
import type { Ref } from 'vue'
import type { ElFormItemContext } from 'element-plus/lib/el-form/src/token'
import {defineComponent, reactive, ref, watch} from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { passwordChange } from '@/api/user'
import Layer from '@/components/layer/index.vue'

// const props = defineProps({
//   dic: String
// })

export default defineComponent({
  components: {
    Layer
  },
  props: {
    dic: String,
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
    let xxx: any = ref(props.dic)
    const ruleForm: Ref<ElFormItemContext|null> = ref(null)
    const layerDom: Ref<LayerType|null> = ref(null)
    const store = useStore()
    let form = ref({
      userId: store.state.user.info.staff_id,
      name: store.state.user.info.name,
      old: '',
      new: ''
    })
    // const test=reactive([
    //   {id:1,msg:"???"}
    // ])
    const test=reactive([
      {id:1,msg:"???"}
    ])
    watch(
      () => props.dic,
      (newValue, oldValue) => {

        console.log(newValue, 'tttttnewValue', oldValue, 'tttttoldValue')
        test[0].msg=newValue
        console.log(test[0].msg)
      }
    )
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
      test,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>