import constant from 'config/constant'
import BaseService from 'services/baseService'

const GET_INDUSTRY_PAGE = (page, size, body, token) => {
  const url = `${constant.BASE_URL}/api/admin/industry/page?page=${page}&size=${size}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

const GET_INDUSTRY_DETAILS = (id, token) => {
  const url = `${constant.BASE_URL}/api/admin/industry/${id}/details`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

const ADD_INDUSTRY_DETAIL = (body, token) => {
  const url = `${constant.BASE_URL}/api/admin/industry/detail/add`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

export default {
  GET_INDUSTRY_PAGE,
  GET_INDUSTRY_DETAILS,
  ADD_INDUSTRY_DETAIL,
}
