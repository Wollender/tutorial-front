export default {
  components: {
  },
  data () {
    return {
      activeIndex: '1',
      input2:''
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    loginOut(){
      this.$store.commit('set',{
        userToken: ''
      })
      console.log('当前用户token',this.$store.state.userToken)
      this.$router.push('/login');
    }
  }
}
