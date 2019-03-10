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

import Vue from 'vue'

export default {
   [HOME_CASUAL](state, { home_casual }) {
      state.homecasual = home_casual;
   },

   [HOME_NAV](state, { home_nav }) {
      state.homenav = home_nav;
   },

   [HOME_SHOP_LIST](state, { home_shop_list }) {
      state.homeshoplist = home_shop_list;
   },

   [INTRO_SHOP_LIST](state, { intro_shop_list }) {
      state.introshoplist = state.introshoplist.concat(intro_shop_list);
   },

   [SEARCH_SHOP_LIST](state, { search_shop_list }) {
      state.searchshoplist = search_shop_list;
   },

   [USER_INFO](state, { userInfo }) {
      state.userInfo = userInfo;
   },

   [RESET_USER_INFO](state) {
      state.userInfo = {};
   },

   //购物车

   [ADD_GOODS](state, { goods }) {
      if (goods.buy_count) { ///加
         goods.buy_count++;
      }
   },
   [DEL_GOODS](state, { goods }) { //减
      if (goods.buy_count) {
         goods.buy_count--;
         if (goods.buy_count === 0) {
            const index = state.cartGoods.indexOf(goods);
            state.cartGoods.splice(index, 1);
         }
      }
   },
   [SELECTED_SINGER_GOODS](state, { goods }) {
      if (goods.checked) { //存在该属性
         goods.checked = !goods.checked;
      } else { //不存在该属性
         Vue.set(goods, 'checked', true)
      }
   },
   [SELECTED_ALL_GOODS](state, { isSelected }) {
      state.cartGoods.forEach((goods, index) => {
         if (goods.checked) { // 存在该属性
            goods.checked = !isSelected;
         } else {
            Vue.set(goods, 'checked', !isSelected)
         }
      })
   },
   [DEL_SINGER_GOODS](state, { goods }) {    
         const index = state.cartGoods.indexOf(goods);
         state.cartGoods.splice(index, 1);     
   }
}
