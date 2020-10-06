import axios from 'axios'
export default {
  data () {
    return {
      radio:'1',
      input1:'',
      input2:'',
      input3:'',
      tableData: [{
        courseName: '前端基础课程1',
        price: 194
      }, {
        courseName: '前端基础课程2',
        price: 195
      }, {
        courseName: '前端基础课程3',
        price: 196
      }, {
        courseName: '前端基础课程4',
        price: 197
      }, {
        courseName: '前端基础课程5',
        price: 198
      }, {
        courseName: '前端基础课程6',
        price: 194
      }, {
        courseName: '前端基础课程7',
        price: 190
      }],
      multipleSelection: []
    }
  },
  created () {
    
    
  },
  mounted () {
  },
  methods: {
    handleSelectionChange(val) {
      console.log('当前选中项：',val)
      this.multipleSelection = val;
    }
  }
}
