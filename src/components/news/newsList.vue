<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsinfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.imgUrl">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class="mui-ellipsis">
                            <span>发表时间: {{item.addTime | dateFormat}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {toast} from 'mint-ui'
    export default{
        data(){
            return{
                newsList:''
            }
        },
        mounted(){
            this.getNewsList()
        },
        methods:{
            getNewsList(){
                this.$http.get('/newsList').then(res => {
                    //console.log(res)
                    if(res.body.status === 0){
                        //请求成功，需要把数据存到data中
                        this.newsList = res.body.messages
                    }else{
                        toast('请求失败')
                    }
                },err =>{
                    toast('请求失败')
                })
            }
        }
    }
</script>

<style>
.mui-media-body h1{
    font-size: 13px;
}
.mui-ellipsis{
    display: flex;
    justify-content: space-between;
}
.mui-ellipsis span{
    color: #007aff;
    font-size: 10px;
}
</style>