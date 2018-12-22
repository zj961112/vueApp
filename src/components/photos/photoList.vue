<template>
    <div>
        <!--顶部滑动条-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a v-for="item in ImgCategory" :key="item.id" :class="['mui-control-item',item.id === 0 ? 'mui-active':'']" @click="getImgList(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>

        </div>
        <!--图片-->
        <ul class="photoBox">
            <router-link v-for="item in imgList" :key="item.id" :to="'/home/getImageInfo/' + item.id" tag="li">
                <img v-lazy="item.imgUrl">
                <div class="photoCotent">
                    <h4>{{item.title}}</h4>
                    <p>{{item.topic}}</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import mui from "../../lib/js/mui.min"
    import {toast} from "mint-ui"

    export default{
        data(){
            return{
                ImgCategory:'',
                imgList:''
            }
        },
        created(){
            this.getImgCategory();
            this.getImgList(0)
        },
        //当组件中的DOM结构被渲染好并放在页面中后，会执行这个钩子函数
        //如果要操作元素了，最好在mounted里面，因为这里的DOM元素是最新的
        mounted(){
            //初始化滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                scrollX: true
            });
        },
        methods:{
            getImgCategory(){
                this.$http.get('/getImgCategory').then(res => {
                    if(res.body.status === 0){
                        const allComment = {
                            title:'全部',
                            id:0
                        };
                        res.body.messages.unshift(allComment);
                        this.ImgCategory = res.body.messages;
                        //console.log('这里执行了'+this.ImgCategory)
                    }else{
                        toast('获取数据失败')
                    }
                },err => {
                    toast('请求失败')
                })
            },
            getImgList(cateId){
                this.$http.get('/getImgList/' + cateId).then(res => {
                    console.log(res);
                    if(res.body.status===0){
                        this.imgList = res.body.messages
                    }else{
                        toast('获取失败')
                    }
                })
            }
        }
    }
</script>

<style>
    *{
        touch-action: pan-y;
    }
    .photoBox{
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
    }
    .photoBox li {
        list-style: none;
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
    }
    .photoBox li .photoCotent{
        position: absolute;
        color: white;
        bottom:0;
        max-height:70px;
        width: 100%;
        text-align: left;
        background-color: rgba(0, 0, 0, 0.4);
        overflow: hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .photoBox li .photoCotent h4{
        font-size: 14px;
    }
    .photoBox li .photoCotent p{
        font-size: 13px;
        color: white;
    }
    .photoBox li img{
        width: 100%;
        height: 265px;
        vertical-align: middle;
    }
    .photoBox li img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>