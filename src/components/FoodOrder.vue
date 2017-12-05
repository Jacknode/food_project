<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">美食订单信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>美食订单筛选:</span>
        <el-select v-model="userSearch.key" placeholder="根据什么查询">
          <el-option label="订单号" value="001"></el-option>
          <el-option label="订单所属餐厅" value="002"></el-option>
          <el-option label="订单美食编码" value="003"></el-option>
          <el-option label="全部" value=""></el-option>
        </el-select>
        <input type="text" placeholder="对应值" v-model="userSearch.value">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a> <i style="color:red;margin-left: 20px">(查询,名称获取有问题)</i>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>订单编号</th>
          <th>订单价格</th>
          <th>所属餐厅</th>
          <th>美食名称</th>
          <th>订单用户名</th>
          <th>售票员编码</th>
          <th>售票员名称</th>
          <th>支付状态</th>
          <th>使用状态</th>
          <th>支付时间</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in foodOrderList">
          <td>{{item.so_OrderID}}</td>
          <td>¥ {{item.so_Price}}</td>
          <td>{{item.so_ShopInfoCode}}</td>
          <td>{{item.so_ShopSpecialCode}}</td>
          <td>{{item.so_UserID}}</td>
          <td>{{item.so_SellID}}</td>
          <td>{{item.so_SellName}}</td>
          <td>{{item.so_PayStatus==0?"未支付":"已支付"}}</td>
          <td>{{item.so_UseStatus | useStatus}}</td>
          <td>{{item.so_PayTime}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                  <!--<li><a href="javascript:;"><i class="icon-add"></i>添加 </a></li>-->
                  <li><a href="javascript:;" @click="updateFoodOrder(item.so_OrderID)"><i class="icon-pencil"></i>
                    修改</a></li>
                  <li><a href="javascript:;" @click="deleteFoodOrder(item.so_OrderID)"><i class="icon-delicious"></i> 删除</a>
                  </li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--修改美食订单-->
    <el-dialog title="修改美食订单" :visible.sync="updateFoodOrderDialog">
      <el-form :model="foodOrderObj">
        <el-form-item label="订单编号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="foodOrderObj.so_OrderID" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="foodOrderObj.so_PayWay" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付状态" :label-width="formLabelWidth">
          <el-select v-model="foodOrderObj.so_PayStatus" placeholder="支付状态">
            <el-option label="未支付" value="0"></el-option>
            <el-option label="已支付" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用状态" :label-width="formLabelWidth">
          <el-select v-model="foodOrderObj.so_UseStatus" placeholder="使用状态">
            <el-option label="未使用" value="0"></el-option>
            <el-option label="已使用" value="1"></el-option>
            <el-option label="已离店" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFoodOrderDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateFoodOrderSubmit">确 定</el-button>
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
        updateFoodOrderDialog: false,
        formLabelWidth: '120px',
        isOff: true,
        userSearch: {
          key: '',
          value: ''
        }
      }
    },
    computed: mapGetters([
      'foodOrderList',
      'foodOrderObj'
    ]),
    methods: {
      initData(){
        this.$store.dispatch('initFoodOrder', this.userSearch)
          .then(() => {
          }, (err) => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      },
      //筛选
      search(){
        this.initData()
      },
      //修改
      updateFoodOrder(id){
        this.updateFoodOrderDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initFoodOrderObj', id);
      },
      //修改提交
      updateFoodOrderSubmit(){
        this.$store.dispatch('updateFoodOrder', this.foodOrderObj)
          .then(() => {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            this.initData();
          }, err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
        this.updateFoodOrderDialog = false;
      },
      //删除
      deleteFoodOrder(id){
        this.$store.dispatch('filterFoodOrder', id)
          .then(() => {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
          }, err => {
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
