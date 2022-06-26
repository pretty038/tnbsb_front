//logs.js
import WxValidate from '../../utils/WxValidate.js'
const util = require('../../utils/util.js')
const config = require('../../config.js')
var http = require('../../utils/httpHelper.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    logs: [],
    questionlist: [],
    form: {
      age: '',
      gender:'',
      smoke:'',
      gaoxueya:'',
      tangniaobing:'',
      eye:'',
      height:'',
      weight:'',
      hba1c:'',
      sbp:'',
      hdlc:'',
      tg:'',
      ldlc:'',
      uacr:'',
      scr: '',
      sua:''
    },
    bmi:0,
    score:0
  },

  onLoad: function () {
    console.log(app.globalData);
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
      questionlist:this.getquestionlist()
    });
    this.initValidate();//验证规则函数
  },

  getquestionlist: function () {
    var that = this;
    var data = { appid: config.APPID, questionIds: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16'}
    http.httpGet("question/getquestionlist", data, function (res) {
      if (res.statusCode == '200') {
        var qlist = res.data;
        that.setData({ questionlist: qlist });
      }
    });
  },

  uploadFormData: function(data){
    var that = this;
    data['phone']=app.globalData.phone;
    data['openId']=app.globalData.openid;
    console.log("data="+data);
    return http.httpGet("question/saveResult", data, function (res) {
      if (res.statusCode == '200') {
        var sc = res.data.score;
        var bmi = res.data.bmi;
        console.log("计算分数"+sc);
        console.log("计算bmi"+bmi);
        that.setData({ score: sc });
        that.setData({ bmi: bmi });
        wx.navigateTo({
          url: '../result/result?phone=' + data['phone'] + '&score=' + that.data.score + '&bmi=' + that.data.bmi + '&uacr=' + that.data.uacr
        });
      }
    });
    
  },

  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  //验证函数
  initValidate() {
    const rules = {
      age: {
        required: true,
        number: true,
        min: 0,
        max:100
      },
      gender: {
        required: true
      },
      smoke: {
        required: true,
        number: true,
        min: 0,
        max:100
      },
      gaoxueya: {
        required: true,
        number: true,
        min: 0,
        max:100
      },
      tangniaobing: {
        required: true,
        number: true,
        min: 0,
        max:100
      },
      eye: {
        required: true
      },
      height: {
        required: true,
        number: true,
        min: 0,
        max:3
      },
      weight: {
        required: true,
        number: true,
        min: 0,
        max:500
      },
      hba1c: {
        required: true,
        number: true,
        min: 0
      },
      sbp: {
        required: true,
        number: true,
        min: 0
      },
      hdlc: {
        required: true,
        number: true,
        min: 0
      },
      tg: {
        required: true,
        number: true,
        min: 0
      },
      ldlc: {
        required: true,
        number: true,
        min: 0
      },
      uacr: {
        required: true,
        number: true,
        min:0
      },
      scr: {
        required: true,
        number: true,
        min: 0
      },
      sua: {
        required: true,
        number: true,
        min: 0
      }
    }
    const messages = {
      age: {
        required: '请填写年龄',
        min: '年龄不能为负值，请重新填写',
        max: '年龄超出上限，请重新填写',
      },
      gender:{
        required: '请填写性别'
      },
      smoke: {
        required: '请填写吸烟史',
        min: '吸烟史不能为负值，请重新填写',
        max: '吸烟史超出上限，请重新填写',
      },
      gaoxueya: {
        required: '请填写高血压病史',
        min: '血压病史不能为负值，请重新填写',
        max: '血压病史超出上限，请重新填写',
      },
      tangniaobing: {
        required: '请填写糖尿病史',
        min: '糖尿病史不能为负值，请重新填写',
        max: '糖尿病史超出上限，请重新填写',
      },
      eye:{
        required:'请填写视网膜病变状况'
      },
      height: {
        required: '请填写身高',
        min: '身高不能为负值，请重新填写',
        max: '身高超出上限(单位：米)，请重新填写',
      },
      weight: {
        required: '请填写体重',
        min: '体重不能为负值，请重新填写',
        max: '体重超出上限（单位：千克），请重新填写',
      },
      hba1c: {
        required: '请填写糖化血红蛋白',
        min: '糖化血红蛋白不能为负值，请重新填写',
      },
      hdlc: {
        required: '请填写高密度脂蛋白胆固醇',
        min: '高密度脂蛋白胆固醇不能为负值，请重新填写',
      },
      sbp: {
        required: '请填写收缩压',
        min: '收缩压不能为负值，请重新填写',
      },
      tg: {
        required: '请填写甘油三酯',
        min: '甘油三酯不能为负值，请重新填写',
      },
      ldlc: {
        required: '请填写LDL-C',
        min: 'LDL-C不能为负值，请重新填写',
      },
      uacr: {
        required: '请填写尿蛋白与肌酐比',
        min: '尿蛋白与肌酐比不能为负值，请重新填写',
      },
      scr: {
        required: '请填写血肌酐（SCr）',
        min: '血肌酐SCr不能为负值，请重新填写',
      },
      sua: {
        required: '请填写血尿酸（SUA）',
        min: '血尿酸（SUA）不能为负值，请重新填写',
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  //调用验证函数
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    // this.showModal({
    //   msg: '提交成功'
    // });
    this.uploadFormData(params);
    
    
  },

  formReset: function () {
    console.log('form发生了reset事件')
  },

  bindInput(e) {
    // 表单双向数据绑定
    var that = this;
    var dataset = e.currentTarget.dataset;
    // data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象
    var name = dataset.name;

    var value = e.detail.value;
    // 拼接对象属性名，用于为对象属性赋值
    var attributeName = 'form.' + name
    that.data[name] = value;
    that.setData({
      [attributeName]: that.data[name]
    });
    // console.log(that.data[name])
  },

})
