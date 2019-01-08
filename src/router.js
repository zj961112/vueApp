import VueRouter from 'vue-router'
//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/newsList.vue'
import NewsInfo from './components/news/newsInfo.vue'
import PhotoList from './components/photos/photoList.vue'
import PhotoInfo from './components/photos/photoInfo.vue'
import GoodsList from './components/goods/goosList.vue'
import GoodsInfo from './components/goods/goodsInfo.vue'
import GoodsDesc from './components/goods/goodsDesc.vue'
import GoodsComment from './components/goods/goodsComment.vue'

//创建路由对象
var router = new VueRouter({
    routes:[    //配置路由规则
        {path:'/',redirect:'/home'},
        {path:'/home', component: HomeContainer},
        {path:'/member', component: MemberContainer},
        {path:'/shopcar', component: ShopcarContainer},
        {path:'/search', component: SearchContainer},
        {path:'/home/newsList',component:NewsList},
        {path:'/home/newsinfo/:id',component:NewsInfo},
        {path:'/home/imgShare',component:PhotoList},
        {path:'/home/getImageInfo/:id',component:PhotoInfo},
        {path:'/home/buyGoods',component:GoodsList},
        {path:'/home/getGoodsInfo/:id',component:GoodsInfo},
        {path:'/home/getGoodsDesc/:id',component:GoodsDesc,name:'goDesc'},
        {path:'/home/getGoodsComment/:id',component:GoodsComment,name:'goComment'}
    ],
    linkActiveClass:'mui-active'   //覆盖默认的路由高亮的类，默认的类叫做router-link-active
});

//把路由对象暴露出去
export default router
