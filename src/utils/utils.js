import axios from "axios";
import config from "utils/config";
import API from "utils/api";
import Qs from "qs";

import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);

const http = options => {
  options = setHeaders(url, options);
  if (typeof options.url !== "undefined") {
    options.url = config.host + options.url;
  }

  return axios(options);
};

const get = (url, options) => {
  options = setHeaders(url, options);

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

  return axios.post(url, data, options);
};

const getQuery = str => {
  if (typeof str !== "string" || !str) {
    str = window.location.href;
  }
  return Qs.parse(str.substr(str.indexOf("?") + 1));
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
    changeToLocalUrl(path);
  }
  function galleryFail(error) {
    console.log(error);
  }
  function captureImage() {
    let cmr = plus.camera.getCamera();
    let res = cmr.supportedImageResolutions[0];
    let fmt = cmr.supportedImageFormats[0];
    cmr.captureImage(
      path => {
        console.log("Capture image success");
        changeToLocalUrl(path);
      },
      error => {
        console.log("Capture image failed: " + error.message);
      },
      { resolution: res, format: fmt }
    );
  }
  function changeToLocalUrl(path) {
    plus.io.resolveLocalFileSystemURL(path, entry => {
      callback && callback(path, entry);
    });
  }
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

export {
  http,
  get,
  post,
  del,
  getQuery,
  preload,
  clone,
  getCachedObject,
  getCachedData,
  selectImg
};
