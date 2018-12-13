<template>
    <div class="cmt_container">
        <h3 class="title">发表评论</h3>
        <hr>
        <textarea placeholder="请输入要吐槽的内容（最多吐槽120字）" maxlength="120"></textarea>

        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="cmt_list">
            <div class="cmt_item" v-for="(item,index) in comments" :key="index">
                <div class="cmt_info">
                    <span>第{{index+1}}楼</span>
                    <span>用户：{{item.userName}}</span>
                    <span>发表时间：{{item.addTime | dateFormat}}</span>
                </div>
                <div class="cmt_content">{{item.content}}</div>
            </div>
        </div>

        <mt-button plain size="large" type="danger" @click.native="addMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {toast} from 'mint-ui'
    export default{
        props:{
            id:String
        },
        data(){
            return{
                pageIndex:1,
                comments:[]
            }
        },
        created(){
            this.getComments()
        },
        methods:{
            getComments(){
                this.$http.get('/getComments/' + this.id +'?pageIndex=' + this.pageIndex).then(res => {
                    //console.log(res)
                    if(res.body.status === 0){
                        //每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该老数据拼接上新数据
                        //console.log(res.body.messages)
                        //this.comments = res.body.messages
                        this.comments = this.comments.concat(res.body.messages)
                    }else{
                        toast('请求失败')
                    }
                },err=>{
                    toast('请求失败')
                })
            },
            addMore(){
                this.pageIndex++;
                this.getComments();
            }
        }
    }
</script>

<style>
    .cmt_container .title{
        text-align: left;
        color: #000;
        margin: 10px 0;
    }
    .cmt_container textarea{
        height: 100px;
        font-size: 13px;
        margin-bottom: 0;
    }
    .cmt_container .cmt_list .cmt_item{
        margin: 10px 0;
    }
    .cmt_container .cmt_list .cmt_info{
        background-color: #cccccc;
    }
    .cmt_container .cmt_list .cmt_item span{
        font-size: 13px;
    }
    .cmt_container .cmt_list .cmt_item .cmt_content{
        font-size: 13px;
        margin-top: 5px;
    }
</style>