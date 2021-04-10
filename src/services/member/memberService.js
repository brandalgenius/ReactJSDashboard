import constant from 'config/constant'
import BaseService from 'services/baseService'

const GET_MEMBER_INFO = token => {
  const url = `${constant.BASE_URL}/api/member/info`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

const GET_MEMBER = (id, token) => {
  const url = `${constant.BASE_URL}/api/member/user/@/${id}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

const UPDATE_MEMBER = (body, token) => {
  const url = `${constant.BASE_URL}/api/member/update`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.put(url, body, { headers })
}

const UPDATE_MEMBER_USER = (id, body, token) => {
  const url = `${constant.BASE_URL}/api/member/user/update/${id}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.put(url, body, { headers })
}

const ADD_MEMBER_USER = (body, token) => {
  const url = `${constant.BASE_URL}/api/member/user/add`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

const DELETE_MEMBER_USER = (id, token) => {
  const url = `${constant.BASE_URL}/api/member/user/delete/${id}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.delete(url, { headers })
}

const UPLOAD_PHOTO = (body, token) => {
  const url = `${constant.BASE_URL}/api/member/user/upload-photo`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

export default {
  GET_MEMBER_INFO,
  GET_MEMBER,
  UPDATE_MEMBER,
  UPDATE_MEMBER_USER,
  DELETE_MEMBER_USER,
  ADD_MEMBER_USER,
  UPLOAD_PHOTO,
}
