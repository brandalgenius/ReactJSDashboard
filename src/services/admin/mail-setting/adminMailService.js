import constant from 'config/constant'
import BaseService from 'services/baseService'

const SEARCH_MAIL_SETTING = (page, size, body, token) => {
  const url = `${constant.BASE_URL}​/api/email-setting/page?page=${page}&size=${size}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

const ADD_MAIL_SETTING = (page, size, body, token) => {
  const url = `${constant.BASE_URL}​/api/email-setting/add`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

const DELETE_MAIL_SETTING = (id, token) => {
  const url = `${constant.BASE_URL}/api/email-setting/@/${id}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.delete(url, { headers })
}

export default {
  SEARCH_MAIL_SETTING,
  ADD_MAIL_SETTING,
  DELETE_MAIL_SETTING,
}
