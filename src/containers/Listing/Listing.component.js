import React from 'react'
import ListTableComponent from 'components/ListTable'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Pagination, Row, Col, Icon, Select, Empty, Button, Typography, Modal, Table } from 'antd'
import { WrapperListing } from './Listing.style'
import { ListingSearch } from 'containers'

const { Text } = Typography

const ListingComponent = props => {
  const {
    dataSources,
    showSearch,
    onClickSearch,
    stateListing,
    onChangePageSize,
    onChangePage,
    getDocuments,
    modalDocuments,
    handleModalDocuments,
    documentData,
    setBookmark,
    handleRelatedInfo,
    documentColumns,
  } = props

  const renderMappingUser = array =>
    array.map((item, index) => (
      <ListTableComponent
        getDocuments={getDocuments}
        setBookmark={setBookmark}
        handleRelatedInfo={handleRelatedInfo}
        key={index}
        {...item}
      />
    ))

  return (
    <WrapperListing>
      <Row>
        <Col span={4}>
          <div className="searchButton" onClick={onClickSearch}>
            <Icon type="search" />
            入札情報検索
          </div>
        </Col>
      </Row>
      {showSearch && <ListingSearch />}
      {isEmpty(dataSources) && <Empty />}
      <Row gutter={[0, 8]}>
        <Col span={12} style={{ textAlign: 'left', paddingTop: 10 }}>
          <Text>■検索結果　({stateListing.totalElements}件)</Text>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button type="primary">CSV ダウンロード</Button>
        </Col>
      </Row>
      {!isEmpty(dataSources) && <Row gutter={[0, 8]}>{renderMappingUser(dataSources)}</Row>}
      <Row>
        <Col span={8} style={{ textAlign: 'left' }}>
          <Select defaultValue={stateListing.pageable.pageSize} onChange={onChangePageSize}>
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="25">25</Select.Option>
            <Select.Option value="50">50</Select.Option>
            <Select.Option value="100">100</Select.Option>
          </Select>{' '}
          件表示
        </Col>
        <Col span={16} style={{ textAlign: 'right' }}>
          <Pagination
            defaultCurrent={stateListing.pageable.pageNumber}
            total={stateListing.totalPages}
            onChange={onChangePage}
          />
        </Col>
      </Row>
      <Modal title="細部" visible={modalDocuments} footer={null} onCancel={handleModalDocuments}>
        <Table
          dataSource={documentData}
          rowKey={record => record.id}
          pagination={false}
          columns={documentColumns}
        />
      </Modal>
    </WrapperListing>
  )
}

ListingComponent.propTypes = {
  dataSources: PropTypes.array,
}

export default ListingComponent
