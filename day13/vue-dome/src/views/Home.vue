<template>
  <div class="home">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
            <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
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
                操作
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage2"
                :page-sizes="[2,3,4]"
                :page-size="limit"
                layout="sizes, prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
          </el-main>

          <el-dialog title="添加" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="住址" :label-width="formLabelWidth">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" :label-width="formLabelWidth">
                <el-input v-model="form.idcard" autocomplete="off"></el-input>
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

export default {
  name: 'home',
  components: {
    
  },
   data() {
      return {
        tableData: [],  //当前页的数据
        pagenum:1,      //当前页
        limit:2,        //每页显示的条数
        total:0,  
        currentPage2:1,
        dialogFormVisible: false,
        form: {
          username: '',
          password: '',
          address: '',
          phone: '',
          idcard: '',
        },
        formLabelWidth: '120px',
        id:null     
        }
    },
    created(){
     this.getCurData()
    },
    methods: {
      // 获取数据
      getCurData(){
        this.$http.get("/api/list",{params:{pagenum:this.pagenum,limit:this.limit}}).then(res=>{
          if(res.data.code===1){
            this.tableData=res.data.data,
            this.total=res.data.total
          }else{
            alert(res.data.msg)
          }
        })
      },
      // 修改
      handleEdit(index, row) {
        // 先打开弹窗
        this.dialogFormVisible=true
        // 给 要修改的那一项 赋值一个id
        this.id=row.id
        console.log(this.id)

        // 将修改的内容显示在弹窗的表单里
        this.form={
          username:row.username,
          password:row.password,
          address:row.address,
          idcard:row.idcard,
          phone:row.phone
        }
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
              this.getCurData()
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
      },
      // 添加 或者 修改
      curFun(){
        let url=""
        console.log(this.id)
        if(this.id){   //如果id存在的话，就是修改
          url="/api/edit"
        }else{        //如果id不存在的话，就是添加
          url="/api/add"
        }
        this.$http.post(url,{...this.form,id:this.id}).then(res=>{
          if(res.data.code===1){
            this.getCurData()
            this.dialogFormVisible=false
            this.delform()
          }
          this.$message({
            type: 'info',
            message: res.data.msg
          }); 
        })
      },
      // 选择每一页显示几条
      handleSizeChange(val) {
        this.limit=val
        this.$http.get("/api/list",{params:{pagenum:this.pagenum,limit:this.limit}}).then(res=>{
          if(res.data.code===1){
            this.tableData=res.data.data,
            this.total=res.data.total
          }else{
            alert(res.data.msg)
          }
        })
      },
      // 改变页码
      handleCurrentChange(val) {
        this.pagenum=val
        this.getCurData()
      },
      // 清空表单
      delform(){
         this.form={
          username: '',
          password: '',
          address: '',
          phone: '',
          idcard: '',
        }
        this.id=null
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
  .el-container {
    height: 100%;
    overflow: hidden;
  }
</style>
