import constant from 'config/constant'
import BaseService from 'services/baseService'

const SEARCH_INSTITUTION = (page, size, body, token) => {
  const url = `${constant.BASE_URL}/api/admin/institution/page?page=${page}&size=${size}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

export default {
  SEARCH_INSTITUTION,
}
