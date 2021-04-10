import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import ListingComponent from './ListingRelated.component'
import { useParams } from 'react-router-dom'
import { notification, Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import adminListingService from 'services/admin/listing/adminListingService'
import adminGlobalService from 'services/admin/global/adminGlobalService'
import { history } from 'index'

const ListingContainer = () => {
  const { id } = useParams()
  const stateListing = useSelector(state => state.listing)
  const stateUser = useSelector(state => state.user)
  const [refetch, setRefetch] = useState(0)
  const dispatch = useDispatch()
  const [modalDocuments, setmodalDocuments] = useState(false)
  const [documentData, setdocumentData] = useState([])
  const [detail, setDetail] = useState({})

  const documentColumns = [
    {
      title: '発注機関',
      dataIndex: 'remarks',
      key: 'remarks',
      align: 'center',
    },
    {
      title: '業種',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      render: (url, records) => (
        <Icon type="download" onClick={() => getFile(url, records.remarks)} />
      ),
    },
  ]

  const getFile = async (url, name) => {
    await adminGlobalService
      .GET_FILE(stateUser.token, url)
      .then(res => {
        const getExtension = url
          .split('.')
          .slice(-1)
          .pop()
        const blob = new Blob([res], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, `${name}.${getExtension}`)
      })
      .catch(() => {
        notification.error({
          message: '検索に失敗しました',
        })
      })
  }

  const handleRelatedInfo = id => {
    history.push(`${id}`)
  }

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

  const handleModalDocuments = () => {
    setmodalDocuments(!modalDocuments)
  }

  const getDocuments = async id => {
    setmodalDocuments(!modalDocuments)
    await adminListingService
      .GET_DETAIL_LISTING_DOCUMENTS(id, stateUser.token)
      .then(res => setdocumentData(res))
      .catch(() => {
        notification.error({
          message: '検索に失敗しました',
        })
      })
  }

  const setBookmark = async (id, bookmarked) => {
    if (!bookmarked) {
      await adminListingService
        .SET_BOOKMARK_LISTING(id, stateUser.token)
        .then(() => {
          notification.success({
            message: '成功したブックマーク',
          })
          setRefetch(refetch + 1)
        })
        .catch(() => {
          notification.error({
            message: '検索に失敗しました',
          })
        })
    } else {
      await adminListingService
        .SET_UNBOOKMARK_LISTING(id, stateUser.token)
        .then(() => {
          notification.success({
            message: '成功したブックマーク解除',
          })
          setRefetch(refetch + 1)
        })
        .catch(() => {
          notification.error({
            message: '検索に失敗しました',
          })
        })
    }
  }

  useEffect(() => {
    dispatch({
      type: 'listing/SUBMIT',
      payload: {
        content: [],
      },
    })
    const LOAD_DATA = async () => {
      await adminListingService.GET_LISTING_BY_ID(id, stateUser.token).then(res => {
        setDetail(res)
      })
      await adminListingService
        .GET_RELATED_INFO_LISTING(stateListing.number, stateListing.size, stateUser.token, id)
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
    <ListingComponent
      dataSources={stateListing.content}
      dataDetail={detail}
      stateListing={stateListing}
      onChangePageSize={onChangePageSize}
      onChangePage={onChangePage}
      getDocuments={getDocuments}
      modalDocuments={modalDocuments}
      handleModalDocuments={handleModalDocuments}
      documentData={documentData}
      documentColumns={documentColumns}
      setBookmark={setBookmark}
      handleRelatedInfo={handleRelatedInfo}
    />
  )
}

export default ListingContainer
