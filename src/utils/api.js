const api = {
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
    altergender: "/v1/user/username"
  }
};

export default api;
