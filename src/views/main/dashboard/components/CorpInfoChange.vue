<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" label-width="120px" style="margin-right:30px;">
      <el-form-item label="公司名称：" prop="name">
        <el-input v-model="form.name" placeholder="请输入公司名，为空则保持不变" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="公司地址：" prop="address">
        <el-input v-model="form.address" placeholder="请输入公司地址，为空则保持不变" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="公司公告：" prop="notice">
        <el-input v-model="form.notice" placeholder="请输入公司公告，为空则保持不变" type="textarea"
                  clearable></el-input>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type {LayerType} from '@/components/layer/index.vue'
import type {Ref} from 'vue'
import type {ElFormItemContext} from 'element-plus/lib/el-form/src/token'
import {defineComponent, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {useStore} from 'vuex'
import {passwordChange} from '@/api/user'
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
    const layerDom: Ref<LayerType | null> = ref(null)
    const store = useStore()
    // console.log(form)
    let form = ref({
      name: store.state.info.name,
      address: store.state.info.address,
      notice: store.state.info.notice
    })
    function submit() {
      let params = {
        name: form.value.name,
        address: form.value.address,
        notice: form.value.notice
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
    }

    return {
      form,
      layerDom,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>

</style>