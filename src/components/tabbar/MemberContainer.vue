<template>
    <div class="member">
        <img src="../../assets/banner.jpg" />

        <div class="box"></div>

        <div class="product">
            <div class="boxc"></div>
            <div class="boxc"></div>
            <div class="boxc"></div>
        </div>
    </div>
</template>

<script>
    export default{}
</script>

<style lang="less" scoped>
.member{
    width: 100%;

    > img{
    width: 100%;
      }
    .box{
        width: 100%;
        height: 200px;
        background-color: blue;
        position: absolute;
        top:210px;
    }
    .product{
        position: absolute;
        top:416px;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        display: flex;
        .boxc{
            width: 45%;
            height: 100px;
            background-color: yellow;
            margin: 10px;
        }
    }

}
</style>