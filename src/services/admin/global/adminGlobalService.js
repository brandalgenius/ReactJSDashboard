import constant from 'config/constant'
import BaseService, { cacheFetchData } from 'services/baseService'

const GET_ORGANIZATION_LIST = (token, cache) => {
  const url = `${constant.BASE_URL}/api/organization/all/list`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  if (cache) {
    return cacheFetchData(url, { headers })
  }
  return BaseService.get(url, { headers })
}

const GET_ORGANIZATION_LIST_SECOND_LEVEL = (id, token) => {
  const url = `${constant.BASE_URL}/api/organization/${id}/second-level/list`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

const GET_ORGANIZATION_LIST_THIRD_LEVEL = (id, token) => {
  const url = `${constant.BASE_URL}/api/organization/second-level/${id}/third-level/list`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

const GET_INDUSTRY_LIST = (token, cache = false) => {
  const url = `${constant.BASE_URL}/api/industry/list`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  if (cache) {
    return cacheFetchData(url, { headers })
  }
  return BaseService.get(url)
}

const GET_BIDDING_METHOD_LIST = (token, cache = false) => {
  const url = `${constant.BASE_URL}/api/bidding-method/list`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  if (cache) {
    return cacheFetchData(url, { headers })
  }
  return BaseService.get(url)
}

const GET_FILE = (token, urlFile) => {
  const url = `${constant.BASE_URL}/api/file?url=${urlFile}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, {
    responseType: 'arraybuffer',
    headers,
  })
}

export default {
  GET_ORGANIZATION_LIST,
  GET_ORGANIZATION_LIST_SECOND_LEVEL,
  GET_ORGANIZATION_LIST_THIRD_LEVEL,
  GET_INDUSTRY_LIST,
  GET_BIDDING_METHOD_LIST,
  GET_FILE,
}
