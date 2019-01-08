<template>
    <div class="goodsDesc">
        <h3>{{goodDesc.title}}</h3>
        <hr>
        <div class="content" v-html="goodDesc.topic"></div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                goodDesc:''
            }
        },
        created(){
            this.getDoodDesc()
        },
        methods:{
            getDoodDesc(){
                this.$http.get('/getGoodsDesc/' + this.$route.params.id).then(res => {
                    console.log(res)
                    if(res.body.status === 0){
                        this.goodDesc = res.body.messages
                    }
                })
            }
        }
    }
</script>

<style lang="less">
.goodsDesc{
    padding:0 5px;
    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
}
</style>