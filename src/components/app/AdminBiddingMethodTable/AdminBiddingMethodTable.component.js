import React, { useState } from 'react'
import { Row, Col, Button, Icon, Input } from 'antd'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import style from './style.module.scss'

const AdminBiddingMethodTableComponent = props => {
  const { id, name, isOdd, onShowDetails, onClickAddDetail, details } = props

  const [open, setOpen] = useState(false)
  const InputGroup = Input.Group

  const renderMappingDetails = array =>
    array.map((item, index) => (
      <Col span={item.rawText.length > 24 ? 24 : item.rawText.length} key={index}>
        <Input disabled={true} defaultValue={item.rawText} />
      </Col>
    ))
  const onClickHandler = id => {
    if (!open) {
      onShowDetails(id)
    }
    setOpen(!open)
  }

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
                  // size="large"
                  onClick={() => onClickHandler(id)}
                />
              ) : (
                <Button
                  type="dashed"
                  shape="circle"
                  icon="plus"
                  // size="large"
                  onClick={() => onClickHandler(id)}
                />
              )}
            </div>
          </div>
          <div
            className={`${style.footer} py-3 pl-4`}
            style={open ? { display: 'block' } : { display: 'none' }}
          >
            <InputGroup>
              <Row gutter={16}>
                {!isEmpty(details) && renderMappingDetails(details)}
                <Col>
                  {/* <Button type="primary" shape="circle" icon="plus" size="default" onClick={() => onClickAddDetail(id, name)} /> */}
                  <Button type="dashed" onClick={() => onClickAddDetail(id, name)}>
                    <Icon type="plus" /> テキストを追加
                  </Button>
                </Col>
              </Row>
            </InputGroup>
          </div>
        </div>
      </Col>
    </Row>
  )
}

AdminBiddingMethodTableComponent.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  isOdd: PropTypes.bool,
  onShowDetails: PropTypes.func,
  onClickAddDetail: PropTypes.func,
  details: PropTypes.array,
}

AdminBiddingMethodTableComponent.defaultProps = {
  id: '-',
  name: '-',
  isOdd: false,
  onShowDetails: () => null,
  onClickAddDetail: () => null,
  details: [],
}

export default AdminBiddingMethodTableComponent
