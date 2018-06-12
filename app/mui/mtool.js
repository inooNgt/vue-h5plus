window.MTOOL = (function() {
  /**
   * tabbar子页面配置
   */
  var config = {
    subpages: ["home.html", "vigour.html", "my.html"],
    top: "0px",
    bottom: "50px",
    loginPages: ["my.html"],
    loginPath: "login.html"
  };

  var isPlus = false;
  // 判断runtime是否支持5+ API
  if (navigator.userAgent.indexOf("Html5Plus") < 0) {
    //不支持5+ API
    console.log("不支持5+ API");
  } else {
    //支持5+ API
    isPlus = true;
  }

  /**
   * 本地存储
   */
  var storage = (function() {
    return isPlus && typeof plus !== "undefined" ? plus.storage : localStorage;
  })();

  /**
   * 初始化页面
   */
  function initPage() {
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

    var pathname = window.location.pathname || "";
    pathname = pathname.substr(pathname.lastIndexOf("/") + 1);

    //Plus环境下的tabbar子页面检查activeNavPath
    if (isPlus && config.subpages.indexOf(pathname) !== -1) {
      pathname = storage.getItem("activeNavPath") || config.subpages[0];
    }

    console.log("current pathname: " + pathname);
    //检查登录
    checkLogin(pathname);
  }

  /**
   * 确认需要登录后,处理登录检查
   */
  function checkLogin(path) {
    if (!needLogin(path)) {
      return;
    }

    //todo by ngt
    var logined = true;

    if (!logined) {
      if (isPlus) {
        mui.plusReady(function() {
          var ws = plus.webview.currentWebview();
          console.log("当前Webview窗口：" + ws.getURL());
          MTOOL.openWindow("login.html");
        });
      } else {
        window.location.href = config.loginPath;
      }
    }
  }

  /**
   * 快速新开webview
   * @param {String} url
   */
  function openWindow(url) {
    mui.openWindow({
      url: url,
      extras: {
        name: url
      },
      // show: {
      //   aniShow: "slide-in-bottom"
      // },
      waiting: {
        autoShow: false
      }
    });
  }

  /**
   * 主页面容器
   * @param {*} idx 页面索引
   */
  function initWebview(idx) {
    //设置默认打开首页显示的子页序号；
    var index = idx || 0;
    //把子页的路径写在数组里面
    var subpages = config.subpages;

    //需要登录
    if (needLogin(subpages[index])) {
      console.log(subpages[index] + " need login");
    }

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
        if (i != index) {
          sub.hide();
        }
        //将webview对象填充到窗口
        self.append(sub);
      }

      storage.setItem("activeNavPath", subpages[index]);

      // var loginwv = plus.webview.create("login.html", "login.html");
    });
  }

  /**
   * 对应path是否需要登录
   * @param {String} path
   */
  function needLogin(path) {
    return config.loginPages.indexOf(path) !== -1;
  }

  /**
   * 切换tabbar
   * @param {Object} options
   * @param {Function} fn
   */
  function switchNav(options) {
    if (typeof plus !== "undefined") {
      plus.webview.show(options.to);
      plus.webview.hide(options.from);
    } else {
      window.location.href = options.to;
    }
    storage.setItem("activeNavPath", options.to);
  }

  /**
   * 调用系统分享
   * @param {Object} opt
   */
  function shareSystem(opt) {
    // if ("iOS" == plus.os.name) {
    //   //iOS平台添加链接地址
    //   opt.msg.href = "http://www.xxx.com/";
    // }

    if (!opt.success) {
      opt.success = function() {
        console.log("success");
      };
    }

    if (!opt.fail) {
      opt.fail = function() {
        console.log("fail");
      };
    }

    if (isPlus && plus.share.sendWithSystem) {
      plus.share.sendWithSystem(opt.msg, opt.success, opt.fail);
    } else {
      console.log("非H5+环境，无分享功能");
    }
  }

  return {
    initPage: initPage,
    initWebview: initWebview,
    switchNav: switchNav,
    isPlus: isPlus,
    storage: storage,
    config: config,
    needLogin: needLogin,
    checkLogin: checkLogin,
    shareSystem: shareSystem,
    openWindow: openWindow
  };
})();

MTOOL.initPage();
