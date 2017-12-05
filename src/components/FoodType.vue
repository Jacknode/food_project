<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">美食类型信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>美食类型筛选:</span>
        <input type="text" placeholder="美食名称" v-model="name">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>美食编号</th>
          <th>美食类型名称</th>
          <th>美食类型简介</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in foodTypeList">
          <td>{{item.ft_FoodTypeCode}}</td>
          <td>{{item.ft_FoodTypeName}}</td>
          <td>{{item.ft_Remark}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;" @click="addFoodType"><i class="icon-add"></i>添加 </a></li>
                  <li><a href="javascript:;" @click="updateFoodType(item.ft_FoodTypeCode)"><i class="icon-pencil"></i> 修改</a></li>
                  <li><a href="javascript:;" @click="deleteFoodType(item.ft_FoodTypeCode)"><i class="icon-delicious"></i> 删除</a></li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--添加美食类型-->
    <el-dialog title="添加美食类型" :visible.sync="addFoodTypeDialog">
      <el-form :model="AddFoodType">
        <el-form-item label="类型名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddFoodType.FoodTypeName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth"  prop="Remark">
          <el-input v-model="AddFoodType.Remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFoodTypeDialog = false">取 消</el-button>
        <el-button type="primary" @click="addFoodTypeSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改美食类型-->
    <el-dialog title="修改美食类型" :visible.sync="updateFoodTypeDialog">
      <el-form :model="updateObj">
        <el-form-item label="类型编号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateObj.ft_FoodTypeCode" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="类型名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="updateObj.ft_FoodTypeName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth"  prop="Remark">
          <el-input v-model="updateObj.ft_Remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFoodTypeDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateFoodTypeSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {postPromise} from '../assets/js/public'
  export default{
    name: '',
    data(){
      return {
        name:'',
        addFoodTypeDialog:false,
        updateFoodTypeDialog:false,
        formLabelWidth:'120px',
        isOff:true,
        //添加参数
        AddFoodType:{
          FoodTypeName:'',
          Remark:''
        }
      }
    },
    computed:mapGetters([
        'foodTypeList',
        'updateObj'
    ]),
    methods:{
      //筛选
      search(){
        this.$store.commit('filterFoodTypeName',this.name)
      },
      //初始化
      initData(){
        this.$store.dispatch('initFoodTypeList')
          .then(()=>{},(err)=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
            return;
          })
      },
      //添加
      addFoodType(){
        this.addFoodTypeDialog = true;
        this.$store.commit('setTranstionFalse')
      },
      //添加提交
      addFoodTypeSubmit(){
        if(this.AddFoodType.FoodTypeName.trim()==''){
          this.$message({
            showClose: true,
            message: '类型名称不能为空！',
            type: 'error'
          });
          return;
        }
        this.$store.dispatch('addFoodTypeAction',this.AddFoodType)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            });
            this.initData();
            this.addFoodTypeDialog = false;
          },(err)=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
            this.addFoodTypeDialog = false;
            return;
          })
      },
      //删除类型
      deleteFoodType(id){
        this.$store.dispatch('deleteFoodType',id)
          .then(data=>{
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
          },(err)=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
            return;
          });
      },
      //修改
      updateFoodType(id){
        this.updateFoodTypeDialog = true;
        this.$store.commit('setTranstionFalse')
        this.$store.commit('initUpdateObj',id)
      },
      //修改提交
      updateFoodTypeSubmit(){
        this.$store.dispatch('updateFoodTypeAction',this.updateObj)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            this.initData()
            this.updateFoodTypeDialog = false;
          },(err)=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
            return;
          })
      }
    }
  }
</script>
<style scoped>

</style>
