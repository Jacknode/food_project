export default {
  loadingShow(state){
    return state.loadingShow
  },
  //初始化动画
  transtionActive(state){
    return state.transtionActive
  },
  //初始化美食类型
  foodTypeList(state){
    return state.foodTypeList
  },
  //初始化修改美食类型obj
  updateObj(state){
    return state.updateObj
  },
  //餐厅信息
  restaurantInformationList(state){
    return state.restaurantInformationList
  },
  //初始化修改餐厅obj
  updateRestaurantInformationObj(state){
    return state.updateRestaurantInformationObj;
  },
  //初始化餐厅美食
  restaurantCuisineList(state){
    return state.restaurantCuisineList
  },
  //初始化修改美食obj
  restaurantCuisineObj(state){
    return state.restaurantCuisineObj
  },
  //美食订单
  foodOrderList(state){
    return state.foodOrderList
  },
  //初始化修改美食订单obj
  foodOrderObj(state){
    return state.foodOrderObj
  },
  //初始化餐厅评论
  restaurantReviewsList(state){
    return state.restaurantReviewsList;
  },
  //修改餐厅评论obj
  updateRestaurantReviewsObj(state){
    return state.updateRestaurantReviewsObj
  }
}
