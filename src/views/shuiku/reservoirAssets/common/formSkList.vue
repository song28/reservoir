<template>
  <div class="skList">
    <el-form :model="formData" ref="formData" label-width="80px" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="水库名称" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="输入水库名称"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="坝型" prop="type">
            <el-select
              v-model="value"
              size="mini"
              filterable
              placeholder="请选择坝型"
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
        <el-col :span="8">
          <el-form-item label="溢洪道堰顶高程" prop="barh" label-width="140px">
            <el-input
              style="margin-left:0px"
              v-model="formData.barh"
              placeholder="输入坝高"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经度" prop="lng">
            <el-input
              v-model="formData.lng"
              placeholder="输入经度"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纬度" prop="lat">
            <el-input
              v-model="formData.lat"
              placeholder="输入纬度"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            label="行政区"
            class="el-form-item-region"
            prop="patroladdvcd"
          >
            <v-region
              @values="regionChange"
              type="group"
              :blank="false"
              :town="true"
            >
              <el-input
                v-model="formData.patroladdvnm"
                size="small"
                placeholder="请选择行政区"
              ></el-input>
            </v-region>
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