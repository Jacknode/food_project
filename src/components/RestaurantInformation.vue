<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">餐厅信息</h5>
      </div>
      <div class="dataTables_filter" id="hotelSearch">
        <span>餐厅筛选:</span>
        <el-select v-model="userSerach.key" placeholder="请选择查询条件">
          <el-option label="餐厅编码查询" value="001"></el-option>
          <el-option label="餐厅名称查询" value="002"></el-option>
          <el-option label="餐厅餐桌数查询" value="003"></el-option>
          <el-option label="餐厅地址查询" value="004"></el-option>
          <el-option label="全部" value=""></el-option>
        </el-select>
        <input type="text" placeholder="对应值" v-model="userSerach.value">
        <a href="javascript:;" class="btn btn-info" @click="search" id="search">搜索</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
          <tr>
            <th>餐厅编码</th>
            <th>餐厅名称</th>
            <th>餐桌数</th>
            <th>积分</th>
            <th>餐厅地址</th>
            <th>电话号码</th>
            <th>省市县</th>
            <th>介绍</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in restaurantInformationList">
            <td>{{item.si_ShopCode}}</td>
            <td>{{item.si_ShopName}}</td>
            <td>{{item.si_Tables}}</td>
            <td>{{item.si_Score}}</td>
            <td>{{item.si_Address}}</td>
            <td>{{item.si_Telephone}}</td>
            <td>{{item.si_Provice+"省"+item.si_City+"市"+item.si_Contry+"县"}}</td>
            <td>{{item.si_Introduce}}</td>
            <td class="text-center">
              <ul class="icons-list">
                <li class="dropdown">
                  <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="icon-menu9"></i>
                  </a>

                  <ul class="dropdown-menu dropdown-menu-right">
                    <li><a href="javascript:;" @click="addRestaurantInformation"><i class="icon-add"></i>添加 </a></li>
                    <li><a href="javascript:;" @click="updateRestaurantInformation(item.si_ShopCode)"><i class="icon-pencil"></i> 修改</a></li>
                    <li><a href="javascript:;" @click="deleteRestaurantInformation(item.si_ShopCode)"><i class="icon-delicious"></i> 删除</a></li>
                  </ul>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <!--<el-pagination layout="prev, pager, next" :page-size="5" :total="hotelUserTotal" style="float:right;margin-top: 20px"  @current-change="handleCurrentChange" v-show="hotelUserTotal">-->
      <!--</el-pagination>-->
    </div>
    <!--添加餐厅信息-->
    <el-dialog title="添加餐厅信息" :visible.sync="addRestaurantInformationDialog">
      <el-form :model="AddRestaurant">
        <el-form-item label="餐厅编码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddRestaurant.ShopCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="餐厅名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddRestaurant.ShopName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddRestaurant.Password" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"  :label-width="formLabelWidth" :required="isOff">
          <el-input type="password" v-model="AddRestaurant.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="餐厅电话号码" :label-width="formLabelWidth">
          <el-input v-model="AddRestaurant.Telephone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRestaurantInformationDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRestaurantInformationSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改餐厅信息-->
    <el-dialog title="修改餐厅信息" :visible.sync="updateRestaurantInformationDialog">
      <el-form :model="updateRestaurantInformationObj">
        <el-form-item label="餐厅编码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateRestaurantInformationObj.si_ShopCode" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="餐厅名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateRestaurantInformationObj.si_ShopName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="餐厅餐桌数" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateRestaurantInformationObj.si_Tables" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="餐厅积分" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateRestaurantInformationObj.si_Score" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="餐厅地址" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateRestaurantInformationObj.si_Address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业时间" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateRestaurantInformationObj.si_WorkTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有WAFI" :label-width="formLabelWidth">
          <el-select v-model="updateRestaurantInformationObj.si_WAFI" placeholder="是否有WAFI">
            <el-option label="有" value="0"></el-option>
            <el-option label="无" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth"  :required="isOff">
          <el-input v-model="updateRestaurantInformationObj.si_Telephone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="省" :label-width="formLabelWidth">
          <el-input v-model="updateRestaurantInformationObj.si_Provice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-input v-model="updateRestaurantInformationObj.si_City" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="县" :label-width="formLabelWidth">
          <el-input v-model="updateRestaurantInformationObj.si_Contry" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="介绍" :label-width="formLabelWidth">
          <el-input v-model="updateRestaurantInformationObj.si_Introduce" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateRestaurantInformationDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateRestaurantInformationSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
//  import {IsGetNull} from '../assets/js/public'
  export default{
    name: '',
    data(){
      return {
        //搜索参数
        userSerach:{
          key:'',
          value:''
        },
        isOff:true,
//        hotelUserTotal:0,
        addRestaurantInformationDialog:false,//添加弹窗
        updateRestaurantInformationDialog:false,//修改弹窗
        formLabelWidth:'120px',
        //添加参数
        AddRestaurant:{
          ShopCode:'',
          ShopName:'',
          Password:'',
          checkPass:'',
          Telephone:''
        }
      }
    },
    computed:mapGetters([
        'restaurantInformationList',
        'updateRestaurantInformationObj'
    ]),
    methods:{
      //初始化
      initData(){
        this.$store.dispatch('initRestaurantInformation',this.userSerach)
          .then(()=>{},err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      },
      handleCurrentChange(){},
      search(){
        this.initData();
      },
      //添加
      addRestaurantInformation(){
        this.addRestaurantInformationDialog = true;
        this.$store.commit('setTranstionFalse')
      },
      //添加提交
      addRestaurantInformationSubmit(){
        var arrValue = Object.entries(this.AddRestaurant);
        for(var i=0;i<arrValue.length;i++){
          if(!arrValue[i][1]&&arrValue[i][0].trim()!='Telephone'){
            this.$message({
              showClose: true,
              message: '输入内容不能为空！',
              type: 'error'
            });
            return;
          }
        }
        if(this.AddRestaurant.Password.trim()!==this.AddRestaurant.checkPass.trim()){
          this.$message({
            showClose: true,
            message: '两次输入密码不一致!',
            type: 'error'
          });
          return;
        }
        delete this.AddRestaurant.checkPass
        this.$store.dispatch('addRestaurantInformation',this.AddRestaurant)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            });
            this.initData();
          },(err)=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
        this.addRestaurantInformationDialog = false;
      },
      //修改
      updateRestaurantInformation(id){
        this.updateRestaurantInformationDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateRestaurantInformationObj',id)
      },
      //修改提交
      updateRestaurantInformationSubmit(){
        if(isNaN(this.updateRestaurantInformationObj.si_Tables)||isNaN(this.updateRestaurantInformationObj.si_Telephone)||isNaN(this.updateRestaurantInformationObj.si_Score)){
          this.$message({
            showClose: true,
            message: '餐桌数或者电话号码或者积分不是数字!',
            type: 'error'
          });
          return;
        }
        this.$store.dispatch('updateRestaurantInformation',this.updateRestaurantInformationObj)
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
        this.updateRestaurantInformationDialog = false;
      },
      //删除
      deleteRestaurantInformation(id){
        this.$store.dispatch('filterRestaurantInformation',id)
          .then(data=>{
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      }
    },
    mounted(){
    }
  }
</script>
<style scoped>

</style>
