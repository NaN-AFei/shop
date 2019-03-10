import Vue from 'vue'
import Router from 'vue-router'
//home顶部tab
import LyTab from 'ly-tab'

//引入一级路由
import Home from '@/pages/Home/Home'
import Chat from '@/pages/Chat/Chat'
import Intro from '@/pages/Intro/Intro'
import Mine from '@/pages/Mine/Mine'
import Search from '@/pages/Search/Search'
import Login from '@/pages/Login/Login'

//引入二级路由
// import Baby from '@/components/HomeChilden/Baby'
// import Baihuo from '@/components/HomeChilden/Baihuo'
// import Dianqi from '@/components/HomeChilden/Dianqi'
// import Foot from '@/components/HomeChilden/Foot'
// import Hot from '@/components/HomeChilden/Hot/Hot'
// import Men from '@/components/HomeChilden/Men'
// import Phone from '@/components/HomeChilden/Phone'
// import Underwear from '@/components/HomeChilden/Underwear'
// import Women from '@/components/HomeChilden/Women'

const Baby = () => import('@/components/HomeChilden/Baby');
const Baihuo = () => import('@/components/HomeChilden/Baihuo');
const Dianqi = () => import('@/components/HomeChilden/Dianqi');
const Foot = () => import('@/components/HomeChilden/Foot');
const Hot = () => import('@/components/HomeChilden/Hot/Hot');
const Men = () => import('@/components/HomeChilden/Men');
const Phone = () => import('@/components/HomeChilden/Phone');
const Underwear = () => import('@/components/HomeChilden/Underwear');
const Women = () => import('@/components/HomeChilden/Women');

Vue.use(Router)
Vue.use(LyTab)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        { path: 'hot', name: "hot", component: Hot, meta: { showTabBar: true } },
        { path: 'women', name: "women", component: Women, meta: { showTabBar: true } },
        { path: 'underwear', name: "underwear", component: Underwear, meta: { showTabBar: true } },
        { path: 'baby', name: "baby", component: Baby, meta: { showTabBar: true } },
        { path: 'baihuo', name: "baihuo", component: Baihuo, meta: { showTabBar: true } },
        { path: 'men', name: "men", component: Men, meta: { showTabBar: true } },
        { path: 'phone', name: "phone", component: Phone, meta: { showTabBar: true } },
        { path: 'dainqi', name: "dainqi", component: Dianqi, meta: { showTabBar: true } },
        { path: 'foot', name: "foot", component: Foot, meta: { showTabBar: true } },
        { path: '/home', redirect: '/home/hot' }
      ]
    },
    { path: '/intro', name: 'Intro', component: Intro, meta: { showTabBar: true } },
    { path: '/search', name: 'Search', component: Search, meta: { showTabBar: true } },
    { path: '/chat', name: 'Chat', component: Chat, meta: { showTabBar: true } },
    { path: '/mine', name: 'Mine', component: Mine, meta: { showTabBar: true } },
    { path: '/login', name: 'Login', component: Login },
    { path: '/', redirect: '/home' }
  ]
})


// var getNumbers = () => {
//   return Promise.resolve([1, 2, 3])
// }
// var multi = num => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (num) {
//         resolve(num * num)
//       } else {
//         reject(new Error('发生错误'))
//       }
//     }, 1000)
//   })
// }
// async function test() {
//   var nums = await getNumbers()
//   nums.forEach(async x => {
//     var res = await multi(x)
//     console.log(res)
//   })
// }
// test()
