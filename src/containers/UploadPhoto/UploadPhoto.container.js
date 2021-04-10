import React from 'react'
import UploadPhotoComponent from './UploadPhoto.component'
import { message } from 'antd'
import PropTypes from 'prop-types'
import constant from 'config/constant'

const UploadPhotoContainer = props => {
  const { token, form, user } = props
  const propsUpload = {
    name: 'file',
    action: `${constant.BASE_URL}/api/member/user/upload-photo`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
        form.setFieldsValue({ photo: info.file.response.fileDownloadUri })
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const deletePhoto = () => {
    form.setFieldsValue({ photo: '' })
  }

  return (
    <div>
      <UploadPhotoComponent
        propsUpload={propsUpload}
        form={form}
        deletePhoto={deletePhoto}
        user={user}
      />
    </div>
  )
}

UploadPhotoContainer.propTypes = {
  token: PropTypes.string,
}

export default UploadPhotoContainer
