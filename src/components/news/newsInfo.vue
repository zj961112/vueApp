<template>
    <div class="newsinfo_container">
        <h3 class="title">{{newsInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newsInfo.addTime | dateFormat}}</span>
            <span>点击：{{newsInfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsInfo.content"></div>
        <Comment :id="id"/>
    </div>
</template>

<script>
    import {toast} from 'mint-ui'
    import Comment from '../subcomponents/comment.vue'
    export default{
        data(){
            return{
                id:this.$route.params.id,   //将url地址中传递过来的id值，挂载到data上，方便以后调用
                newsInfo:''
            }
        },
        created(){
            this.getNewsInfo()
        },
        methods:{
            getNewsInfo(){    //获取新闻详情
                this.$http.get('/newsInfo/'+ this.id).then(res => {
                    if(res.body.status === 0){
                        //将获取的数据存入data
                        this.newsInfo = res.body.messages
                    }else{
                        toast('请求失败')
                    }
                },err => {
                    toast('请求失败')
                })
            }
        },
        components:{
            Comment
        }
    }
</script>

<style>
    .newsinfo_container{
        padding: 4px;
    }
    .newsinfo_container .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
        line-height: 25px;
    }
    .newsinfo_container .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .newsinfo_container .content{
        font-size: 15px;
    }
</style>