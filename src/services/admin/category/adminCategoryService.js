import constant from 'config/constant'
import BaseService from 'services/baseService'

const GET_FIRST_LEVEL_PAGE = (page, size, token) => {
  const url = `${constant.BASE_URL}/api/organization/page?page=${page}&size=${size}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

const GET_SECOND_LEVEL_PAGE = (page, size, id, token) => {
    const url = `${constant.BASE_URL}/api/organization/${id}/second-level/page?page=${page}&size=${size}`
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    return BaseService.get(url, { headers })
}

const GET_THIRD_LEVEL_PAGE = (page, size, id, token) => {
    const url = `${constant.BASE_URL}/api/organization/second-level/${id}/third-level/page?page=${page}&size=${size}`
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    return BaseService.get(url, { headers })
}

export default {
    GET_FIRST_LEVEL_PAGE,
    GET_SECOND_LEVEL_PAGE,
    GET_THIRD_LEVEL_PAGE,
}