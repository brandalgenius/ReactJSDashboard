import React, { useEffect, useState } from 'react'
import DepositManagementListComponent from './DepositManagementList.component'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import adminMemberService from 'services/admin/member/adminMemberService'
import moment from 'moment'
import { message } from 'antd'

const DepositManagementListContainer = props => {
  const { id } = props
  const stateUser = useSelector(state => state.user)
  const [depositList, setDepositList] = useState({})
  const [pageNumber, setPageNumber] = useState(1)
  const [isRefetch, setIsRefetch] = useState(false)

  const onChangePage = value => {
    console.log(value)
  }

  const onChangeDateDeposit = async (id, date) => {
    const body = {
      depositDate: moment(date).format('YYYY/MM/DD'),
    }
    await adminMemberService
      .UPDATE_DEPOSIT(id, body, stateUser.token)
      .then(updated => {
        if (updated) {
          message.success('Success update deposit date to ' + moment(date).format('YYYY/MM/DD'))
          setIsRefetch(true)
        }
      })
      .catch(() => {
        message.error('Something went wrong !')
      })
  }

  useEffect(() => {
    adminMemberService.GET_DEPOSITS(id, stateUser.token).then(deposits => {
      setDepositList(deposits)
    })
  }, [])

  useEffect(() => {
    if (isRefetch) {
      adminMemberService.GET_DEPOSITS(id, stateUser.token).then(deposits => {
        setDepositList(deposits)
        setIsRefetch(false)
      })
    }
  }, [isRefetch])
  return (
    <div>
      <DepositManagementListComponent
        depositList={depositList}
        pageNumber={pageNumber}
        onChangePage={onChangePage}
        onChangeDateDeposit={onChangeDateDeposit}
      />
    </div>
  )
}

DepositManagementListContainer.propTypes = {
  id: PropTypes.string.isRequired,
}

export default DepositManagementListContainer
