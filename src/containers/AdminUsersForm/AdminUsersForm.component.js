import React from 'react'
import { Input, Form, Col, Row, Button, Checkbox } from 'antd'
import { _mappingItemForm } from 'utils/formUtils'
import { WrapperForm } from './AdminUsersForm.style'
import { UploadPhoto } from 'containers'

const AdminUsersFormComponent = props => {
  const {
    form,
    formFields,
    onSubmit,
    onSubmitEdit,
    isEdit,
    isLoading,
    showAdminCheckbox,
    token,
    user,
  } = props

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
  return (
    <WrapperForm>
      <Form layout="inline" onSubmit={isEdit ? onSubmitEdit : onSubmit}>
        <Row>
          <Col span={24}>
            <Form.Item label="写真">
              <UploadPhoto token={token} form={form} user={user} />
            </Form.Item>
          </Col>
        </Row>
        <Row>{_mappingItemForm(formFields, form.getFieldDecorator, form.getFieldValue)}</Row>
        {showAdminCheckbox && (
          <Row>
            <Col span={24}>
              <Form.Item label="管理者">
                {form.getFieldDecorator('admin', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [{ required: false }],
                })(<Checkbox>管理者</Checkbox>)}
              </Form.Item>
            </Col>
          </Row>
        )}
        {!isEdit && (
          <Row>
            <Col span={24}>
              <Form.Item label="Password" required={true}>
                {passwordRegister()}
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row>
          <Col span={24}>
            <Button htmlType="submit" block type="primary" loading={isLoading}>
              申し込む
            </Button>
          </Col>
        </Row>
      </Form>
    </WrapperForm>
  )
}

export default AdminUsersFormComponent
