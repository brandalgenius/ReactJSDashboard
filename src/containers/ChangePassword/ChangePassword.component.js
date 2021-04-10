import React from 'react'
import { Input, Button, Form } from 'antd'
import { history } from 'index'

const ChangePasswordComponent = props => {
  const { form, onSubmit, isLoading } = props

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

  const _form = () => (
    <>
      <div className="text-dark font-size-24 mb-4 text-center">
        <strong>新しいパスワードを作成する</strong>
      </div>
      <div className={`card`} style={{ padding: '24px 16px' }}>
        <Form layout="vertical" onSubmit={onSubmit} className="mb-4">
          <Form.Item>
            {form.getFieldDecorator('password', {
              rules: [
                { required: true, message: '新しいパスワードを入力してください' },
                {
                  validator: validatorPassword,
                },
              ],
            })(<Input.Password size="large" placeholder="新しいパスワード" />)}
          </Form.Item>
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
            })(<Input.Password size="large" placeholder="新しいパスワードの確認" />)}
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="text-center w-100"
            loading={isLoading}
          >
            <strong>新しいパスワードを作成</strong>
          </Button>
        </Form>
      </div>
    </>
  )

  return (
    <div>
      <Button icon="arrow-left" className="mb-3" onClick={() => history.push('/admin/my-profile/')}>
        Back
      </Button>
      {_form()}
    </div>
  )
}

export default ChangePasswordComponent
