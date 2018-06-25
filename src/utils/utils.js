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

  if (typeof data === "object") data = Qs.stringify(data);
  // if (typeof data === "object") {
  //   data = encodeURI(
  //     Qs.stringify(data, {
  //       encode: false
  //     })
  //   );
  // }

  console.log("post options:", options, url);
  console.log("post data:", data);

  return axios.post(url, data, options);
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
    console.log("getCachedUser error", error);
  }
  return cachedUser;
};

// 获取缓存的对象信息
const getCachedObject = key => {
  let cached;
  try {
    cached = JSON.parse(MTOOL.storage.getItem(key));
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

export {
  http,
  get,
  post,
  del,
  getCachedUser,
  getCachedObject,
  getCachedData,
  loadUserInfo,
  formatList,
  checkPhone,
  pySegSort,
  getPhoneCode,
  groupSort
};
