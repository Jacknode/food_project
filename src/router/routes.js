import Login from '@/components/Login' //登录
import Home from '@/components/Home' //首页
import RestaurantInformation from '@/components/RestaurantInformation' //餐厅商户
import FoodType from '../components/FoodType' //美食类型
import RestaurantCuisine from '../components/RestaurantCuisine' //餐厅美食
import FoodOrder from '../components/FoodOrder' //餐厅美食
import RestaurantReviews from '../components/RestaurantReviews' //餐厅美食
export default[
  {
    path : '/login',
    component : Login,
    name : 'Login'
  },
  {
    path : '/',
    component : Login,
    name : ''
  },
  {
    path : '/home',
    component : Home,
    name : 'Home',
    children:[
      {
        path: 'restaurantInformation',
        components: {
          default: Home,
          User: RestaurantInformation
        },
        name:'RestaurantInformation'
      },
      {
        path: 'foodType',
        components: {
          default: Home,
          User: FoodType
        },
        name:'FoodType'
      },
      {
        path: 'restaurantCuisine',
        components: {
          default: Home,
          User: RestaurantCuisine
        },
        name:'RestaurantCuisine'
      },
      {
        path: 'foodOrder',
        components: {
          default: Home,
          User: FoodOrder
        },
        name:'FoodOrder'
      },
      {
        path: 'restaurantReviews',
        components: {
          default: Home,
          User: RestaurantReviews
        },
        name:'RestaurantReviews'
      },
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/login' }
  }
]
