import React from 'react'
import InstitutionTableComponent from 'components/InstitutionTable'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Pagination, Row, Col, Button, Icon, Select, Empty } from 'antd'
import { WrapperUserList } from './InstitutionList.style'
import { AdminInstitutionsSearch } from 'containers'
import { history } from 'index'

const InstitutionComponent = props => {
  const {
    dataSources,
    showSearch,
    onClickSearch,
    stateInstitution,
    onChangePageSize,
    onChangePage,
    onEditMember,
    pageSize,
    pageNumber,
  } = props

  const renderMappingUser = array =>
    array.map((item, index) => <InstitutionTableComponent key={index} {...item} />)
  return (
    <WrapperUserList>
      <Row>
        <Col span={2} offset={19} style={{ textAlign: 'right' }}>
          <div className="searchButton" onClick={() => onClickSearch()}>
            <Icon type="search" />
            索検
          </div>
        </Col>
        <Col span={3} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={() => history.push('/admin/members/add')}>
            <Icon type="plus" />
            新規登録
          </Button>
        </Col>
      </Row>
      {showSearch && <AdminInstitutionsSearch />}
      <Row className="mb-3">
        <Col span={24}>
          <Select
            defaultValue={stateInstitution.pageable.pageSize}
            onChange={onChangePageSize}
            className="mr-2"
          >
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="25">25</Select.Option>
            <Select.Option value="50">50</Select.Option>
            <Select.Option value="100">100</Select.Option>
          </Select>
          件表示
        </Col>
      </Row>
      {isEmpty(dataSources) && <Empty />}
      {!isEmpty(dataSources) && renderMappingUser(dataSources)}
      <Row>
        <Col span={12}>
          {stateInstitution.totalElements} 件中{' '}
          {(pageNumber - 1) * stateInstitution.pageable.pageSize + 1} から{' '}
          {stateInstitution.pageable.pageSize * pageNumber > stateInstitution.totalElements
            ? stateInstitution.totalElements
            : stateInstitution.pageable.pageSize * pageNumber}{' '}
          まで表示
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Pagination
            current={pageNumber}
            total={stateInstitution.totalElements}
            pageSize={stateInstitution.size}
            onChange={onChangePage}
          />
        </Col>
      </Row>
    </WrapperUserList>
  )
}

InstitutionComponent.propTypes = {
  dataSources: PropTypes.array,
}

export default InstitutionComponent
