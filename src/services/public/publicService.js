import constant from 'config/constant'
import BaseService, { cacheFetchData } from 'services/baseService'

const GET_AREAS = (cache = false) => {
  const url = `${constant.BASE_URL}/api/public/regions`
  if (cache) {
    return cacheFetchData(url)
  }
  return BaseService.get(url)
}

const GET_PLANS = () => {
  const url = `${constant.BASE_URL}/api/public/plans`
  return BaseService.get(url)
}

const GET_OPERATION_MANUAL = () => {
  const url = `${constant.BASE_URL}/api/public/operationManuals`
  return BaseService.get(url)
}

const GET_STATUS = token => {
  const url = `${constant.BASE_URL}/api/member-status/list`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

export default {
  GET_AREAS,
  GET_PLANS,
  GET_OPERATION_MANUAL,
  GET_STATUS,
}
