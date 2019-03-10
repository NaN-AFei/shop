import ajax from './ajax'

// 1. 定义基础路径
const BASE_URL = '/localhost_api';

// 2. 请求的方法
// 2.1 请求首页的轮播图
export const getHomeCasual = () => ajax(BASE_URL + '/api/homecasual');
// 2.1 请求首页的导航
export const getHomeNav = () => ajax(BASE_URL + '/api/homenav');
// 2.1 请求首页的商品
export const getHomeShopList = () => ajax(BASE_URL + '/api/homeshoplist');


//3.拦截拼多多数据
const PDD_BASE_URL = '/api';
//请求推荐商品列表数据
export const getIntroShopList = (params) => ajax(PDD_BASE_URL, params);

// 4.1 请求首页的商品
export const getSearchShopList = () => ajax(BASE_URL + '/api/searchshoplist');

//5.获取短信验证码
export const getPhoneCode = (phone) => ajax(BASE_URL + '/api/send_code', { phone });

//6.手机验证码登陆
export const PhoneCodeLogin = (phone, code) => ajax(BASE_URL + '/api/login_code', { phone, code }, 'POST');

//7.用户密码登陆
export const UserCodeLogin = (name, pwd, captcha) => ajax(BASE_URL + '/api/login_pwd', { name, pwd, captcha }, 'POST');

//8.自动登陆
export const getUserInfo = () => ajax(BASE_URL + '/api/userinfo');

//9.退出登录
export const getLogOut = () => ajax(BASE_URL + '/api/logout');
