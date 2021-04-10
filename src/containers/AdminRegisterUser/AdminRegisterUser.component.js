import React from 'react'
import { Form, Row, Col, Button, Input, Tooltip, Icon, Modal } from 'antd'
import { _mappingItemForm } from 'utils/formUtils'
import { WrapperForm } from './AdminRegisterUser.style'
import { isEmpty } from 'lodash'
import ChecklistPrefectures from 'components/ChecklistPrefectures'
import { history } from 'index'
import { ListingSearch, DepositManagementList } from 'containers'

const AdminRegisterUserComponent = props => {
  const {
    form,
    formFields,
    onSubmit,
    isLoading,
    onRemoveUser,
    onAddUser,
    formFieldsUser,
    typeModal,
    handleCheckAll,
    dataRegion,
    regionCheckAll,
    handleChangeRegion,
    titleModal,
    checklistModal,
    handleChecklistModal,
    onSubmitChecklist,
    isEdit,
    dataMember,
    onSubmitEdit,
    handleModalDynamic,
    visibleModalDynamic,
    showButtonSubmitModal,
  } = props

  const prefectures = form.getFieldValue('prefectures')
  const prefecturesEmpty = isEmpty(prefectures) || prefectures === undefined

  const renderChecklistForm = () => {
    if (typeModal === 'region') {
      return (
        <ChecklistPrefectures
          handleCheckAll={handleCheckAll}
          regionCheckAll={regionCheckAll}
          dataRegion={dataRegion}
          handleChangeRegion={handleChangeRegion}
        />
      )
    } else if (typeModal === 'deposit') {
      return (
        <div>
          <DepositManagementList id={dataMember.id} />
        </div>
      )
    }
  }

  const renderModalDynamic = key => {
    let body = <div></div>
    if (typeModal === 'bookmark') {
      body = <ListingSearch />
    } else if (typeModal === 'item-delivery') {
      body = <ListingSearch />
    }
    return (
      <Modal
        title={titleModal}
        visible={visibleModalDynamic}
        width={1200}
        onCancel={() => handleModalDynamic(key)}
        footer={null}
      >
        <Form layout="inline">
          <Row gutter={[16, 16]}>
            <Col span={24}>{body}</Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button onClick={onSubmitChecklist} htmlType="submit" type="primary">
                参加する
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }

  const _modalArea = () => (
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
  )

  // const compareToFirstPassword = (rule, value, callback) => {
  //   const keys = form.getFieldValue('keys')
  //   keys.map((k, index) => {
  //     if (form.getFieldValue(`confirmPassword[${k}]`) !== form.getFieldValue(`password[${k}]`)) {
  //       callback('入力したパスワードに矛盾があります！')
  //     } else {
  //       callback()
  //     }
  //     return ''
  //   })
  // }

  // const validatorPassword = (rule, value, callback) => {
  //   const keys = form.getFieldValue('keys')
  //   keys.map((k, index) => {
  //     let lengthPassword = form.getFieldValue(`password[${k}]`).length
  //     if (lengthPassword < 8 || lengthPassword > 15) {
  //       callback('パスワードは半角英数8文字以上15文字以下で記入して下さい。')
  //     } else {
  //       callback()
  //     }
  //     return ''
  //   })
  // }

  const passwordRegister = k => {
    return (
      <div>
        <Col span={24}>
          <Form.Item>
            {form.getFieldDecorator(`password[${k}]`, {
              rules: [
                {
                  required: true,
                  message: 'パスワードを入力してください！',
                },
              ],
            })(<Input.Password />)}
            <p>パスワードは半角英数8文字以上15文字以下で記入して下さい。</p>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {form.getFieldDecorator(`confirmPassword[${k}]`, {
              rules: [
                {
                  required: true,
                  message: 'パスワードを確認してください！',
                },
              ],
            })(<Input.Password />)}
            <p>確認用パスワード</p>
          </Form.Item>
        </Col>
      </div>
    )
  }

  const mappingItemForm = (items, getFieldDecorator, getFieldValue, keys) =>
    items.map((item, key) => identifyType(item, key, getFieldDecorator, getFieldValue, keys))

  const identifyType = (item, key, getFieldDecorator, getFieldValue, keys) => {
    if (item.type === 'email') {
      return (
        <Col span={item?.size ?? 24} key={key}>
          <Form.Item
            label={item?.label}
            style={{
              marginTop: item.label ? 0 : 40,
            }}
          >
            {getFieldDecorator(`${item.field_name}[${keys}]`, {
              rules: [
                {
                  required: item.required,
                  message: `入力してください ${item?.label ?? item?.field_name}!`,
                },
                {
                  type: 'email',
                  message: '有効なメールアドレスを入力してください！',
                },
              ],
              initialValue: isEdit
                ? dataMember.users !== undefined
                  ? dataMember.users[keys] !== undefined
                    ? dataMember.users[keys]['email']
                    : ''
                  : ''
                : '',
            })(
              _typeField(
                item.type,
                item.field_name,
                item.initialValue,
                item.optional,
                item.disabled,
                item.placeholder,
                item.isAdmin,
                item.prefix,
              ),
            )}
          </Form.Item>
        </Col>
      )
    } else {
      return (
        <Col span={item?.size ?? 24} key={key}>
          <Form.Item
            label={item?.label}
            style={{
              marginTop: item.label ? 0 : 40,
            }}
          >
            {getFieldDecorator(`${item.field_name}[${keys}]`, {
              rules: [
                {
                  required: item.required,
                  message: `入力してください ${item?.label ?? item?.field_name}!`,
                },
              ],
              initialValue: isEdit
                ? dataMember.users !== undefined
                  ? dataMember.users[keys] !== undefined
                    ? dataMember.users[keys][item.field_name]
                    : ''
                  : ''
                : '',
            })(
              _typeField(
                item.type,
                item.field_name,
                item.initialValue,
                item.optional,
                item.disabled,
                item.placeholder,
                item.isAdmin,
                item.prefix,
              ),
            )}
          </Form.Item>
        </Col>
      )
    }
  }

  const _typeField = (type, field, initialValue, optional, disabled, placeholder) => {
    return <Input size="default" placeholder={placeholder ?? ''} disabled={disabled} />
  }

  const keys = form.getFieldValue('keys')
  const _formDynamicUser = () =>
    keys !== undefined &&
    keys.map((k, index) => (
      <Row key={index} className="mb-3">
        <Col span={24}>
          <div className="row" key={index}>
            <div className="col-md-6">利用者 {index + 1}</div>
            <div className="col-md-6" style={{ textAlign: 'right' }}>
              <Button type="danger" className="mb-2" onClick={() => onRemoveUser(k)}>
                Delete
              </Button>
            </div>
          </div>
        </Col>
        <Col span={24}>
          {mappingItemForm(formFieldsUser, form.getFieldDecorator, form.getFieldValue, k)}
        </Col>
        <Col span={24}>
          <Form.Item style={{ display: 'none' }}>
            {form.getFieldDecorator(`id[${k}]`, {
              initialValue: isEdit
                ? dataMember.users !== undefined
                  ? dataMember.users[k] !== undefined
                    ? dataMember.users[k]['id']
                    : ''
                  : ''
                : '',
            })(<Input disabled={true} hidden={true} />)}
          </Form.Item>
        </Col>
        {!isEdit && (
          <Col span={24}>
            <Form.Item label="パスワード">{passwordRegister(k)}</Form.Item>
          </Col>
        )}
        {isEdit && (
          <div className="mb-2">
            <Col span={12} offset={7} style={{ padding: '0px 8px' }}>
              <Button className="bookmark mr-2" onClick={() => handleModalDynamic('bookmark', k)}>
                ブックマーク
              </Button>
              <Button
                className="item-delivery mr-2"
                onClick={() => handleModalDynamic('item-delivery', k)}
              >
                案件メール配信
              </Button>
              {/* <Button className="application-area mr-2">設定する</Button> */}
            </Col>
          </div>
        )}
        {renderModalDynamic(k)}
      </Row>
    ))
  return (
    <WrapperForm>
      <Form layout="inline" onSubmit={!isEdit ? onSubmit : onSubmitEdit}>
        <div className="card">
          <div className="card-header">
            <h4>{!isEdit ? `ユーザー登録・詳細画面` : `ユーザー登録の編集`}</h4>
          </div>
          <div className="card-body">
            <Row>{_mappingItemForm(formFields, form.getFieldDecorator, form.getFieldValue)}</Row>
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
              <Form.Item style={{ display: 'none' }}>
                {form.getFieldDecorator('prefectures', { initialValue: [] })(
                  <Input disabled={true} hidden={true} />,
                )}
              </Form.Item>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item style={{ display: 'none' }}>
                  {form.getFieldDecorator('keys', {
                    initialValue: isEdit
                      ? dataMember.users !== undefined
                        ? dataMember.users.map((x, i) => i)
                        : [0]
                      : [0],
                  })(<Input disabled={true} hidden={true} />)}
                </Form.Item>
              </Col>
            </Row>
            {isEdit && (
              <Row>
                <Form.Item
                  label={
                    <>
                      入金管理
                      <Tooltip title="prompt text">
                        <Icon type="question-circle" theme="filled" style={{ marginTop: 10 }} />
                      </Tooltip>
                    </>
                  }
                >
                  {form.getFieldDecorator('deposit', { initialValue: '' })(
                    <div style={{ width: 500 }}>
                      <Col span={4}>
                        <Button onClick={() => handleChecklistModal('deposit')}>選択</Button>
                      </Col>
                    </div>,
                  )}
                </Form.Item>
              </Row>
            )}
          </div>
        </div>
        <div className="card">
          <div className="card-header">利用者</div>
          <div className="card-body">
            {_formDynamicUser()}
            {form.getFieldValue('keys').length < 5 && (
              <Row className="mb-3 mt-3">
                <Col span={24}>
                  <Button block onClick={onAddUser}>
                    Add
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <Row>
              <Col span={24}>
                <Form.Item label="備考">
                  {form.getFieldDecorator('remarks', {
                    initialValue: isEdit ? dataMember.remarks : '',
                  })(<Input.TextArea rows={4} />)}
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button onClick={() => history.push('/admin/members')} style={{ marginRight: 10 }}>
              戻る
            </Button>
            <Button htmlType="submit" type="primary" loading={isLoading}>
              検索する
            </Button>
          </Col>
        </Row>
      </Form>
      {_modalArea()}
    </WrapperForm>
  )
}

export default AdminRegisterUserComponent
