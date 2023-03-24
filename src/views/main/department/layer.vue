<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="管理员工号：" prop="staff_id">
        <el-input v-model="form.staff_id" placeholder="请输入工号"></el-input>
<!--        <el-input v-if="!props.layer.row" v-model="form.staff_id" placeholder="请输入工号"></el-input>-->
<!--        <el-col  v-if="props.layer.row" >{{form.staff_id}}</el-col>-->
      </el-form-item>
      <!--      <el-form-item label="管理员初始密码：" prop="password">-->
      <!--        <el-input v-model="form.password" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入密码"></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="所属部门：" prop="select">
        <el-select v-model="form.department_id" placeholder="请选择" clearable>
          <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value">{{
              item.label
            }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：" prop="radio">
        <el-radio-group v-model="form.type">
          <el-radio v-for="item in radioData" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type {LayerType} from '@/components/layer/index.vue'
import Layer from '@/components/layer/index.vue'
import type {Ref} from 'vue'
import {defineComponent, ref} from 'vue'
import type {ElFormItemContext} from 'element-plus/lib/el-form/src/token'
import {addAdmin, updateAdmin} from '@/api/user'
// import { selectData, radioData } from './enum'
import {radioData} from './enum'
import {hideLoading, showLoading} from "@/utils/system/loading";
import {getDepartmentInfo} from "@/api/department";
import {useStore} from "vuex";

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
          showButton: true,
          staff_id: ''
        }
      }
    }
  },
  setup(props, ctx) {
    const store=useStore()
    const ruleForm: Ref<ElFormItemContext | null> = ref(null)
    const layerDom: Ref<LayerType | null> = ref(null)
    let form = ref({
      staff_id_old: '',
      staff_id: '',
      department_id: '',
      type: ''
    })
    let selectData = ref([
      {}
    ])
    const rules = {
      staff_id: [{required: true, message: '请输入管理员工号', trigger: 'blur'}],
      // password: [{ required: true, message: '请输入管理员初始密码', trigger: 'blur' }],
      department_id: [{required: true, message: '请选择', trigger: 'blur'}],
      type: [{required: true, message: '请选择', trigger: 'blur'}]
    }
    init()

    function init() { // 用于判断新增还是编辑功能
      if (props.layer.row) {
        console.log(props.layer.row)
        form.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
        form.value.staff_id_old = form.value.staff_id
        console.log(form.value)
      } else {

      }
    }

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
              const item = {
                label: res.data[key].name,
                value: res.data[key].id,
              };
              arr.push(item);
            }
            selectData.value = arr
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

    // function update
    // const store = useStore()
    // console.log(store.state.user.info.department_id)
    return {
      form,
      rules,
      layerDom,
      ruleForm,
      selectData,
      radioData,
      props
    }
  },
  methods: {
    submit() {
      if (this.ruleForm) {
        this.ruleForm.validate((valid: any) => {
          if (valid) {
            let params = this.form
            if (this.layer.row) {
              this.updateForm(params)
            } else {
              this.addForm(params)
            }
          } else {
            return false;
          }
        });
      }
    },
    // 新增提交事件
    addForm(params: object) {
      console.log(params)
      addAdmin(params)
          .then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.$emit('getTableData', true)
            this.layerDom && this.layerDom.close()
          })
    },
    // 编辑提交事件
    updateForm(params: object) {
      console.log(params)
      // const store=useStore()
      updateAdmin(params)
          .then(res => {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            // if(this.form.needUpdate){
            //   store.dispatch('user/update', res.data.staff_id)
            // }
            // if (this.form.staff_id==store.state.user.staff_id)
            //   store.state.user.staff_id=res.data.staff_id
            //

            this.$emit('getTableData', false)
            this.layerDom && this.layerDom.close()
          })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>