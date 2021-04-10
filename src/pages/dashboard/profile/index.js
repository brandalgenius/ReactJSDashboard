import React from 'react'
import { Helmet } from 'react-helmet'
import MyProfileContainer from './profile.container'

class MyProfile extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Admin: My Profile" />
        <MyProfileContainer />
      </div>
    )
  }
}

export default MyProfile
