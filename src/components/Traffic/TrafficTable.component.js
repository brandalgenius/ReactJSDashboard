import React from 'react'
import { WrapperTrafficTable } from './TrafficTable.style'
import { Table, Tooltip } from 'antd'
import moment from 'moment'
import _ from 'lodash'

const TrafficTableComponent = props => {
  const { dataSource = [] } = props

  const sortedArrayByDate = (myArray, type) => {
    return _.orderBy(myArray, ['conversion_date'], [type])
  }
  const columns = [
    {
      title: 'Date',
      dataIndex: 'conversion_date',
      key: 'conversion_date',
      render: text => <div>{moment(text).format('DD/MM/YYYY HH:mm:ss')}</div>,
    },
    {
      title: 'Sub ID',
      dataIndex: 'subid_1',
      key: 'subid_1',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: text => (
        <Tooltip title={`Country-${text}`}>
          <img
            width="15"
            src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${text}.svg`}
            alt={`Country-${text}`}
          />
        </Tooltip>
      ),
    },
    {
      title: 'IP Address',
      dataIndex: 'price_usd',
      key: 'price_usd',
      render: (text, record) => (
        <div>
          {record.currency_symbol} {text}
        </div>
      ),
    },
  ]
  return (
    <WrapperTrafficTable>
      <Table dataSource={sortedArrayByDate(dataSource, 'desc')} columns={columns} />
    </WrapperTrafficTable>
  )
}

export default TrafficTableComponent
