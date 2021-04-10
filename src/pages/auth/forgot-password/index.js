import React from 'react'
import { Helmet } from 'react-helmet'
import ForgotPassword from 'components/system/Auth/ForgotPassword'

class SystemForgotPassword extends React.Component {
  render() {
    return (
      <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
        <Helmet title="パスワードを再設定する" />
        <ForgotPassword />
      </div>
    )
  }
}

export default SystemForgotPassword
