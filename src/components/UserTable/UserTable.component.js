import React from 'react'
import { WrapperUserTable } from './UserTable.style'
import { Row, Col, Button } from 'antd'
import PropTypes from 'prop-types'
import hardcode from 'config/hardcode'

const UserTableComponent = props => {
  const {
    registrationDate,
    paidRegDate,
    expiredPaid,
    paymentMethod,
    status,
    companyName,
    streetAddress,
    phoneNumber,
    onEdit,
    id,
  } = props

  const getNameStatus = name => {
    let nameJapanese = ''
    hardcode.STATUS.map(status => {
      if (status.en_name === name) {
        nameJapanese = status.name
      }
      return ''
    })
    return nameJapanese
  }

  return (
    <WrapperUserTable>
      <Row gutter={[4, 4]}>
        <Col span={8}>
          <div className="bg-gray">
            <span className="label">登録年月日</span>
            {registrationDate ?? '-'}
          </div>
        </Col>
        <Col span={8}>
          <div className="bg-gray">
            <span className="label">有料会員登録年月日</span>
            {paidRegDate ?? '-'}
          </div>
        </Col>
        <Col span={8}>
          <div className="bg-gray">
            <span className="label">有料会員期限切れ年月日</span>
            {expiredPaid ?? '-'}
          </div>
        </Col>
      </Row>

      <Row gutter={[4, 4]}>
        <Col span={12}>
          <div className="bg-gray">
            <span className="label">支払い方法</span>
            {paymentMethod ?? '-'}
          </div>
        </Col>
        <Col span={12}>
          <div className="bg-gray">
            <span className="label">ステータス</span>
            {status ? getNameStatus(status) : '-'}
          </div>
        </Col>
      </Row>
      <Row gutter={[4, 4]}>
        <Col span={24}>
          <div className="bg-gray">
            <span className="label">会社名</span>
            {companyName ?? '-'}
          </div>
        </Col>
      </Row>

      <Row gutter={[4, 4]}>
        <Col span={8}>
          <div className="bg-gray">
            <span className="label">住所</span>
            {streetAddress ?? '-'}
          </div>
        </Col>
        <Col span={8}>
          <div className="bg-gray">
            <span className="label">電話番号</span>
            {phoneNumber ?? '-'}
          </div>
        </Col>
        <Col span={8}>
          <div className="bg-gray text-center" style={{ padding: 14 }}>
            <Button type="primary" onClick={() => onEdit(id)}>
              Edit
            </Button>
          </div>
        </Col>
      </Row>
    </WrapperUserTable>
  )
}

UserTableComponent.propTypes = {
  registrationDate: PropTypes.string,
  paidRegDate: PropTypes.string,
  expiredPaid: PropTypes.string,
  paymentMethod: PropTypes.string,
  status: PropTypes.string,
  companyName: PropTypes.string,
  streetAddress: PropTypes.string,
  phoneNumber: PropTypes.string,
  id: PropTypes.string,
  onEdit: PropTypes.func,
}

UserTableComponent.defaultProps = {
  registrationDate: '-',
  paidRegDate: '-',
  expiredPaid: '-',
  paymentMethod: '-',
  status: '-',
  companyName: '-',
  streetAddress: '-',
  phoneNumber: '-',
  id: '-',
  onEdit: () => null,
}

export default UserTableComponent
