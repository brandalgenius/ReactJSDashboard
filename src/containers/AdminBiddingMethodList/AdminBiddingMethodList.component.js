import React from 'react'
import AdminBiddingMethodTableComponent from 'components/app/AdminBiddingMethodTable'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Pagination, Row, Col, Select, Empty } from 'antd'
import { WrapperAdminBiddingMethodList } from './AdminBiddingMethodList.style'
import { AdminBiddingMethodForm } from 'containers'

const AdminBiddingMethodListComponent = props => {
  const {
    dataSources,
    stateBiddingMethod,
    onChangePageSize,
    onChangePage,
    onShowDetails,
    onAddRawText,
    showModalForm,
    setShowModalForm,
    pageNumber,
    biddingMethod,
    refetchAfterAdd,
    setRefetchAfterAdd,
  } = props

  const renderMappingContent = array =>
    array.map((item, index) => (
      <AdminBiddingMethodTableComponent
        key={index}
        isOdd={index % 2 == 0}
        id={item.id}
        name={item.name}
        onShowDetails={onShowDetails}
        onClickAddDetail={onAddRawText}
        details={item.details}
      />
    ))

  return (
    <WrapperAdminBiddingMethodList>
      <Row className="mb-3">
        <Col span={24}>
          <Select defaultValue={stateBiddingMethod.pageable.pageSize} onChange={onChangePageSize}>
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="25">25</Select.Option>
            <Select.Option value="50">50</Select.Option>
            <Select.Option value="100">100</Select.Option>
          </Select>
          件表示
        </Col>
      </Row>
      {isEmpty(dataSources) && <Empty />}
      {!isEmpty(dataSources) && renderMappingContent(dataSources)}
      <Row>
        <Col span={12}>
          {stateBiddingMethod.totalElements} 件中 {(pageNumber - 1) * stateBiddingMethod.pageable.pageSize + 1} から {stateBiddingMethod.pageable.pageSize * pageNumber > stateBiddingMethod.totalElements ? stateBiddingMethod.totalElements : stateBiddingMethod.pageable.pageSize * pageNumber}{' '}
          まで表示
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Pagination
            current={pageNumber}
            total={stateBiddingMethod.totalElements}
            pageSize={stateBiddingMethod.size}
            onChange={onChangePage}
          />
        </Col>
      </Row>
      <AdminBiddingMethodForm
        visible={showModalForm}
        setVisible={setShowModalForm}
        biddingMethod={biddingMethod}
        onShowDetails={onShowDetails}
        refetchAfterAdd={refetchAfterAdd}
        setRefetchAfterAdd={setRefetchAfterAdd}
      />
    </WrapperAdminBiddingMethodList>
  )
}

AdminBiddingMethodListComponent.propTypes = {
  dataSources: PropTypes.array,
}

export default AdminBiddingMethodListComponent
