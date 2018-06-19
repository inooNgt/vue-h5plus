import axios from "axios";
import config from "utils/config";
import API from "utils/api";
import Qs from "qs";

const http = options => {
  options = setHeaders(url, options);
  if (typeof options.url !== "undefined") {
    options.url = config.host + options.url;
  }

  return axios(options);
};

const get = (url, options) => {
  options = setHeaders(url, options);

  console.log("options", options);

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

  if (typeof data === "object") data = encodeURI(Qs.stringify(data));

  return axios.post(url, data, options);
};

// 授权headers
function setHeaders(url, options) {
  const isAuth = checkAuth(url);
  const token = MTOOL.storage.getItem(config.keys.token).replace(/^"|"$/g, "");

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

export { http, get, post, del };
