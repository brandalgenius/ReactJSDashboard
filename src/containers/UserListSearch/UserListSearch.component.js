import React from 'react'
import { Form, Row, Col, Button, Modal, Input, Tooltip, Icon } from 'antd'
import { _mappingItemForm } from 'utils/formUtils'
import { WrapperUserListSearch } from './UserListSearch.style'
import ChecklistPrefectures from 'components/ChecklistPrefectures'
import { isEmpty } from 'lodash'
import { ListingSearch } from 'containers'

const UserListSearchComponent = props => {
  const {
    formFields,
    form,
    onSubmit,
    isLoading,
    onReset,
    typeModal,
    handleCheckAll,
    dataRegion,
    regionCheckAll,
    handleChangeRegion,
    titleModal,
    checklistModal,
    handleChecklistModal,
    onSubmitChecklist,
    regionIndeterminateCheckAll,
    onSubmitBookmarkSetting,
    showButtonSubmitModal,
    onSubmitEmailSetting,
  } = props
  const prefectures = form.getFieldValue('prefectures')
  const prefecturesEmpty = isEmpty(prefectures) || prefectures === undefined

  const bookmark = form.getFieldValue('bookmark')
  const bookmarkEmpty = isEmpty(bookmark) || bookmark === undefined

  const emailDelivery = form.getFieldValue('emailDelivery')
  const emailDeliveryEmpty = isEmpty(emailDelivery) || emailDelivery === undefined
  const renderChecklistForm = () => {
    if (typeModal === 'region') {
      return (
        <ChecklistPrefectures
          regionIndeterminateCheckAll={regionIndeterminateCheckAll}
          handleCheckAll={handleCheckAll}
          regionCheckAll={regionCheckAll}
          dataRegion={dataRegion}
          handleChangeRegion={handleChangeRegion}
        />
      )
    } else if (typeModal === 'bookmark') {
      return <ListingSearch external={true} setStateExternal={onSubmitBookmarkSetting} />
    } else if (typeModal === 'emailDelivery') {
      return <ListingSearch external={true} setStateExternal={onSubmitEmailSetting} />
    }
  }

  const renderMappingForm = () => (
    <Form layout="inline" onSubmit={onSubmit}>
      <Row>{_mappingItemForm(formFields, form.getFieldDecorator, form.getFieldValue)}</Row>
      <Row>
        <Form.Item style={{ display: 'none' }}>
          {form.getFieldDecorator('prefectures', { initialValue: [] })(
            <Input disabled={true} hidden={true} />,
          )}
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          label={
            <>
              発注地域{' '}
              <Tooltip title="prompt text">
                <Icon type="question-circle" theme="filled" style={{ marginTop: 10 }} />
              </Tooltip>
            </>
          }
        >
          {form.getFieldDecorator('regions', { initialValue: '' })(
            <div style={{ width: 500 }}>
              <Col span={4}>
                <Button onClick={() => handleChecklistModal('region')}>選択</Button>
              </Col>
              <Col span={12}>
                {prefecturesEmpty
                  ? '申込地域は設定されていません。'
                  : 'アプリケーションエリアが設定されました。'}
              </Col>
            </div>,
          )}
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          label={
            <>
              Bookmark Setting{' '}
              <Tooltip title="prompt text">
                <Icon type="question-circle" theme="filled" style={{ marginTop: 10 }} />
              </Tooltip>
            </>
          }
        >
          {form.getFieldDecorator('bookmark', { initialValue: {} })(
            <div style={{ width: 500 }}>
              <Col span={4}>
                <Button onClick={() => handleChecklistModal('bookmark')}>選択</Button>
              </Col>
              <Col span={12}>
                {bookmarkEmpty ? 'Bookmark setting is not set' : 'Bookmark setting has been set'}
              </Col>
            </div>,
          )}
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          label={
            <>
              Email Delivery Setting{' '}
              <Tooltip title="prompt text">
                <Icon type="question-circle" theme="filled" style={{ marginTop: 10 }} />
              </Tooltip>
            </>
          }
        >
          {form.getFieldDecorator('emailDelivery', { initialValue: {} })(
            <div style={{ width: 500 }}>
              <Col span={4}>
                <Button onClick={() => handleChecklistModal('emailDelivery')}>選択</Button>
              </Col>
              <Col span={12}>
                {emailDeliveryEmpty
                  ? 'Email delivery setting is not set'
                  : 'Email delivery setting has been set'}
              </Col>
            </div>,
          )}
        </Form.Item>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button htmlType="submit" type="primary" loading={isLoading}>
            検索する
          </Button>
          <Button onClick={onReset} style={{ marginLeft: 10 }}>
            リセット
          </Button>
        </Col>
      </Row>
    </Form>
  )
  return (
    <WrapperUserListSearch>
      <div className="card">
        <div className="card-header">索検</div>
        <div className="card-body">{renderMappingForm()}</div>
      </div>
      <Modal
        title={titleModal}
        visible={checklistModal}
        width={1200}
        onCancel={handleChecklistModal}
        footer={null}
      >
        <Form layout="inline">
          <Row gutter={[16, 16]}>{renderChecklistForm()}</Row>
          {showButtonSubmitModal && (
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button onClick={onSubmitChecklist} htmlType="submit" type="primary">
                  参加する
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </Modal>
    </WrapperUserListSearch>
  )
}

export default UserListSearchComponent
