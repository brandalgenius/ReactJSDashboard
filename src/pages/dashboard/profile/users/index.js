import React from 'react'
import { Helmet } from 'react-helmet'
import { AdminListUsers } from 'containers'

const AdminUsersList = () => {
  return (
    <div>
      <Helmet title="Admin: Users" />
      <AdminListUsers />
    </div>
  )
}

export default AdminUsersList
