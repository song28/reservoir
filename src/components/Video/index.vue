<template>
  <div class="hzz-video">
    <div class="video-fl">
      <img src="@/assets/images/HZZ-RJ/workbech_video.png" alt="" style="width: 100%;height: 100%">
    </div>
    <div class="video-console">
      <div class="console-header">控制台</div>
      <div class="console-content">
        功能暂未开放
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: ""
  }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss" scope>
  .hzz-video {
    display: flex;
    height: 4.78rem;
    min-height: 420px;
    .video-fl {
      width: 8.4rem;
      height: 100%;
      margin-right: 12px;
    }
    .video-console {
      width: 258px;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 3px 0px rgba(135, 114, 233, 0.16);
      .console-header {
        height: 0.34rem;
        text-align: center;
        line-height: 0.34rem;
        background: rgba(175, 199, 254, 1);
        font-size: 0.16rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(21, 50, 103, 1);
      }
      .console-content {
        padding: 0.2rem;

      }
    }
  }
</style>
