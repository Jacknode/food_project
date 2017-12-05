<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">美食信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>美食筛选:</span>
        <el-select v-model="userSerach.key" placeholder="请选择查询条件">
          <el-option label="美食编码" value="001"></el-option>
          <el-option label="美食所属餐厅编码" value="002"></el-option>
          <el-option label="美食类型查询编码" value="003"></el-option>
          <el-option label="全部" value=""></el-option>
        </el-select>
        <input type="text" placeholder="对应值" v-model="userSerach.value">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>美食编号</th>
          <th>美食名称</th>
          <th>所属餐厅</th>
          <th>美食类型</th>
          <th>美食价格</th>
          <th>备注</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in restaurantCuisineList">
          <td>{{item.ss_Code}}</td>
          <td>{{item.ss_Name}}</td>
          <td>{{item.si_ShopName==""?"所属餐厅不存在":item.si_ShopName}}</td>
          <td>{{item.ft_FoodTypeName==""?"美食类型不存在":item.ft_FoodTypeName}}</td>
          <td>¥ {{item.ss_Price}}</td>
          <td>{{item.ss_Remark}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;" @click="addRestaurantCuisine"><i class="icon-add"></i>添加 </a></li>
                  <li><a href="javascript:;" @click="updateRestaurantCuisine(item.ss_Code)"><i class="icon-pencil"></i>
                    修改</a></li>
                  <li><a href="javascript:;" @click="deleteRestaurantCuisine(item.ss_Code)"><i
                    class="icon-delicious"></i> 删除</a></li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--添加餐厅美食-->
    <el-dialog title="添加餐厅美食" :visible.sync="addRestaurantCuisineDialog">
      <el-form :model="AddCuisine">
        <el-form-item label="美食名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCuisine.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="美食所属餐厅" :label-width="'120px'" :required="isOff">
          <el-select v-model="AddCuisine.ShopInfoCode" placeholder="请选择所属餐厅">
            <el-option
              v-for="item in restaurantInformationList"
              :key="item.si_ShopCode"
              :label="item.si_ShopName"
              :value="item.si_ShopCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="美食类型" :label-width="'120px'" :required="isOff">
          <el-select v-model="AddCuisine.FoodTypeCode" placeholder="请选择美食类型">
            <el-option
              v-for="item in foodTypeList"
              :key="item.ft_FoodTypeCode"
              :label="item.ft_FoodTypeName"
              :value="item.ft_FoodTypeCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="美食价格" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCuisine.Price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="AddCuisine.Remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRestaurantCuisineDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRestaurantCuisineSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改餐厅美食-->
    <el-dialog title="修改餐厅美食" :visible.sync="updateRestaurantCuisineDialog">
      <el-form :model="restaurantCuisineObj">
        <el-form-item label="美食编号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="restaurantCuisineObj.ss_Code" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="美食名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="restaurantCuisineObj.ss_Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="美食所属餐厅" :label-width="'120px'" :required="isOff">
          <el-select v-model="restaurantCuisineObj.ss_ShopInfoCode" placeholder="请选择所属餐厅">
            <el-option
              v-for="item in restaurantInformationList"
              :key="item.si_ShopCode"
              :label="item.si_ShopName"
              :value="item.si_ShopCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="美食类型" :label-width="'120px'" :required="isOff">
          <el-select v-model="restaurantCuisineObj.ss_FoodTypeCode" placeholder="请选择美食类型">
            <el-option
              v-for="item in foodTypeList"
              :key="item.ft_FoodTypeCode"
              :label="item.ft_FoodTypeName"
              :value="item.ft_FoodTypeCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="美食价格" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="restaurantCuisineObj.ss_Price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="restaurantCuisineObj.ss_Remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateRestaurantCuisineDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateRestaurantCuisineSubmit">确 定</el-button>
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
        formLabelWidth: '120px',
        isOff: true,
        //搜索参数
        userSerach: {
          key: '',
          value: ''
        },
        addRestaurantCuisineDialog: false,//添加弹窗
        updateRestaurantCuisineDialog: false,//修改弹窗
        //添加参数
        AddCuisine: {
          Name: '',
          ShopInfoCode: '',
          FoodTypeCode: '',
          Image: '',
          Price: '',
          Remark: ''
        }
      }
    },
    computed: mapGetters([
      'restaurantCuisineList',
      'foodTypeList',
      'restaurantInformationList',
      'restaurantCuisineObj'
    ]),
    methods: {
      initData(){
        this.$store.dispatch('initRestaurantCuisine', this.userSerach)
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
        this.initData();
      },
      //添加
      addRestaurantCuisine(){
        this.addRestaurantCuisineDialog = true;
        this.$store.commit('setTranstionFalse')
      },
      //添加提交
      addRestaurantCuisineSubmit(){
        var arrValue = Object.entries(this.AddCuisine);
        for (var i = 0; i < arrValue.length; i++) {
          if (!arrValue[i][1] && (arrValue[i][0].trim() != 'Image' && arrValue[i][0].trim() != 'Remark')) {
            this.$message({
              showClose: true,
              message: '输入内容不能为空！',
              type: 'error'
            });
            return;
          }
        }
        this.$store.dispatch('addRestaurantCuisine', this.AddCuisine)
          .then(() => {
            this.$message({
              showClose: true,
              message: '添加成功',
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
        this.addRestaurantCuisineDialog = false;
      },
      //修改
      updateRestaurantCuisine(id){
        this.updateRestaurantCuisineDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initRestaurantCuisineObj', id)
      },
      //修改提交
      updateRestaurantCuisineSubmit(){
        if (isNaN(this.restaurantCuisineObj.ss_Price)) {
          this.$message({
            showClose: true,
            message: '价格请输入数字!',
            type: 'error'
          });
          return;
        }
        this.$store.dispatch('updateRestaurantCuisine', this.restaurantCuisineObj)
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
        this.updateRestaurantCuisineDialog = false;
      },
      //删除
      deleteRestaurantCuisine(id){
        this.$store.dispatch('filterRestaurantCuisine', id)
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
