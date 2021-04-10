import React, { useState, useEffect } from 'react'
import InstitutionComponent from './InstitutionList.component'
import { useSelector, useDispatch } from 'react-redux'
import adminInstitutionService from 'services/admin/institution/adminInstitutionService'
import { history } from 'index'

const InstitutionContainer = () => {
  const [showSearch, setShowSearch] = useState(false)
  const stateInstitution = useSelector(state => state.institution)
  const stateUser = useSelector(state => state.user)
  const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const dispatch = useDispatch()

  const onClickSearch = () => {
    setShowSearch(!showSearch)
  }

  const onChangePageSize = async value => {
    dispatch({
      type: 'institution/PAGE',
      payload: {
        size: parseInt(value),
      },
    })
    setPageSize(value)
    await adminInstitutionService
      .SEARCH_INSTITUTION(stateInstitution.number, value, {}, stateUser.token)
      .then(search => {
        dispatch({
          type: 'institution/SUBMIT',
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

  const onChangePage = async value => {
    dispatch({
      type: 'institution/PAGE',
      payload: {
        number: parseInt(value),
      },
    })
    setPageNumber(value)
    await adminInstitutionService
      .SEARCH_INSTITUTION(value, stateInstitution.size, {}, stateUser.token)
      .then(search => {
        dispatch({
          type: 'institution/SUBMIT',
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

  const onEditMember = id => {
    history.push(`/admin/members/edit/${id}`)
  }

  useEffect(() => {
    const LOAD_DATA = async () => {
      await adminInstitutionService
        .SEARCH_INSTITUTION(stateInstitution.number, stateInstitution.size, {}, stateUser.token)
        .then(search => {
          dispatch({
            type: 'institution/SUBMIT',
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
  }, [])

  return (
    <div>
      <InstitutionComponent
        dataSources={stateInstitution.content}
        showSearch={showSearch}
        onClickSearch={onClickSearch}
        stateInstitution={stateInstitution}
        onChangePageSize={onChangePageSize}
        onChangePage={onChangePage}
        onEditMember={onEditMember}
        pageSize={pageSize}
        pageNumber={pageNumber}
      />
    </div>
  )
}

export default InstitutionContainer
