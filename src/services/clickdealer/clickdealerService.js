import constant from 'config/constant'
import BaseService from 'services/baseService'

const GET_REPORT_CONVERSION = (start_date, end_date, startRow = 0, limitRow = 1000) => {
  const url = `https://partners.clickdealer.com/affiliates/api/1/reports.asmx/Conversions?api_key=${constant.API_CLICKDEALER}&affiliate_id=${constant.AFFILIATE_ID}&start_date=${start_date}&end_date=${end_date}&start_at_row=${startRow}&row_limit=${limitRow}`
  return BaseService.get(url)
}

const GET_GLOBAL_CONVERSION = (start_date, end_date, startRow = 0, limitRow = 1000) => {
  const url = `http://partners.clickdealer.com/affiliates/api/1/reports.asmx/Summary?api_key=${constant.API_CLICKDEALER}&affiliate_id=${constant.AFFILIATE_ID}&report_type=subaffiliate&start_date=${start_date}&end_date=${end_date}&sort_descending=true&sort_field=conversions&start_at_row=${startRow}&row_limit=${limitRow}`
  return BaseService.get(url)
}

export default {
  GET_REPORT_CONVERSION,
  GET_GLOBAL_CONVERSION,
}
