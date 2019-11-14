<template>
  <div class="home">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>

        <el-main>

          <el-button type="primary" @click="dialogFormVisible=true">添加成员</el-button>

          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="姓名"
              prop="username">
            </el-table-column>
            <el-table-column
              label="密码"
              prop="password">
            </el-table-column>
            <el-table-column
              label="住址"
              prop="address">
            </el-table-column>
            <el-table-column
              label="手机号"
              prop="phone">
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header">
                <h2>操作</h2>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            background
            layout="sizes, prev, pager, next"
            :page-sizes="[1, 2, 3, 4]"
            :total="total"
            :page-size="limit"
            @current-change="changePage"
            @size-change="handleSizeChange">
          </el-pagination>

        </el-main>

        <el-dialog title="添加成员" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="curFun">确 定</el-button>
          </div>
        </el-dialog>

      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
    data() {
      return {
        tableData: [],   //当前数据
        pagenum:1,      //当前页码
        limit:2,        //每页显示的条数
        total:0,         //总页数
        dialogFormVisible: false,   //弹窗的显示与隐藏
        form: {
          username: '',
          password: '',
          address: '',
          phone: '',
        },
        formLabelWidth: '120px',
        id:null
      }
    },
    created(){
      this.getData()
    },
    methods: {
      // 修改
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        //第二步：id赋值
        this.id = row.id;
        //第三步：给弹窗的表单赋值
        this.form = {
              username:row.username,
              password: row.password,
              idcard: row.idcard,
              address:row.address,
              phone:row.phone
        };
        console.log(index, row);
      },
      // 删除
      handleDelete(index, row) {
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.get("/api/del",{params:{id:row.id}}).then(res=>{
              if(res.data.code===1){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getData()
              }else{
                 this.$message({
                  type: 'info',
                  message: res.data.msg
                });
              }
            })  
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        console.log(index, row);
      },
      // 改变页码
      changePage(cur){
        this.pagenum=cur
        this.getData()
      },
      curFun(){
        let url=""
        if(this.id){
          url="/api/edit"
        }else{
          url="/api/add"
        }
        this.$http.post(url,{...this.form,id:this.id}).then(res=>{
          if(res.data.code===1){
            this.getData()
          }
          this.clear()
          this.$message({
            type: 'info',
            message: res.data.msg
          });
          this.dialogFormVisible=false
        })
      },
      // 获取到所有数据
      getData(){
          this.$http.get("/api/list",{params:{pagenum:this.pagenum,limit:this.limit}}).then(res=>{
          if(res.data.code===1){
            this.tableData=res.data.data
            this.total=res.data.total
          }else{
            alert(res.data.msg)
          }
        })
      },
      // 清空弹窗中的表单
      clear(){
        this.form={
          username: '',
          password: '',
          address: '',
          phone: '',
        }
      },
      handleSizeChange(num){
          this.limit = num;
          this.getData();
      }
    },
}
</script>

<style scoped>
.home{
  width: 100%;
  height: 100%;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 80px;
  }
  
  .el-container {
    height: 100%;
  }
</style>
