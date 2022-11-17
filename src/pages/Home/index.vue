<template>
    <div>
        <TypeNav/>
        <sweep/>
        <recommend/>
        <rank/>
        <like/>
        <floor v-for='list in floorList' :key="list.id" :list='list'/>
        <brand/>
    </div>
 
</template>

<script>
    import sweep from './sweep/sweep.vue'
    import recommend from './Recommend/Recommend.vue'
    import rank from './Rank/Rank.vue'
    import like from './Like/Like.vue'
    import floor from './Floor/Floor.vue'
    import brand from './Brand/Brand.vue'
    import { mapState } from 'vuex'
export default {
name:'HomeIndex',
components:{
    sweep,
    recommend,
    rank,
    like,
    floor,
    brand
},

mounted(){
  this.$store.dispatch('home/floorList')
  this.$store.dispatch('LoginAndRegister/getUserInfo')
},
computed:{
...mapState('home',['floorList']),
}
}
</script>

<style lang="less" scoped>

</style>