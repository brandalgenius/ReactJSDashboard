import React, { useState } from 'react'
import ChangePasswordComponent from './ChangePassword.component'
import { Form, message } from 'antd'
import { useSelector } from 'react-redux'
import memberService from 'services/member/memberService'

const ChangePasswordContainer = props => {
  const { form } = props
  const [isLoading, setIsLoading] = useState(false)
  const stateUser = useSelector(state => state.user)

  const onSubmit = async event => {
    event.preventDefault()
    await form.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)
        let body = {
          fullName: stateUser.fullName,
          fullNameKana: stateUser.fullNameKana,
          email: stateUser.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }
        await memberService
          .UPDATE_MEMBER_USER(stateUser.id, body, stateUser.token)
          .then(res => {
            if (res) {
              message.success('パスワードの変更に成功しました')
            }
          })
          .catch(() => {
            message.error('パスワードの変更に失敗しました')
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    })
  }
  return (
    <div>
      <ChangePasswordComponent form={form} onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  )
}

const WrappedChangePasswordContainer = Form.create({ name: 'ChangePasswordContainer' })(
  ChangePasswordContainer,
)

export default WrappedChangePasswordContainer
