import React from 'react'
import { Row, Col, Card, Button, Typography, Popconfirm, Input } from 'antd'
import PropTypes from 'prop-types'

const { Text } = Typography

const MailTableComponent = props => {
  const {
    id,
    num,
    deleteMailSetting,
    keywordOr = '',
    keywordAnd = '',
    keywordNot = '',
    organizationList,
    industryList,
    regionList,
    biddingMethodList,
  } = props
  return (
    <Col span={24}>
      <Card type="inner">
        <Row gutter={[0, 8]}>
          <Col span={24}>
            <Text>メール配信設定 ({num}) </Text>
            <Popconfirm
              title="このメール設定を削除してもよろしいですか？"
              onConfirm={() => deleteMailSetting(id)}
              onCancel={null}
              okText="はい"
              okType="danger"
              cancelText="番号"
            >
              <Button type="danger" size="small">
                削除
              </Button>
            </Popconfirm>
          </Col>
          <Col span={24}>
            <Card type="inner">
              <Row gutter={[0, 4]}>
                <Col span={4}>キーワード</Col>
                <Col span={2}>OR検索</Col>
                <Col span={18}>
                  {keywordOr !== null &&
                    keywordOr.split(',').map(val => (
                      <Button style={{ marginRight: 5 }} disabled>
                        {val}
                      </Button>
                    ))}
                </Col>
              </Row>
              <Row gutter={[0, 4]}>
                <Col span={4}></Col>
                <Col span={2}>AND検索</Col>
                <Col span={18}>
                  {keywordAnd !== null &&
                    keywordAnd.split(',').map(val => (
                      <Button style={{ marginRight: 5 }} disabled>
                        {val}
                      </Button>
                    ))}
                </Col>
              </Row>
              <Row gutter={[0, 4]}>
                <Col span={4}></Col>
                <Col span={2}>NOT検索</Col>
                <Col span={18}>
                  {keywordNot !== null &&
                    keywordNot.split(',').map(val => (
                      <Button style={{ marginRight: 5 }} disabled>
                        {val}
                      </Button>
                    ))}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Card type="inner">
              <Row gutter={[0, 4]}>
                <Col span={6}>発注機関</Col>
                <Col span={18}>
                  <Input disabled value={organizationList} />
                </Col>
              </Row>
              <Row gutter={[0, 4]}>
                <Col span={6}>業種</Col>
                <Col span={18}>
                  <Input disabled value={industryList} />
                </Col>
              </Row>
              <Row gutter={[0, 4]}>
                <Col span={6}>発注地域</Col>
                <Col span={18}>
                  <Input disabled value={regionList} />
                </Col>
              </Row>
              <Row gutter={[0, 4]}>
                <Col span={6}>入札方式</Col>
                <Col span={18}>
                  <Input disabled value={biddingMethodList} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

MailTableComponent.propTypes = {
  applicationDeadline: PropTypes.string,
  areaRaw: PropTypes.string,
  biddingMethodName: PropTypes.string,
  companyName: PropTypes.string,
  detailsUrl: PropTypes.string,
  expiredPaid: PropTypes.string,
  industryName: PropTypes.string,
  institutionName: PropTypes.string,
  organizationRaw: PropTypes.string,
  paidRegDate: PropTypes.string,
  paymentMethod: PropTypes.string,
  phoneNumber: PropTypes.string,
  prefectures: PropTypes.array,
  publicationDate: PropTypes.string,
  registrationDate: PropTypes.string,
  screenshotUrl: PropTypes.string,
  status: PropTypes.string,
  streetAddress: PropTypes.string,
  subject: PropTypes.string,
  winnerPublicationDate: PropTypes.string,
  getDocuments: PropTypes.func,
}

MailTableComponent.defaultProps = {
  applicationDeadline: '-',
  areaRaw: '-',
  biddingMethodName: '-',
  companyName: '-',
  detailsUrl: '-',
  expiredPaid: '-',
  industryName: '-',
  institutionName: '-',
  organizationRaw: '-',
  paidRegDate: '-',
  paymentMethod: '-',
  phoneNumber: '-',
  prefectures: '-',
  publicationDate: '-',
  registrationDate: '-',
  screenshotUrl: '-',
  status: '-',
  streetAddress: '-',
  subject: '-',
  winnerPublicationDate: '-',
}

export default MailTableComponent
