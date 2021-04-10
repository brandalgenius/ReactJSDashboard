import React from 'react'
import { Helmet } from 'react-helmet'
import { RegisterContainer } from 'containers'

class SystemRegister extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Register" />
        <RegisterContainer />
      </div>
    )
  }
}

export default SystemRegister
