import React from 'react'
import { Table } from 'antd'

const GlobalTableComponent = props => {
  const { dataSource = [] } = props

  const columns = [
    {
      title: 'Sub ID',
      dataIndex: 'subaffiliate',
      key: 'subaffiliate',
    },
    {
      title: 'Total Clicks',
      dataIndex: 'total_clicks',
      key: 'total_clicks',
    },
    {
      title: 'Total Conversions',
      dataIndex: 'conversions',
      key: 'conversions',
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue_converted',
      key: 'revenue_converted',
      render: (text, record) => (
        <div>
          {record.currency_symbol} {text}
        </div>
      ),
    },
  ]
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default GlobalTableComponent
