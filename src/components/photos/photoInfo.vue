<template>
    <div class="photoInfo_container">
        <h3>{{photoInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoInfo.addTime | dateFormat()}}</span>
            <span>点击次数：{{photoInfo.click}}次</span>
        </p>
        <hr>

        <!--缩略图区域-->
        <div class="thumbs">
            <vue-preview :slides="list"></vue-preview>
        </div>
        <!--图片内容区域-->
        <div class="content" v-html="photoInfo.content"></div>

        <!--放置一个现成的评论子组件-->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
    //导入子组件
    import comment from '../subcomponents/comment.vue'
    export default{
        data(){
            return{
                id:this.$route.params.id,   //从路由中获取的图片id
                photoInfo:'',  //图片详情
                list:[]
            }
        },
        created(){
            this.getPhotoInfo(),
            this.getThumImages()
        },
        methods:{
            getPhotoInfo(){
                //获取图片的详情
                this.$http.get('/getImageInfo/' + this.id).then(res => {
                    //console.log(res)
                    if(res.body.status === 0){
                        this.photoInfo = res.body.messages
                    }
                })
            },
            getThumImages(){
                this.$http.get('/getThumImages/' + this.id).then(res => {
                    //console.log(res)
                    if(res.body.status === 0){
                        res.body.messages.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                            item.msrc = item.src
                        })
                        this.list = res.body.messages
                    }
                })
            }
        },
        components:{     //注册子组件，映射成标签
            'cmt-box':comment
        }
    }
</script>

<style scoped>
.photoInfo_container{
    padding: 3px;
}
.photoInfo_container h3{
    color: #26A2FF;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
}
.photoInfo_container .subtitle{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}
.photoInfo_container .content{
    font-size: 13px;
    line-height: 30px;
}
</style>