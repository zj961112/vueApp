# vue_cms

> A Vue.js project，这是一个练习的项目，牛不牛逼用心去感受

##制作首页APP组件
1、完成Header区域，使用的是mint-ui中的header组件
2、制作底部的tabbar区域，使用的是MUI的Tabbar.html
    +在制作 购物车 小图标的时候，操作会多一点
    +先把 扩展图标的css样式，拷贝到项目中
    +拷贝扩展图标字体库 ttf 文件，到项目中
    +为 购物车 小图标，添加如下样式 'mui-icon mui-icon-extra mui-icon-extra-cart'
3、要在中间区域放置一个router-view来展示路由匹配到的组件

##改造tabbar 为router-link

##设置路由高亮

##点击tabbar 中的路由链接，展示对应的路由组件

##制作首页轮播图布局

##加载首页轮播图数据
1、获取数据，如何获取？使用vue-resource
2、使用 vue-resource的this.$http.get获取数据，这里涉及到跨域问题，改一下config 的 index文件
3、获取到的数据，要保存到data身上
4、使用v-for循环渲染每个index项

##改造 九宫格 区域的样式

##改造 新闻资讯路由链接

##新闻资讯页面制作
1、绘制页面 使用mui中的media-list.html
2、使用vue-resource 获取数据
3、渲染真是数据

##实现新闻资讯列表点击跳转到新闻详情
1、把列表中的每一项改造为router-link,在跳转时候应该提供唯一标识符
2、创建新闻详情的组件页面
3、在 路由模块中，将新闻详情的路由地址和组件页面对应起来

##实现新闻详情的页面布局和数据渲染

##单独封装一个 评论 子组件
1、绘制页面
2、在需要使用comment的组件中导入，映射成标签
3、使用vue-resource 获取数据
4、渲染真是数据