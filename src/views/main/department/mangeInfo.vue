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
        <span>{{ form.staff_count }} 人</span>
      </el-form-item>
      <el-form-item label="上班打卡时间段：" prop="clock_in">
        <el-time-picker
            @change="TimePicker()"
            v-model="form.clockin"
            is-range
            range-separator="To"
            start-placeholder="Start time"
            end-placeholder="End time"
        />
      </el-form-item>
      <el-form-item label="下班打卡时间段：" prop="clock_out">
        <el-time-picker
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
        <el-button class="wrapper-content" type="primary" @click="update">确认</el-button>
        <el-button class="wrapper-content" type="danger" @click="findDelete">删除</el-button>
      </el-col>
    </el-form>
  </div>

  <Layer :layer="DeleteConfirmBox" @confirm="Delete" ref="layerDom" v-if="DeleteConfirmBox.show">

  </Layer>
</template>

<script lang="ts">
import type {LayerType} from '@/components/layer/index.vue'
import type {Ref} from 'vue'
import type {ElFormItemContext} from 'element-plus/lib/el-form/src/token'
import {defineComponent, reactive, ref, watch} from 'vue'
import {ElMessage} from 'element-plus'
import {departmentUpdate, departmentDelete} from '@/api/department'
import Layer from "@/components/layer/messagebox.vue";

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
    let data: any = reactive(props.dic)
    const ruleForm: Ref<ElFormItemContext | null> = ref(null)
    const layerDom: Ref<LayerType | null> = ref(null)
    const DeleteConfirmBox = reactive({
      width: "30%",
      show: false,
      title: '',
      showButton: true
    })
    let form = reactive({
      id: data.id,
      name: data.name,
      notice: data.notice,
      staff_count: data.staff_count,
      clockin:([value_clockin.value[0].setTime(data.clock_in_start),value_clockin.value[1].setTime(data.clock_in_end)]),
      clockout:([value_clockin.value[0].setTime(data.clock_out_start),value_clockin.value[1].setTime(data.clock_out_end)])
    })
    console.log(value_clockin)
    console.log(new Date().setTime(1675180800000))
    console.log(form.clockin[0])
    watch(
        () => props.dic,
        (newValue, oldValue) => {
          // console.log("new:", newValue, 'old:', oldValue)
          form.id = newValue.id
          form.name = newValue.name
          form.notice = newValue.notice
          form.staff_count = newValue.staff_count
          form.clockin=([value_clockin.value[0].setTime(newValue.clock_in_start),value_clockin.value[1].setTime(newValue.clock_in_end)])
          form.clockout=([value_clockin.value[0].setTime(newValue.clock_out_start),value_clockin.value[1].setTime(newValue.clock_out_end)])
        }
    )
    const rules = {
      name: [{required: true, message: '请输入部门名', trigger: 'blur'}]
    }

    function TimePicker() {
      console.log(value_clockin.value)
      console.log(value_clockin.value[0].getTime())
      console.log(typeof (value_clockin.value[0].getTime()))
    }

    function update() {
      if (ruleForm.value) {
        ruleForm.value.validate((valid: any) => {
          if (valid) {
            if (form.name == data.name && form.notice == data.notice) {
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
                clock_in_start:form.clockin.value[0].getTime(),
                clock_in_end:value_clockin.value[1].getTime(),
                clock_out_start:value_clockout.value[0].getTime(),
                clock_out_end:value_clockout.value[1].getTime(),
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
      TimePicker
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