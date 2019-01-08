<template>
    <div>
        <!--轮播图-->
        <swiper :imgs="imgs" :isfull="true"></swiper>
        <!--导航-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newsList">
                    <img src="../../assets/nav1.png">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/imgShare">
                    <img src="../../assets/nav2.png">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/buyGoods">
                    <img src="../../assets/nav3.png">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
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
    //导入轮播图组件
    import swiper from "../subcomponents/swiper.vue"
    export default{
        data(){
            return {
                imgs: ''
            }
        },
        created(){
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
        },
        //映射成标签
        components:{
            swiper
        }
    }
</script>

<style>
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