import React from 'react'
import AdminIndustryTableComponent from 'components/app/AdminIndustryTable'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Pagination, Row, Col, Select, Empty } from 'antd'
import { WrapperAdminIndustryList } from './AdminIndustryList.style'
import { AdminIndustryForm } from 'containers'

const AdminIndustryListComponent = props => {
  const {
    dataSources,
    stateIndustry,
    onChangePageSize,
    onChangePage,
    onShowDetails,
    onAddRawText,
    showModalForm,
    setShowModalForm,
    pageNumber,
    industry,
    refetchAfterAdd,
    setRefetchAfterAdd,
  } = props

  const renderMappingContent = array =>
    array.map((item, index) => (
      <AdminIndustryTableComponent
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
    <WrapperAdminIndustryList>
      <Row className="mb-3">
        <Col span={24}>
          <Select defaultValue={stateIndustry.pageable.pageSize} onChange={onChangePageSize}>
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
          {stateIndustry.totalElements} 件中 {(pageNumber - 1) * stateIndustry.pageable.pageSize + 1} から {stateIndustry.pageable.pageSize * pageNumber > stateIndustry.totalElements ? stateIndustry.totalElements : stateIndustry.pageable.pageSize * pageNumber}{' '}
          まで表示
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Pagination
            current={pageNumber}
            total={stateIndustry.totalElements}
            pageSize={stateIndustry.size}
            onChange={onChangePage}
          />
        </Col>
      </Row>
      <AdminIndustryForm
        visible={showModalForm}
        setVisible={setShowModalForm}
        industry={industry}
        onShowDetails={onShowDetails}
        refetchAfterAdd={refetchAfterAdd}
        setRefetchAfterAdd={setRefetchAfterAdd}
      />
    </WrapperAdminIndustryList>
  )
}

AdminIndustryListComponent.propTypes = {
  dataSources: PropTypes.array,
}

export default AdminIndustryListComponent
