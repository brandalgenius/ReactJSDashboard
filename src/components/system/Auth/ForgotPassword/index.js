import React, { useState } from 'react'
import { Form, Input, Button, notification, Result } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'
import userService from 'services/user/userService'

const ForgotPassword = props => {
  const { form } = props
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = event => {
    setIsLoading(true)
    event.preventDefault()
    form.validateFields((error, values) => {
      if (!error) {
        userService
          .FORGOT_PASSWORD(values.email)
          .then(res => {
            if (res) {
              setIsSuccess(true)
            }
          })
          .catch(() => {
            notification.error({
              message: 'Cannot send to your email',
            })
          })
      }
    })
    setIsLoading(false)
  }

  const _form = () => (
    <>
      <div className="text-dark font-size-24 mb-4 text-center">
        <strong>パスワードを再設定する</strong>
      </div>
      <div className={`card ${style.container}`}>
        <Form layout="vertical" hideRequiredMark onSubmit={onSubmit} className="mb-4">
          <Form.Item>
            {form.getFieldDecorator('email', {
              rules: [
                { required: true, message: 'メールアドレスを入力してください' },
                {
                  type: 'email',
                  message: '入力は有効なメールではありません！',
                },
              ],
            })(<Input size="large" placeholder="メールアドレス" />)}
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="text-center w-100"
            loading={isLoading}
          >
            <strong>私のパスワードをリセットする</strong>
          </Button>
        </Form>
        <Link to="/auth/login" className="kit__utils__link font-size-16">
          <i className="fe fe-arrow-left mr-1 align-middle" />
          ログインに移動
        </Link>
      </div>
    </>
  )

  const _isSuccess = () => (
    <Result
      status="success"
      title="パスワードを忘れた場合のリンクは既にあなたのメールに送信されています。"
      extra={[
        <Button key="1" href="/auth/login">
          ログインページに移動
        </Button>,
      ]}
    />
  )
  return (
    <div>
      {!isSuccess && _form()}
      {isSuccess && _isSuccess()}
    </div>
  )
}

const WrappedForgotPassword = Form.create({ name: 'ForgotPassword' })(ForgotPassword)

export default WrappedForgotPassword
