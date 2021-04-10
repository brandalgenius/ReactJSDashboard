import React from 'react'
import { AdminRegisterUser } from 'containers'

const EditMembersPage = props => {
  return (
    <div>
      <AdminRegisterUser isEdit={true} {...props} />
    </div>
  )
}

export default EditMembersPage
