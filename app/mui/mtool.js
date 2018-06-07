window.MTOOL = (function() {
  var config = {
    subpages: ["vigour.html", "my.html"],
    top: "0px",
    bottom: "50px"
  };

  var isPlus = false;
  // 判断runtime是否支持5+ API
  if (navigator.userAgent.indexOf("Html5Plus") < 0) {
    //不支持5+ API
    console.log("不支持5+ API");
  } else {
    //支持5+ API
    console.log("支持5+ API");
    isPlus = true;
  }

  function initPage(fn) {
    //取消浏览器的所有事件，使得active的样式在手机上正常生效
    document.addEventListener(
      "touchstart",
      function() {
        return false;
      },
      true
    );

    // 禁止选择
    document.oncontextmenu = function() {
      return false;
    };
  }

  function initWebview(idx) {
    //设置默认打开首页显示的子页序号；
    var Index = idx;
    //把子页的路径写在数组里面
    var subpages = config.subpages;

    //所有的plus-*方法写在mui.plusReady中或者后面。
    mui.plusReady(function() {
      //获取当前页面所属的Webview窗口对象
      var self = plus.webview.currentWebview();
      for (var i = 0; i < subpages.length; i++) {
        //创建webview子页
        var sub = plus.webview.create(
          subpages[i], //子页url
          subpages[i], //子页id
          {
            top: config.top, //设置距离顶部的距离
            bottom: config.bottom //设置距离底部的距离
          }
        );
        //如不是我们设置的默认的子页则隐藏，否则添加到窗口中
        if (i != Index) {
          sub.hide();
        }
        //将webview对象填充到窗口
        self.append(sub);
      }
    });
  }

  function switchNav(options) {
    if (typeof plus !== "undefined") {
      plus.webview.show(options.to);
      plus.webview.hide(options.from);
    } else {
      window.location.href = options.to;
    }
  }

  function ready() {
    if (isPlus) {
    }
  }

  return {
    initPage: initPage,
    initWebview: initWebview,
    switchNav: switchNav,
    ready: ready,
    isPlus: isPlus
  };  
})();

MTOOL.initPage();
