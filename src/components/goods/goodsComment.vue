<template>
    <div class="goodsComment">
        <comment :id="$route.params.id"></comment>
    </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue'
    export default{
        components:{
            comment
        }
    }
</script>

<style>
.goodsComment{
    padding: 5px;
}
</style>