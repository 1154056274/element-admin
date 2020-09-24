<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%">
    <el-table-column label="索引" width="50" >
        <template slot-scope="scope">
          <span>{{ (currentPage-1)*3 + scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="50">
        <template slot-scope="scope">
         <img :src="scope.row.imgurl" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="stars"
        label="主演">
      </el-table-column>
       <el-table-column
        prop="p.name"
        label="城市">
      </el-table-column>
       <el-table-column
        prop="ratings"
        label="评分">
      </el-table-column>
       <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row._id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      :current-page="currentPage"
      @current-change="changePage"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CityList',
  components: {  },
  data() {
    return {
      currentPage: 1,
      pagesize: 3,
      total: 0,
      numm: 0,
      tableData: []
      
    }
  },
  computed: {
 
  },
  watch: {
   
  },
  created() {
    this.getMovies()
   
  },
  methods: {
   
  
    // 获取全部城市数据
    // getMovies() {
    //   axios.get('/movie/list').then(res => {
    //     console.log(res)
    //     if(res.data.code === 20000){
    //       this.tableData = res.data.list
    //     }
    //   })
    // },
    getMovies() {
      axios.get(`/movielimit?page=${this.currentPage}&pagesize=${this.pagesize}`).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    handleEdit(id) {
      this.$router.push({
        path: '/movie/edit/' + id
      })
    },
    handleDelete(id) {
      
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.delete('/moviedel/'+id).then(res => {
             
            console.log(res)
            this.$message({
              type: 'success',
              message: res.data.msg
            });
            console.log(this.currentPage)
          
            this.getMovies()
         
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

    },
    changePage(page) {
      this.currentPage = page
      this.getMovies()
    }
  }
}
</script>

<style scoped>
img{
  width: 60px;
  height: 60px;
}
</style>
