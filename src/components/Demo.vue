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
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>房间编号</th>
          <th>房间类型名称</th>
          <th>房间类型简介</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>dada</td>
          <td>dada</td>
          <td>dada</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;"><i class="icon-add"></i>添加 </a></li>
                  <li><a href="javascript:;"><i class="icon-pencil"></i> 修改</a></li>
                  <li><a href="javascript:;"><i class="icon-delicious"></i> 删除</a></li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
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
        }
      }
    },
    computed:mapGetters([
    ]),
    methods:{
      //筛选
      search(){
      }
    }
  }
</script>
<style scoped>

</style>
