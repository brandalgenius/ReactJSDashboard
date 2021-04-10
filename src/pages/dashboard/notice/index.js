import React from 'react'
import Helmet from 'react-helmet'
import { Divider, Row, Col, Table, Button } from 'antd'

const DashboardNotice = () => {
  const dataSource = [
    {
      key: 1,
      date: '2020/3/31',
      description: '次回ご入金情報',
    },
  ]

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ]

  const dataSource2 = [
    {
      key: 1,
      info: 'ブックマーク案件数',
      total: '17件',
    },
  ]

  const columns2 = [
    {
      title: 'Info',
      dataIndex: 'info',
      key: 'info',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: text => (
        <Button type="link" href="/adad">
          {text}
        </Button>
      ),
    },
  ]

  return (
    <div>
      <Helmet title="Admin: Notice" />
      <div className="cui__utils__heading">
        <strong>重要なお知らせ</strong>
      </div>
      <Divider />
      <Row>
        <Col span={24}>
          <Table dataSource={dataSource} columns={columns} />
        </Col>
      </Row>
      <div className="cui__utils__heading">
        <strong>登録情報</strong>
      </div>
      <Divider />
      <Row>
        <Col span={24}>
          <Table dataSource={dataSource2} columns={columns2} />
        </Col>
      </Row>
    </div>
  )
}

export default DashboardNotice
