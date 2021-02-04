import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决vue-router重复点击菜单报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const Auth = () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue')
const Bindphone = () => import(/* webpackChunkName: "home" */ '../views/Bindphone.vue')
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
const ChargeDetails = () => import(/* webpackChunkName: "home" */ '../views/ChargeDetails.vue')
const FailureReport = () => import(/* webpackChunkName: "home" */ '../views/FailureReport.vue')
const CbtxLogin = () => import(/* webpackChunkName: "home" */ '../views/CbtxLogin.vue')

const Order = () => import(/* webpackChunkName: "home" */ '../views/Order.vue')

const UsingRecord = () => import(/* webpackChunkName: "home" */ '../views/UsingRecord.vue')
const EquipmentRegister = () => import(/* webpackChunkName: "home" */ '../views/EquipmentRegister.vue')
const Registered = () => import(/* webpackChunkName: "home" */ '../views/Registered.vue')


const InCharging = () => import(/* webpackChunkName: "home" */ '../views/InCharging.vue')
const Fault = () => import(/* webpackChunkName: "home" */ '../views/Fault.vue')
const RegisterSuccess = () => import(/* webpackChunkName: "home" */ '../views/RegisterSuccess.vue')
const CbtxRegister = () => import(/* webpackChunkName: "home" */ '../views/CbtxRegister.vue')

const CbtxRegistedSuccess = () => import(/* webpackChunkName: "home" */ '../views/CbtxRegistedSuccess.vue')

const FindNum = () => import(/* webpackChunkName: "home" */ '../views/FindNum.vue')
const NumList = () => import(/* webpackChunkName: "home" */ '../views/NumList.vue')


const routes = [
  { path: '/', redirect: '/auth' },
  {
    path: '/auth', name: 'Auth', component: Auth,
    meta: { title: '米京快充' }
  },
  {
    path: '/bindphone', name: 'Bindphone', component: Bindphone,
    meta: { title: '绑定手机号' }
  },
  {
    path: '/home', name: 'Home', component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/chargeDetails', name: 'ChargeDetails', component: ChargeDetails,
    meta: { title: '充电详情' }
  },
  {
    path: '/failureReport', name: 'FailureReport', component: FailureReport,
    meta: { title: '故障上报' }
  },

  {
    path: '/cbtxLogin', name: 'CbtxLogin', component: CbtxLogin,
    meta: { title: '藏宝天下' }
  },

  {
    path: '/order', name: 'Order', component: Order, meta:
      { title: '我的订单' }
  },
  {
    path: '/usingRecord', name: 'UsingRecord', component: UsingRecord,
    meta: { title: '订单详情' }
  },
  {
    path: '/equipmentRegister', name: 'EquipmentRegister', component: EquipmentRegister,
    meta: { title: '设备注册' }
  },
  {
    path: '/registered', name: 'Registered', component: Registered,
    meta: { title: '设备注册' }
  },
  {
    path: '/inCharging', name: 'InCharging', component: InCharging,
    meta: { title: '充电详情' }
  },

  {
    path: '/fault', name: 'Fault', component: Fault,
    meta: { title: '故障选项' }
  },
  {
    path: '/registerSuccess', name: 'RegisterSuccess', component: RegisterSuccess,
    meta: { title: '设备注册' }
  },
  

  {
    path: '/cbtxRegister', name: 'CbtxRegister', component: CbtxRegister,
    meta: { title: '藏宝天下' }
  },
  {
    path: '/cbtxRegistedSuccess', name: 'CbtxRegistedSuccess', component: CbtxRegistedSuccess,
    meta: { title: '藏宝天下' }
  },
  {
    path: '/findNum', name: 'findNum', component: FindNum,
    meta: { title: '找回伯乐号' }
  },
  {
    path: '/numList', name: 'numList', component: NumList,
    meta: { title: '找回伯乐号' }
  },
  
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next()
});
export default router
