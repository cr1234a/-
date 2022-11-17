<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="current=-3, show=false" >
                <h2 class="all" @mouseenter="show=true" >全部商品分类</h2>
                <transition name="sort">
                <div class="sort"  v-show="$route.path=='/home'? true : show">
                    <div class="all-sort-list2" @click="goSearch">   <!-- 利用事件委派 -->
                        <div class="item" v-for="(c1,index) in goodsclassify" :key="c1.categoryId" >
                            <h3 @mouseenter="currentIndex(index)" :class="{cur:current==index}">
                                <a :data-categoryName="c1.categoryName" :data-categoryId1="c1.categoryId">{{c1.categoryName}}</a>
                            </h3>
                            <div class="item-list clearfix" :style="{display:current==index? 'block': 'none'}">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-categoryId2="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-categoryId3="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { throttle } from 'lodash'     // 节流包引入
import { mapState } from 'vuex'
export default {
    name: 'TypeNav',
    data() {
        return {
            current: -2,
            show:false
        }
    },
    computed: {
        ...mapState('home', ['goodsclassify'])
    },
    methods: {
        /* 节流，实现蓝色背景和三级联动显示 */
        currentIndex:throttle(function(index){    
            this.current = index
        },50),
        // 点击三级联动跳转到search页面,利用编程式导航加事件委派
        goSearch(e) {
            let location={
                name:'search',
                query:{}
            }
            if (e.target.dataset.categoryname) {
                if(e.target.dataset.categoryid1) {
                    location.query = {
                        categoryName:e.target.dataset.categoryname,
                        category1Id:e.target.dataset.categoryid1,
                    }
                } else if(e.target.dataset.categoryid2) {
                    location.query = {
                        categoryName:e.target.dataset.categoryname,
                        category2Id:e.target.dataset.categoryid2
                    }
                } else if(e.target.dataset.categoryid3) {
                    location.query = {
                        categoryName:e.target.dataset.categoryname,
                        category3Id:e.target.dataset.categoryid3
                    }
                }
            } else {
                return
            }
            // 合并query和params参数
            if(this.$route.params) {
                location.params=this.$route.params
            }
            this.$router.push(location)
        }

    },
}

</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
                text-decoration: none;
                cursor: pointer;

                &:hover {
                    color: #e1251b !important;
                }
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 27px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                            text-decoration: none;
                            cursor: pointer;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                    a {
                                            cursor: pointer;
                                    
                                            &:hover {
                                                color: #e1251b !important;
                                            }
                                    }
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;

                                        a {
                                            text-decoration: none;
                                            cursor: pointer;

                                            &:hover {
                                                color: #e1251b !important;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }

                    .cur {
                        background: skyblue
                    }
                }
            }
        }
        @keyframes sortanimate {
            from{
                height:0
            } to {
                height:461px
            }
        }
        .sort-enter-active{
            animation: sortanimate 0.5s linear
        }
        .sort-leave-active{
            animation: sortanimate 0.5s linear reverse
        }
    }
}
</style>