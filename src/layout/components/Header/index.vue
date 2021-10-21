<template>
  <div class="header-container">
    <header-logo/>
    <header-menu/>
   <header-online/>
     <header-right/>
  </div>
</template>

<script>
  import HeaderLogo from './components/Logo'
  import HeaderMenu from './components/Menu'
  import HeaderOnline from './components/Online'
  import HeaderRight from './components/Right'

  export default {
    components: {
      HeaderLogo,
      HeaderMenu,
      HeaderOnline,
      HeaderRight,
    }
  }
</script>
