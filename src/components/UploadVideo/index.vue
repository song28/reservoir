<template>
  <div class="app-upload">
    <el-upload
      list-type="picture-card"
      :action="uploadFileURL"
      :headers="header"
      :file-list="fileList"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-remove="handleRemove">
      <i class="el-icon-plus">添加视频</i>
    </el-upload>
  </div>
</template>

<script>
  import {uploadFileURL} from "@/api/base.js";

  export default {
    name: "AppUpload",
    props: ['list', 'listName'],
    data() {
      return {
        uploadFileURL,
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
      }
    },
    computed: {
      header() {
        let token = sessionStorage.getItem("xtoken");
        return { "X-Token": token };
      },
    },
    methods: {
      //图片状态改变
      handleChange(file, fileList) {
        console.log("状态改变", file, fileList)
      },

      //图片上传成功
      handleSuccess(response, file, fileList) {
        console.log("上传成功", response, file, fileList)
        this.$emit('upload-sucess', 1, response.data, this.listName)
      },

      //预览图片
      handlePreview(file) {
        // this.dialogImageUrl = file.url;
        // this.dialogVisible = true;
      },

      //删除图片
      handleRemove(file) {
        this.$emit('upload-sucess', 0, file.response.data, this.listName)
      },

      //图片上传前
      beforeUpload(file) {
        let _this = this
        return new Promise((resolve, reject) => {
          let isLt2M = file.size / 1024 / 1024 < 10 // 判定图片大小是否小于10MB
          if (!isLt2M) {
            reject()
          }
          let image = new Image(), resultBlob = '';
          image.src = URL.createObjectURL(file);
          image.onload = () => {
            // 调用方法获取blob格式，方法写在下边
            resultBlob = _this.compressUpload(image);
            resolve(resultBlob)
          }
          image.onerror = () => {
            reject()
          }
        })
      },

      /* 图片压缩方法-canvas压缩 */
      compressUpload(image) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        let initSize = image.src.length
        let {width} = image, {height} = image
        canvas.width = width
        canvas.height = height
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, 0, 0, width, height)

        // 进行最小压缩0.1
        let compressData = canvas.toDataURL('image/jpeg', 0.2)

        // 压缩后调用方法进行base64转Blob，方法写在下边
        let blobImg = this.dataURItoBlob(compressData)
        return blobImg
      },

      /* base64转Blob对象 */
      dataURItoBlob(data) {
        let byteString;
        if (data.split(',')[0].indexOf('base64') >= 0) {
          byteString = atob(data.split(',')[1])
        } else {
          byteString = unescape(data.split(',')[1])
        }
        let mimeString = data
          .split(',')[0]
          .split(':')[1]
          .split(';')[0];
        let ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i += 1) {
          ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ia], {type: mimeString})
      },

    },
    created() {
      if (this.list && this.list.length) {
        this.fileList = this.list
      }
    },
  }
</script>

<style lang="scss" type="text/scss">
  .app-upload {
    margin-right: 0.15rem;
    overflow: hidden;
    .el-upload--picture-card {
      width: 1.49rem;
      height: 1.79rem;
      background: rgba(255, 255, 255, 1);
      border: 1px solid #F0F0F0;
      border-radius: 0;
      i {
        font-size: 0.16rem;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #999;
        line-height: 0.62rem;
      }
      i.el-icon-plus:before {
        font-size: 0.34rem;
        display: block;
        color: #E9E9E9;
        line-height: 0.34rem;
        margin-top: 0.5rem;
      }

    }
    .el-upload-list--picture-card {
      .el-upload-list__item {
        width: 1.49rem;
        height: 1.79rem;
        line-height: 1.79rem;
        background: rgba(255, 255, 255, 1);
        border: 1px solid #F0F0F0;
        border-radius: 0;
      }
    }
    .dialog-img {
      width: max-content;
      height: max-content;
      max-width: calc(100% - 50px);
      max-height: calc(100% - 150px);
      .el-dialog__header {
        padding: 0 0.2rem 0;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.22rem;
      }

      .el-dialog__body {
        padding: 0.1rem;
        width: 12rem;
        height: 6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          max-height: 100%;
          max-width: 100%;
        }
      }
    }
  }


</style>
