import React from 'react'
import { WrapperInstitutionTable } from './InstitutionTable.style'
import { Row, Col, Button } from 'antd'
import PropTypes from 'prop-types'
import hardcode from 'config/hardcode'

const InstitutionTableComponent = props => {
  const { name, goToDetail, id } = props
  return (
    <WrapperInstitutionTable>
      <Row gutter={[4, 4]}>
        <Col span={20}>
          <div className="bg-gray">
            <span className="label">名前</span>
            {name}
          </div>
        </Col>
        <Col span={4}>
          <div className="bg-gray text-center" style={{ padding: 14 }}>
            <Button type="primary" onClick={() => goToDetail(id)}>
              細部
            </Button>
          </div>
        </Col>
      </Row>
    </WrapperInstitutionTable>
  )
}

InstitutionTableComponent.propTypes = {
  name: PropTypes.string,
  goToDetail: PropTypes.func,
}

InstitutionTableComponent.defaultProps = {
  name: '-',
  goToDetail: () => null,
}

export default InstitutionTableComponent
