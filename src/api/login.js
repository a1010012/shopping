// 此处用于存放所有登录相关的接口请求
import request from '@/utils/request'

// 1. 获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 2. 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 3. 登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode,
    }
  },
    {
      headers: { // Header 参数（添加 platform，必需！）
        platform: 'H5' // 可选值：'H5'（网页端）、'MP-WEIXIN'（微信小程序）等，根据实际场景选择
      }
    })
}
