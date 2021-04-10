import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import AdminBiddingMethodFormComponent from './AdminBiddingMethodForm.component'
import adminBiddingMethodService from 'services/admin/biddingMethod/adminBiddingMethodService'

const AdminBiddingMethodFormContainer = props => {
  const {
    visible,
    setVisible,
    biddingMethod,
    onShowDetails,
    refetchAfterAdd,
    setRefetchAfterAdd,
  } = props

  const stateUser = useSelector(state => state.user)
  const [formRef, setFormRef] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async event => {
    event.preventDefault()
    await formRef.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)
        const data = {
          biddingMethodId: biddingMethod.id,
          rawText: values.rawText,
        }

        await adminBiddingMethodService
          .ADD_BIDDING_METHOD_DETAIL(data, stateUser.token)
          .then(added => {
            if (added) {
              notification.success({
                message: 'テキストが正常に追加されました',
              })
              formRef.resetFields()
              setVisible(false)
              onShowDetails(biddingMethod.id)
              setRefetchAfterAdd(refetchAfterAdd + 1)
            }
          })
          .catch(() => {
            notification.error({
              message: '新しいテキストを追加できませんでした',
            })
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    })
  }

  const saveFormRef = useCallback(node => {
    if (node !== null) {
      setFormRef(node)
    }
  }, [])

  return (
    <AdminBiddingMethodFormComponent
      ref={saveFormRef}
      visible={visible}
      onCancel={() => setVisible(false)}
      onCreate={onSubmitHandler}
      biddingMethod={biddingMethod}
      isLoading={isLoading}
    />
  )
}

export default AdminBiddingMethodFormContainer
