// import Cookies from 'js-cookie'
// import {aes} from './aes.js'
export default {
    data() {
      var validateName = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请输入用户名！')); 
        } else {
          callback();
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码！'));
        } else {
          callback();
        }
      };
        return {
          ruleForm: {
            name: '',
            pass: ''
          },
          rules: {
            name: [
              { validator: validateName, trigger: 'blur' }
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ]
          }
        }
    },
    created(){
    },
    mounted(){
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.commit('set',{
              userToken: 'sdsdfsdfsdsdsdfsd'
            })
            this.$store.commit('set', {
              userName: this.ruleForm.name
            })
            this.$router.push('/home');
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      register(){
        this.$message({
          message: '恭喜你，成为“红黑树学院”一员！',
          type: 'success'
        });
        this.$router.push('/login');
      }

    }
}
