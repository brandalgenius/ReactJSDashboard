import React from 'react'
import { Helmet } from 'react-helmet'
import IndustryListContainer from 'containers/AdminIndustryList'

const IndustryListPage = () => {
  return (
    <div>
      <Helmet title="業種マスター" />
      <IndustryListContainer />
    </div>
  )
}

export default IndustryListPage
