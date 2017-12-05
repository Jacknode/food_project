<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">餐厅评论</h5>
      </div>
      <div class="dataTables_filter">
        <span>餐厅评论筛选:</span>
        <el-select v-model="userSearch.key" placeholder="根据什么查询">
          <el-option label="评论编码" value="001"></el-option>
          <el-option label="评论用户编码" value="002"></el-option>
          <el-option label="餐厅编码" value="003"></el-option>
          <el-option label="评论等级" value="004"></el-option>
          <el-option label="全部" value=""></el-option>
        </el-select>
        <input type="text" placeholder="对应值" v-model="userSearch.value">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a><i style="color:red;margin-left: 20px">(评论用户编码名称有问题)</i>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>评论编码</th>
          <th>评论内容</th>
          <th>评论用户编码</th>
          <th>餐厅编码</th>
          <th>评论等级</th>
          <th>评论时间</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in restaurantReviewsList">
          <td>{{item.cm_Code}}</td>
          <td>{{item.cm_Content}}</td>
          <td>{{item.cm_UserID}}</td>
          <td>{{item.shopName==undefined?"餐厅名不存在":item.shopName}}</td>
          <td>{{item.cm_Level | getGrade}}</td>
          <td>{{item.cm_CreateTime}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;" @click="addRestaurantReviews"><i class="icon-add"></i>添加 </a></li>
                  <li><a href="javascript:;" @click="updateRestaurantReviews(item.cm_Code)"><i class="icon-pencil"></i> 修改</a></li>
                  <li><a href="javascript:;" @click="deleteRestaurantReviews(item.cm_Code)"><i class="icon-delicious"></i> 删除</a></li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--添加餐厅评论-->
    <el-dialog title="添加餐厅评论" :visible.sync="addRestaurantReviewsDialog">
      <el-form :model="addReviews">
        <el-form-item label="评论内容" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="addReviews.Content" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属餐厅" :label-width="'120px'" :required="isOff">
          <el-select v-model="addReviews.ShopInfoCode" placeholder="请选择所属餐厅">
            <el-option
              v-for="item in restaurantInformationList"
              :key="item.si_ShopCode"
              :label="item.si_ShopName"
              :value="item.si_ShopCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评论用户编号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="addReviews.UserID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="评论等级" :label-width="formLabelWidth" :required="isOff">
          <el-select v-model="addReviews.Level" placeholder="评论等级">
            <el-option label="差评" value="0"></el-option>
            <el-option label="中评" value="1"></el-option>
            <el-option label="好评" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRestaurantReviewsDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRestaurantReviewsSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改餐厅评论-->
    <el-dialog title="修改餐厅评论" :visible.sync="updateRestaurantReviewsDialog">
      <el-form :model="updateRestaurantReviewsObj">
        <el-form-item label="评论编码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateRestaurantReviewsObj.cm_Code" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="评论内容" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateRestaurantReviewsObj.cm_Content" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="评论等级" :label-width="formLabelWidth" :required="isOff">
          <el-select v-model="updateRestaurantReviewsObj.cm_Level" placeholder="评论等级">
            <el-option label="差评" value="0"></el-option>
            <el-option label="中评" value="1"></el-option>
            <el-option label="好评" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateRestaurantReviewsDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateRestaurantReviewsSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        userSearch:{
          key:'',
          value:''
        },
        formLabelWidth:'120px',
        isOff:true,
        addRestaurantReviewsDialog:false,
        updateRestaurantReviewsDialog:false,
        //添加参数
        addReviews:{
          Content:'',
          UserID:'',
          ShopInfoCode:'',
          Level:''
        }
      }
    },
    computed:mapGetters([
        'restaurantReviewsList',
        'restaurantInformationList',
        'updateRestaurantReviewsObj'
    ]),
    methods:{
      initData(){
        this.$store.dispatch('initRestaurantReviews',this.userSearch)
      },
      //筛选
      search(){
        this.initData();
      },
      //添加
      addRestaurantReviews(){
        this.addRestaurantReviewsDialog = true;
        this.$store.commit('setTranstionFalse')
      },
      //添加提交
      addRestaurantReviewsSubmit(){
        var arrValue = Object.entries(this.addReviews);
        for (var i = 0; i < arrValue.length; i++) {
          if (!arrValue[i][1]) {
            this.$message({
              showClose: true,
              message: '输入内容不能为空！',
              type: 'error'
            });
            return;
          }
        }
        this.$store.dispatch('addRestaurantReviews',this.addReviews)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            });
            this.initData();
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
        this.addRestaurantReviewsDialog = false;
      },
      //修改
      updateRestaurantReviews(id){
        this.updateRestaurantReviewsDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateRestaurantReviewsObj',id)
      },
      //修改提交
      updateRestaurantReviewsSubmit(){
        this.$store.dispatch('updateRestaurantReviews',this.updateRestaurantReviewsObj)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            this.initData();
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
        this.updateRestaurantReviewsDialog = false;
      },
      //删除
      deleteRestaurantReviews(id){
        this.$store.dispatch('filterRestaurantReviews',id)
          .then(() => {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
          }, (err) => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      }
    }
  }
</script>
<style scoped>

</style>
