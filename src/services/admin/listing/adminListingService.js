import constant from 'config/constant'
import BaseService from 'services/baseService'

const SEARCH_LISTING = (page, size, body, token) => {
  const url = `${constant.BASE_URL}​/api/listing/page/fields?page=${page}&size=${size}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

const SEARCH_LISTING_BY_KEYWORD = (page, size, body, token) => {
  const url = `${constant.BASE_URL}/api/listing/page/keywords?page=${page}&size=${size}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, body, { headers })
}

const GET_DETAIL_LISTING_DOCUMENTS = (id, token) => {
  const url = `${constant.BASE_URL}/api/listing/@/${id}/documents`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

const SET_BOOKMARK_LISTING = (id, token) => {
  const url = `${constant.BASE_URL}/api/listing/@/${id}/bookmark`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.post(url, {}, { headers })
}

const SET_UNBOOKMARK_LISTING = (id, token) => {
  const url = `${constant.BASE_URL}/api/listing/@/${id}/bookmark`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.delete(url, { headers })
}

const GET_RELATED_INFO_LISTING = (page, size, token, id) => {
  const url = `${constant.BASE_URL}/api/listing/@/${id}/related-info?page=${page}&size=${size}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}
const GET_LISTING_BY_ID = (id, token) => {
  const url = `${constant.BASE_URL}/api/listing/@/${id}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return BaseService.get(url, { headers })
}

export default {
  SEARCH_LISTING,
  SEARCH_LISTING_BY_KEYWORD,
  GET_DETAIL_LISTING_DOCUMENTS,
  SET_BOOKMARK_LISTING,
  SET_UNBOOKMARK_LISTING,
  GET_RELATED_INFO_LISTING,
  GET_LISTING_BY_ID,
}
