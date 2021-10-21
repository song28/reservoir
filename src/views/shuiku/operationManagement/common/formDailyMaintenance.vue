<template>
  <div class="skList">
    <el-form :model="formData" ref="formData" label-width="80px" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="养护时间" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="输入养护时间"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="养护类型" prop="type">
            <el-select
              v-model="value"
              size="mini"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="养护说明" prop="barh">
            <el-input
              type="textarea"
              rows="3"
              style="margin-left:0px"
              v-model="formData.barh"
              placeholder="养护说明"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="所选水库" prop="type">
            <el-select
              v-model="value"
              size="mini"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getRegion } from "@/utils";
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      options: [
        {
          value: "0",
          label: "土坝"
        },
        {
          value: "1",
          label: "浆砌石坝"
        },
        {
          value: "2",
          label: "混凝土坝"
        },
        {
          value: "3",
          label: "其他"
        }
      ],
      value: "",
      formData: {},
      rules: {
        name: [{ required: true, message: "请输入水库名称", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.formData = JSON.parse(JSON.stringify(this.data));
  },
  methods: {
    //行政区
    regionChange(val) {
      let obj = getRegion(val);
      this.$set(this.formData, "patroladdvnm", obj.addvnm);
      this.$set(this.formData, "patroladdvcd", obj.addvcd);
    }
  },
  watch: {
    data: {
      handler: function(newV, oldV) {
        // console.log(newV, "tb----------");
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style  lang='scss' scoped>
.dialogCz {
  >>> .el-dialog__header {
    background: #29958b;
    padding: 0.1rem 0.4rem;
  }
  >>> .el-dialog .el-dialog__title,
  .el-dialog .dialog-title {
    color: #ffffff !important;
  }
  >>> .el-form {
    padding-top: 0.2rem;
  }
  >>> .el-icon-close:before {
    color: white;
  }
}
</style>