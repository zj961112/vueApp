<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(index,value) in imgs" :key="index">
                <img :src="index">
            </mt-swipe-item>
        </mt-swipe>
        <!--导航-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newsList">
                    <img src="../../assets/nav1.png">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../assets/nav2.png">
                <div class="mui-media-body">图片分享</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../assets/nav3.png">
                <div class="mui-media-body">商品购买</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../assets/nav4.png">
                <div class="mui-media-body">留言反馈</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../assets/nav5.png">
                <div class="mui-media-body">视频专区</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../assets/nav6.png">
                <div class="mui-media-body">联系我们</div>
            </a></li>
        </ul>
    </div>
</template>

<script>
    import {toast} from 'mint-ui'
    export default{
        data(){
            return {
                imgs: ''
            }
        },
        mounted(){
            this.getLunbotu()
        },
        methods: {
            getLunbotu(){     //获取轮播图的方法
                this.$http.get('/imgList').then(result => {
                    console.log(result);
                    if (result.status === 200) {
                        this.imgs = result.body
                    } else {
                        toast('请求失败')
                    }
                },err => {
                    toast('请求失败')
                })
            }
        }
    }
</script>

<style>
    .mint-swipe {
        height: 200px;
    }
    .mint-swipe img {
        height: 100%;
        width: 100%;
    }
    .mui-col-sm-3{
        width: 33%;
    }
    .mui-grid-view.mui-grid-9{
        background-color: #ffffff;
        border: none;
    }
    .mui-grid-view.mui-grid-9 img{
        width: 60px;
        height:60px;
    }
    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
        font-size: 13px;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: none;
    }
</style>