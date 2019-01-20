<template>
    <div class="goodsInfo">
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!--商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <swiper :imgs="imgs" :isfull="true"></swiper>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsInfo.marketPrice}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsInfo.sellPrice}}</span>
                    </p>
                    <p>购买数量：<numBox @getCount="getSelectedCount" :max="goodsInfo.stockQuantity"></numBox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <!--分析：如何实现加入购物车的时候，拿到选择的数量-->
                        <!--1、经过分析发现，按钮属于 goodsInfo 页面，数字属于 numBox 组件-->
                        <!--2、由于涉及到父子组件的嵌套，无法直接在goodsInfo 页面中直接获取到选中的商品数量值-->
                        <!--3、如何解决？涉及到子组件向父组件传值（事件调用机制）-->
                        <!--4、事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数传递给这个方法-->
                    </p>
                </div>
            </div>
        </div>
        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.id}}</p>
                    <p>库存情况：{{goodsInfo.stockQuantity}}</p>
                    <p>上架时间：{{goodsInfo.addTime | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment">商品评论</mt-button>
            </div>
        </div>
    </div>

    <!--分析：有些图片轮播图变形了很丑-->
    <!--1、首页中的图片，它的宽和高都是100%的-->
    <!--2、在商品详情页，轮播图的图片，看情况有些图片宽高为100%的话，页面不好看-->
    <!--3、商品详情页中的轮播图，期望高度是100%，宽度是自适应-->
    <!--4、经过分析，得到问题的原因，首页中的轮播图和详情页的轮播图分歧点是宽度是100%还是自适应-->
    <!--既然这两个轮播图其他方面都是没有冲突的，只是宽度有分歧，那么，我们定义一个属性
    让使用轮播图的调用者，手动指定是否为100%的宽度-->
    <!--目前不是产品图，所以没有这样的分歧-->
</template>

<script>
    //导入轮播图组件
    import swiper from '../subcomponents/swiper.vue'
    //导入数字选择框组件
    import numBox from '../subcomponents/goodsInfo_numBox.vue'
    import {toast} from 'mint-ui'
    export default{
        data(){
            return{
                id:this.$route.params.id,
                imgs:'',         //轮播图的数据
                goodsInfo:'',     //获取到商品信息
                ballFlag: false,   //控制小球隐藏和显示的标识符
                selectedCount:1    //保存用户选中商品的数量，默认为1
            }
        },
        created(){
            this.getLunboImgs()
            this.getGoodsInfo()
        },
        methods:{
            //根据产品id获取轮播图的数据，因为轮播图的组件是循环一个数组，而这里得到的是对象，需要手动成数组，再数组传递给轮播组件
            getLunboImgs(){
                this.$http.get('/getThumImages/' + this.id).then(res => {
                    //console.log(res);
                    const imgs = new Array;
                    if(res.body.status === 0){
                        res.body.messages.forEach(item => {
                            const img = item.src
                            imgs.push(img)
                        })
                        this.imgs = imgs
                    }else {
                        toast('请求数据失败')
                    }
                })
            },
            //根据产品id获取详情
            getGoodsInfo(){
                this.$http.get('/getGoodsInfo/' + this.id).then(res => {
                    //console.log(res)
                    if(res.body.status === 0){
                        this.goodsInfo = res.body.messages
                    }else {
                        toast('请求数据失败')
                    }
                })
            },
            //通过编程式导航进入图文详情页
            goDesc(){
                this.$router.push({ name: 'goDesc', params: { id : this.id }})
            },
            goComment(){
                this.$router.push({ name: 'goComment', params: { id : this.id }})
            },
            addToShopCar(){
                //添加到购物车
                this.ballFlag = true
                console.log(this.ballFlag)
            },
            beforeEnter(el){
                el.style.transform = "translate(0,0)";
            },
            enter(el, done){
                el.offsetWidth;
                //获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                //console.log(ballPosition);
                //获取徽标在页面中的位置
                const bdgePosition = document.getElementById('badge').getBoundingClientRect();
                const xDist = bdgePosition.left - ballPosition.left;
                const yDist = bdgePosition.top - ballPosition.top;
                el.style.transform = `translate(${xDist}px,${yDist}px)`;
                el.style.transition = "all 1s cubic-bezier(.07,.83,.91,.18)";
                setTimeout(function () {
                    done();                          //不定时的话，会动画之前就调用afterEnter钩子函数，看不到动画过渡效果，所以定一个与动画相等时间的定时器，再调用afterEnter
                },1000)
            },
            afterEnter(el){
                this.ballFlag = false;
                //console.log(this.ballFlag)
            },
            getSelectedCount(count){
                //当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
                this.selectedCount = count;
                console.log('父组件拿到的数量值为：' + this.selectedCount)
            }
        },
        components:{
            swiper,
            numBox
        }
    }
</script>

<style lang="less" scoped>
.goodsInfo{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height:15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top:360px;
        left:146px;
    }
}
</style>