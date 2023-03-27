<template>
  <div @confirm="submit" ref="layerDom">
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
      <el-form-item label="打卡地点：" prop="address">
        <a style=" text-align: left;">{{ form.address }} </a>
      </el-form-item>
      <el-form-item style=" margin-top: -15px;">
        <el-button :disabled=form.disabled @click="openMapPickPop">修改打卡地址</el-button>
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
import type {FormInstance} from 'element-plus'
// import type {ElFormItemContext} from 'element-plus/lib/el-form/src/token'
import {defineComponent, reactive, ref, watch, computed, onMounted} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {departmentUpdate, departmentDelete} from '@/api/department'
import Layer from "@/components/layer/messagebox.vue";
import {useStore} from "vuex";


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
          id: 0,
          longitude: 0.0,
          latitude: 0.0,
          address: ""
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
    /////// 用于时间戳
    // const value_clockin = ref<[Date, Date]>([
    //   new Date(2023, 1, 1, 0, 0),
    //   new Date(2023, 1, 1, 23, 59),
    // ])
    // const value_clockout = ref<[Date, Date]>([
    //   new Date(2023, 1, 1, 0, 0),
    //   new Date(2023, 1, 1, 23, 59),
    // ])

    // for map location

// const key= "去腾讯地图申请账号，拿到自己的key";
    const IFRAME_HTML = `<iframe id="mapPage" width="375" height="400" frameborder="0"
                      src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=7CYBZ-CXGK7-TKDX4-PDE2W-CIIVV-3BBCR&referer=myapp"></iframe>`;

    const currentPicked = ref({
      latlng: {},
    });
    const onLocationVal = ref("");

    function openMapPickPop($event: any) {
      if ($event.relatedTarget) return;
      ElMessageBox({
        title: "选择地址",
        message: IFRAME_HTML,
        customClass: "location-picker-box",
        dangerouslyUseHTMLString: true,
        closeOnPressEscape: false,
      }).then(() => {
        window.removeEventListener("message", handleMapChoice, false);
        console.log("选择地图", currentPicked.value);
      }).catch((e) => {
        if (e != "cancel") throw e;
        window.removeEventListener("message", handleMapChoice, false);
      });
      window.addEventListener("message", handleMapChoice, false);
    }

// 地图选择的回调
    function handleMapChoice(event: any) {
      let mapData = event.data;
      // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
      if (mapData && mapData.module != "locationPicker") return;
      console.log(mapData);
      currentPicked.value = mapData;
      onLocationVal.value = mapData.poiaddress;
      form.address = mapData.poiaddress
      form.longitude = mapData.latlng.lng
      form.latitude = mapData.latlng.lat
    }


    let data: any = reactive(props.dic)
    const ruleForm: Ref<FormInstance | null> = ref(null)
    const layerDom: Ref<LayerType | null> = ref(null)
    const DeleteConfirmBox = reactive({
      width: "30%",
      show: false,
      title: '',
      showButton: true
    })
    const store = useStore()
    //
    ///// 用于时间戳
    // value_clockin.value[0].setTime(data.clock_in_start)
    // value_clockin.value[1].setTime(data.clock_in_end)
    // value_clockout.value[0].setTime(data.clock_out_start)
    // value_clockout.value[1].setTime(data.clock_out_end)


    let form = reactive({
      id: data.id,
      name: data.name,
      notice: data.notice,
      staff_count: data.staff_count,
      ///// 用于时间戳
      // clockin: value_clockin,
      // clockout: value_clockout,
      clockin: [new Date("2023-01-01 " + data.clock_in_start), new Date("2023-01-01 " + data.clock_in_end)],
      clockout: [new Date("2023-01-01 " + data.clock_out_start), new Date("2023-01-01 " + data.clock_out_end)],
      disabled: data.id != store.state.user.info.department_id,
      longitude: data.longitude,
      latitude: data.latitude,
      address: data.address
    })

    if (data.address == '' || data.address == null) {
      form.address = "尚未设置打卡点"
    }


    watch(
        () => props.dic,
        (newValue, oldValue) => {
          // console.log("new:", newValue, 'old:', oldValue)
          form.id = newValue.id
          form.name = newValue.name
          form.notice = newValue.notice
          form.staff_count = newValue.staff_count
          form.longitude = newValue.longitude
          form.latitude = newValue.latitude
          form.address = newValue.address
          if (newValue.address == '' || newValue.address == null) {
            form.address = "尚未设置打卡点"
          }
          ///// 用于时间戳
          // value_clockin.value[0].setTime(newValue.clock_in_start)
          // value_clockin.value[1].setTime(newValue.clock_in_end)
          // value_clockout.value[0].setTime(newValue.clock_out_start)
          // value_clockout.value[1].setTime(newValue.clock_out_end)
          // form.clockin = [value_clockin.value[0],value_clockin.value[1]]
          // form.clockout = [value_clockout.value[0],value_clockout.value[1]]
          // form.disabled = newValue.id != store.state.user.info.department_id;

          form.clockin = [new Date("2023-01-01 " + newValue.clock_in_start), new Date("2023-01-01 " + newValue.clock_in_end)],
              form.clockout = [new Date("2023-01-01 " + newValue.clock_out_start), new Date("2023-01-01 " + newValue.clock_out_end)],
              form.disabled = newValue.id != store.state.user.info.department_id;
        }
    )
    const rules = {
      name: [{required: true, message: '请输入部门名', trigger: 'blur'}]
    }

    function getTime(date: Date) {
      const sign2 = ":";
      let hour = date.getHours(); // 时
      let minutes = date.getMinutes(); // 分
      let seconds = date.getSeconds(); //秒
      // 给一位数的数据前面加 “0”
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      return hour + sign2 + minutes + sign2 + seconds;
    }

    function update() {
      if (ruleForm.value) {
        ruleForm.value.validate((valid: any) => {
          if (valid) {
            if (form.name == data.name &&
                form.notice == data.notice &&
                form.longitude == data.longitude &&
                form.latitude == data.latitude &&
                form.address == data.address &&
                getTime(form.clockin[0]) == data.clock_in_start &&
                getTime(form.clockin[1]) == data.clock_in_end &&
                getTime(form.clockout[0]) == data.clock_out_start &&
                getTime(form.clockout[1]) == data.clock_out_end
                // form.clockin[0].getTime()==data.clock_in_start &&
                // form.clockin[1].getTime()==data.clock_in_end &&
                // form.clockout[0].getTime()==data.clock_out_start &&
                // form.clockout[1].getTime()==data.clock_out_start
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
                longitude: form.longitude,
                latitude: form.latitude,
                address: form.address,
                clock_in_start: getTime(form.clockin[0]),
                clock_in_end: getTime(form.clockin[1]),
                clock_out_start: getTime(form.clockout[0]),
                clock_out_end: getTime(form.clockout[1]),
                // clock_in_start: form.clockin[0].getTime(),
                // clock_in_end: form.clockin[1].getTime(),
                // clock_out_start: form.clockout[0].getTime(),
                // clock_out_end: form.clockout[1].getTime(),
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
      openMapPickPop,
      currentPicked
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

html .location-picker-box {
  width: auto;
  max-width: none;
}
</style>