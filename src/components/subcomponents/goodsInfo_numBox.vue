<template>
    <!--不知道什么时候能拿到max值，但是总归有一刻会得到一个真正的max值-->
    <!--我们可以使用watch属性来监听父组件传递过来的max值，不管watch会被触发几次，最后一次肯定是一个合法的max值-->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
    <!--分析：子组件什么时候把数据传递给父组件-->

</template>

<script>
    import mui from "../../lib/js/mui.min"
    export default{
        mounted(){
            //初始化数字选择框组件
            mui('.mui-numbox').numbox();
            console.log(this.max)
        },
        methods:{
            countChanged(){
                //每当文本框的数据被修改的时候，立即把最新的数据通过事件调用传给父组件
                //console.log(this.$refs.numbox.value);
                this.$emit('getCount',parseInt(this.$refs.numbox.value));
            }
        },
        props:["max"],
        watch:{
            //属性监听
            'max':function (newVal,oldVal) {
                //使用js api设置numbox的最大值
                mui('.mui-numbox').numbox().setOption('max',newVal)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>