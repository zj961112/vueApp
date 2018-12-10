<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(index,value) in imgs" :key="index">
                <img :src="index">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                imgs:''
            }
        },
        mounted(){
            this.getLunbotu()
        },
        methods:{
            getLunbotu(){     //获取轮播图的方法
                this.$http.get('/interface.php').then(result => {
                    console.log(result.body)
                    this.imgs = result.body
                })
            }
        }
    }
</script>

<style>
.mint-swipe{
    height: 200px;
}
.mint-swipe img{
    height: 100%;
    width: 100%;
}
</style>