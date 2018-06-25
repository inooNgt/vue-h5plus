# DIC API V1

## API 服务地址

* http://api.dic.local ，DEV 环境
* https://api.dic.club ，PROD 环境

## 请求格式

* GET API_URL?parma1=a&param2=b

* POST API_URL?parma1=a&param2=b FROM_ENCODE_DATA(包含上传数据) 

## 请求通用字段

* 语言，如 locale=zh\_CN，locale=en\_US，不请求则使用服务器默认探测数据返回结果
* 时区，如 timezone=Asia/Shanghai，如果请求则使用服务器自动探测数据返回结果

## 返回格式

* JSON，如

```
{
    status: 400,//状态码
    name : "Not Acceptable",//错误类型
	 code : "错误编码",
    message: "Mobile phone is required", //错误信息   
    data: {} //成功返回时候的数据
}
```

* **如果数据中 `status ` 字段不为 200，则表示有错误发生**，错误信息由 `message` 或 `name` 字段返回

## 授权

有些API需要授权访问，如果直接访问则返回 401 错误，返回结果格式如下

```
{
    status: 401,
    name: "Unauthorized",
    message: "请重新登录"
}
```

## 授权访问

为了获得授权，需要先通过token接口获取 access token，然后利用 Bearer Auth 方式认证，具体就是在每次请求中添加如下header信息：

```
Authorization: Bearer token
```

### 访问限制

为了防止客户端滥用API，服务器端会做API访问限制，如果出现406错误，则表示访问受限

```
{
    status: 406,
    name: "Not Acceptable",
    message: "访问频率太高，请稍后再试"
}
```

### 环境信息

GET /v1/common/env

探测用户的环境信息

Response

```
{
	country_code: "CN",//国家编码
	calling_code: "0086", //国际区号
	locale: "zh_CN",//语言
	timezone: "Asia/Shanghai" // 时区
}
```

## 国家列表

GET /v1/common/countries

获取可用国家列表，该数据可适当缓存到客户端

Response

```
[
	{
		id : 'CN',
		value: 'China'
	},
	{
		id : 'US',
		value: 'USA'
	},
	...
]
```

## 国际区号列表

GET /v1/common/codes

获取可用国际区号列表，该数据可适当缓存到客户端

Response

```
[
	'US 001',
	'CN 0086',
	...
]
```

## 可用语言列表

GET /v1/common/locales

获取可用语言列表，该数据可适当缓存到客户端

Response

```
{
    "en-US": "English (US)",
    "zh_CN": "简体中文",
    ...
}
```

## 可用时区列表

GET /v1/common/timezones

获取可用时区列表，该数据可适当缓存到客户端

Response

```
[
	"Africa/Abidjan",
    "Africa/Accra",
    "Africa/Addis_Ababa",
    "Africa/Algiers",
    ...
]
```

## 获取短信验证码

POST /v1/common/sms-code

Request 

```
mobile_phone=CN 0086135123455678
exists_check=1//检测账号账号是否不存在，存在则提示错误信息
not_exists_check=1//检测账号账号是否存在，不存在则提示错误信息
```

Response

```
{
	waiting: 60,//等待多久可以再次发送验证码，秒
}
```

## 检查用户是否可用
GET /v1/common/existent-user

Request

```
username=username
mobile_phone=008613512345678
exclude_uid=1//需要排除的用户ID
```

```
11,//uid大于0说明用户存在
```

## 用户注册
POST /v1/common/user

Request

```
country_code=CN
calling_code=CN 0086
mobile_phone=135123445678
sms_code=768799
```

Response

```
'zdYKFp7le8omQGkq0unPRyG29uMDFHV-R-oR9-BX',//注册成功直接返回可访问的Token
```

## 获取授权（获取Access Token）

POST /v1/common/token

密码存在则优先使用密码验证，如果使用验证码登录，请将密码置空

Request

```
calling_code=CN 0086
mobile_phone=135123445678
password=12345677
sms_code=768799
```

Response

```
{
    "access_token": "WrQQGpHlrnBlRplWgDqEKopIUOLqllhSgwLLst72",
	"user": {
        "id": 12,
        "identity": "135****6666",
        "status": 2,
        "username": "008613566666666",
        "country_code": null,
        "mobile_phone": "",
        "created_at": 1529028079,
        "updated_at": 1529028079,
        "logged_at": 1529029049,
        "avatar_base_url": null,
        "avatar_path": null,
        "gender": null,
        "locale": "zh_CN"
    }
}
```

### 用户状态说明
user.status 表示的是用户状态，当服务端返回的用户状态为1时，需要强制到完善邀请码界面

status 有以下几种含义

* const STATUS_NOT_ACTIVE = 1; 	//未激活
* const STATUS_ACTIVE = 2; 		//正常状态
* const STATUS_DELETED = 3; 		//被禁止的用户

## 注销

POST /v1/user/logout

## 找回密码（暂不实现）
POST /v1/common/pass-key

发送修改请求

Request

```
calling_code=CN 0086
mobile_phone=135123445678
password=12345677
sms_code=768799
```

Response

'zdYKFp7le8omQGkq0unPRyG29uMDFHV',//返回一串字符串，修改密码的时候需要回传,10分钟有效

## 重置密码（暂不实现）

PUT /v1/common/password

Request

```
pass_key=zdYKFp7le8omQGkq0unPRyG29uMDFHV
password=12345677
```


## 用户类接口需要授权访问

## 用户信息
GET /v1/user

获取当前登录用户信息

Response

```
{
    "id": 12,
    "identity": "135****6666",
    "status": 2,
    "username": "008613566666666",
    "country_code": null,
    "mobile_phone": "",
    "created_at": 1529028079,
    "updated_at": 1529028079,
    "logged_at": 1529029049,
    "avatar_base_url": null,
    "avatar_path": null,
    "gender": null,
    "locale": "zh_CN"
}
```

### 修改头像
POST /v1/user/avatar

直接POST 二进制的文件数据，将文件类型附加在Headers中

Request

```
Headers[Content-Type] = 'image/png'
POST 二进制上传数据，文件表单上传格式
```

### 修改基础信息
POST /v1/user/settings

可一次修改 username, gender, locale, timezone, 
Request

```
username=username
gender=gender
locale=locale
timezone=timezone
```

### 登录用户获取手机验证码
POST /v1/user/sms-code

### 请求手机二次验证权限
POST /v1/user/sms-key

Request

```
sms_code=2683939
```

Response

```
'sms-key' //sms_key
```

### 修改手机号码

POST /v1/user/mobile-phone

Request

```
sms_key=sms-key
calling_code=CN 0086
mobile_phone=135123445678
sms_code=233333
```

### 修改密码
POST /v1/user/password

Request

```
sms_key=sms-key
password=password
```


## 实名认证

实名认证状态及证件类型定下如下

```
const STATUS_PENDING = 1;//待认证
const STATUS_CHECKING = 2;//认证中
const STATUS_SUCCESS = 3;//认证成功
const STATUS_FAIL = 4;//认证失败

const ID_TYPE_CARD = 1;//身份证
const ID_TYPE_PASSPORT = 2;//护照
```

## 上传文件
POST /v1/user/file

直接POST 二进制的文件数据，将文件类型附加在Headers中

Request

```
Headers[Content-Type] = 'image/png'
POST 二进制上传数据，文件表单上传格式
```

Response

```
{
    "base_url": "http://storage.dic.local/source",
    "path": "1/k9UjYMKkouBV8f8erSAw9u2tl57YU22r.png",
    "url": "http://storage.dic.local/source/1/k9UjYMKkouBV8f8erSAw9u2tl57YU22r.png",
    "delete_url": "/v1/user/file-delete?path=1%2Fk9UjYMKkouBV8f8erSAw9u2tl57YU22r.png"
}
```

## 获取认证状态

GET /v1/user/identity

Response

```
{
    "country_code": "CN",
    "status": 1,
    "real_name": null,
    "id_type": null,
    "id_number": null,
    "picture1": {
    	"base_url": "http://storage.dic.local/source",
       "path": "1/m_O5Mhi3H_pHPQ8lAB7Ht7nifczcpGjz.png",
    },
    "picture2": {
    	"base_url": "http://storage.dic.local/source",
       "path": "1/m_O5Mhi3H_pHPQ8lAB7Ht7nifczcpGjz.png",
    },
    "picture3": {
    	"base_url": "http://storage.dic.local/source",
       "path": "1/m_O5Mhi3H_pHPQ8lAB7Ht7nifczcpGjz.png",
    }
}
```

## 发起认证
POST 

Request
```
country_code=CN
real_name=name
id_type=ID_TYPE
id_number=证件号码
picture1[base_url] = http://storage.dic.local/source
picture1[path] = 1/m_O5Mhi3H_pHPQ8lAB7Ht7nifczcpGjz.png
picture2[base_url] = http://storage.dic.local/source
picture2[path] = 1/m_O5Mhi3H_pHPQ8lAB7Ht7nifczcpGjz.png
picture3[base_url] = http://storage.dic.local/source
picture3[path] = 1/m_O5Mhi3H_pHPQ8lAB7Ht7nifczcpGjz.png
```

## 文章类接口

## 获取帮助列表
GET /v1/help

Response

```
[
	{
	    "id": 1,
	    "slug": "",
	    "title": "",
	    "body": ""
	},
	...
]

```

## 获取帮助详情
GET /v1/help/view

Request
```
id=1
```

Response

```
{
    "title": "",
    "body": ""
},

```

## 关于我们

GET /v1/help/about

Response

```
{
    "title": "",
    "body": ""
},

```

## 联系我们

GET /v1/help/contact

Response

```
{
    "title": "",
    "body": ""
},

```

## 用户协议

GET /v1/help/agreement

Response

```
{
    "title": "",
    "body": ""
},

```

## 最新通知

GET /v1/

Response

```
{
	"published_at":"",
    "title": "",
},

```

## 通知列表
GET /v1/notice

Request

```
show_body=show_body
```

Response

```
[
	{
	    "id": 1,
	    "slug": "",
	    "published_at":"",
	    "title": "",
	    "body": ""
	},
	...
]

```

## 获取帮助详情
GET /v1/notice/view

Request
```
id=1
```

Response

```
{
	"published_at":"",
    "title": "",
    "body": ""
},

```