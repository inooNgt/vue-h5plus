const API = {
  countries: "/v1/common/countries",
  env: "/v1/common/env",
  areacodelist: "/v1/common/codes",
  register: "/v1/common/user",
  smscode: "/v1/common/sms-code",
  login: "/v1/common/token",
  help: "/v1/help",
  agreement: "/v1/help/agreement",
  contact: "/v1/help/contact",
  about: "/v1/help/about",
  helpview: "/v1/help/view",
  auth: {
    user: "/v1/user",
    userfile: "/v1/user/file",
    signup: "/v1/application",
    signin: "/v1/application/check",
    identity: "/v1/user/identity",
    settings: "/v1/user/settings",
    logout: "/v1/user/logout",
    alterusername: "/v1/user/username",
    altergender: "/v1/user/username",
    alterphone: "/v1/user/mobile-phone",
    smskey: "/v1/user/sms-key",
    avatar: "/v1/user/avatar",
    coursejoining: "/v1/course/joining",
    courseown: "/v1/course/own",
    courseinfo: "/v1/course/view",
    activityjoining: "/v1/activity/joining",
    activityown: "/v1/activity/own",
    activityinfo: "/v1/activity/view",
    usersmscode: "/v1/user/sms-code"
  }
};

export default API;
