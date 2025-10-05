<template>
  <div class="home">
    <!-- 标题 -->
    <van-nav-bar
   title="智慧商城"
   />
<!-- 搜索栏 -->
 <van-search 
 readonly 
 placeholder="请输入搜索关键词" 
 shape="round"
  background="#f1f1f2"
  @click="$router.push('/search')"
 />
 <!-- 轮播图 -->
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
    <img :src="item.imgUrl" alt="" />
  </van-swipe-item>
</van-swipe>

<!-- 导航 -->
 <van-grid :column-num="5" icon-size="40">
  <van-grid-item v-for="item in navList" 
  :key="item.imgUrl" 
  :icon="item.imgUrl" 
  text="新品首发" 
  @click="$router.push('/category')"
  />
</van-grid>

<!-- 主会场 -->
 <div class="main">
  <img src="@/assets/main.png" alt="">
 </div>

<!-- 猜你喜欢 -->
 <div class="guess">
  <p class="guess-title">—— 猜你喜欢 ——</p>
  <div class="good-list">
    <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
  </div>
 </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue';
import {getHomeData} from '@/api/home.js'
export default {
  name: 'HomePage',
  components:{
    GoodsItem
  },
  data(){
    return{
      bannerList:[],//轮播
      navList:[],//导航
      proList:[],//商品
    }
  },
  async created(){
    const{data:{pageData}}=await getHomeData();
    this.bannerList=pageData.items[1].data;
    this.navList=pageData.items[3].data;
    this.proList=pageData.items[6].data;
    console.log(this.pageData);
  }
}
</script>

<style lang="less" scoped>
// 主题
.home{
  // padding-top:100px;
  padding-bottom: 50px;
}
//导航样式
.van-nav-bar{
  z-index:999;
  background-color: #0c81ca;
  font-family: 宋体;
  font-weight: bold;
  ::v-deep .van-nav-bar_title{
    color:#fff;
  }
}
// 搜索框样式
.van-search{
  // position: fixed;
  top: 46px;
  width: 100%;
  z-index: 999;
}

//轮播图
.van-swipe .van-swipe-item{
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.van-swipe .van-swipe-item img{
  width: 100%;
  height: 185px;
}

//主会场
.main img{
  display: block;
  width: 100%;
}
//猜你喜欢
.guess .guess-title{
  height: 40px;
  line-height: 40px;
  text-align: center;
}

//商品样式
.good-list{
  background-color: #f6f6f6;
}
</style>
