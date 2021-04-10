import React from 'react'
import { _mappingItemForm } from 'utils/formUtils'
import { Form, Row, Button, Col, Checkbox, Radio, Modal, Result, Input } from 'antd'
import { ModalConfirm } from './Register.style'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'

const RegisterComponent = props => {
  const {
    form,
    onSubmit,
    isShowConfirmation,
    onSearchPostal,
    address,
    optionPrefectrue,
    dataRegister,
    onCloseModal,
    optionPlans,
    onCheckAll,
    checkAll,
    onCheckByArea,
    submitRegistration,
    isSuccessRegister,
  } = props

  const formField = [
    {
      label: '会社名',
      required: true,
      field_name: 'companyName',
      type: 'text',
      size: 24,
      initialValue: '',
      placeholder: '例　株式会社Tender',
    },
    {
      label: '会社名(カナ)',
      required: false,
      field_name: 'companyNameKana',
      type: 'text',
      size: 24,
      initialValue: '',
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
      initialValue: '',
      placeholder: '例　0312345678',
    },
    {
      label: 'FAX番号',
      required: false,
      field_name: 'faxNumber',
      type: 'text',
      size: 24,
      initialValue: '',
      placeholder: '例　0312345678',
    },
    {
      label: 'ご契約担当者名',
      required: true,
      field_name: 'picName',
      type: 'text',
      size: 24,
      initialValue: '',
      placeholder: '例　山田太郎',
    },
    {
      label: 'ご契約担当者名(カナ)',
      required: false,
      field_name: 'picNameKana',
      type: 'text',
      size: 24,
      initialValue: '',
      placeholder: '例　ヤマダタロウ',
    },
    {
      label: 'メールアドレス',
      required: true,
      field_name: 'email',
      type: 'email',
      size: 24,
      initialValue: '',
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
        <Row>
          <Col span={24}>
            <Form.Item label="Password" required={true}>
              {passwordRegister()}
            </Form.Item>
          </Col>
        </Row>
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
              {form.getFieldDecorator('planId')(mappingRadio(optionPlans))}
            </Form.Item>
            <Form.Item style={{ marginTop: 8 }}>
              {form.getFieldDecorator('agreeTos', {
                initalValue: '',
                valuePropName: 'checked',
                rules: [
                  {
                    required: true,
                    message: '利用規約に同意する必要があります',
                  },
                ],
              })(
                <Checkbox style={{ color: '#1890ff' }}>
                  利用規約・プライバシーポリシーに同意する
                </Checkbox>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ marginTop: 48 }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button htmlType="submit" type="primary" size="large" style={{ width: 300 }}>
              内容を確認
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )

  const _mappingPrefecture = prefectures =>
    prefectures.map((prefecture, key) => <span key={key}>{prefecture.name}, </span>)

  const _modalConfirmation = () => {
    return (
      <Modal footer={null} visible={isShowConfirmation} width={'87rem'} onCancel={onCloseModal}>
        <ModalConfirm>
          <div className="title">
            <h2>入力情報確認</h2>
          </div>
          <div className="card-header mb-5">
            <h4>会員情報</h4>
          </div>
          <Row className="mb-3">
            <Col span={8}>会社名</Col>
            <Col span={16}>{dataRegister.companyName}</Col>
          </Row>
          <Row className="mb-3">
            <Col span={8}>会社名(カナ)</Col>
            <Col span={16}>{dataRegister.companyNameKana}</Col>
          </Row>
          <Row className="mb-3">
            <Col span={8}>ご住所</Col>
            <Col span={16}>
              <Col span={24}>〒 {dataRegister.postalCode}</Col>
              <Col span={24}>{dataRegister.address}</Col>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col span={8}>電話番号</Col>
            <Col span={16}>{dataRegister.phoneNumber}</Col>
          </Row>
          <Row className="mb-3">
            <Col span={8}>FAX番号</Col>
            <Col span={16}>{dataRegister.faxNumber}</Col>
          </Row>
          <Row className="mb-3">
            <Col span={8}>ご契約担当者名 </Col>
            <Col span={16}>{dataRegister.picName}</Col>
          </Row>
          <Row className="mb-3">
            <Col span={8}>ご契約担当者名(カナ) </Col>
            <Col span={16}>{dataRegister.picNameKana}</Col>
          </Row>
          <Row className="mb-3">
            <Col span={8}>メールアドレス </Col>
            <Col span={16}>{dataRegister.email}</Col>
          </Row>
          <div className="card-header mb-5">
            <h4>選択した発注地域</h4>
          </div>
          <Row className="mb-3">
            <Col span={24}>{_mappingPrefecture(dataRegister.prefectures)}</Col>
          </Row>
          <div className="card-header mb-5">
            <h4>選択したご契約期間</h4>
          </div>
          <Row className="mb-3">
            <Col span={8}>契約期間 </Col>
            <Col span={16}>{_planId(dataRegister.planId)}</Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Button type="default" block onClick={onCloseModal}>
                前のページに戻る
              </Button>
            </Col>
            <Col span={12}>
              <Button type="primary" block onClick={submitRegistration}>
                申し込む
              </Button>
            </Col>
          </Row>
        </ModalConfirm>
      </Modal>
    )
  }

  const _planId = id => {
    let planName = ''
    optionPlans.map(item => {
      if (item.id === id) {
        planName = item.name
      }
      return ''
    })
    return planName
  }

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('入力したパスワードに矛盾があります！')
    } else {
      callback()
    }
  }

  const validatorPassword = (rule, value, callback) => {
    const lengthPassword = form.getFieldValue('password').length
    if (lengthPassword < 8 || lengthPassword > 15) {
      callback('パスワードは半角英数8文字以上15文字以下で記入して下さい。')
    } else {
      callback()
    }
  }

  const passwordRegister = () => {
    return (
      <div>
        <Col span={24}>
          <Form.Item>
            {form.getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'パスワードを入力してください！',
                },
                {
                  validator: validatorPassword,
                },
              ],
            })(<Input.Password />)}
            <p>パスワードは半角英数8文字以上15文字以下で記入して下さい。</p>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {form.getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  message: 'パスワードを確認してください！',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(<Input.Password />)}
            <p>確認用パスワード</p>
          </Form.Item>
        </Col>
      </div>
    )
  }

  const _resultSuccess = () => (
    <Result
      status="success"
      title="登録に成功しました !"
      subTitle="ユーザー登録に成功しました。メールをチェックして登録を有効にしてください。"
      extra={[
        <div>
          <a href="#" className="kit__utils__link font-size-16">
            クリックしてアクティベーションリンクを再送信します
          </a>
          <br />
        </div>,
        <Link to="/auth/login" className="kit__utils__link font-size-16">
          ログインページに移動
        </Link>,
      ]}
    />
  )

  const _form = () => (
    <>
      <div className="text-center mb-5">
        <h2 className="mb-5 px-3">
          <strong>新規会員申込</strong>
        </h2>
      </div>
      <div className="card register">
        <div className="card-header mb-5">
          <h4>新規会員お申込み</h4>
        </div>
        <br />
        {mappingForm()}
      </div>
      <div className="text-center pt-2 mb-auto">
        <p>
          登録済みですが、アクティベーションコードを取得していませんか？{' '}
          <Link to="/auth/resend-activation" style={{ color: '#1890ff' }}>
            再送
          </Link>
        </p>
      </div>
      <div className="text-center pt-2 mb-auto">
        <span className="mr-2">すでにアカウントをお持ちですか ？</span>
        <Link to="/auth/login" className="kit__utils__link font-size-16">
          サインイン
        </Link>
      </div>
    </>
  )

  return (
    <>
      {!isEmpty(dataRegister) && _modalConfirmation()}
      {isSuccessRegister && _resultSuccess()}
      {!isSuccessRegister && _form()}
    </>
  )
}

export default RegisterComponent
