import React from 'react'
import { Row, Col, Descriptions, Card, Button, Icon, Typography, Popconfirm } from 'antd'
import PropTypes from 'prop-types'

const { Text } = Typography

const ListTableComponent = props => {
  const {
    applicationDeadline,
    biddingMethodName,
    organizationRaw,
    institutionName,
    prefectures,
    publicationDate,
    id,
    subject,
    bookmarked,
    winnerPublicationDate,
    getDocuments,
    handleRelatedInfo,
    setBookmark,
  } = props
  const isBookmarked = bookmarked ? { backgroundColor: '#ff990a', color: '#fff' } : {}
  return (
    <Col span={24}>
      <Card type="inner">
        <Row gutter={[0, 8]}>
          <Col span={12} style={{ textAlign: 'left' }}>
            <Button type="primary" size="small" style={{ pointerEvents: 'none', marginRight: 10 }}>
              入札
            </Button>
            <Text>{subject}</Text>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button onClick={() => handleRelatedInfo(id)} size="small" style={{ marginRight: 10 }}>
              関連情報
            </Button>
            {bookmarked ? (
              <Popconfirm
                title="ブックマークを解除してもよろしいですか？"
                onConfirm={() => setBookmark(id, bookmarked)}
                onCancel={null}
                okText="はい"
                okType="danger"
                cancelText="番号"
              >
                <Button size="small" style={isBookmarked}>
                  <span className={`fe fe-bookmark`} />
                  ブックマークする
                </Button>
              </Popconfirm>
            ) : (
              <Button size="small" style={isBookmarked} onClick={() => setBookmark(id, bookmarked)}>
                <span className={`fe fe-bookmark`} />
                ブックマークする
              </Button>
            )}
          </Col>
          <Col span={24}>
            <Descriptions
              bordered
              layout="vertical"
              column={{ xxl: 9, xl: 9, lg: 9, md: 6, sm: 4, xs: 2 }}
              style={{ textAlign: 'center' }}
            >
              <Descriptions.Item label="発注地域">
                {prefectures.length > 0 ? prefectures.join(', ') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="発注機関">{organizationRaw}</Descriptions.Item>
              <Descriptions.Item label="業種">{institutionName ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="入札方式">{biddingMethodName ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="公告日">{winnerPublicationDate}</Descriptions.Item>
              <Descriptions.Item label="応募書類締切日">{applicationDeadline}</Descriptions.Item>
              <Descriptions.Item label="開札日">{publicationDate}</Descriptions.Item>
              <Descriptions.Item label="書類">
                <Button type="primary" size="small" onClick={() => getDocuments(id)}>
                  細部
                </Button>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

ListTableComponent.propTypes = {
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

ListTableComponent.defaultProps = {
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
  prefectures: [],
  publicationDate: '-',
  registrationDate: '-',
  screenshotUrl: '-',
  status: '-',
  streetAddress: '-',
  subject: '-',
  winnerPublicationDate: '-',
}

export default ListTableComponent
