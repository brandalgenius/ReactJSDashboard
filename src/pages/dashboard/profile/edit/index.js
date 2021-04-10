import React from 'react'
import Helmet from 'react-helmet'
import { EditProfileForm, AdminUsersForm } from 'containers'
import { useSelector } from 'react-redux'

const EditProfile = props => {
  const stateUser = useSelector(state => state.user)
  const isAdmin = stateUser.role === 'ROLE_USER' && stateUser.adminMember
  const idUser = props.match.params.id
  const noIdUser = idUser === undefined

  return (
    <div>
      <Helmet title="Admin: Edit Profile" />
      {!noIdUser && (
        <AdminUsersForm
          idUser={props.match.params.id}
          isEdit={true}
          setIsRefetch={() => {
            return ''
          }}
          onCloseModal={() => {
            return ''
          }}
          showAdminCheckbox={false}
        />
      )}
      {isAdmin && noIdUser && <EditProfileForm {...props} />}
    </div>
  )
}

export default EditProfile
