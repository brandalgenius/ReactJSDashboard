import axios from 'axios'
import constant from 'config/constant'

const _createAxiosInterceptor = url => {
  const axiosCreate = axios.create({
    baseURL: url,
    headers: {
      Accept: 'application/json',
    },
  })

  axiosCreate.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      return Promise.reject(error.response)
      // console.log(error.response)
    },
  )

  return axiosCreate
}

const BaseService = _createAxiosInterceptor(constant.BASE_URL)

export const cacheFetchData = (url, token = {}) => {
  let storageData = sessionStorage.getItem(url)
  if (storageData === null) {
    sessionStorage.setItem(url, true)
    return BaseService.get(url, token)
  } else {
    return Promise.resolve([])
  }
}

export default BaseService
