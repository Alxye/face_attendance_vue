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
        <el-input v-model="form.staff_id" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="日期：" prop="date">
        <el-input v-model="form.date" placeholder="只能输入正整数"></el-input>
      </el-form-item>
      <el-form-item label="签到：" prop="am_type">
        <el-radio-group v-model="form.am_type">
          <el-radio
            v-for="item in signData"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="签到时间：" prop="clock_in_time">
        <el-input v-model="form.clock_in_time" placeholder="输入签到时间"></el-input>
      </el-form-item>
      <el-form-item label="签退：" prop="pm_type">
        <el-radio-group v-model="form.pm_type">
          <el-radio
            v-for="item in signData"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="签退时间：" prop="clock_out_time">
        <el-input v-model="form.clock_out_time" placeholder="输入签退时间"></el-input>
      </el-form-item>
      <!-- <el-form-item label="选择器：" prop="select">
                <el-select v-model="form.choose" placeholder="请选择" clearable>
                      <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </el-form-item> -->
      
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type { LayerType } from "@/components/layer/index.vue";
import type { Ref } from "vue";
import type { ElFormItemContext } from "element-plus/lib/el-form/src/token";
import { defineComponent, ref } from "vue";
import { add, update } from "@/api/attendance";
import { selectData, typeData ,signData} from "./enum";
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
    const ruleForm: Ref<ElFormItemContext | null> = ref(null);
    const layerDom: Ref<LayerType | null> = ref(null);
    let form = ref({
      date: "",
      staff_id: "",
      clock_in_time: "",
      clock_out_time: "",
      am_type: "",
      pm_type: "",
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
      } else {
      }
    }
    return {
      form,
      rules,
      layerDom,
      ruleForm,
      selectData,
      typeData,
      signData,
    };
  },
  methods: {
    submit() {
      if (this.ruleForm) {
        this.ruleForm.validate((valid) => {
          if (valid) {
            let params = this.form;
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
