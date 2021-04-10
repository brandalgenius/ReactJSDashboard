import React from 'react'
import { Helmet } from 'react-helmet'
import { NewPasswordContainer } from 'containers'

const NewPassword = props => {
  return (
    <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
      <Helmet title="新しいパスワードを作成する" />
      <NewPasswordContainer {...props} />
    </div>
  )
}

export default NewPassword
