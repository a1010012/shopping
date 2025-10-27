<template>
  <div class="category">
    <van-nav-bar
  title="全部分类"
/>
<!-- 搜索框 -->
 <van-search 
 placeholder="请输入搜索关键词" 
 background="#f1f1f2"
 readonly
 shape="round"
 @click="$router.push('/search')"
 />
 <!-- 分类列表 -->
  <div class="list-box">
    <div class="left">
      <ul>
        <li v-for="(item,index) in list" :key="item.category_id">
          <!-- href="javascript:;" 阻止默认行为，仅作为 “点击按钮” 使用（不跳转） -->
        <a :class="{active:index===activeIndex}" @click="activeIndex=index" href="javascript:;">{{ item.name }}</a>
      </li>
      </ul>
    </div>
    <div class="right">
      <div @click="$router.push( `/searchlist?categoryId=${item.category_id}`)" 
      v-for="item in list[activeIndex]?.children" 
      :key="item.category_id"
      class="cate-goods">
      <img :src="item.image?.external_url" alt="">
      <p>{{ item.name }}</p>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import {getCategoryData} from '@/api/category';
export default {
  name: 'CategoryPage',
  created(){
    this.getCategoryList();
  },
  data(){
    return{
      list:[],
      activeIndex:0
    }
  },
  methods:{
    async getCategoryList(){
      const{data:{list}}=await getCategoryData()
      this.list=list;
      console.log(list);
    }
  }
}
</script>

<style lang="less" scoped>
.category{
  // padding-top:100px;
  padding-bottom:150px;
  height: 100vh;
  .list-box{
    height:100%;
    display:flex;
    .left{
      width: 85px;
      height: 100%;
      background-color: #f3f3f3;
      overflow: auto;
      a{
        display: block;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color:#444444;
        font-size:12px;
        // 定义元素的激活 / 选中状态样式
        &.active{
          color: #fb442f;
          background-color: #fff;
        }
      }
    }
    .right{
      flex: 1;
      height: 100%;
      background-color: #ffffff;
      display: flex;
      // 允许弹性子元素换行
      flex-wrap: wrap;
      // 弹性子元素在主轴（默认水平方向）上左对齐排列
      justify-content: flex-start;
      // 当子元素因换行形成 “多行” 时，这些行在交叉轴（垂直方向）上顶部对齐
      align-content: flex-start;
      padding: 10px 0;
      // 当内部内容高度超出容器时，自动显示滚动条
      overflow: auto;
      .cate-goods{
        width: 33.3%;
        margin-bottom: 10px;
        img{
          height: 70px;
          width: 70px;
          display: block;
          margin: 5px auto;
        }
        p{
          text-align: center;
          font-size:12px;
        }
      }
    }
  }
  // 导航条
  .van-nav-bar{
    z-index: 999;
  }
  // 搜索框
  .van-search{
    // position: fixed;
    width: 100%;
    // top: 46px;
    z-index: 999;
  }
}
</style>
