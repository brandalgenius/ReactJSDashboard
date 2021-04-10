import constant from 'config/constant'
import BaseService from 'services/baseService'

const POST_REGISTRATION = body => {
  const url = `${constant.BASE_URL}/api/user/registration`
  return BaseService.post(url, body)
}

const POST_LOGIN = body => {
  const url = `${constant.BASE_URL}/api/authenticate`
  return BaseService.post(url, body)
}

const POST_ACTIVATION = (email, code) => {
  const url = `${constant.BASE_URL}/api/user/activation?email=${email}&activationCode=${code}`
  return BaseService.get(url)
}

export default {
  POST_REGISTRATION,
  POST_LOGIN,
  POST_ACTIVATION,
}
