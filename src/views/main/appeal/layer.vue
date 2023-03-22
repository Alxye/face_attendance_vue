<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      style="margin-right: 30px"
    >
      <el-form-item label="编号：" prop="id" >
        <el-input v-model="form.id" placeholder="请输入名称" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="驳回理由：" prop="reject_reason">
        <el-input v-model="form.reject_reason" placeholder="驳回原因"></el-input>
      </el-form-item>
    
    </el-form>
  </Layer>
</template>

<script lang="ts">
import type { LayerType } from "@/components/layer/index.vue";
import type { Ref } from "vue";
import type { ElFormItemContext } from "element-plus/lib/el-form/src/token";
import { defineComponent, ref } from "vue";
import { add, update } from "@/api/appeal";
import { selectData, typeData } from "./enum";
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
      name: "",
      staff_id: "",
      age: "",
      type: "",
      department_id: "",
      reject_reason:'',
      id:"",
    });
    const rules = {
      id: [{ required: true, message: "不输入", trigger: "blur" }],
      reject_reason: [{ required: true, message: "填写驳回", trigger: "blur" }],
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
              //this.addForm(params);
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
