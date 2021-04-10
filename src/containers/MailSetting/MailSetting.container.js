import React, { useState, useEffect } from 'react'
import MailSetting from './MailSetting.component'
import { useSelector, useDispatch } from 'react-redux'
import adminMailService from 'services/admin/mail-setting/adminMailService'

const MailSettingContainer = () => {
  const stateMail = useSelector(state => state.listing)
  const stateUser = useSelector(state => state.user)
  const [refetch, setRefetch] = useState(0)
  const dispatch = useDispatch()

  const onChangePageSize = value => {
    dispatch({
      type: 'listing/PAGE',
      payload: {
        size: parseInt(value),
      },
    })
    setRefetch(refetch + 1)
  }

  const onChangePage = value => {
    dispatch({
      type: 'listing/PAGE',
      payload: {
        number: parseInt(value),
      },
    })
    setRefetch(refetch + 1)
  }

  const deleteMailSetting = async id => {
    await adminMailService
      .DELETE_MAIL_SETTING(id, stateUser.token)
      .then(() => setRefetch(refetch + 1))
  }

  useEffect(() => {
    dispatch({
      type: 'listing/SUBMIT',
      payload: {
        content: [],
      },
    })
    const LOAD_DATA = async () => {
      await adminMailService
        .SEARCH_MAIL_SETTING(stateMail.number, stateMail.size, {}, stateUser.token)
        .then(search => {
          dispatch({
            type: 'listing/SUBMIT',
            payload: {
              content: search.content,
              pageable: search.pageable,
              totalPages: search.totalPages,
              totalElements: search.totalElements,
              last: search.last,
              first: search.first,
              sort: search.sort,
              size: search.size,
              number: search.number,
              numberOfElements: search.numberOfElements,
              empty: search.empty,
            },
          })
        })
    }
    LOAD_DATA()
  }, [refetch])

  return (
    <div>
      <MailSetting
        stateMail={stateMail}
        dataSources={stateMail.content}
        onChangePageSize={onChangePageSize}
        deleteMailSetting={deleteMailSetting}
        onChangePage={onChangePage}
      />
    </div>
  )
}

export default MailSettingContainer
