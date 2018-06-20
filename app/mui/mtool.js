(function(global, undefined) {
  /**
   * tabbar子页面配置
   */
  var config = {
    subpages: ["home.html", "vigour.html", "my.html"],
    top: "0px",
    bottom: "50px",
    loginPages: ["my.html"],
    loginPath: "login.html",
    keys: {
      activenav: "md.index.activeNavPath",
      token: "ml.login.token"
    }
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
    return isPlus && typeof plus !== "undefined"
      ? plus.storage
      : global.localStorage;
  })();

  const logined = function() {
    return !!storage.getItem(config.keys.token);
  };

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

    // 隐藏滚动条
    plus.webview.currentWebview().setStyle({ scrollIndicator: "none" });

    var pathname = window.location.pathname || "";
    pathname = pathname.substr(pathname.lastIndexOf("/") + 1);

    //Plus环境下的tabbar子页面检查activeNavPath
    if (isPlus && config.subpages.indexOf(pathname) !== -1) {
      pathname = storage.getItem(config.keys.activenav) || config.subpages[0];
    }

    console.log("current pathname: " + pathname);

    // cwmc注册接口
    initExpose();

    //检查登录
    checkLogin(pathname);
  }

  function initExpose() {
    if (!isPlus) return;
    // 暴露统一接口
    MTOOL.cwcs.expose("forceUpdate", function() {
      console.log("forceUpdate");
      location.reload();
    });

    //为tabar子页面注册登陆回调
    // if (config.subpages.indexOf(pathname) !== -1) {
    //   MTOOL.cwcs.expose("tabbarUpdate", function() {
    //     console.log("tabbarUpdate");
    //   });
    // }
  }

  /**
   * 确认需要登录后,处理登录检查
   */
  function checkLogin(path) {
    if (!needLogin(path)) {
      return;
    }

    //todo by ngt
    // var logined = MTOOL.storage.getItem(config.token);
    // var logined = false;
    // if (!logined) {
    //   if (isPlus) {
    //     mui.plusReady(function() {
    //       var ws = plus.webview.currentWebview();
    //       console.log("当前Webview窗口：" + ws.getURL());
    //       openWindow(config.loginPath, { from: path });
    //     });
    //   } else {
    //     // todo by ngt 可以带参数
    //     window.location.href = config.loginPath;
    //   }
    // }
  }

  /**
   * 快速新开webview
   * @param {String} url
   */

  function openWindow(url, options) {
    var from = "";
    if (typeof options !== "undefined" && typeof options.from !== "undefined") {
      from = options.from;
    }
    mui.openWindow({
      url: url,
      extras: {
        name: url,
        from: from
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

      storage.setItem(config.keys.activenav, subpages[index]);

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

      //检查更新
      // if (needLogin(options.to)) {
      //   MTOOL.cwcs.invoke(options.to, "tabbarUpdate");
      // }
    } else {
      window.location.href = options.to;
    }
    storage.setItem(config.keys.activenav, options.to);
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

  /**
   * plusready or execute
   * @param {Function} fn
   */
  function plusReady(fn) {
    if (isPlus) {
      return mui.plusReady(fn);
    } else {
      setTimeout(function() {
        fn && fn();
      }, 0);
    }
  }

  /**
   * 获取元素位置
   * @param {Object} obj
   */
  function elementPosition(obj) {
    var curleft = 0,
      curtop = 0;
    if (obj.offsetParent) {
      curleft = obj.offsetLeft;
      curtop = obj.offsetTop;
      while ((obj = obj.offsetParent)) {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      }
    }
    return { x: curleft, y: curtop };
  }

  /**
   *跨webview通信系统（ Cross webview communication syetem）
   */
  var cwcs = {
    exposed: {},
    // 注册可被调用的接口
    expose: function(fnName, fn) {
      var self = this;
      if (self.exposed[fnName] !== undefined) {
        throw new Error("cwcs.expose: function already exists: " + fnName);
      }
      self.exposed[fnName] = fn;
    },
    // 被其它webview调用的入口
    invoked: function(fnName, params) {
      var fn = this.exposed[fnName];
      if (typeof fn != "function") {
        throw new Error("cwcs.invoke: function not found: " + fnName);
      }
      fn(params);
    },
    // 调用其它webview js函数
    invoke: function(vId, fnName, params) {
      plusReady(function() {
        var view = plus.webview.getWebviewById(vId);
        if (!view) {
          throw new Error("cwcs webview not found: " + vId);
        }

        var js = "MTOOL.cwcs.invoked(" + JSON.stringify(fnName);
        if (params) js += "," + JSON.stringify(params);
        js += ")";

        try {
          view.evalJS(js);
        } catch (e) {
          console.log(e);
        }
      });
    }
  };

  // 封装mui.fire
  var invoke = function(targetId, event, data) {
    let page = plus.webview.getWebviewById(targetId);
    return mui.fire(page, event, data);
  };

  var MTOOL = {
    initPage: initPage,
    initWebview: initWebview,
    switchNav: switchNav,
    isPlus: isPlus,
    storage: storage,
    config: config,
    cwcs: cwcs,
    logined: logined,
    plusReady: plusReady,
    needLogin: needLogin,
    checkLogin: checkLogin,
    shareSystem: shareSystem,
    openWindow: openWindow,
    invoke: invoke,
    elementPosition: elementPosition
  };

  global.MTOOL = MTOOL;
})(window, undefined);

MTOOL.initPage();
