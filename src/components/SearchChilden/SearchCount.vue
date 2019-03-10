<template>
  <div class="shop">
    <div class="menu-wrapper">
      <ul>
        <li
          :class="{current:currentIndex === index}"
          class="menu-item"
          v-for="(item ,index) in searchshoplist"
          :key="index"
          @click="clickLeftLi(index)"
          ref="menulist"
        >
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="shop-wrapper">
      <ul>
        <li class="shops-li" v-for="(item ,index) in searchshoplist" :key="index">
          <!-- 上 -->
          <div class="shops-title">
            <h4>{{item.name}}</h4>
            <a href>查看更多 ></a>
          </div>
          <!-- 下 -->
          <ul class="shops-items">
            <li v-for="(item ,index) in item.items" :key="index">
              <img :src="item.icon" alt>
              <span>{{item.title}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//引入数据
import { mapState } from "vuex";

//引入better-scroll
import BScroll from "better-scroll";
export default {
  name: "SearchCount",
  data() {
    return {
      scrollY: 0, //右侧滑动的Y轴坐标(实时更新)
      rightLiTops: [] //所有分类的头部位置数组
    };
  },
  computed: {
    ...mapState(["searchshoplist"]),
    //动态计算左侧哪一个选项被选中
    currentIndex() {
      const { scrollY, rightLiTops } = this;
      //取出索引
      return rightLiTops.findIndex((liTop, index) => {
        this._leftScroll(index);
        return scrollY >= liTop && scrollY < rightLiTops[index + 1];
      });
    }
  },
  methods: {
    //1.初始化滚动的视图
    _initBScroll() {
      //1.1关联左边的视图
      this.leftScroll = new BScroll(".menu-wrapper", {});
      //1.2关联左边的视图
      this.rightScroll = new BScroll(".shop-wrapper", {
        probeType: 3
      });
      //1.3监听右边的滚动
      this.rightScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    //2.计算右侧板块的高度
    _initRightLiTops() {
      //定义一个临时数组
      let tempArr = [];
      //定义变量计算高度
      let top = 0;
      tempArr.push(top);
      //取出所有的板块
      let allList = this.$el.getElementsByClassName("shops-li");
      Array.prototype.slice.call(allList).forEach((li, index) => {
        //判断是否是最后一个li模块 让他加一个下外边距
        if (index === allList.length - 1) {
          li.style.paddingBottom = `${window.innerHeight -
            li.clientHeight -
            100}px`;
        }
        top += li.clientHeight;
        tempArr.push(top);
      });
      // console.log(tempArr);
      //更新数据
      this.rightLiTops = tempArr;
    },
    //3.点击左侧实现右侧联动
    clickLeftLi(index) {
      this.scrollY = this.rightLiTops[index];
      this.rightScroll.scrollTo(0, -this.scrollY, 300);
    },
    //4.左边联动
    _leftScroll(index) {
      //取出所有的li标签
      let menuLi = this.$refs.menulist;
      //滚动到对应的位置
      this.leftScroll.scrollToElement(menuLi[index], 0, 0, -100);
    }
  },
  watch: {
    //深度监视 数据加载完成 再初始化
    searchshoplist() {
      this.$nextTick(() => {
        // 1.1 初始化
        this._initBScroll();
        //1.2 计算出右边各个板块的头部高度
        this._initRightLiTops();
      });
    }
  }
};
</script>

<style scoped lang="less">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.shop {
  padding: 0;
  margin: 0;
  display: flex;
  position: absolute;
  top: 5rem;
  bottom: 5rem;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    background-color: #e0e0e0;
    width: 8rem;
    flex: 0 0 8rem;
    .menu-item {
      width: 100%;
      height: 6rem;
      background-color: #fafafa;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: lighter;
      color: #666666;
      position: relative;
    }
    .current {
      color: #e02e24;
    }

    .current::before {
      content: "";
      background-color: #e02e24;
      width: 0.4rem;
      height: 3rem;
      position: absolute;
      left: 0;
    }
  }

  .shop-wrapper {
    flex: 1;
    background-color: #fff;
    .shops-title {
      display: flex;
      flex-direction: row;
      padding: 0 10px;
      height: 4.4rem;
      align-items: center;
      justify-content: space-between;
      color: #999;
    }
    a {
      color: #999;
      text-decoration: none;
      font-weight: lighter;
    }
  }
  .shops-items {
    display: flex;
    flex-wrap: wrap;
    li {
      display: flex;
      flex-direction: column;
      width: 33.3%;
      height: 9rem;
      justify-content: center;
      align-items: center;
      color: #666;
      font-weight: lighter;
      font-size: 1.4rem;
      img {
        width: 60%;
        height: 60%;
        margin-bottom: 0.5rem;
      }
    }
  }
  //   .phone-type
  //    width 100%
  //     display flex
  //      flex-direction row
  //      flex-wrap wrap
  //     border-bottom-1px(#ccc)
  //      li width 33.3% display flex justify-content center
  //     align-items center margin 5px 0 img width 70%;
}
</style>