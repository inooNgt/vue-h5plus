import axios from "axios";
import config from "utils/config";
import Qs from "qs";

const http = options => {
  if (typeof options.url !== "undefined") {
    options.url = config.host + options.url;
  }

  return axios(options);
};

const get = (url, options) => {
  if (typeof url !== "undefined") {
    url = config.host + url;
  }

  return axios.get(url, options);
};

const post = (url, data, options) => {
  if (typeof url !== "undefined") {
    url = config.host + url;
  }

  if (typeof data === "object") data = encodeURI(Qs.stringify(data));

  return axios.post(url, data, options);
};

export { http, get, post };
