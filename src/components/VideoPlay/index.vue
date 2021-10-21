<template>
  <div class="videoplay">
    <div v-for="item in data" :key="item">
      <video
        controls="controls"
        autoplay="autoplay"
        preload="none"
        loop="loop"
        style="width:100%;height:100%;"
        :id="item"
        :ref="item"
        class="video-js vjs-default-skin"
      >
        <source :src="src" type="application/x-mpegURL" />
      </video>
    </div>
  </div>
</template>
<script>
import { uploadFileURL } from "@/api/base.js";
import { generateUUID } from "@/utils";
export default {
  name: "videoplay",
  props: ["src", "stopOrder"],

  data() {
    return {
      uploadFileURL,
      videoID: "videorrewqqw" + generateUUID(),
      dialogImageUrl: "",
      dialogVisible: false,
      data: [],
      fileList: [],
      hackReset: true
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 播放视频
    playerVideo() {
      this.player = window.player = new EZUIPlayer(this.videoID);
      this.$emit("storageVideoID", this.player);
    },
    //停止播放视频
    playerVideoStop() {
      this.player.stop();
      window.player.stop();
    }
  },
  watch: {
    src: {
      handler(newV, oldV) {
        console.log("VVVstart====0000======", newV);
        let that = this;
        that.src = newV;
        that.videoID = "gengrnrtrtrtrqerer" + generateUUID();
        that.data = [];
        that.data.push(that.videoID);

        //that.$set(that.data,that.videoID,that.videoID);
        this.$nextTick(function() {
          setTimeout(() => {
            that.playerVideo();
          }, 800);
        });
      },
      deep: true,
      immediate: true
    },
    //停止播放视频-暂时没用
    stopOrder: {
      handler(newV, oldV) {
        console.log("end==========");
        if (newV == true) {
          this.$nextTick(function() {
            setTimeout(() => {
              this.playerVideoStop();
            }, 500);
            this.$emit("stopPlay", false);
          });
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" type="text/scss">
.videoplay {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  embed {
    width: 100%;
    height: 100%;
  }
  div {
    width: 100%;
    height: 100%;
  }
  a {
    text-decoration: underline;
  }
}
</style>
