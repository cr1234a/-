<template>
    <div class="pagination">
        <button :disabled="pageNo==1" @click="$emit('change',pageNo-1)">上一页</button>

        <button v-if="pageNo>3 && totalpage>5" @click="$emit('change',1)" :class="{active:pageNo==1}">1</button>
        <button v-if="pageNo>4  && totalpage>5">•••</button>

        <button v-for="(num,index) in startNumAndEndNum.end" :key="index" v-show="num>startNumAndEndNum.start-1" @click="$emit('change',num)" :class="{active: pageNo == num}">{{num}}</button>

        <button v-if="pageNo<totalpage-3 && totalpage>5">•••</button>
        <button v-if="pageNo<totalpage-2 && totalpage>5" @click="$emit('change',totalpage)" :class="{active:pageNo==totalpage}">{{totalpage}}</button>
        <button :disabled="pageNo==totalpage" @click="$emit('change',pageNo+1)">下一页</button> 

        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
</template> 
  
<script>
export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
        totalpage(){
            if(this.total==0) {
                return Math.ceil(1/this.pageSize)
            }
            return Math.ceil(this.total/this.pageSize)
        },
        startNumAndEndNum(){
         let start=0,end=0
         if(this.continues>this.totalpage) {
            start=1
            end=this.totalpage
         } else {
               start=this.pageNo-parseInt(this.continues/2)
               end=this.pageNo+parseInt(this.continues/2)
               if(start<1) {
                start=1
                end=this.continues
               } else if(end>this.totalpage){
                end=this.totalpage
                start=end-this.continues+1
               }
         }
         return {start,end}
        }
    }
};
</script>
  
<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #e23a3a;
            color: #fff;
        }
    }
}
</style>
