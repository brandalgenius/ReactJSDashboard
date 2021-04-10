import constant from 'config/constant'
import BaseService from 'services/baseService'

const GET_BIDDING_METHOD_PAGE = (page, size, body, token) => {
  const url = `${constant.BASE_URL}/api/admin/bidding-method/page?page=${page}&size=${size}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

const GET_BIDDING_METHOD_DETAILS = (id, token) => {
  const url = `${constant.BASE_URL}/api/admin/bidding-method/${id}/details`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

const ADD_BIDDING_METHOD_DETAIL = (body, token) => {
  const url = `${constant.BASE_URL}/api/admin/bidding-method/detail/add`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

export default {
  GET_BIDDING_METHOD_PAGE,
  GET_BIDDING_METHOD_DETAILS,
  ADD_BIDDING_METHOD_DETAIL,
}
