<template>
  <div class="search">
    <van-nav-bar
  title="商品搜索"
  left-arrow
  @click-left="$router.go(-1)"
/>
<van-search v-model="search" show-action placeholder="请输入搜索关键词" clearable>
  <template #action>
    <div @click="goSearch(search)">搜索</div>
  </template>
</van-search>
<!-- 搜索历史 -->
 <div class="search-history" v-if="history.length>0">
  <div class="title">
    <span>最近搜索</span>
    <van-icon @click="clear" name="delete-o" size="16px"/>
  </div>
  <div class="history">
    <div v-for="item in history" :key="item" class="list-item" @click="goSearch(item)">
      {{item}}
    </div>
  </div>
 </div>
  </div>
</template>

<script>
import { getHistoryList,setHistoryList } from '@/utils/storage';  
export default {
  name: 'SearchIndex',
  data(){
    return{
      search:'',//搜索关键词的内容
      history:getHistoryList()//获取历史记录
    }
  },
  methods:{
    goSearch(key){
      console.log('进行了搜索,搜索历史要更新',key);
      const index=this.history.indexOf(key);
      if(index!==-1){
        //存在相同的项，将原有关键字删除
        //splice(下标,删除几项)
        this.history.splice(index,1);
      }
      this.history.unshift(key);//将最新搜索的关键字添加到数组的最前面
      setHistoryList(this.history);//将最新的历史记录存储到本地
      //跳转到搜索列表页
      this.$router.push(`/searchlist?search=${key}`);
    },
    clear(){
      this.history=[];
      setHistoryList(this.history);
    }
  }
}
</script>

<style lang="less" scoped>
.search{
  // .searchBtn{
  //   background-color: #fa2209;
  //   color: #fff;
  // }
  ::v-deep .van-search__action{
    background-color: #1591de;
    color:#fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list{
    display: flex;
    justify-content: flex-start;//对齐方式:使弹性项从容器的起始位置（左对齐）开始排列
    flex-wrap: wrap;//换行处理:当弹性项超出容器宽度时，会自动换行到下一行
    padding: 0 10px;
    gap: 5%;//间距设置,行与行之间的间距为容器宽度的 5%
  }
  .list-item{
    width: 30%;
    text-align: center;
    padding:7px;
    line-height: 15px;
    border-radius:50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;//防止换行
    text-overflow: ellipsis;//超出部分显示省略号
    margin-bottom: 10px;
    margin-right:10px;
    ::v-deep{
      display: inline-block;
    }
  }
}
</style>
