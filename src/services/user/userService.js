import constant from 'config/constant'
import BaseService from 'services/baseService'

const FORGOT_PASSWORD = email => {
  const url = `${constant.BASE_URL}/api/user/forgot-password?email=${email}`
  return BaseService.get(url)
}

const FORGOT_PASSWORD_NEW = body => {
  const url = `${constant.BASE_URL}/api/user/forgot-password`
  return BaseService.post(url, body)
}

const INFO_ME = token => {
  const url = `${constant.BASE_URL}/api/info/me`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

const INFO_MENU = token => {
  const url = `${constant.BASE_URL}/api/info/menu`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

export default {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_NEW,
  INFO_ME,
  INFO_MENU,
}
