<template>
    <div>
        <!--将来，谁使用此 轮播图组件，谁为我们传递imgs-->
        <!--此时，imgs应该是父组件向子组件传值-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(index,value) in imgs" :key="index">
                <img :src="index" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default{
        props: ["imgs","isfull"]
    }
</script>

<style lang="less" scoped>
    .mint-swipe {
        height: 200px;
    }
    .mint-swipe img {
        height: 100%;
    }
    .full{
        width: 100%;
    }
</style>