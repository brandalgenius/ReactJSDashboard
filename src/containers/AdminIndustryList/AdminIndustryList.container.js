import React, { useState, useEffect } from 'react'
import AdminIndustryListComponent from './AdminIndustryList.component'
import { useSelector, useDispatch } from 'react-redux'
import adminIndustryService from 'services/admin/industry/adminIndustryService'

const AdminIndustryListContainer = () => {
  const stateIndustry = useSelector(state => state.industry)
  const stateUser = useSelector(state => state.user)
  const [pageNumber, setPageNumber] = useState(1)
  const [showModalForm, setShowModalForm] = useState(false)
  const [refetch, setRefetch] = useState(0)
  const [refetchAfterAdd, setRefetchAfterAdd] = useState(0)
  const [industryId, setIndustryId] = useState(0)
  const [industry, setIndustry] = useState({})
  const dispatch = useDispatch()

  const onChangePageSize = value => {
    if (parseInt(value) * pageNumber > stateIndustry.totalElements) {
      setPageNumber(Math.floor(stateIndustry.totalElements / parseInt(value)) + 1)
    }
    dispatch({
      type: 'industry/PAGE',
      payload: {
        size: parseInt(value),
      },
    })
    setRefetch(refetch + 1)
  }

  const onChangePage = value => {
    dispatch({
      type: 'industry/PAGE',
      payload: {
        number: parseInt(value),
      },
    })
    setPageNumber(parseInt(value))
    setRefetch(refetch + 1)
  }

  const onAddRawText = (id, name) => {
    setIndustry({
      id: id,
      name: name,
    })
    setShowModalForm(true)
  }

  const onShowDetails = id => {
    dispatch({
      type: 'industry/PAGE',
      payload: {
        industryId: id,
      },
    })
    setIndustryId(id)
  }

  useEffect(() => {
    const LOAD_DATA = async () => {
      await adminIndustryService
        .GET_INDUSTRY_PAGE(stateIndustry.number, stateIndustry.size, {}, stateUser.token)
        .then(search => {
          dispatch({
            type: 'industry/SUBMIT',
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
      await adminIndustryService
        .GET_INDUSTRY_DETAILS(stateIndustry.industryId, stateUser.token)
        .then(details => {
          const content = stateIndustry.content.map(c =>
            c.id === stateIndustry.industryId ? { ...c, details: details } : c,
          )
          dispatch({
            type: 'industry/SUBMIT',
            payload: {
              content: content,
            },
          })
        })
    }
    if (industryId != 0) LOAD_DETAILS()
  }, [industryId, refetchAfterAdd])

  return (
    <div>
      <AdminIndustryListComponent
        dataSources={stateIndustry.content}
        stateIndustry={stateIndustry}
        onChangePageSize={onChangePageSize}
        onChangePage={onChangePage}
        onAddRawText={onAddRawText}
        showModalForm={showModalForm}
        setShowModalForm={setShowModalForm}
        onShowDetails={onShowDetails}
        pageNumber={pageNumber}
        industry={industry}
        refetchAfterAdd={refetchAfterAdd}
        setRefetchAfterAdd={setRefetchAfterAdd}
      />
    </div>
  )
}

export default AdminIndustryListContainer
