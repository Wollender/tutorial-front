import axios from 'axios'
export default {
  data () {
    return {
      activeName: 'first',
      form:{
        name:'',
        price:'',
        discount:1,
        delivery: false,
        resource: 1,
        desc:''
      },
      isEdit:false,
      rules:{
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入课程价格', trigger: 'blur' }
        ],
        discount: [
          { required: false,  trigger: 'blur' }
        ],
        desc: [
          { required: false, trigger: 'blur' }
        ],
        delivery: [
          { required: false,  trigger: 'blur' }
        ],
        resource: [
          { required: false, trigger: 'blur' }
        ]
      },
      tableData:[],
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    handleClick(tab, event) {
      this.isEdit = false;
      if(tab.name == 'first'){
        this.resetForm('form');
      }
      // console.log(tab, event);
    },
    handleChange(value) {
      console.log(value);
    },
    // 创建课程
    onSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tableData.push(this.form)
          this.$message({
            message: '新增成功！',
            type: 'success'
          });
          this.activeName = 'second'
        } else {
          this.$message({
            message: '添加失败!',
            type: 'error'
          });
          return false;
        }
      });
    },
    // 重置课程
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 编辑
    handleEdit(index,data){
      this.activeName = 'first'
      this.form = data;
      this.isEdit = true;
      console.log("当前index:",index,'数据：',data);
    },
    // 删除
    handleDelete(index,data){
      this.$confirm(`确定删除《${data.name}》这条课程？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
}
