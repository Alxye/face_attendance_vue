<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      style="margin-right: 30px"
    >
      <el-form-item label="工号：" prop="staff_id">
        <el-input :disabled="!form.is_edit" v-model="form.staff_id" placeholder="请输入工号"></el-input>
      </el-form-item>
      <el-form-item label="日期：" prop="date">
        <!-- <el-input v-model="form.date" placeholder="只能输入正整数"></el-input> -->
        <el-date-picker
        v-model="form.date"
        type="date"
        placeholder="选择日期"
        value-format="YYYY-MM-DD"
      />
      </el-form-item>
      <el-form-item label="签到：" prop="am_type">
        <el-radio-group v-model="form.am_type">
          <el-radio
            v-for="item in clockin"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="签到时间：" prop="clock_in_time" >
        <!-- <el-input v-model="form.clock_in_time" placeholder="输入签到时间"></el-input> -->
        <el-date-picker
        v-model="form.clock_in_time"
        type="datetime"
        placeholder="选择日期和时间"
        value-format="YYYY-MM-DD H:m:s"
      />
      </el-form-item>
      <el-form-item label="签退：" prop="pm_type">
        <el-radio-group v-model="form.pm_type">
          <el-radio
            v-for="item in clockout"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="签退时间：" prop="clock_out_time" value-format="yyyy-MM-dd hh:mm:ss">
        <!-- <el-input v-model="form.clock_out_time" placeholder="输入签退时间"></el-input> -->
        <el-date-picker
        v-model="form.clock_out_time"
        type="datetime"
        placeholder="选择日期和时间"
        value-format="YYYY-MM-DD H:m:s"
      />
      </el-form-item>

    </el-form>
  </Layer>
</template>

<script lang="ts">
import type { LayerType } from "@/components/layer/index.vue";
import type { Ref } from "vue";
import type { ElFormItemContext } from "element-plus/lib/el-form/src/token";
import { defineComponent, ref } from "vue";
import { add, update } from "@/api/attendance";
import {  clockin,clockout} from "./enum";
import Layer from "@/components/layer/index.vue";
export default defineComponent({
  components: {
    Layer,
  },
  props: {
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: "",
          showButton: true,
        };
      },
    },
  },

  setup(props, ctx) {
    const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
    const ruleForm: Ref<ElFormItemContext | null> = ref(null);
    const layerDom: Ref<LayerType | null> = ref(null);
    let form = ref({
      date: "",
      staff_id: "",
      clock_in_time: "",
      clock_out_time: "",
      am_type: "",
      pm_type: "",
      is_edit:true
    });
    const rules = {
      staff_id: [{ required: true, message: "请输入工号", trigger: "blur" }],
      name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      department_id: [{ required: true, message: "请选择", trigger: "blur" }],
      age: [{ required: false, message: "请输入年龄", trigger: "blur" }],
      type: [{ required: true, message: "请选择", trigger: "blur" }],
    };
    init();
    function init() {
      // 用于判断新增还是编辑功能
      if (props.layer.row) {
        form.value = JSON.parse(JSON.stringify(props.layer.row)); // 数量量少的直接使用这个转
        form.value.is_edit=false
      } else {
      }
    }
    return {
      form,
      rules,
      layerDom,
      ruleForm,
      clockin,
      clockout,
      defaultTime
    };
  },
  methods: {
    submit() {
      if (this.ruleForm) {
        this.ruleForm.validate((valid) => {
          if (valid) {
            let params = this.form;
            console.log(params);
            if (this.layer.row) {
              this.updateForm(params);
            } else {
              this.addForm(params);
            }
          } else {
            return false;
          }
        });
      }
    },
    // 新增提交事件
    addForm(params: object) {
      add(params).then((res) => {
        this.$message({
          type: "success",
          message: "新增成功",
        });
        this.$emit("getTableData", true);
        this.layerDom && this.layerDom.close();
      });
    },
    // 编辑提交事件
    updateForm(params: object) {
      update(params).then((res) => {
        this.$message({
          type: "success",
          message: "编辑成功",
        });
        this.$emit("getTableData", false);
        this.layerDom && this.layerDom.close();
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>