<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" label-width="120px" style="margin-right:30px;">
      <el-form-item label="公司名称：" prop="name">
        <el-input v-model="form.name" placeholder="请输入公司名" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="公司地址：" prop="address">
        <el-input v-model="form.address" placeholder="请输入公司地址" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="公司公告：" prop="notice">
        <el-input v-model="form.notice" placeholder="请输入公司公告" type="textarea"
                  clearable></el-input>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type {LayerType} from '@/components/layer/index.vue'
import type {Ref} from 'vue'
import {defineComponent, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {useStore} from 'vuex'
import {updateCorpData} from '@/api/corporation'
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
    const info = store.state.corp.info
    let form = ref({
      name: info.name,
      address: info.address,
      notice: info.notice
    })

    function submit() {
      let params = {
        name: form.value.name,
        address: form.value.address,
        notice: form.value.notice
      }
      if(params.name ==info.name && params.address==info.address&&params.notice==info.notice){
        ElMessage({
              type: 'warning',
              message: '未作任何改变'
            })
            layerDom.value && layerDom.value.close()
      }
      else {
        updateCorpData(params)
          .then(res => {
            ElMessage({
              type: 'success',
              message: '更新公司信息成功'
            })
            location.reload()
          }).finally(() => {
          layerDom.value && layerDom.value.close()
        })
      }
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