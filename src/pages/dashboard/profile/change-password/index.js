import React from 'react'
import { Helmet } from 'react-helmet'
import { ChangePassword } from 'containers'

const ChangePasswordPage = () => {
  return (
    <div>
      <Helmet title="Admin: Change Password" />
      <ChangePassword />
    </div>
  )
}

export default ChangePasswordPage
