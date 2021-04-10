import React from 'react'
import { Helmet } from 'react-helmet'
import BiddingMethodListContainer from 'containers/AdminBiddingMethodList'

const BiddingMethodListPage = () => {
  return (
    <div>
      <Helmet title="入札方式マスター" />
      <BiddingMethodListContainer />
    </div>
  )
}

export default BiddingMethodListPage
