import React from 'react'
import { _mappingItemForm } from 'utils/formUtils'
import { Form, Row, Button, Col, Checkbox, Radio } from 'antd'
import { isEmpty } from 'lodash'
import { history } from 'index'

const EditProfileFormComponent = props => {
  const {
    form,
    onSubmit,
    onSearchPostal,
    address,
    optionPrefectrue,
    optionPlans,
    onCheckAll,
    checkAll,
    onCheckByArea,
    isSuccessRegister,
    dataMemberInfo,
    isLoading,
  } = props

  const formField = [
    {
      label: '会社名',
      required: true,
      field_name: 'companyName',
      type: 'text',
      size: 24,
      initialValue: dataMemberInfo.companyName,
      placeholder: '例　株式会社Tender',
    },
    {
      label: '会社名(カナ)',
      required: false,
      field_name: 'companyNameKana',
      type: 'text',
      size: 24,
      initialValue: dataMemberInfo.companyNameKana,
      placeholder: '例　カブシキカイシャテンダー',
    },
    {
      label: 'ご住所',
      required: false,
      field_name: 'address',
      type: 'address',
      size: 24,
      initialValue: address,
      placeholder: '',
      onSearchPostal: onSearchPostal,
    },
    {
      label: '電話番号',
      required: false,
      field_name: 'phoneNumber',
      type: 'text',
      size: 24,
      initialValue: dataMemberInfo.phoneNumber,
      placeholder: '例　0312345678',
    },
    {
      label: 'FAX番号',
      required: false,
      field_name: 'faxNumber',
      type: 'text',
      size: 24,
      initialValue: dataMemberInfo.faxNumber,
      placeholder: '例　0312345678',
    },
    {
      label: 'ご契約担当者名',
      required: true,
      field_name: 'picName',
      type: 'text',
      size: 24,
      initialValue: dataMemberInfo.picName,
      placeholder: '例　山田太郎',
    },
    {
      label: 'ご契約担当者名(カナ)',
      required: false,
      field_name: 'picNameKana',
      type: 'text',
      size: 24,
      initialValue: dataMemberInfo.picNameKana,
      placeholder: '例　ヤマダタロウ',
    },
    {
      label: 'メールアドレス',
      required: true,
      field_name: 'email',
      type: 'email',
      size: 24,
      initialValue: dataMemberInfo.email,
      placeholder: '例　taro@tender.com',
    },
    // {
    //   label: 'パスワード',
    //   required: false,
    //   field_name: 'password',
    //   type: 'passwordRegister',
    //   size: 24,
    //   initialValue: '',
    //   placeholder: '',
    // },
  ]

  const mappingRadio = items => (
    <Radio.Group>
      {items.map((item, key) => (
        <Radio key={key} value={item.id}>
          {item.name}
        </Radio>
      ))}
    </Radio.Group>
  )

  const _checkboxGroup = (items, itemsCheckAll) => {
    let defaultValue = itemsCheckAll === undefined ? [] : itemsCheckAll
    if (isEmpty(defaultValue)) {
      return (
        <Checkbox.Group style={{ width: '100%', marginBottom: 16 }} key={`unset_${items.id}`}>
          <Row>
            <Col span={3}>
              <Checkbox
                value={`area_${items.id}`}
                onClick={e => onCheckByArea(e.target.value, e.target.checked)}
              >
                {items.name}
              </Checkbox>
            </Col>
            {items.areas.map((item, key) => (
              <Col span={3} key={key}>
                <Checkbox value={item.id}>{item.name}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      )
    } else {
      return (
        <Checkbox.Group
          style={{ width: '100%', marginBottom: 16 }}
          key={items.id}
          value={defaultValue}
          defaultValue={defaultValue}
        >
          <Row>
            <Col span={3}>
              <Checkbox
                value={`area_${items.id}`}
                onClick={e => onCheckByArea(e.target.value, e.target.checked)}
              >
                {items.name}
              </Checkbox>
            </Col>
            {items.areas.map((item, key) => (
              <Col span={3} key={key}>
                <Checkbox value={item.id}>{item.name}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      )
    }
  }

  const _mappingAreaCheckbox = () =>
    optionPrefectrue.map((item, key) =>
      form.getFieldDecorator(`area_${item.id}`, {
        initalValue: checkAll[key],
        valuePropName: 'checked',
      })(_checkboxGroup(item, checkAll[key])),
    )

  const mappingForm = () => (
    <div>
      <Form layout="inline" onSubmit={onSubmit}>
        <Row>{_mappingItemForm(formField, form.getFieldDecorator, form.getFieldValue)}</Row>
        {/* <Row>
          <Col span={24}>
            <Form.Item label="Password" required={true}>
              {passwordRegister()}
            </Form.Item>
          </Col>
        </Row> */}
        <Row>
          <Col span={24}>
            <div className="card-header mb-5">
              <h4>ご希望の発注地域を選択して下さい</h4>
            </div>
            <Row style={{ marginBottom: 16 }}>
              <Checkbox onChange={e => onCheckAll(e.target.checked)}>全て✔する</Checkbox>
            </Row>
            {_mappingAreaCheckbox()}
          </Col>
          <Col span={24} style={{ marginTop: 8 }}>
            <div className="card-header mb-5">
              <h4>ご契約期間を選択して下さい</h4>
            </div>
            <Form.Item label="契約期間">
              {form.getFieldDecorator('planId', {
                initalValue: dataMemberInfo.planId,
              })(mappingRadio(optionPlans))}
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ marginTop: 48 }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              style={{ width: 300 }}
              loading={isLoading}
            >
              変更内容を保存
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )

  const _form = () => (
    <>
      <div className="text-center mb-5">
        <h2 className="mb-5 px-3">
          <strong>プロファイル編集</strong>
        </h2>
      </div>
      <div className="card register">
        <div className="card-header mb-5">
          <h4>登録情報を変更する</h4>
        </div>
        <br />
        {mappingForm()}
      </div>
    </>
  )

  return (
    <>
      <Button icon="arrow-left" className="mb-3" onClick={() => history.push('/admin/my-profile')}>
        Back
      </Button>
      {!isSuccessRegister && _form()}
    </>
  )
}

export default EditProfileFormComponent
