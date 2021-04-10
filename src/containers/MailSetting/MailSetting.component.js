import React from 'react'
import MailTable from 'components/MailTable'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Pagination, Row, Col, Select, Empty } from 'antd'
import { WrapperListing } from './MailSetting.style'
import { MailAdd } from 'containers'

const MailSettingComponent = props => {
  const { dataSources, stateMail, onChangePageSize, onChangePage, deleteMailSetting } = props

  const renderMappingMailSetting = array =>
    array.map((item, index) => (
      <MailTable key={index} deleteMailSetting={deleteMailSetting} num={index + 1} {...item} />
    ))

  return (
    <WrapperListing>
      <MailAdd />
      {isEmpty(dataSources) && <Empty />}
      {!isEmpty(dataSources) && (
        <Row gutter={[0, 8]}>{renderMappingMailSetting(stateMail.content)}</Row>
      )}
      <Row>
        <Col span={8} style={{ textAlign: 'left' }}>
          <Select defaultValue={stateMail.pageable.pageSize} onChange={onChangePageSize}>
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="25">25</Select.Option>
            <Select.Option value="50">50</Select.Option>
            <Select.Option value="100">100</Select.Option>
          </Select>{' '}
          件表示
        </Col>
        <Col span={16} style={{ textAlign: 'right' }}>
          <Pagination
            defaultCurrent={stateMail.pageable.pageNumber}
            total={stateMail.totalPages}
            onChange={onChangePage}
          />
        </Col>
      </Row>
    </WrapperListing>
  )
}

MailSettingComponent.propTypes = {
  dataSources: PropTypes.array,
}

export default MailSettingComponent
