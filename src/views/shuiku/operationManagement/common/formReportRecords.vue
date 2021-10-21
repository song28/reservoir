<template>
  <div class="skList">
    <el-form :model="formData"
             ref="formData"
             label-width="120px"
             :rules="rules">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="上报时间"
                        prop="createTm">
            <el-date-picker size="mini"
                            v-model="formData.createTm"
                            align="right"
                            type="datetime"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="上报人信息"
                        prop="person">
            <!-- <el-input
              :disabled="true"
              v-model="formData.person"
              placeholder="输入上报人信息(姓名和手机号)"
              size="mini"
            ></el-input> -->
            <el-select :disabled="ifdis"
                       v-model="formData.person"
                       size="mini"
                       filterable
                       placeholder="请选择">
              <el-option v-for="item1 in skPersonOpions"
                         :key="item1.value"
                         :label="item1.label"
                         :value="item1.value">
                <span style="float: left">{{ item1.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item1.supremeRole }}&nbsp;{{ item1.phone }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="事件类型"
                        prop="implementTypeDetail">
            <el-select v-model="formData.implementTypeDetail"
                       size="mini"
                       filterable
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="事件说明"
                        prop="desc">
            <el-input type="textarea"
                      style="margin-left:0px"
                      v-model="formData.desc"
                      placeholder="输事件说明"
                      size="mini"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 添加照片 -->
    <div class="image">
      <el-upload :action="imageAllUrl"
                 :file-list="fileList"
                 :headers="header"
                 list-type="picture-card"
                 :on-remove="handleRemove"
                 :before-upload="beforeUpload"
                 :on-success="onSuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
  </div>
</template>
<script>
import { getRegion } from '@/utils'
import { getAddvcdTreeList, xcPointUrl, previewUrl } from '@/api/base.js'
import { generateUUID } from '@/utils'

import { getReservoirIdAndRoleId, getInscoptorByReservoirId } from '../api'
import { optionsReportFive, optionsReportFour } from '../apiConfig'

export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      ifdis: false,
      imageAllUrl: '',
      options: [],
      value: '',
      formData: {},
      rules: {
        createTm: [
          { required: true, message: '请输入上报时间', trigger: 'blur' },
        ],
        person: [
          { required: true, message: '该水库未配置人员', trigger: 'blur' },
        ],
        implementTypeDetail: [
          { required: true, message: '请输入事件类型', trigger: 'blur' },
        ],
        desc: [{ required: true, message: '请输入事件说明', trigger: 'blur' }],
      },
      skPersonOpions: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      value2: '',
      fileList: [],
    }
  },
  computed: {
    header() {
      let token = sessionStorage.getItem("xtoken");
      return { "X-Token": token };
    },
  },
  mounted() {
    this.formData = JSON.parse(JSON.stringify(this.data))

    this.formData.imags = []
    this.imageAllUrl = xcPointUrl
    if (this.formData.skPersonOpions.length > 0) {
      this.ifdis = false
      this.skPersonOpions = []
      this.formData.skPersonOpions.forEach((e) => {
        this.skPersonOpions.push({
          label: e.name,
          value: e.id,
          phone: e.mobile,
          supremeRole: e.dutyperson,
        })
      })
    } else {
      this.ifdis = true
    }

    if (this.formData.reportType == 'first') {
      this.options = optionsReportFour
    } else if (this.formData.reportType == 'second') {
      this.options = optionsReportFive
    }
  },

  methods: {
    beforeUpload(file) {
      console.log(file, '上传前')
    },
    onSuccess(response, file, fileList) {
      console.log(JSON.stringify(response))
      this.fileList.push({ url: previewUrl + response.obj.url })
      if (this.formData.reportType == 'first') {
        this.formData.imags.push({
          id: generateUUID(),
          imagetype: '4',
          imageurl: response.obj.url,
          creattime: this.getTimes(0),
          createuserid: this.formData.person,
          imagetypename: '事件上报',
        })
      } else if (this.formData.reportType == 'second') {
        this.formData.imags.push({
          id: generateUUID(),
          imagetype: '5',
          imageurl: response.obj.url,
          creattime: this.getTimes(0),
          createuserid: this.formData.person,
          imagetypename: '险情上报',
        })
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    getTimes(n) {
      const start = new Date()
      let cont = start.setTime(start.getTime() - 3600 * 1000 * n)
      let cont2 = this.formateDate(new Date(cont))
      return cont2
    },
    // 格式化时间
    formateDate(time) {
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      let h = time.getHours()
      let min = time.getMinutes()
      let s = time.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      if (h < 10) {
        h = '0' + h
      }
      if (min < 10) {
        min = '0' + min
      }
      if (s < 10) {
        s = '0' + s
      }
      return year + '-' + month + '-' + day + ' ' + h + ':' + min + ':' + s
    },
  },
  watch: {
    formData: {
      handler: function (newV, oldV) {
        console.log(newV, '-====--------')
        this.$emit('update:data', newV)
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>

<style  lang='scss' scoped>
>>> .el-input__validateIcon,
.el-icon-circle-close:before {
  font-size: 0px;
}

.dialogCz {
  >>> .el-dialog__header {
    background: #29958b;
    padding: 0.1rem 0.4rem;
  }
  >>> .el-dialog .el-dialog__title,
  .el-dialog .dialog-title {
    color: #ffffff !important;
  }
  .image {
    width: 100%;
    margin: 20px 40px;
    height: 150px;
    overflow: auto;
  }
}
</style>
