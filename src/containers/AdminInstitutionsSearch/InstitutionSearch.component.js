import React from 'react'
import { Form, Row, Col, Button, Modal, Input, Tooltip, Icon } from 'antd'
import { _mappingItemForm } from 'utils/formUtils'
import { WrapperUserListSearch } from './InstitutionSearch.style'
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

  const organizations = form.getFieldValue('organizations')
  const organizationsEmpty = isEmpty(organizations) || organizations === undefined

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
              ????????????{' '}
              <Tooltip title="prompt text">
                <Icon type="question-circle" theme="filled" style={{ marginTop: 10 }} />
              </Tooltip>
            </>
          }
        >
          {form.getFieldDecorator('regions', { initialValue: '' })(
            <div style={{ width: 500 }}>
              <Col span={4}>
                <Button onClick={() => handleChecklistModal('region')}>??????</Button>
              </Col>
              <Col span={12}>
                {prefecturesEmpty
                  ? '?????????????????????????????????????????????'
                  : '????????????????????????????????????????????????????????????'}
              </Col>
            </div>,
          )}
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          label={
            <>
              ????????????{' '}
              <Tooltip title="prompt text">
                <Icon type="question-circle" theme="filled" style={{ marginTop: 10 }} />
              </Tooltip>
            </>
          }
        >
          {form.getFieldDecorator('organizations', { initialValue: '' })(
            <div style={{ width: 500 }}>
              <Col span={4}>
                <Button onClick={() => handleChecklistModal('organizations')}>??????</Button>
              </Col>
              <Col span={12}>
                {organizationsEmpty
                  ? '?????????????????????????????????????????????'
                  : '????????????????????????????????????????????????????????????'}
              </Col>
            </div>,
          )}
        </Form.Item>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button htmlType="submit" type="primary" loading={isLoading}>
            ????????????
          </Button>
          <Button onClick={onReset} style={{ marginLeft: 10 }}>
            ????????????
          </Button>
        </Col>
      </Row>
    </Form>
  )
  return (
    <WrapperUserListSearch>
      <div className="card">
        <div className="card-header">??????</div>
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
                  ????????????
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
