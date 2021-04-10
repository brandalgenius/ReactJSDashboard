import React from 'react'
import UserTableComponent from 'components/UserTable'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Pagination, Row, Col, Button, Icon, Select, Empty } from 'antd'
import { WrapperUserList } from './UserList.style'
import { UserListSearch } from 'containers'
import { history } from 'index'

const UserListComponent = props => {
  const {
    dataSources,
    showSearch,
    onClickSearch,
    stateMembersSearch,
    onChangePageSize,
    onChangePage,
    onEditMember,
    pageSize,
    pageNumber,
  } = props

  const renderMappingUser = array =>
    array.map((item, index) => (
      <UserTableComponent
        key={index}
        registrationDate={item.registrationDate}
        paidRegDate={item.paidMemberDate}
        expiredPaid={item.expiredDate}
        paymentMethod={item.planName}
        status={item.status}
        companyName={item.companyName}
        streetAddress={item.address}
        phoneNumber={item.phoneNumber}
        onEdit={onEditMember}
        id={item.id}
      />
    ))
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
      {showSearch && <UserListSearch />}
      <Row className="mb-3">
        <Col span={24}>
          <Select
            defaultValue={stateMembersSearch.pageable.pageSize}
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
          {stateMembersSearch.totalElements} 件中{' '}
          {(pageNumber - 1) * stateMembersSearch.pageable.pageSize + 1} から{' '}
          {stateMembersSearch.pageable.pageSize * pageNumber > stateMembersSearch.totalElements
            ? stateMembersSearch.totalElements
            : stateMembersSearch.pageable.pageSize * pageNumber}{' '}
          まで表示
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Pagination
            current={pageNumber}
            total={stateMembersSearch.totalElements}
            pageSize={stateMembersSearch.size}
            onChange={onChangePage}
          />
        </Col>
      </Row>
    </WrapperUserList>
  )
}

UserListComponent.propTypes = {
  dataSources: PropTypes.array,
}

export default UserListComponent
