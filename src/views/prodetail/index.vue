<template>
  <div class="prodetail">
    <van-nav-bar
  title="商品详情页"
  left-arrow
  @click-left="$route.go(-1)"
  fixed
/>
<van-swipe :autoplay="4000" @change="onChange">
  <van-swipe-item v-for="(image,index) in images" :key="index">
    <img :src="image.external_url" alt="">
  </van-swipe-item>
  <template #indicator>
    <div class="custom-indicator">{{ current + 1 }}/{{images.length}}</div>
  </template>
</van-swipe>
<!-- 商品说明 -->
 <div class="info">
  <div class="title">
    <div class="price">
      <span class="now">
        ￥{{ detail.goods_price_min }}
      </span>
      <span class="oldprice">
        ￥{{ detail.good_price_max }}
      </span>
    </div>
    <div class="sellcount">已售{{ detail.goods_sales }}</div>
    <div class="msg text-ellipsis-2">
      {{ detail.goods_name }}
    </div>
  </div>
  <div class="service">
    <div class="left-words">
      <span><van-icon name="passed" />七天无理由退货</span>
      <span><van-icon name="passed" />48小时发货</span>
    </div>
    <div class="right-icon">
      <van-icon name="arrow" />
    </div>
  </div>
 </div>

 <!-- 商品评价 -->
  <div class="comment">
    <div class="moment-title">
      <div class="left">商品评价({{ total }})</div>
      <div class="right">查看更多<van-icon name="arrow" /></div>
    </div>
    <div class="comment-list">
      <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
        <div class="top">
          <img :src="item.user.avatur_url||defaultImg" alt="">
          <div class="name">{{ item.user.nick_name }}</div>
          <van-rate :size="16" :value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee" />
        </div>
        <div class="ceontent">
          {{ item.content }}
        </div>
        <div class="time">
          {{ item.create_time }}
        </div>
      </div>
    </div>
  </div>
  <!-- 商品描述 -->
   <div class="desc" v-html="detail.content"></div>
   <div class="footer">
    <div @click="$router.push('/')" class="icon-home">
      <van-icon name="wap-home-o" />
      <span>首页</span>
    </div>
    <div @click="$router.push('/cart')" class="icon-cart">
      <span v-if="cartTotal>0" class="num">{{ cartTotal }}</span>
      <van-icon name="shopping-cart-o" />
      <span>购物车</span>
    </div>
    <div @click="addFn" class="btn-add">加入购物车</div>
    <div @click="buyNow" class="btn-buy">立刻购买</div>
   </div>
   <!-- 加入购物车/立即购买 公用的弹层 -->
    <van-action-sheet v-model="showPannel" :title="mode=='cart'?'加入购物车':'立即购买'" >
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="detail.goods_image" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ detail.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ detail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
        <span>数量</span>
        <!-- v-model本质上:value和@input的简写 -->
        <CountBox v-model="addCount"></CountBox>
        </div>
       <!-- 有库存显示提交按钮 -->
       <div class="showbtn" v-if="detail.stock_total>0">
        <div class="btn" v-if="mode=='cart'" @click="addCart">加入购物车</div>
        <div class="btn now" v-else @click="goBuyNow">立即购买</div>
       </div>
       <div class="btn-none" v-else>该商品已抢完</div>
     </div>
    </van-action-sheet>/>
  </div>
</template>

<script>
import { getProComments,getProDetail } from '@/api/product';
import defaultImg from '@/assets/default-avatar.png'
import CountBox from '@/components/CountBox.vue'
import { addCart } from '@/api/cart';
import loginConfirm from '@/mixins/loginConfirm';
export default {
  name: 'ProDetail',
  mixins:[loginConfirm],
  components:{
    CountBox
  },
  data(){
    return{
      images:[],
      current:0,
      detail:{},
      total:0,//评价总数
      commentList:[],//评价列表
      defaultImg,//默认头像
      showPannel:false,//是否显示弹层
      mode:'cart',//弹层模式 cart:加入购物车  buy:立即购买
      addCount:1,//数字框绑定的状态
      cartTotal:0//购物车角标
    }
  },
  computed:{
    goodsId(){
      return this.$route.params.id;
    }
  },
  created(){
    this.getDetail()
    this.getComments()
  },
  methods:{
    onChange(index){
      this.current=index;
    },
    async getDetail(){
      const{data:{datail}}=await getProDetail(this.goodsId)
      this.detail=datail;
      this.images=datail.goods_images;
      console.log(this.images);
    },
    async getComments(){
      const{data:{list,total}}=await getProComments(this.goodsId,3)
      this.commentList=list
      this.total=total
    },
    addFn(){
      this.mode='cart'
      this.showPannel=true;
    },
    buyNow(){
      this.mode='buyNow'
      this.showPannel=true;
    },
    async addCart(){
      if(this.loginConfirm()){
        return
      }
      const{data}=await addCart(this.goodsId,this.addCount,this.deatil.skuList[0].goods_sku_id)
      this.cartTaotal=data.cartTotal
      this.$toast('加入购物车成功')
      this.showPannel=false
    },
    goBuyNow(){
      if(this.loginConfirm()){
        return
      }
      this.$router.push({
        path:'/pay',
        query:{
          mode:'buyNow',
          goodsId:this.goodsId,
          goodsSkuId:this.detail.skuList[0].goods_sku_id,
          goodNum:this.addCount
        }
      })
    }
  }
}
</script>

<style>

</style>
