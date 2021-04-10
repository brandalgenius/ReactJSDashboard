import React, { useState, useEffect } from 'react'
import UserListComponent from './UserList.component'
import { useSelector, useDispatch } from 'react-redux'
import adminMemberService from 'services/admin/member/adminMemberService'
import { history } from 'index'

const UserListContainer = () => {
  const [showSearch, setShowSearch] = useState(false)
  const stateMembersSearch = useSelector(state => state.membersSearch)
  const stateUser = useSelector(state => state.user)
  const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const dispatch = useDispatch()

  const onClickSearch = () => {
    setShowSearch(!showSearch)
  }

  const onChangePageSize = async value => {
    dispatch({
      type: 'membersSearch/PAGE',
      payload: {
        size: parseInt(value),
      },
    })
    setPageSize(value)
    await adminMemberService
      .SEARCH_MEMBER_PAGE(stateMembersSearch.number, value, {}, stateUser.token)
      .then(search => {
        dispatch({
          type: 'membersSearch/SUBMIT',
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
      type: 'membersSearch/PAGE',
      payload: {
        number: parseInt(value),
      },
    })
    setPageNumber(value)
    await adminMemberService
      .SEARCH_MEMBER_PAGE(value, stateMembersSearch.size, {}, stateUser.token)
      .then(search => {
        dispatch({
          type: 'membersSearch/SUBMIT',
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
      await adminMemberService
        .SEARCH_MEMBER_PAGE(stateMembersSearch.number, stateMembersSearch.size, {}, stateUser.token)
        .then(search => {
          dispatch({
            type: 'membersSearch/SUBMIT',
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
      <UserListComponent
        dataSources={stateMembersSearch.content}
        showSearch={showSearch}
        onClickSearch={onClickSearch}
        stateMembersSearch={stateMembersSearch}
        onChangePageSize={onChangePageSize}
        onChangePage={onChangePage}
        onEditMember={onEditMember}
        pageSize={pageSize}
        pageNumber={pageNumber}
      />
    </div>
  )
}

export default UserListContainer
