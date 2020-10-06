<template>
  <div id="app">
    <header-com v-if="$route.meta.navHidden"></header-com>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>

import '../static/config.js'
import headerCom from './components/headerCom/index.vue'
export default {
  name: 'App',
  components: {
    'header-com':headerCom
  },
  data () {
    return {
      isShowHeader:false
    }
  },
  created () {
    //this.getRoutPath();
  },
  methods: {
    getRoutPath(){
      console.log("this.$route.path",this.$route.path)
      this.isShowHeader = (this.$route.path !== '/login' && this.$route.path !== '/') ? true : false;
    }
  }
}
</script>

<style>
#app {
  font-family: "Microsoft YaHei" !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;
  height:100%;
}
main{
  width:100%;
  /*height:100%;*/
  box-sizing: border-box;
  padding:2% 8%;
}
</style>
