import React, { useEffect, useState } from 'react'
import AdminUsersFormComponent from './AdminUsersForm.component'
import memberService from 'services/member/memberService'
import { useSelector } from 'react-redux'
import { Form, notification, Button } from 'antd'
import { history } from 'index'

const AdminUsersFormContainer = props => {
  const { idUser, isEdit = false, setIsRefetch, onCloseModal, showAdminCheckbox = true } = props
  const [memberUser, setMemberUser] = useState({})
  const stateUser = useSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(false)

  const formFields = [
    {
      label: 'フルネーム',
      required: false,
      field_name: 'fullName',
      type: 'text',
      size: 24,
      initialValue: memberUser?.fullName,
      placeholder: 'フルネーム',
    },
    {
      label: 'フルネーム(カナ)',
      required: false,
      field_name: 'fullNameKana',
      type: 'text',
      size: 24,
      initialValue: memberUser?.fullNameKana,
      placeholder: 'フルネーム(カナ)',
    },
    {
      label: 'メールアドレス',
      required: false,
      field_name: 'email',
      type: 'email',
      size: 24,
      initialValue: memberUser?.email,
      placeholder: 'メールアドレス',
    },
  ]

  const onSubmit = async event => {
    event.preventDefault()
    await props.form.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)
        const data = {
          fullName: values.fullName,
          fullNameKana: values.fullNameKana,
          email: values.email,
          password: values.password,
          admin: values.admin,
          confirmPassword: values.confirmPassword,
        }
        await memberService
          .ADD_MEMBER_USER(data, stateUser.token)
          .then(added => {
            if (added) {
              notification.success({
                message: 'ユーザーを追加しました',
                description: 'アクティベーションコードがメールに送信されました',
              })
              setIsRefetch(true)
            }
          })
          .catch(() => {
            notification.error({
              message: 'ユーザーの追加に失敗しました',
            })
          })
          .finally(() => {
            setIsLoading(false)
            onCloseModal()
          })
      }
    })
  }

  const onSubmitEdit = async event => {
    event.preventDefault()
    await props.form.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)
        const dataEdit = {
          fullName: values.fullName,
          fullNameKana: values.fullNameKana,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          photo: values.photo,
        }

        await memberService
          .UPDATE_MEMBER_USER(idUser, dataEdit, stateUser.token)
          .then(updateMemberUser => {
            if (updateMemberUser) {
              notification.success({
                message: '成功アップデート',
              })
              setIsRefetch(true)
              history.push('/admin/my-profile')
            }
          })
          .catch(() => {
            notification.error({
              message: '更新失敗',
            })
          })
          .finally(() => {
            setIsLoading(false)
            onCloseModal()
          })
      }
    })
  }

  useEffect(() => {
    const getMember = async () => {
      await memberService.GET_MEMBER(idUser, stateUser.token).then(member => {
        setMemberUser(member)
      })
    }
    if (isEdit) {
      getMember()
    }
  }, [])
  return (
    <div>
      <Button icon="arrow-left" className="mb-3" onClick={() => history.push('/admin/my-profile')}>
        Back
      </Button>
      <AdminUsersFormComponent
        form={props.form}
        formFields={formFields}
        onSubmit={onSubmit}
        onSubmitEdit={onSubmitEdit}
        isEdit={isEdit}
        isLoading={isLoading}
        showAdminCheckbox={showAdminCheckbox}
        token={stateUser.token}
        user={stateUser}
      />
    </div>
  )
}

const WrapperAdminUsersFormContainer = Form.create({
  name: 'AdminUsersFormContainer',
})(AdminUsersFormContainer)

export default WrapperAdminUsersFormContainer
