import React from 'react'
import { Helmet } from 'react-helmet'
import InstitutionListContainer from 'containers/AdminInstitutions'

const IndustryListPage = () => {
  return (
    <div>
      <Helmet title="業種マスター" />
      <InstitutionListContainer />
    </div>
  )
}

export default IndustryListPage
