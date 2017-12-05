import getters from './getters';
const state = {
  //loading加载动画
  loadingShow:false,
  //初始化动画
  transtionActive:{
    isActive:false,
    isRotateInDownRight:false
  },
  //初始化美食类型
  foodTypeList:[],
  foodTypeListKeyword:[],
  //初始化修改数据obj
  updateObj:{},
  //餐厅信息
  restaurantInformationList:[],
  //初始化修改餐厅obj
  updateRestaurantInformationObj:{},
  //初始化餐厅美食
  restaurantCuisineList:[],
  //初始化修改美食obj
  restaurantCuisineObj:{},
  //美食订单
  foodOrderList:[],
  //初始化修改美食订单obj
  foodOrderObj:{},
  //餐厅评论
  restaurantReviewsList:[],
  //餐厅评论修改obj
  updateRestaurantReviewsObj:{},
}
const mutations = {
  //loading动画过渡
  showLoading(state){
    state.loadingShow = true
  },
  hideLoading(){
    state.loadingShow = false
  },
  //初始化动画
  setTranstionFalse(state){
    state.transtionActive = {
      isActive:false,
      isRotateInDownRight:false
    }
  },
  oPTranstionFalse(){
    state.transtionActive = {
      isActive:!state.transtionActive.isActive,
      isRotateInDownRight:!state.transtionActive.isRotateInDownRight
    }
  },
  //初始化美食类型数据
  initFoodTypeList(state,data){
    state.foodTypeList = state.foodTypeListKeyword= data;
  },
  //筛选美食类型名称
  filterFoodTypeName(state,name){
    state.foodTypeList = state.foodTypeListKeyword.filter(item=>{
      if(item.ft_FoodTypeName.includes(name)){
        return true;
      }
      return false
    })
  },
  //添加美食类型
  addFoodType(state,data){
    state.foodTypeList.push(data);
  },
  //删除美食类型
  filterFoodType(state,id){
    state.foodTypeList = state.foodTypeList.filter(item=>{
      if(item.ft_FoodTypeCode==id){
        return false
      }
      return true
    })
  },
  //初始化修改数据obj
  initUpdateObj(state,id){
    state.updateObj = state.foodTypeList.filter(item=>{
      if(item.ft_FoodTypeCode==id){
        return true
      }
      return false
    })[0]
  },
  //初始化餐厅信息
  initRestaurantInformation(state,data){
    state.restaurantInformationList = data;
  },
  //初始化修改餐厅obj
  initUpdateRestaurantInformationObj(state,id){
    state.updateRestaurantInformationObj = state.restaurantInformationList.filter(item=>{
      if(item.si_ShopCode==id){
        return true
      }
      return false;
    })[0]
  },
  //删除餐厅信息
  filterRestaurantInformation(state,id){
    state.restaurantInformationList = state.restaurantInformationList.filter(item=>{
      if(item.si_ShopCode==id){
        return false
      }
      return true;
    })
  },
  //初始化餐厅美食
  initRestaurantCuisine(state,data){
    state.restaurantCuisineList = data;
  },
  //初始化修改美食obj
  initRestaurantCuisineObj(state,id){
    state.restaurantCuisineObj = state.restaurantCuisineList.filter(item=>{
      if(item.ss_Code==id){
        return true;
      }
      return false;
    })[0]
  },
  //删除餐厅美食
  filterRestaurantCuisine(state,id){
    state.restaurantCuisineList = state.restaurantCuisineList.filter(item=>{
      if(item.ss_Code==id){
        return false
      }
      return true;
    })
  },
  //美食订单
  initFoodOrder(state,data){
    state.foodOrderList = data;
  },
  //初始化修改美食订单obj
  initFoodOrderObj(state,id){
    state.foodOrderObj = state.foodOrderList.filter(item=>{
      if(item.so_OrderID==id){
        return true
      }
      return false;
    })[0]
  },
  //删除美食订单
  filterFoodOrder(state,id){
    state.foodOrderList = state.foodOrderList.filter(item=>{
      if(item.so_OrderID==id){
        return false;
      }
      return true
    })
  },
  //初始化餐厅评论
  initRestaurantReviews(state,data){
    for(var i=0;i<data.length;i++){
      state.restaurantInformationList.forEach(item=>{
        if(Number(data[i].cm_ShopInfoCode)===Number(item.si_ShopCode)){
          data[i].shopName = item.si_ShopName
        }
      })
    }
    state.restaurantReviewsList = data;
  },
  //初始化修改餐厅评论
  initUpdateRestaurantReviewsObj(state,id){
    state.updateRestaurantReviewsObj = state.restaurantReviewsList.filter(item=>{
      if(item.cm_Code==id){
        return true;
      }
      return false
    })[0]
  },
  //删除评论
  filterRestaurantReviews(state,id){
    state.restaurantReviewsList = state.restaurantReviewsList.filter(item=>{
      if(item.cm_Code==id){
        return false
      }
      return true;
    })
  }
}
export default {
  state,
  getters,
  mutations
}
