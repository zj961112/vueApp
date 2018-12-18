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
4、渲染真实数据

##获取所有评论数据显示到页面中

##实现点击加载更多评论的功能
1、为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2、点击加载更多，让pageIndex++，然后重新调用this.getcomments()
方法重新获取新一页数据
3、为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据
应该让老数据调用数组的concat方法，拼接上新数据

##发布评论
1、把文本框做双向数据绑定
2、为发表按钮绑定一个事件
3、校验评论内容是否为空，若为空，则提示用户不能为空
4、通过vue-resource发送一个请求，把评论内容提交给服务器
5、当发表评论OK后，重新刷新列表，以查看最新的评论
+如果调用getcomments方法，重新刷新评论列表，可能只能得到最右一页的评论，前几页的评论获取不到
+换一种思路：当评论成功后，在客户端，手动拼接一个最新的评论对象，然后调用数据的
unshift方法，把最新的评论追加到data中comments的开头，这样就能实现刷新评论列表需求

##改造图片分析 按钮为 路由的链接并显示对应的组件页面

##绘制图片列表组件页面结构，并美化样式
1、制作 顶部的滑动条
2、制作 底部的图片列表

##制作顶部滑动条的坑们：
1、需要借助mui中的tab-top-webview-main.html
2、需要把slider区域的mui-fullscreen去掉
3、滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要初始化一下：
    +导入mui.js
    +调用官方提供的方式去初始化：
    mui('.mui-scroll-wrapper').scroll({
    	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
4、我们在初始化滑动条的时候，导入的mui.js，控制台报错：Uncaught TypeError: 'caller', 'callee', and 'arguments' 
properties may not be accessed on strict mode functions or the arguments objects for calls to them
+经过合理的推测，可能是mui.js用到了'caller', 'callee', and 'arguments'东西，但是，webpack打包好的
bundle.js中，默认是启用严格模式的，所以这两者冲突了。
    +解决方案：1、把mui.js中的非严格模式的代码改掉，但是不现实
    2、把webpack打包时候的严格模式禁用掉，先安装插件$ npm install babel-plugin-transform-remove-strict-mode
    再.babelrc文件中添加以下内容即可
    {
      "plugins": ["transform-remove-strict-mode"]
    }
    还出现错误的话，原因：babel在将js文件转码为ES5时，默认使用严格模式，而在严格模式下，为了安全起见是不能用caller,callee,arguments等属性的。
    解决：修改bablerc文件的配置，让项目忽略第三方js的转码。
    "ignore": [
        "./src/lib/js/mui.min.js"
    ]
5、严格模式解决后，会出现警告：mui.min.js?2411:8 [Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive.
   是以为chrome为了提高页面的滑动流畅度而新折腾出来的一个东西
   解决办法：在使用到滑动页面加上样式：*{
                                     touch-action: pan-y;
                                 }
6、在mui文件库复制代码时，最后点击源代码在复制，不要直接复制，会把当时js新加的代码给一起复制上，然后效果一直是定死了。
7、刚进入 图片分享页面的时候，滑动条无法正常工作，经过分析，发现如果要初始化 滑动条，必须要等DOM元素加载完毕，
所以把初始化滑动条的代码搬到了 mounted 生命周期函数中。
8、当滑动条调试ok后，发现tabbar无法正常工作了，这时候，需要把每个tabbar按钮的样式中的 'mui-tab-item'重新改一下名字
9、获取所有分类，并渲染分类列表

##制作图片列表区域
1、图片列表需要使用懒加载技术，可以使用mint-ui提供的现成的组件"lazy-load"
2、根据‘lazy-load’的使用文档，尝试使用
3、渲染图片列表数据asfsafew