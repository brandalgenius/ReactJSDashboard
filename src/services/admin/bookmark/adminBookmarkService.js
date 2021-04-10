import constant from 'config/constant'
import BaseService from 'services/baseService'

const GET_BOOKMARK_LIST = (page, size, body, token) => {
  const url = `${constant.BASE_URL}/api/bookmark/page?page=${page}&size=${size}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

export default {
  GET_BOOKMARK_LIST,
}
