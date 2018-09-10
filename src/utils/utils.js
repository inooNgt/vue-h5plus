import axios from "axios";
import config from "utils/config";
import API from "utils/api";
import Qs from "qs";

import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);

const STATUS_NOT_ACTIVE = 1; // 未激活
const STATUS_ACTIVE = 2; // 正常状态
const STATUS_DELETED = 3; // 被禁止的用户

const http = options => {
  options = setHeaders(url, options);
  if (typeof options.url !== "undefined") {
    options.url = config.host + options.url;
  }

  return axios(options);
};

const get = (url, options) => {
  options = setHeaders(url, options);

  // console.log("options", options);

  if (typeof url !== "undefined") {
    url = config.host + url;
  }

  return axios.get(url, options);
};

const del = (url, options) => {
  options = setHeaders(url, options);
  if (typeof url !== "undefined") {
    url = config.host + url;
  }

  return axios.delete(url, options);
};

const post = (url, data, options) => {
  options = setHeaders(url, options);
  if (typeof url !== "undefined") {
    url = config.host + url;
  }

  let disableQs =
    options &&
    options.headers &&
    options.headers["Content-Type"] === "image/png";

  if (typeof data === "object" && !disableQs) data = Qs.stringify(data);
  // if (typeof data === "object") {
  //   data = encodeURI(
  //     Qs.stringify(data, {
  //       encode: false
  //     })
  //   );
  // }

  // console.log("post options:", options, url);
  // console.log("post data:", data);

  return axios.post(url, data, options);
};

const getQuery = str => {
  if (typeof str !== "string" || !str) {
    str = window.location.href;
  }
  return Qs.parse(str.substr(str.indexOf("?") + 1));
};

const formatDate = function(fmt) {
  let date = new Date();
  var o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

// 检查手机号格式
const checkPhone = phone => {
  let result = true;
  let reg = /^[0-9]*$/;
  result = reg.test(phone);

  return result;
};

// 授权headers
function setHeaders(url, options) {
  const isAuth = checkAuth(url);
  const token = (MTOOL.storage.getItem(config.keys.token) || "").replace(
    /^"|"$/g,
    ""
  );

  options = options || {};
  if (isAuth) {
    if (!options.headers) options.headers = {};

    options.headers = Object.assign(options.headers, {
      Authorization: "Bearer " + token
    });
  }

  return options;
}

function checkAuth(url) {
  let result = false;
  for (let key in API.auth) {
    if (API.auth[key] === url) {
      result = true;
      break;
    }
  }
  return result;
}

// 获取缓存的用户信息
const getCachedUser = () => {
  let cachedUser = {};
  try {
    cachedUser =
      JSON.parse(MTOOL.storage.getItem(config.keys.user)) || config.userTpl;
  } catch (error) {
    // console.log("getCachedUser error", error);
  }
  return cachedUser;
};

// 获取缓存的对象信息
const getCachedObject = key => {
  let cached;
  let content = MTOOL.storage.getItem(key);
  try {
    if (content) cached = JSON.parse(content);
  } catch (error) {
    console.log("getcached error", error);
  }
  return cached;
};

// 获取缓存的信息
const getCachedData = key => {
  let cached;
  try {
    cached = MTOOL.storage.getItem(key);
  } catch (error) {
    console.log("getcached error", error);
  }
  return cached;
};

// 获取最新的用户信息
const loadUserInfo = () => {
  return new Promise((resolve, reject) => {
    get(API.auth.user)
      .then(res => {
        let user = res.data.data;
        if (res.data.status === 200) {
          MTOOL.storage.setItem(config.keys.user, JSON.stringify(user));
          resolve(user);
        } else {
          reject(res.data);
        }
      })
      .catch(e => {
        reject(e);
      });
  });
};

const pySegSort = (list, groups) => {
  let temp = {};
  let result = [];

  if (!groups.length || !list.length) {
    return result;
  }

  groups.forEach(c => {
    temp = { group: c, data: [] };

    // 按需分组
    list.forEach(item => {
      // 首字母

      let han = (item.value_py && item.value_py[0]) || topy(item.value)[0];

      // 非字母组
      if (!/^[A-Za-z]$/.test(han) && c === "#") {
        temp.data.push(item);
      }
      // 字母组
      if (han.toUpperCase() === c) {
        temp.data.push(item);
      }
    });

    // 组内排序
    if (temp.data.length) {
      temp.data.sort((a, b) => {
        let apy = a.value_py || topy(a.value);
        let bpy = b.value_py || topy(a.value);
        return apy.localeCompare(bpy);
      });
    }

    result.push(temp);
  });

  return result;
};
// 按字母排序分组  todo
const groupSort = list => {
  let temp = {};
  let result = [];
  let groups = generateChars();

  list = formatList(list);

  if (!groups.length || !list.length) {
    return result;
  }

  groups.forEach(c => {
    temp = { label: c, data: [] };

    // 按需分组
    list.forEach(item => {
      // 首字母
      let han = (item.id && item.id[0]) || "";

      // 字母分组
      if (han.toUpperCase() === c) {
        temp.data.push(item);
      }
    });

    // 组内排序
    if (temp.data.length) {
      temp.data.sort((a, b) => {
        let apy = a.id || "";
        let bpy = b.id || "";
        return apy.localeCompare(bpy);
      });
    }

    result.push(temp);
  });

  return result;
};

function generateChars() {
  var str = [];
  for (var i = 65; i < 91; i++) {
    str.push(String.fromCharCode(i));
  }
  return str;
}

function formatList(data) {
  let result = [];
  for (let key in data) {
    result.push({
      id: key,
      value: `${key} ${data[key]}`
    });
  }
  return result;
}

function topy(str) {
  return str;
}

function getPhoneCode(list, code) {
  let temp = "";
  for (let key in list) {
    temp = key.replace(/[^A-Z]/gi, "");
    if (code === temp) {
      return { key, code: key.replace(/[^0-9]/gi, "") };
    }
  }
  return "";
}

const getAddressBook = () => {
  return new Promise((resolve, reject) => {
    plus.contacts.getAddressBook(
      plus.contacts.ADDRESSBOOK_PHONE,
      addressbook => {
        // 可通过addressbook进行通讯录操作
        console.log("Get address book success!");

        resolve(addressbook);
      },
      reject
    );
  });
};

const extractAddressBook = addressbook => {
  return new Promise((resolve, reject) => {
    addressbook.find(
      null,
      contacts => {
        let list = [];
        contacts.forEach(item => {
          let temp = {};

          temp.id = item.id;
          temp.displayName = item.displayName;
          temp.displayName_py = topy(item.displayName);
          temp.phoneNumbers = item.phoneNumbers;
          temp.photos = item.photos;

          list.push(temp);

          console.log(`contacts item displayName:${item.displayName}`);
          // console.log(`contacts item id:${item.id}`);
          // console.log(`contacts item photos:${item.photos}`);
          // if (item.photos && item.photos.length) {
          //   item.photos.forEach((v, k) => {
          //     for (let key in v) {
          //       console.log("photos." + key + ": " + v[key]);
          //     }
          //   });
          // }
        });
        resolve(list);
        console.log("forEach list" + list.length);
      },
      reject,
      { multiple: true }
    );
  });
};

const readAsDataURL = (entry, options) => {
  let reader = null;
  entry.file(
    file => {
      reader = new plus.io.FileReader();
      if (options && options.onloadend) {
        reader.onloadend = options.onloadend;
      }
      if (options && options.onerror) {
        reader.onerror = options.onerror;
      }
      if (options && options.onloadstart) {
        reader.onloadstart = options.onloadstart;
      }
      reader.readAsDataURL(file);
    },
    e => {
      alert(e.message);
    }
  );
};

const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const dataURLtoBlob = dataurl => {
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const getSubpageValueFromObjCached = (detail, cachedkey) => {
  let result = "";
  if (detail && detail[detailkey]) {
    result = detail[detailkey];
  } else {
    let cachedObj = getCachedObject(config.keys[cachedkey]);
    result = cachedObj && cachedObj[cachedkey];
  }

  return result;
};

const copyContent = elementId => {
  // 动态创建 input 元素
  let aux = document.createElement("input");
  aux.style = "position:absolute;z-index:-9;opacity:0;";

  // 获得需要复制的内容
  aux.setAttribute("value", document.getElementById(elementId).innerHTML);

  // 添加到 DOM 元素中
  document.body.appendChild(aux);

  // 执行选中
  // 注意: 只有 input 和 textarea 可以执行 select() 方法.
  aux.select();

  // 获得选中的内容
  let content = window.getSelection().toString();

  // 执行复制命令
  document.execCommand("copy");

  // 将 input 元素移除
  document.body.removeChild(aux);
};

const addClass = (obj, cls) => {
  let objClass = obj.className;
  let blank = objClass !== "" ? " " : "";
  let added = objClass + blank + cls;
  obj.className = added;
};

const removeClass = (obj, cls) => {
  let objClass = " " + obj.className + " ";
  objClass = objClass.replace(/(\s+)/gi, " ");
  let removed = objClass.replace(" " + cls + " ", " ");
  removed = removed.replace(/(^\s+)|(\s+$)/g, "");
  obj.className = removed;
};

const hasClass = (obj, cls) => {
  let objClass = obj.className;
  let objClassLst = objClass.split(/\s+/);
  let x = 0;
  for (x in objClassLst) {
    if (objClassLst[x] === cls) {
      return true;
    }
  }
  return false;
};

const MToast = msg => {
  if (typeof window.plus !== "undefined") {
    plus.nativeUI.toast(msg);
  } else {
    Toast(msg);
  }
};

/**
 * 对象深拷贝
 * @param {Object} obj
 */
const clone = obj => {
  if (!obj && typeof obj !== "object") {
    return;
  }
  let result = obj.constructor === Object ? {} : [];
  for (let key in obj) {
    result[key] =
      obj[key] && typeof obj[key] === "object" ? clone(obj[key]) : obj[key];
  }
  return result;
};

/**
 * 分享操作
 * @param {plus.share.ShareService} s
 */
const shareAction = (service, opt) => {
  if (!service) {
    return;
  }
  if (service.authenticated) {
    shareMessage(service, opt);
  } else {
    service.authorize(
      _service => {
        shareMessage(_service, opt);
      },
      e => {
        opt.fail && opt.fail(e);
      }
    );
  }
};
/**
 * 发送分享消息
 * @param {plus.share.ShareService} service
 */
const shareMessage = (service, opt) => {
  service.send(
    {
      content: opt.content || "",
      extra: { scene: (opt && opt.scene) || "WXSceneSession" }
    },
    () => {
      opt.success && opt.success();
    },
    e => {
      opt.fail && opt.fail(e);
    }
  );
};

/**  分享
 *@param {plus.share.ShareService} service
 * @param {Object} opt,opt.content 分享内容，opt.success/opt.fail 分享回调
 */
const sendShare = (service, opt) => {
  shareAction(service, opt);
};

const guid = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

/**
 * 预加载
 * @param {Array} pages
 */
const preload = pages => {
  let result = [];
  if (pages.length && MTOOL.isPlus) {
    MTOOL.plusReady(function() {
      pages.forEach(pagepath => {
        let page = mui.preload({
          url: pagepath,
          id: pagepath, // 默认使用当前页面的url作为id
          styles: {
            // render: "always" // 一直渲染
          },
          extras: {} // 自定义扩展参数
        });

        result.push(page);
      });
    });
  }

  return result;
};

/**
 * 分享行为获得能量
 * @param {String} action
 *   shareSNS, 社交分享
 *   shareGroup, 分享门派，需传入id
 *   shareArticle', 分享文章，需传入id
 *   shareCourse', 分享课程，需传入id
 *   shareActivity', 分享活动，需传入id
 */
const postEngryAction = param => {
  let options;

  if (typeof param === "object") {
    options = param;
  } else {
    options = { action: param || "" };
  }

  post(API.auth.energyaction, options)
    .then(res => {
      res = res && res.data;
      let data = res.data;
      if (res.status === 200 && data) {
        console.log("post share succeed:" + options.action);
      }
    })
    .catch(e => {
      console.log(e);
    });
};

const downloadImg = picurl => {
  return new Promise((resolve, reject) => {
    // 创建下载任务
    if (!picurl || !MTOOL.isPlus) reject(new Error("参数异常"));

    // 需要配置filename，否则某些系统相册无法识别
    let options = {
      filename:
        "_downloads/images/" +
        new Date().getTime() +
        picurl.substr(picurl.lastIndexOf("/") + 1)
    };
    let dtask = plus.downloader.createDownload(picurl, options, (d, status) => {
      // 下载完成
      if (status === 200) {
        resolve(d.filename);
      } else {
        reject(new Error("下载失败"));
      }
    });
    // dtask.addEventListener( "statechanged", onStateChanged, false );
    dtask.start();
  });
};

const delHtmlTag = str => {
  return str.replace(/<[^>]+>/g, ""); //  去掉所有的html标记
};

const stopPropagation = evt => {
  let e = evt || window.event;
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
};

/**
 * 选取照片
 * @param {Function} callback
 */
const selectImg = callback => {
  MTOOL.plusReady(() => {
    plus.nativeUI.actionSheet(
      {
        cancel: "取消",
        buttons: [{ title: "相册" }, { title: "拍照" }]
      },
      e => {
        console.log("User pressed: " + e.index);
        if (e.index === 1) {
          plus.gallery.pick(gallerySuccess, galleryFail, {});
        }
        if (e.index === 2) {
          captureImage();
        }
      }
    );
  });

  function gallerySuccess(path) {
    console.log("gallerySuccess");
    console.log(path);
    changeToLocalUrl(path);
  }
  function galleryFail(error) {
    console.log("galleryFail");
    console.log(error);
  }
  function captureImage() {
    let cmr = plus.camera.getCamera();
    let res = cmr.supportedImageResolutions[0];
    let fmt = cmr.supportedImageFormats[0];
    console.log("Resolution: " + res + ", Format: " + fmt);
    cmr.captureImage(
      path => {
        console.log("Capture image success: " + path);
        changeToLocalUrl(path);
      },
      error => {
        console.log("Capture image failed: " + error.message);
      },
      { resolution: res, format: fmt }
    );
  }
  function changeToLocalUrl(path) {
    console.log("in changeToLocalUrl path:" + path);
    plus.io.resolveLocalFileSystemURL(path, entry => {
      callback && callback(path, entry);
      // MTOOL.openWindow("my_setting_head.html", {
      //   extras: {
      //     localurl: entry.toLocalURL(),
      //     imgpath: path
      //   }
      // });
    });
  }
};

const redirect = (redirect, data) => {
  const REDIRECT_NONE = 0; // 不跳转
  const REDIRECT_URL_APP = 11; // APP内打开⽹址
  const REDIRECT_URL_EXPLORER = 12; // 浏览器打开⽹址
  const REDIRECT_GROUP_DETAIL = 21; // 跳转到⻔派详情
  const REDIRECT_USER_DETAIL = 22; // 跳转到⽤户详情
  const REDIRECT_ARTICLE_DETAIL = 23; // 跳转到⽂章详情
  const REDIRECT_COURSE_DETAIL = 24; // 跳转到课程详情
  const REDIRECT_ACTIVITY_DETAIL = 25; // 跳转到活动详情

  let target = "";
  let id = "";
  // test
  console.log("redirect:" + redirect + " data:" + data);

  if (redirect === REDIRECT_NONE) {
    return;
  }

  if (redirect === REDIRECT_URL_EXPLORER && data) {
    if (MTOOL.isPlus) {
      MTOOL.plusReady(() => {
        plus.runtime.openURL(data);
      });
    } else {
      location.href = data;
    }

    return;
  }

  if (redirect === REDIRECT_URL_APP && data) {
    if (MTOOL.isPlus) {
      console.log("open common_embed.html:" + data);
      MTOOL.openWindow("common_embed.html", {
        extras: {
          embedURL: data
        }
      });
    } else {
      location.href = data;
    }

    return;
  }

  switch (redirect) {
    case REDIRECT_GROUP_DETAIL:
      target = `home_info_menpai.html#/${data}`;
      // MTOOL.invoke("home_info_menpai.html", "event_update", {
      //   id: data
      // });
      break;
    case REDIRECT_ARTICLE_DETAIL:
      target = `common_article.html#/${data}`;
      MTOOL.invoke("common_article.html", "event_update", { id: data });
      break;
    case REDIRECT_COURSE_DETAIL:
      target = `info_course.html?id=${data}`;
      break;
    case REDIRECT_ACTIVITY_DETAIL:
      target = `info_activity.html?id=${data}`;
      // MTOOL.invoke("info_activity.html", "event_update", { id: data });
      break;
    case REDIRECT_USER_DETAIL:
      target = `menpai_member.html#/${data}`;
      // MTOOL.invoke("menpai_member.html", "event_update", { id: data });
      break;
  }

  MTOOL.openWindow(target);
};

export {
  http,
  get,
  post,
  del,
  guid,
  getQuery,
  formatDate,
  redirect,
  preload,
  clone,
  selectImg,
  downloadImg,
  addClass,
  delHtmlTag,
  sendShare,
  postEngryAction,
  removeClass,
  hasClass,
  getCachedUser,
  getCachedObject,
  getCachedData,
  loadUserInfo,
  formatList,
  checkPhone,
  pySegSort,
  copyContent,
  getPhoneCode,
  dataURLtoBlob,
  MToast,
  dataURLtoFile,
  readAsDataURL,
  getSubpageValueFromObjCached,
  groupSort,
  stopPropagation
};
