import React, { useState, useEffect } from 'react'
import AdminBiddingMethodListComponent from './AdminBiddingMethodList.component'
import { useSelector, useDispatch } from 'react-redux'
import adminBiddingMethodService from 'services/admin/biddingMethod/adminBiddingMethodService'

const AdminBiddingMethodListContainer = () => {
  const stateBiddingMethod = useSelector(state => state.biddingMethod)
  const stateUser = useSelector(state => state.user)
  const [pageNumber, setPageNumber] = useState(1)
  const [showModalForm, setShowModalForm] = useState(false)
  const [refetch, setRefetch] = useState(0)
  const [refetchAfterAdd, setRefetchAfterAdd] = useState(0)
  const [biddingMethodId, setBiddingMethodId] = useState(0)
  const [biddingMethod, setBiddingMethod] = useState({})
  const dispatch = useDispatch()

  const onChangePageSize = value => {
    if (parseInt(value) * pageNumber > stateBiddingMethod.totalElements) {
      setPageNumber(Math.floor(stateBiddingMethod.totalElements / parseInt(value)) + 1)
    }
    dispatch({
      type: 'biddingMethod/PAGE',
      payload: {
        size: parseInt(value),
      },
    })
    setRefetch(refetch + 1)
  }

  const onChangePage = value => {
    dispatch({
      type: 'biddingMethod/PAGE',
      payload: {
        number: parseInt(value),
      },
    })
    setPageNumber(parseInt(value))
    setRefetch(refetch + 1)
  }

  const onAddRawText = (id, name) => {
    setBiddingMethod({
      id: id,
      name: name,
    })
    setShowModalForm(true)
  }

  const onShowDetails = id => {
    dispatch({
      type: 'biddingMethod/PAGE',
      payload: {
        biddingMethodId: id,
      },
    })
    setBiddingMethodId(id)
  }

  useEffect(() => {
    const LOAD_DATA = async () => {
      await adminBiddingMethodService
        .GET_BIDDING_METHOD_PAGE(
          stateBiddingMethod.number,
          stateBiddingMethod.size,
          {},
          stateUser.token,
        )
        .then(search => {
          dispatch({
            type: 'biddingMethod/SUBMIT',
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

  useEffect(() => {
    const LOAD_DETAILS = async () => {
      await adminBiddingMethodService
        .GET_BIDDING_METHOD_DETAILS(stateBiddingMethod.biddingMethodId, stateUser.token)
        .then(details => {
          const content = stateBiddingMethod.content.map(c =>
            c.id === stateBiddingMethod.biddingMethodId ? { ...c, details: details } : c,
          )
          dispatch({
            type: 'biddingMethod/SUBMIT',
            payload: {
              content: content,
            },
          })
        })
    }
    if (biddingMethodId != 0) LOAD_DETAILS()
  }, [biddingMethodId, refetchAfterAdd])

  return (
    <div>
      <AdminBiddingMethodListComponent
        dataSources={stateBiddingMethod.content}
        stateBiddingMethod={stateBiddingMethod}
        onChangePageSize={onChangePageSize}
        onChangePage={onChangePage}
        onAddRawText={onAddRawText}
        showModalForm={showModalForm}
        setShowModalForm={setShowModalForm}
        onShowDetails={onShowDetails}
        pageNumber={pageNumber}
        biddingMethod={biddingMethod}
        refetchAfterAdd={refetchAfterAdd}
        setRefetchAfterAdd={setRefetchAfterAdd}
      />
    </div>
  )
}

export default AdminBiddingMethodListContainer
