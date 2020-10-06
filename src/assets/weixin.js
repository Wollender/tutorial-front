require.config({
  baseUrl: configData.baseUrl,
  paths: {
    WXConfig: "js/component/weixin-1.2.0",
    FooterRequest: 'js/component/footer-h5-request',
  },
});

define(["WXConfig", "FooterRequest"], function (wx, FooterRequest) {
  window.wx = wx;
  wx.hideOptionMenu();

  var that;
  var defaultUrl = "//" + window.location.host.replace(/^.*?\./, "www.");
  defaultUrl += "/contentapi/api/content/wxShare/wechatParam";

  function fnClass(obj) {
    that = this;
    var ua = navigator.userAgent.toLowerCase();

    this.wxShareConfig = null;
    this.url = obj && obj.url || defaultUrl;
    this.isWeiXin = ua.match(/MicroMessenger/i) == "micromessenger";
  }
  fn = fnClass.prototype;


  /**
   * 设置分享
   */
  fn.setupShare = function (obj) {

    that.wxShareData = $.extend({
      title: $('title').text(),
      link: location.href.split('#').toString(),
      desc: "", // 更多精彩，尽在${siteName}客户端！
      imgUrl: ""
    }, obj || {});

    if (!that.isWeiXin) {
      return false
    }
    if (!that.wxShareConfig) {
      var url = location.href.split('#').toString();//url不能写死
      $.ajax({
        type: "get",
        url: that.url,
        dataType: "json",
        data: { url: encodeURIComponent(url) },
        success: function (data) {
          that.wxShareConfig = data;
          that.verifyData();
        },
        error: function (xhr, status, error) {
        }
      });
    } else {
      that.verifyData();
    }
  }

  fn.verifyData = function () {


    that.wxShareData.desc = that.wxShareData.desc && that.wxShareData.desc.replace(/(^\s*)|(\s*$)/g, "");
    if (!that.wxShareData.desc || !that.wxShareData.imgUrl) { // 如果没有 描述或者没有分享图片
      if (configData.siteData) {
        var data = configData.siteData;
        that.wxShareData.desc = that.wxShareData.desc || ('更多精彩，尽在' + data.name + '客户端！');
        that.wxShareData.imgUrl = that.wxShareData.imgUrl || data.logo;
        this.setupShareData()
      } else {
        this.getSiteInfo();
      }

    } else {
      this.setupShareData()
    }

  }
  /**
 * 配置微信分享
 * @param data 微信授权信息
 */
  fn.setupShareData = function () {
    var data = that.wxShareConfig;
    wx.config({
      debug: false,////生产环境需要关闭debug模式
      appId: data.appid,//appId通过微信服务号后台查看
      timestamp: data.timestamp,//生成签名的时间戳
      nonceStr: data.nonceStr,//生成签名的随机字符串
      signature: data.signature,//签名
      jsApiList: [//需要调用的JS接口列表
        'checkJsApi',//判断当前客户端版本是否支持指定JS接口
        'onMenuShareTimeline',//分享给好友
        'onMenuShareAppMessage',//分享到朋友圈
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
      ]
    });
    var shareData = that.wxShareData;
    shareData.title = Util.unescapeHandler(shareData.title);
    shareData.desc = Util.unescapeHandler(shareData.desc);
    wx.ready(function () {
      //分享朋友圈
      wx.onMenuShareTimeline(shareData);
      //分享给好友
      wx.onMenuShareAppMessage(shareData);
      wx.onMenuShareQQ(shareData);
      wx.onMenuShareWeibo(shareData);
      wx.onMenuShareQZone(shareData);
      wx.error(function (res) {
        //alert(res.errMsg);
      });
      wx.showOptionMenu()
    });
  }
  /**
   * 刷新微信缓存
   */
  fn.refreshWeChatData = function () {
    if (!localStorage.pageLoadTime) {
      var myDate = new Date();
      localStorage.pageLoadTime = myDate.getTime();
    }
    localStorage.pageLoadTime = parseInt(localStorage.pageLoadTime);
    var myDate1 = new Date();
    if (myDate1.getTime() - localStorage.pageLoadTime > 5000) {
      localStorage.pageLoadTime = myDate1.getTime();
      if (window.location.href.indexOf('?') > 0) {
        var url = window.location.href.split('?')[0];
        var paramStr = window.location.href.split('?')[1];
        if (paramStr.indexOf('&t=') == -1) {
          window.location.href = window.location.href + '&t=' + Math.random().toString(36).substr(2);
        } else {
          var index = paramStr.indexOf('&t=');
          paramStr = paramStr.substring(0, index);
          window.location.href = url + '?' + paramStr + '&t=' + Math.random().toString(36).substr(2);
        }
      } else {
        window.location.href = window.location.href + '?t=' + Math.random().toString(36).substr(2);
      }
      window.location.reload;
    }
  }

  fn.getSiteInfo = function () {
    FooterRequest.getSiteInfo({
      siteId: $('#siteId').val() || Util.getUrlParam('siteId') || Util.getUrlParam('sid')
    })
      .then(function (data) {
        data = data || {};
        that.wxShareData.desc = that.wxShareData.desc || ('更多精彩，尽在' + data.name + '客户端！');
        that.wxShareData.imgUrl = that.wxShareData.imgUrl || data.logo;
        configData.siteData = data || {};
        that.setupShareData();
      }, function (err) {
        console.log(err);
      });
  }
  return window.WxData = fnClass;
})
