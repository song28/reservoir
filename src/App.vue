<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// window.iot_brainFormImgUploadUrl='http://114.240.183.33:8982/splitpack/upload';
// window.iot_brainFormUrl="114.240.183.33";
// window.iot_brainFormPort = "8982";
// window.iot_brainFormImgView =  'http://114.240.183.33:8982/splitpack/viewImage/';
import {setToken} from '@/utils/auth'
export default {
  name: 'App'
}
</script>
