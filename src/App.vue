<template>
  <div>
    <HeaderIndex/>
    <router-view></router-view>
    <FooterIndex   v-show='$route.meta.isShow' />  <!--  v-show='$route.path=="/search"|| $route.path=="/home" 显示与隐藏第一种写法 -->
  </div>
</template>

<script>
  import HeaderIndex from './components/Header/index.vue'
  import FooterIndex from './components/Footer/index.vue'
export default {
name:'App',
components:{
  HeaderIndex,
  FooterIndex
},
mounted() {
        this.$store.dispatch('home/goodsclassify')  /* 只会发送一次网络请求，优化性能 */
    },

}
</script>

<style>

</style>
