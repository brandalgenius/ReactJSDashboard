import constant from 'config/constant'
import BaseService from 'services/baseService'

const UPDATE_MEMBER = (id, body, token) => {
  const url = `${constant.BASE_URL}/api/admin/member/update/${id}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.put(url, body, { headers })
}

const SEARCH_MEMBER_PAGE = (page, size, body, token) => {
  const url = `${constant.BASE_URL}/api/admin/member/page?page=${page}&size=${size}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

const ADD_MEMBER = (body, token) => {
  const url = `${constant.BASE_URL}/api/admin/member/add`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

const GET_MEMBER = (id, token) => {
  const url = `${constant.BASE_URL}/api/admin/member/@/${id}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

const GET_DEPOSITS = (id, token) => {
  const url = `${constant.BASE_URL}/api/admin/member/@/${id}/deposits`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

const UPDATE_DEPOSIT = (id, body, token) => {
  const url = `${constant.BASE_URL}/api/admin/member/update/deposit/${id}/`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.put(url, body, { headers })
}

export default {
  UPDATE_MEMBER,
  SEARCH_MEMBER_PAGE,
  ADD_MEMBER,
  GET_MEMBER,
  GET_DEPOSITS,
  UPDATE_DEPOSIT,
}
