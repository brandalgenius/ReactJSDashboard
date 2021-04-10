import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Icon } from 'antd'

const OperatingComponent = props => {
  const { operation } = props
  return (
    <Card type="inner">
      {operation.length > 0 &&
        operation.map(val => (
          <Row>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Card style={{ height: 85 }}>{val.name}</Card>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Card style={{ height: 85 }}>{val.description}</Card>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Card style={{ height: 85 }}>
                <a href={val.url} target="_blank" rel="noopener noreferrer" download={val.url}>
                  <Icon type="download" />
                </a>
              </Card>
            </Col>
          </Row>
        ))}
    </Card>
  )
}

OperatingComponent.propTypes = {
  dataSources: PropTypes.array,
}

export default OperatingComponent
