<template>
  <div @confirm="submit" ref="layerDom" >
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="150px" style="margin:20px;">
      <el-form-item label="部门名：" prop="name">
        <el-input :disabled=form.disabled v-model="form.name" placeholder="请输入部门名"></el-input>
      </el-form-item>
      <el-form-item label="部门公告：" prop="notice">
        <el-input :disabled=form.disabled v-model="form.notice" placeholder="请输入部门公告" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="部门人数：" prop="staff_count">
        <span>{{ form.staff_count }} 人</span>
      </el-form-item>
      <el-form-item label="上班打卡时间段：" prop="clock_in">
        <el-time-picker
            :disabled=form.disabled
            v-model="form.clockin"
            is-range
            range-separator="To"
            start-placeholder="Start time"
            end-placeholder="End time"
        />
      </el-form-item>
      <el-form-item label="下班打卡时间段：" prop="clock_out">
        <el-time-picker
            :disabled=form.disabled
            v-model="form.clockout"
            is-range
            range-separator="To"
            start-placeholder="Start time"
            end-placeholder="End time"
        />
      </el-form-item>
      <div class="wrapper">

      </div>
      <el-col class="wrapper">
        <el-button :disabled=form.disabled class="wrapper-content" type="primary" @click="update">确认</el-button>
        <el-button :disabled=!form.disabled class="wrapper-content" type="danger" @click="findDelete">删除</el-button>
      </el-col>
    </el-form>
  </div>

  <Layer :layer="DeleteConfirmBox" @confirm="Delete" ref="layerDom" v-if="DeleteConfirmBox.show">

  </Layer>
</template>

<script lang="ts">
import type {LayerType} from '@/components/layer/index.vue'
import type {Ref} from 'vue'
// import type {ElFormItemContext} from 'element-plus/lib/el-form/src/token'
import type { FormInstance } from 'element-plus'
import {defineComponent, reactive, ref, watch} from 'vue'
import {ElMessage} from 'element-plus'
import {departmentUpdate, departmentDelete} from '@/api/department'
import Layer from "@/components/layer/messagebox.vue";
import {useStore} from "vuex";

// const props = defineProps({
//   dic: String
// })

export default defineComponent({
  components: {
    Layer
  },
  props: {
    dic: {
      type: Object,
      default: () => {
        return {
          name: '',
          notice: '',
          staff_count: 0,
          id: 0
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
    const value_clockin = ref<[Date, Date]>([
      new Date(2023, 1, 1, 0, 0),
      new Date(2023, 1, 1, 23, 59),
    ])
    const value_clockout = ref<[Date, Date]>([
      new Date(2023, 1, 1, 0, 0),
      new Date(2023, 1, 1, 23, 59),
    ])
    let test:any = ref(false)
    let data: any = reactive(props.dic)
    const ruleForm: Ref<FormInstance | null> = ref(null)
    const layerDom: Ref<LayerType | null> = ref(null)
    const DeleteConfirmBox = reactive({
      width: "30%",
      show: false,
      title: '',
      showButton: true
    })
    const store=useStore()
    // var timestamp3 = 1403058804000
    // var newDate = new Date()
    // newDate.setTime(timestamp3)
    // console.log(typeof(newDate))
    // console.log(typeof(newDate.setTime(1403058804000)))s
    value_clockin.value[0].setTime(data.clock_in_start)
    value_clockin.value[1].setTime(data.clock_in_end)
    value_clockout.value[0].setTime(data.clock_out_start)
    value_clockout.value[1].setTime(data.clock_out_end)

    let form = reactive({
      id: data.id,
      name: data.name,
      notice: data.notice,
      staff_count: data.staff_count,
      clockin: value_clockin,
      clockout: value_clockout,
      disabled:data.id != store.state.user.info.department_id
    })
    //
    // console.log(form.clockin[0])
    // var timestamp3 = 1403058804000

    // console.log(">>",typeof (newDate))
    // console.log(">>",new Date().setTime(timestamp3))
    watch(
        () => props.dic,
        (newValue, oldValue) => {
          // console.log("new:", newValue, 'old:', oldValue)
          form.id = newValue.id
          form.name = newValue.name
          form.notice = newValue.notice
          form.staff_count = newValue.staff_count
          value_clockin.value[0].setTime(newValue.clock_in_start)
          value_clockin.value[1].setTime(newValue.clock_in_end)
          value_clockout.value[0].setTime(newValue.clock_out_start)
          value_clockout.value[1].setTime(newValue.clock_out_end)
          form.clockin = [value_clockin.value[0],value_clockin.value[1]]
          form.clockout = [value_clockout.value[0],value_clockout.value[1]]
          form.disabled = newValue.id != store.state.user.info.department_id;
        }
    )
    const rules = {
      name: [{required: true, message: '请输入部门名', trigger: 'blur'}]
    }

    function update() {
      if (ruleForm.value) {
        ruleForm.value.validate((valid: any) => {
          if (valid) {
            if (form.name == data.name &&
                form.notice == data.notice &&
                form.clockin[0].getTime()==data.clock_in_start &&
                form.clockin[1].getTime()==data.clock_in_end &&
                form.clockout[0].getTime()==data.clock_out_start &&
                form.clockout[1].getTime()==data.clock_out_start
            ) {
              ElMessage({
                type: 'warning',
                message: '未作任何改变'
              })
              return false;
            } else {
              let params = {
                id: form.id,
                name: form.name,
                notice: form.notice,
                clock_in_start: form.clockin[0].getTime(),
                clock_in_end: form.clockin[1].getTime(),
                clock_out_start: form.clockout[0].getTime(),
                clock_out_end: form.clockout[1].getTime(),
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

    function Delete() {

      if (form.staff_count != 0) {
        ElMessage({
          type: 'warning',
          message: '该部门尚有员工'
        })
        DeleteConfirmBox.show = false
        return false;
      } else {
        let params = {
          id: form.id
        }
        departmentDelete(params)
            .then(res => {
              ElMessage({
                type: 'success',
                message: '删除成功'
              })
              // layerDom.value && layerDom.value.close()
              location.reload()
            })
      }
    }


    function findDelete() {
      DeleteConfirmBox.show = true
      DeleteConfirmBox.title = "该部门将被永久删除"
    }

    return {
      form,
      rules,
      layerDom,
      ruleForm,
      update,
      findDelete,
      Delete,
      DeleteConfirmBox,
      test
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: auto;
  display: flow;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

.wrapper-content {
  width: 30%;
  padding: 20px;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
}
</style>