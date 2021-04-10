import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import AdminIndustryFormComponent from './AdminIndustryForm.component'
import adminIndustryService from 'services/admin/industry/adminIndustryService'

const AdminIndustryFormContainer = props => {
  const {
    visible,
    setVisible,
    industry,
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
          industryId: industry.id,
          rawText: values.rawText,
        }

        await adminIndustryService
          .ADD_INDUSTRY_DETAIL(data, stateUser.token)
          .then(added => {
            if (added) {
              notification.success({
                message: 'テキストが正常に追加されました',
              })
              formRef.resetFields()
              setVisible(false)
              onShowDetails(industry.id)
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
    <AdminIndustryFormComponent
      ref={saveFormRef}
      visible={visible}
      onCancel={() => setVisible(false)}
      onCreate={onSubmitHandler}
      industry={industry}
      isLoading={isLoading}
    />
  )
}

export default AdminIndustryFormContainer
