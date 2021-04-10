import React, { useState } from 'react'
import { Row, Col, Button, Icon, Select, Empty, Pagination, Divider } from 'antd'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import style from './style.module.scss'
import AdminSecondLevelTableComponent from './AdminSecondLevelTable.component'

const AdminFirstLevelTableComponent = props => {
  const { id, name, isOdd, onShowDetails, details, onChangeDetailsPageNumberAndSize } = props

  const [open, setOpen] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)

  const onClickHandler = id => {
    if (!open) {
      onShowDetails(id, 2, 10, 1)
    }
    setOpen(!open)
  }

  const onChangePageSize = value => {
    if (parseInt(value) * pageNumber > details.totalElements) {
      setPageNumber(Math.floor(details.totalElements / parseInt(value)) + 1)
      onShowDetails(id, 2, parseInt(value), Math.floor(details.totalElements / parseInt(value)) + 1)
    } else {
      onShowDetails(id, 2, parseInt(value), pageNumber)
    }
  }

  const onChangePage = value => {
    setPageNumber(parseInt(value))
    onShowDetails(id, 2, details.pageable.pageSize, parseInt(value))
  }

  const renderMappingDetails = array =>
    array.map((item, index) => (
      <AdminSecondLevelTableComponent
        key={index}
        id={item.id}
        name={item.name}
        onShowDetails={onShowDetails}
        details={item.third}
        isFirst={index == 0}
        isLast={array.length - 1 == index}
      />
    ))
  return (
    <Row>
      <Col span={24} className="card">
        <div className={`${style.container} pt-3`}>
          <div className={`${style.status} ${isOdd ? 'bg-orange' : 'bg-success'}`} />
          <div className="d-flex flex-nowrap align-items-center pb-3 pl-4 pr-4">
            <div className="mr-auto">
              <div className="text-uppercase font-weight-bold font-size-lg text-dark">
                {name ?? '-'}
              </div>
            </div>
            <div className="ml-1 text-danger">
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
            </div>
          </div>
          <div
            className={`${style.footer}`}
            style={open ? { display: 'block' } : { display: 'none' }}
          >
            {!isEmpty(details) &&
            <>
              <Row className="py-2 pl-3 pr-3">
                <Col span={24}>
                  <Select defaultValue={details.pageable.pageSize} onChange={onChangePageSize}>
                    <Select.Option value="10">10</Select.Option>
                    <Select.Option value="25">25</Select.Option>
                    <Select.Option value="50">50</Select.Option>
                    <Select.Option value="100">100</Select.Option>
                  </Select>
                  &nbsp;件表示
                </Col>
              </Row>
              <Divider dashed className="my-2" />
            </>
            }
            {isEmpty(details) && <Empty className="py-2 pl-3 pr-3" />}
            {!isEmpty(details) && renderMappingDetails(details.content)}
            {!isEmpty(details) &&
            <Row className="py-2 pl-3 pr-3">
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
            </Row>
            }
          </div>
        </div>
      </Col>
    </Row>
  )
}

AdminFirstLevelTableComponent.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  isOdd: PropTypes.bool,
  onShowDetails: PropTypes.func,
  details: PropTypes.object,
}

AdminFirstLevelTableComponent.defaultProps = {
  id: 0,
  name: '-',
  isOdd: false,
  onShowDetails: () => null,
  details: {},
}

export default AdminFirstLevelTableComponent
