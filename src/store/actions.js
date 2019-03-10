import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getIntroShopList,
  getSearchShopList,
  getUserInfo,
  getLogOut,
} from '../api'

import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOP_LIST,
  INTRO_SHOP_LIST,
  SEARCH_SHOP_LIST,
  USER_INFO,
  RESET_USER_INFO,
  ADD_GOODS,
  DEL_GOODS,
  SELECTED_SINGER_GOODS,
  SELECTED_ALL_GOODS,
  DEL_SINGER_GOODS
} from './mutation-types'


export default {
  // 1. 获取首页轮播图
  async reqHomeCasual({ commit }) {
    const result = await getHomeCasual();
    console.log(result);
    if (200 === result.succsee_code) {
      commit(HOME_CASUAL, { home_casual: result.message });

    }
  },
  // 2. 获取首页导航
  async reqHomeNav({ commit }) {
    const result = await getHomeNav();
    console.log(result);
    if (200 === result.success_code) {
      commit(HOME_NAV, { home_nav: result.message });

    }
  },

  // 3. 获取首页商品列表
  async reqHomeShopList({ commit }) {
    const result = await getHomeShopList();
    if (200 === result.success_code) {
      commit(HOME_SHOP_LIST, { home_shop_list: result.message });

    }
  },

  // 4. 获取推荐商品列表
  async reqIntroShopList({ commit }, params) {
    const result = await getIntroShopList(params);
    setTimeout(() => {
      let scb = params.scb;
      let ecb = params.ecb;
      if (true === result.success) { //请求成功
        commit(INTRO_SHOP_LIST, { intro_shop_list: result.data });
        //执行回调
        scb && scb(result.data);
      } else {//请求失败
        ecb && ecb('请求数据失败  ');
      }
    }, 1500);
  },

  // 5. 获取搜索商品列表
  async reqSearchhopList({ commit }) {
    const result = await getSearchShopList();
    if (200 === result.success_code) {
      commit(SEARCH_SHOP_LIST, { search_shop_list: result.message.data });
    }
  },

  // 6. 同步用户信息
  syncUserInfo({ commit }, userInfo) {
    commit(USER_INFO, { userInfo });
  },

  //7.获取用户信息
  async reqUserInfo({ commit }) {
    const result = await getUserInfo();
    if (200 === result.success_code) {
      commit(USER_INFO, { userInfo: result.data });
    }
  },

  //8.退出登录清空用户数据
  async logOut({ commit }) {
    const result = await getLogOut();
    if (200 === result.success_code) {
      commit(RESET_USER_INFO);
    }
  },

  //9.购物车单个商品的增加或减少
  isAdd({ commit }, { goods, flag }) {
    if (flag) {
      commit(ADD_GOODS, { goods })
    } else {
      commit(DEL_GOODS, { goods })
    }
  },

  //10.单个商品的选中和取消
  singerGoodsSelected({ commit }, { goods }) {
    commit(SELECTED_SINGER_GOODS, { goods })
  },

  //11.是否全选
  selectedAll({ commit }, { isSelected }) {
    commit(SELECTED_ALL_GOODS, { isSelected })
  },

  //12.删除单个商品
  delgoods({ commit }, { goods }) {
    commit(DEL_SINGER_GOODS, { goods })
  }

}
