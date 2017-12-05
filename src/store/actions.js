import {
  postPromise,
  IsBackCode
} from '../assets/js/public'
export default {
  //首页初始化
  initData({
      commit
    }) {
      commit('showLoading');
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/GetFoodTypeList', {
            SelectType: '',
            Value: ''
          })
          .then(data => {
            let resulte = JSON.parse(data);
            if (Number(resulte.backCode) == 200) {
              commit('initFoodTypeList', resulte.goodTypeList)
            } else {
              reject(resulte.backResult)
            }
          })
        postPromise('http://114.55.248.116:345/FoodService.asmx/GetShopInfoList', {
            SelectType: '',
            TypeValue: ''
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              commit('initRestaurantInformation', data.goodShopInfoList)
              relove();
            }
          })
      })
    },
    //初始化美食类型
    initFoodTypeList({
      commit
    }) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/GetFoodTypeList', {
            SelectType: '',
            Value: ''
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              commit('initFoodTypeList', data.goodTypeList)
              relove()
            } else {
              reject(data.backResult)
            }
          })
      })
    },
    //添加美食类型
    addFoodTypeAction({
      commit
    }, data) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/AddFoodType', {
            FoodTypeName: data.FoodTypeName,
            Remark: data.Remark
          })
          .then(data => {
            let resulte = JSON.parse(data);
            if (Number(resulte.backCode) == 200) {
              relove()
            } else {
              reject(resulte.backResult)
            }
          })
      })
    },
    //删除美食类型
    deleteFoodType({
      commit
    }, id) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/DeleteFoodType', {
            FoodTypeCode: id
          })
          .then(data => {
            var data = JSON.parse(data)
            if (Number(data.backCode) == 200) {
              commit('filterFoodType', id)
              relove(data)
            } else {
              reject(data.backResult)
            }
          })
      })
    },
    //修改美食类型
    updateFoodTypeAction({
      commit
    }, data) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/UpdateFoodType', {
            FoodTypeCode: data.ft_FoodTypeCode,
            FoodTypeName: data.ft_FoodTypeName,
            Remark: data.ft_Remark,
            IsDelete: 0
          })
          .then(data => {
            var data = JSON.parse(data)
            if (Number(data.backCode) == 200) {
              relove()
            } else {
              reject(data.backResult)
            }
          })
      })
    },
    //初始化餐厅信息
    initRestaurantInformation({
      commit
    }, search) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/GetShopInfoList', {
            SelectType: search.key,
            TypeValue: search.value
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              commit('initRestaurantInformation', data.goodShopInfoList)
              relove();
            } else {
              reject(data.backResult)
            }
          })
      })
    },
    //添加餐厅信息
    addRestaurantInformation({
      commit
    }, data) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/AddShopInfo', data)
          .then(data => {
            var data = JSON.parse(data);
            console.log(data)
            if (Number(data.backCode) == 200) {
              relove();
            } else {
              reject(data.backResult);
            }
          })
      })
    },
    //修改餐厅信息
    updateRestaurantInformation({
      commit
    }, data) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/UpdateShopInfo', {
            ShopCode: data.si_ShopCode,
            ShopName: data.si_ShopName,
            Tables: data.si_Tables,
            Score: data.si_Score,
            Address: data.si_Address,
            WorkTime: data.si_WorkTime,
            WAFI: data.si_WAFI,
            Telephone: data.si_Telephone,
            Provice: data.si_Provice,
            City: data.si_City,
            Contry: data.si_Contry,
            Image1: '',
            Image2: '',
            Image3: '',
            Introduce: data.si_Introduce,
            Isdelete: 0
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              relove();
            } else {
              reject(data.backResult);
            }
          })
      })
    },
    //删除餐厅信息
    filterRestaurantInformation({
      commit
    }, id) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/DeleteShopInfo', {
            ShopCode: id
          })
          .then(data => {
            var data = JSON.parse(data)
            if (data.backCode == 200) {
              commit('filterRestaurantInformation', id)
              relove(data)
            } else {
              reject(data.backResult);
            }
          })
      })
    },
    //初始化餐厅美食
    initRestaurantCuisine({
      commit
    }, userSerach) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/GetShopSpecialList', {
            SelectType: userSerach.key,
            TypeValue: userSerach.value
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              commit('initRestaurantCuisine', data.goodShopSpecialList)
              relove()
            } else {
              reject(data.backResult)
            }
          })
      })
    },
    //添加餐厅美食
    addRestaurantCuisine({
      commit
    }, obj) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/AddShopSpecial', obj)
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              relove()
            } else {
              reject(data.backResult)
            }
          })
      })
    },
    //修改餐厅美食
    updateRestaurantCuisine({
      commit
    }, data) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/UpdateShopSpecial', {
            Code: data.ss_Code,
            Name: data.ss_Name,
            ShopInfoCode: data.ss_ShopInfoCode,
            FoodTypeCode: data.ss_FoodTypeCode,
            Image: '',
            Price: data.ss_Price,
            Remark: data.ss_Remark,
            Isdelete: 0
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              relove()
            } else {
              reject(data.backResult)
            }
          })
      })
    },
    //删除餐厅美食
    filterRestaurantCuisine({
      commit
    }, id) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/DeleteShopSpecial', {
            Code: id
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              commit('filterRestaurantCuisine', id)
              relove()
            } else {
              reject(data.backResult)
            }
          })
      })
    },
    //初始化美食订单
    initFoodOrder({
      commit
    }, userSerach) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/GetShopShopOrder', {
            SelectType: userSerach.key,
            TypeValue: userSerach.value
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              commit('initFoodOrder', data.goodShopOrderList)
              relove()
            } else {
              reject(data.backResult)
            }
          })
      })
    },
    //修改美食订单
    updateFoodOrder({
      commit
    }, data) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/UpdateShopOrder', {
            OrderID: data.so_OrderID,
            PayWay: data.so_PayWay,
            PayStatus: data.so_PayStatus,
            UseStatus: data.so_UseStatus,
            Isdelete: 0,
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              relove()
            } else {
              reject(data.backResult)
            }
          })
      })
    },
    //删除美食订单
    filterFoodOrder({
      commit
    }, id) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/DeleteShopOrder', {
            OrderID: id
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              commit('filterFoodOrder', id)
              relove()
            } else {
              reject(data.backResult)
            }
          })
      })
    },
    //初始化餐厅评论
    initRestaurantReviews({
      commit
    }, userSearch) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/GetComment', {
            SelectType: userSearch.key,
            TypeValue: userSearch.value
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              commit('initRestaurantReviews', data.goodCommentList)
              relove()
            } else {
              reject(data.backResult);
            }
          })
      })
    },
    //添加评论
    addRestaurantReviews({
      commit
    }, data) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/AddComment', data)
          .then(data => {
            var data = JSON.parse(data);
            console.log(data)
            if (Number(data.backCode) == 200) {
              relove()
            } else {
              reject(data.backResulte)
            }
          })
      })
    },
    //修改评论
    updateRestaurantReviews({
      commit
    }, data) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/UpdateComment', {
            Code: data.cm_Code,
            Content: data.cm_Content,
            Level: data.cm_Level
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              relove()
            } else {
              reject(data.backResulte)
            }
          })
      })
    },
    //删除评论
    filterRestaurantReviews({
      commit
    }, id) {
      return new Promise(function(relove, reject) {
        postPromise('http://114.55.248.116:345/FoodService.asmx/DeleteComment', {
            Code: id
          })
          .then(data => {
            var data = JSON.parse(data);
            if (Number(data.backCode) == 200) {
              commit('filterRestaurantReviews', id)
              relove()
            } else {
              reject(data.backResulte)
            }
          })
      })
    }
}
// http://114.55.248.116:345/FoodService.asmx/DeleteShopInfo
