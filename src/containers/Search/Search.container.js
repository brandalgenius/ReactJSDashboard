import React, { useState } from 'react'
import SearchComponent from './Search.component'
import { Form } from 'antd'
import moment from 'moment-timezone'

const SearchContainer = props => {
  const { onChangeDate } = props
  const form = props.form
  const [showDateRange, setShowDateRange] = useState(false)

  const handleChangeDateRangePicker = dates => {
    setShowDateRange(false)
    onChangeDate(
      moment(dates[0])
        .tz('Europe/London')
        .format('MM/DD/YYYY'),
      moment(dates[1])
        .tz('Europe/London')
        .format('MM/DD/YYYY'),
    )
  }
  const handleChange = value => {
    let dateStart = moment().format('MM/DD/YYYY')
    let dateEnd = moment().format('MM/DD/YYYY')
    let startRow = 1
    let limitRow = 1000
    if (value === 'today') {
      dateStart = moment()
        .tz('Europe/London')
        .format('MM/DD/YYYY')
      dateEnd = moment()
        .tz('Europe/London')
        .format('MM/DD/YYYY')
    } else if (value === 'yesterday') {
      dateStart = moment()
        .tz('Europe/London')
        .subtract(1, 'day')
        .format('MM/DD/YYYY')
      dateEnd = moment()
        .subtract(1, 'day')
        .tz('Europe/London')
        .format('MM/DD/YYYY')
    } else if (value === 'weekToDate') {
      dateStart = moment()
        .tz('Europe/London')
        .startOf('week')
        .day('Monday')
        .format('MM/DD/YYYY')
      dateEnd = moment()
        .tz('Europe/London')
        .format('MM/DD/YYYY')
    } else if (value === 'lastWeek') {
      dateStart = moment()
        .tz('Europe/London')
        .subtract(1, 'week')
        .startOf('week')
        .add(1, 'day')
        .format('MM/DD/YYYY')
      dateEnd = moment()
        .tz('Europe/London')
        .subtract(1, 'week')
        .endOf('week')
        .add(1, 'day')
        .format('MM/DD/YYYY')
    } else if (value === 'last30Days') {
      dateStart = moment()
        .subtract(29, 'day')
        .tz('Europe/London')
        .format('MM/DD/YYYY')
      dateEnd = moment().format('MM/DD/YYYY')
      startRow = 700
      limitRow = 1000
    } else if (value === 'lastMonth') {
      dateStart = moment()
        .tz('Europe/London')
        .subtract(1, 'months')
        .startOf('month')
        .format('MM/DD/YYYY')
      dateEnd = moment()
        .tz('Europe/London')
        .subtract(1, 'months')
        .endOf('month')
        .format('MM/DD/YYYY')
      startRow = 900
      limitRow = 1000
    } else if (value === 'customDate') {
      setShowDateRange(true)
    }
    onChangeDate(dateStart, dateEnd, startRow, limitRow)
  }
  return (
    <div>
      <SearchComponent
        form={form}
        handleChange={handleChange}
        showDateRange={showDateRange}
        handleChangeDateRangePicker={handleChangeDateRangePicker}
      />
    </div>
  )
}

const WrapperSearchContainer = Form.create({
  name: 'SearchContainer',
})(SearchContainer)

export default WrapperSearchContainer
