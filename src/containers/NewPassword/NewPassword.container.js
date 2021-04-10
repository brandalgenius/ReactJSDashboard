import React from 'react'
import NewPasswordComponent from './NewPassword.component'
import { Form, notification } from 'antd'
import userService from 'services/user/userService'

const NewPasswordContainer = props => {
  const { form } = props
  const token = props.match.params.token

  const onSubmit = async event => {
    event.preventDefault()
    await form.validateFields(async (err, values) => {
      if (!err) {
        let body = {
          password: values.password,
          confirmPassword: values.confirmPassword,
          token: token,
        }
        await userService
          .FORGOT_PASSWORD_NEW(body)
          .then(res => {
            if (res) {
              props.history.push('/auth/login')
              notification.success({
                message: '新しいパスワードを作成しました',
              })
              form.resetFields()
            }
          })
          .catch(() => {
            notification.error({
              message: '新しいパスワードを作成できません！',
            })
          })
      }
    })
  }

  return (
    <div>
      <NewPasswordComponent form={form} onSubmit={onSubmit} />
    </div>
  )
}

const WrappedNewPasswordContainer = Form.create({ name: 'NewPasswordContainer' })(
  NewPasswordContainer,
)

export default WrappedNewPasswordContainer
