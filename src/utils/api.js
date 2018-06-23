const API = {
  countries: "/v1/common/countries",
  env: "/v1/common/env",
  areacodelist: "/v1/common/codes",
  register: "/v1/common/user",
  smscode: "/v1/common/sms-code",
  login: "/v1/common/token",
  auth: {
    user: "/v1/user",
    del: "/v1/common/token/TOKEN",
    alterusername: "/v1/user/username",
    altergender: "/v1/user/username",
    alterphone: "/v1/user/mobile-phone",
    smskey: "/v1/user/sms-key",
    usersmscode: "/v1/user/sms-code"
  }
};

export default API;
