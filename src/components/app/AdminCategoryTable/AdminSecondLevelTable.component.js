import React, { useState } from 'react'
import { Row, Col, Divider, Button, Icon, Empty, Select, Pagination } from 'antd'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import AdminThirdLevelTableComponent from './AdminThirdLevelTable.component'

const AdminSecondLevelTableComponent = props => {
  const { id, name, onShowDetails, details, isFirst, isLast } = props

  const [open, setOpen] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)

  const onClickHandler = id => {
    if (!open) {
      onShowDetails(id, 3, 10, 1)
    }
    setOpen(!open)
  }

  const onChangePage = value => {
    setPageNumber(parseInt(value))
    onShowDetails(id, 3, details.pageable.pageSize, parseInt(value))
  }

  const onChangePageSize = value => {
    if (parseInt(value) * pageNumber > details.totalElements) {
      setPageNumber(Math.floor(details.totalElements / parseInt(value)) + 1)
      onShowDetails(id, 3, parseInt(value), Math.floor(details.totalElements / parseInt(value)) + 1)
    } else {
      onShowDetails(id, 3, parseInt(value), pageNumber)
    }
  }

  const renderMappingDetails = array =>
    array.map((item, index) =>
        <Row key={index}>
          <div className="card text-white bg-gray-5 mb-2">
            <div className="card-body py-2">
              <div className="d-flex align-items-center flex-wrap">
                <div className="d-flex flex-nowrap align-items-center flex-shrink-1 mr-2">
                  <AdminThirdLevelTableComponent
                    id={item.id}
                    name={item.name}
                  />
                </div>
              </div>
            </div>
          </div>
        </Row>
    )

  return (
    <>
      <Row className={`${isFirst ? 'pt-2' : '' } ${isLast ? 'pb-2' : ''} pl-3 pr-3`}>
        <Col span={12}>
          <Col span={18} className="mr-auto">
            {name}
          </Col>
          <Col span={3} className="ml-1">
            {open ? (
              <Button
                type="dashed"
                shape="circle"
                icon="minus"
                onClick={() => onClickHandler(id)}
              />
            ) : (
              <Button
                type="dashed"
                shape="circle"
                icon="plus"
                onClick={() => onClickHandler(id)}
              />
            )}
          </Col>
        </Col>
        <Col span={12} />
      </Row>
      <Divider dashed className="my-2" />
      {isEmpty(details) && open && <Empty />}
      {!isEmpty(details) && open &&
      <>
        <Row className="mx-4">
          <Col span={9}></Col>
          <Col span={15}>
            <Col span={24} className="py-2">
              <Select defaultValue={details.pageable.pageSize} onChange={onChangePageSize}>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="25">25</Select.Option>
                <Select.Option value="50">50</Select.Option>
                <Select.Option value="100">100</Select.Option>
              </Select>
              &nbsp;件表示
            </Col>
            <Col span={24}>
              {!isEmpty(details) && renderMappingDetails(details.content)}
            </Col>
            <Col span={24} className="py-2">
              <Col span={12}>
                {details.totalElements} 件中 {(pageNumber - 1) * details.pageable.pageSize + 1} から {details.pageable.pageSize * pageNumber > details.totalElements ? details.totalElements : details.pageable.pageSize * pageNumber}{' '}
                まで表示
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Pagination
                  current={pageNumber}
                  total={details.totalElements}
                  pageSize={details.size}
                  onChange={onChangePage}
                  size="small"
                />
              </Col>
            </Col>
          </Col>
        </Row>
        <Divider dashed className="my-2" />
      </>
      }
    </>
  )
}

AdminSecondLevelTableComponent.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  onShowDetails: PropTypes.func,
  details: PropTypes.object,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool
}

AdminSecondLevelTableComponent.defaultProps = {
  id: 0,
  name: '-',
  onShowDetails: () => null,
  details: {},
  isFirst: false,
  isLast: false
}

export default AdminSecondLevelTableComponent
