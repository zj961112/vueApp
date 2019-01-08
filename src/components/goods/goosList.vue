<template>
    <div class="goodsContainer">
        <div class="goodsBox" v-for="(item,index) in goodsList" :key="item.id" @click="goGoodsInfo(item.id)">
            <img :src="item.imgUrl">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sellPrice}}</span>
                    <span class="old">￥{{item.marketPrice}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stockQuantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button size="large" type="danger" @click.native="addMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {toast} from 'mint-ui'
    export default{
        data(){
            return{
                goodsList:[],
                pageIndex:1
            }
        },
        created(){
           this.getGoodsList()
        },
        methods:{
            getGoodsList(){
                this.$http.get('getGoods?pageIndex=' + this.pageIndex).then(res => {
                    if(res.body.status === 0){
                        this.goodsList = this.goodsList.concat(res.body.messages)
                    }else{
                        toast('获取数据失败')
                    }
                }, err => {
                    toast('请求失败')
                })
            },
            addMore(){
                this.pageIndex++;
                //console.log(this.pageIndex)
                this.getGoodsList()
            },
            //以下方法是编程时导航，router-link to 是声明式导航，两者效果一样
            goGoodsInfo(id){
                this.$router.push('/home/getGoodsInfo/' + id)
            }
        }
    }
</script>

<style lang="less" scoped>
.goodsContainer{
    padding: 5px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .goodsBox{
        min-height: 295px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 3px 0 5px 0;
        padding: 2px;
        box-shadow: 0 0 6px #999;
        width: 49%;
        img{
            width: 100%;
        }
        .title{
            font-size: 13px;
        }
        .info{
            padding: 5px;
            background-color: #f0f2f5;
            p{
                padding: 0;
                margin: 0;
            }
            .price{
                .now{
                    color: red;
                    font-size: 18px;
                }
                .old{
                    font-size: 10px;
                    text-decoration: line-through;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>