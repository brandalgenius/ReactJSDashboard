import React from 'react'
import PropTypes from 'prop-types'
import { WrapperUserTable } from './DepositTable.style'
import { Row, Col, DatePicker } from 'antd'

const DepositTableComponent = props => {
  const { id, billingDate, billingAmount, depositDate, onChangeDateDeposit } = props
  return (
    <WrapperUserTable>
      <Row gutter={[4, 4]}>
        <Col span={8}>
          <div className="bg-gray" style={{ paddingBottom: 19 }}>
            <span className="label">Billing Date</span>
            {billingDate ?? '-'}
          </div>
        </Col>
        <Col span={8}>
          <div className="bg-gray" style={{ paddingBottom: 19 }}>
            <span className="label">Billing Amount</span>
            {billingAmount ?? '-'}
          </div>
        </Col>
        <Col span={8}>
          <div className="bg-gray" style={{ paddingBottom: !depositDate ? 8 : 19 }}>
            <span className="label">Deposit Date</span>
            <Row>
              <Col span={12}>{depositDate ?? '-'}</Col>
              {!depositDate && (
                <Col span={12}>
                  <DatePicker onChange={date => onChangeDateDeposit(id, date)} />
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </WrapperUserTable>
  )
}

DepositTableComponent.propTypes = {
  id: PropTypes.string.isRequired,
  billingDate: PropTypes.string,
  billingAmount: PropTypes.number,
  depositDate: PropTypes.string,
  onChangeDateDeposit: PropTypes.func,
}
DepositTableComponent.defaultProps = {
  id: 0,
  billingDate: '-',
  billingAmount: '-',
  depositDate: '-',
}

export default DepositTableComponent
