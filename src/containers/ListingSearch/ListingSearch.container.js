import React, { useState, useEffect, Fragment } from 'react'
import ListingSearchComponent from './ListingSearch.component'
import ListingModalComponent from './ListingModal.component'
import { Form, notification, Tooltip, Icon, Button } from 'antd'
import adminListingService from 'services/admin/listing/adminListingService'
import { WrapperListingSearch } from './ListingSearch.style'
import adminGlobalService from 'services/admin/global/adminGlobalService'
import publicService from 'services/public/publicService'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

const ListingSearchContainer = props => {
  const { form, external = false, setStateExternal = null } = props
  const dispatch = useDispatch()
  const stateListing = useSelector(state => state.listing)
  const stateUser = useSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(false)
  const [checklistModal, setChecklistModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [typeModal, setTypeModal] = useState('')
  const [clearStorage, setClearStorage] = useState(0)
  // checklist bidding
  const [biddingData, setBiddingData] = useState([])
  const [originalDataBidding, setOriginalDataBidding] = useState([])
  const [biddingCheckedList, setBiddingCheckedList] = useState([])
  const [biddingCheckedListNumber, setBiddingCheckedListNumber] = useState([])
  const [biddingCheckedAll, setBiddingCheckedAll] = useState(true)
  const [checkedIndeterminateBidding, setCheckedIndeterminateBidding] = useState(false)
  // checklist industry
  const [industryData, setIndustryData] = useState([])
  const [originalDataIndustry, setOriginalDataIndustry] = useState([])
  const [industryCheckedList, setIndustryCheckedList] = useState([])
  const [industryCheckedListNumber, setIndustryCheckedListNumber] = useState([])
  const [industryCheckedAll, setIndustryCheckedAll] = useState(true)
  const [checkedIndeterminateIndustry, setCheckedIndeterminateIndustry] = useState(false)
  // checklist region
  const [dataRegion, setDataRegion] = useState([])
  const [dataRegionChecked, setDataRegionChecked] = useState([])
  const [regionCheckAll, setRegionCheckAll] = useState(true)
  const [regionIndeterminateCheckAll, setRegionIndeterminateCheckAll] = useState(false)
  // organization
  const [organizationsData, setOrganizationsData] = useState([])
  const [organizationsDataChecked, setOrganizationsDataChecked] = useState([])
  const [organizationLocation, setOrganizationLocation] = useState(0)
  const [organizationSecondDataDisplay, setOrganizationSecondDataDisplay] = useState({})
  const [keywordField, setkeywordField] = useState({
    or: [''],
    and: [''],
    not: [''],
  })

  const formFieldsDynamic = {
    label: (
      <Fragment>
        キーワード{' '}
        <Tooltip title="prompt text">
          <Icon type="question-circle" theme="filled" style={{ marginTop: 10 }} />
        </Tooltip>
      </Fragment>
    ),
    size: 16,
  }

  const formFieldsText = [
    {
      label: (
        <Fragment>
          発注機関{' '}
          <Tooltip title="prompt text">
            <Icon type="question-circle" theme="filled" style={{ marginTop: 10 }} />
          </Tooltip>
        </Fragment>
      ),

      prefix: (
        <Button onClick={() => handleChecklistModal('organizations')} style={{ left: -12 }}>
          選択
        </Button>
      ),
      required: false,
      disabled: true,
      field_name: 'organizations',
      type: 'text-prefix',
      size: 24,
    },
    {
      label: (
        <Fragment>
          業種{' '}
          <Tooltip title="prompt text">
            <Icon type="question-circle" theme="filled" style={{ marginTop: 10 }} />
          </Tooltip>
        </Fragment>
      ),
      prefix: (
        <Button onClick={() => handleChecklistModal('industry')} style={{ left: -12 }}>
          選択
        </Button>
      ),
      required: false,
      disabled: true,
      field_name: 'industries',
      type: 'text-prefix',
      size: 24,
    },
    {
      label: (
        <Fragment>
          発注地域{' '}
          <Tooltip title="prompt text">
            <Icon type="question-circle" theme="filled" style={{ marginTop: 10 }} />
          </Tooltip>
        </Fragment>
      ),
      prefix: (
        <Button onClick={() => handleChecklistModal('region')} style={{ left: -12 }}>
          選択
        </Button>
      ),
      required: false,
      disabled: true,
      field_name: 'regions',
      type: 'text-prefix',
      size: 24,
    },
    {
      label: (
        <Fragment>
          入札方式{' '}
          <Tooltip title="prompt text">
            <Icon type="question-circle" theme="filled" style={{ marginTop: 10 }} />
          </Tooltip>
        </Fragment>
      ),
      prefix: (
        <Button onClick={() => handleChecklistModal('bidding')} style={{ left: -12 }}>
          選択
        </Button>
      ),
      required: false,
      disabled: true,
      field_name: 'biddingMethods',
      type: 'text-prefix',
      size: 24,
    },
  ]

  const formFieldsDate = [
    {
      label: '公告日',
      required: false,
      field_name: 'winnerPublicationDate',
      type: 'dateRange',
      size: 24,
    },
    {
      label: '応募書類締切日',
      required: false,
      field_name: 'deadlineDate',
      type: 'dateRange',
      size: 24,
    },
    {
      label: '開札日',
      required: false,
      field_name: 'publicationDate',
      type: 'dateRange',
      size: 24,
    },
  ]

  // clear session storage after reload browser, used for modal cache url
  useEffect(() => {
    sessionStorage.clear()
  }, [clearStorage])

  // set default second ogranization data when opened
  useEffect(() => {
    setOrganizationSecondDataDisplay(organizationsData[organizationLocation])
  }, [organizationsData])

  // utils func for Modal

  const filterDataRegion = data => {
    const filterDataRegion = data.filter(val => val.checked)
    const newDataRegion = []
    filterDataRegion.forEach(val => {
      if (val.checked) {
        const newPrefectures = []
        const objRegion = {
          id: val.id,
          prefectures: newPrefectures,
        }
        val.prefectures.forEach(valPref => {
          if (valPref.checked) {
            newPrefectures.push({ id: valPref.id })
          }
        })
        newDataRegion.push(objRegion)
      }
    })
    return newDataRegion
  }

  const filterOrganizationsData = data => {
    const cloneData = [...data]
    const newOrganizationData = []
    cloneData.forEach(val => {
      const isTrueSecondLevel = val.secondLevel.filter(val => val.checked === true)
      if (isTrueSecondLevel.length > 0) {
        val.checked = true
      }
    })
    const filterOrganizationData = cloneData.filter(val => val.checked)
    filterOrganizationData.forEach(val => {
      if (val.checked) {
        const newSecond = []
        const objRegion = {
          id: val.id,
          secondLevel: newSecond,
        }
        val.secondLevel.forEach(valSecond => {
          if (valSecond.checked) {
            const newThird = []
            newSecond.push({ id: valSecond.id, thirdLevel: newThird })
            if (valSecond.thirdLevel.length > 0) {
              valSecond.thirdLevel.forEach(valThird => {
                if (valThird.checked) {
                  newThird.push({ id: valThird.id })
                }
              })
            }
          }
        })
        newOrganizationData.push(objRegion)
      }
    })
    return newOrganizationData
  }

  const setCheckedOrganization = (data, checked) => {
    const wrapOrg = [...data]
    if (checked) {
      wrapOrg.forEach(val => {
        val.checked = true
        val.indeterminate = false
        val.secondLevel.forEach(valSecond => {
          valSecond.checked = true
          valSecond.indeterminate = false
          valSecond.thirdLevel.forEach(valThird => {
            valThird.checked = true
          })
        })
      })
    } else {
      wrapOrg.forEach(val => {
        val.checked = false
        val.indeterminate = false
        val.secondLevel.forEach(valSecond => {
          valSecond.checked = false
          valSecond.indeterminate = false
          valSecond.thirdLevel.forEach(valThird => {
            valThird.checked = false
          })
        })
      })
    }
    return wrapOrg
  }

  // Start For Modal Checklist

  const handleChecklistModal = async type => {
    setChecklistModal(!checklistModal)
    setIsLoading(true)
    if (type === 'organizations') {
      setTitleModal('発注機関')
      setTypeModal(type)
      await adminGlobalService
        .GET_ORGANIZATION_LIST(stateUser.token, true)
        .then(res => {
          if (res.length > 0) {
            setOrganizationsData(setCheckedOrganization(res, true))
          }
        })
        .catch(() => {
          notification.error({
            message: '検索に失敗しました',
          })
        })
        .finally(() => setIsLoading(false))
    } else if (type === 'industry') {
      setTitleModal('業種')
      setTypeModal(type)
      setIndustryCheckedAll(true)
      await adminGlobalService
        .GET_INDUSTRY_LIST(stateUser.token, true)
        .then(res => {
          if (res.length > 0) {
            const industryData = []
            res.map(val => industryData.push(val.name))
            setIndustryData(industryData)
            setIndustryCheckedList(industryData)
            setOriginalDataIndustry(res)
          }
        })
        .catch(() => {
          notification.error({
            message: '検索に失敗しました',
          })
        })
        .finally(() => setIsLoading(false))
    } else if (type === 'region') {
      setTitleModal('発注地域')
      setTypeModal(type)
      return await publicService
        .GET_AREAS(true)
        .then(res => {
          if (res.length > 0) {
            const addCheckedDataRegion = res
            addCheckedDataRegion.forEach(val => {
              val.checked = true
              val.indeterminate = false
              val.prefectures.forEach(val => {
                val.checked = true
              })
            })
            setDataRegion(res)
            setDataRegionChecked(filterDataRegion(addCheckedDataRegion))
          }
        })
        .catch(() => {
          notification.error({
            message: '検索に失敗しました',
          })
        })
        .finally(() => setIsLoading(false))
    } else if (type === 'bidding') {
      setTitleModal('入札方式')
      setTypeModal(type)
      setBiddingCheckedAll(true)
      await adminGlobalService
        .GET_BIDDING_METHOD_LIST(stateUser.token, true)
        .then(res => {
          if (res.length > 0) {
            const biddingData = []
            res.map(val => biddingData.push(val.name))
            setBiddingData(biddingData)
            setBiddingCheckedList(biddingData)
            setOriginalDataBidding(res)
          }
        })
        .catch(() => {
          notification.error({
            message: '検索に失敗しました',
          })
        })
        .finally(() => setIsLoading(false))
    }
  }

  const changeCheckedAll = checked => {
    if (checked) {
      setOrganizationsData(setCheckedOrganization(organizationsData, true))
    } else {
      setOrganizationsData(setCheckedOrganization(organizationsData, false))
    }
  }

  const organizationShowDetail = (val, key) => {
    const newOrganizationSecondDataDisplay = Object.assign({}, organizationSecondDataDisplay)
    const indexSecond = newOrganizationSecondDataDisplay.secondLevel.findIndex(
      item => item.name === val.name,
    )
    if (val.detail) {
      newOrganizationSecondDataDisplay.secondLevel[indexSecond].detail = false
    } else {
      newOrganizationSecondDataDisplay.secondLevel[indexSecond].detail = true
    }
    setOrganizationSecondDataDisplay(newOrganizationSecondDataDisplay)
  }

  // for Modal Organizations
  const handleChangeOrganizations = (e, type, val, key, keySecond) => {
    const checked = e.target.checked
    const cloneOrganizationsData = [...organizationsData]
    const secondData = cloneOrganizationsData[organizationLocation]
    if (type === 'first') {
      setOrganizationSecondDataDisplay(organizationsData[key])
      setOrganizationLocation(key)
    } else if (type === 'second') {
      const organizationSecond = secondData.secondLevel[key]
      const organizationTrueSecondLength = secondData.secondLevel.filter(val => val.checked).length
      const organizationSecondLength = secondData.secondLevel.length - 1
      if (checked) {
        if (organizationTrueSecondLength === organizationSecondLength) {
          secondData.indeterminate = false
          secondData.checked = true
        } else {
          secondData.indeterminate = true
          secondData.checked = false
        }
        organizationSecond.checked = true
        organizationSecond.indeterminate = false
        organizationSecond.thirdLevel.forEach(val => {
          val.checked = true
        })
      } else {
        secondData.checked = false
        secondData.indeterminate = true
        organizationSecond.checked = false
        organizationSecond.thirdLevel.forEach(val => {
          val.checked = false
        })
      }
      setOrganizationsData(cloneOrganizationsData)
    } else if (type === 'third') {
      const organizationSecond = secondData.secondLevel[keySecond]
      const organizationThird = secondData.secondLevel[keySecond].thirdLevel[key]
      const organizationTrueThirdLength = secondData.secondLevel[keySecond].thirdLevel.filter(
        val => val.checked,
      ).length
      const organizationThirdLength = secondData.secondLevel[keySecond].thirdLevel.length - 1
      if (checked) {
        if (organizationTrueThirdLength === organizationThirdLength) {
          secondData.indeterminate = false
          secondData.checked = true
          organizationSecond.indeterminate = false
          organizationSecond.checked = true
        } else {
          secondData.indeterminate = true
          secondData.checked = false
          organizationSecond.indeterminate = true
          organizationSecond.checked = false
        }
        organizationThird.checked = true
      } else {
        secondData.checked = false
        secondData.indeterminate = true
        organizationSecond.checked = false
        organizationSecond.indeterminate = true
        organizationThird.checked = false
      }
      setOrganizationsData(cloneOrganizationsData)
    }
  }

  // for Modal Industry & Bidding
  const handleCheckGroup = (checkedList, type) => {
    if (type === 'industry') {
      setIndustryCheckedList(checkedList)
      setCheckedIndeterminateIndustry(
        !!checkedList.length && checkedList.length < industryData.length,
      )
      setIndustryCheckedAll(checkedList.length === industryData.length)
    } else if (type === 'bidding') {
      setBiddingCheckedList(checkedList)
      setCheckedIndeterminateBidding(
        !!checkedList.length && checkedList.length < biddingData.length,
      )
      setBiddingCheckedAll(checkedList.length === biddingData.length)
    }
  }
  // for Modal Region
  const handleChangeRegion = (e, type, keyReg, keyPref) => {
    const cloneDataRegion = [...dataRegion]
    const isPrefecturesTrue = cloneDataRegion[keyReg].prefectures.filter(val => val.checked)
    const prefecturesLength = cloneDataRegion[keyReg].prefectures.length - 1
    if (type === 'children') {
      if (e.target.checked) {
        if (isPrefecturesTrue.length === prefecturesLength) {
          cloneDataRegion[keyReg].indeterminate = false
          setRegionIndeterminateCheckAll(false)
          setRegionCheckAll(true)
        } else {
          cloneDataRegion[keyReg].indeterminate = true
          setRegionCheckAll(false)
        }
        cloneDataRegion[keyReg].checked = true
        cloneDataRegion[keyReg].prefectures[keyPref].checked = true
        setDataRegionChecked(filterDataRegion(cloneDataRegion))
      } else {
        cloneDataRegion[keyReg].indeterminate = true
        cloneDataRegion[keyReg].checked = false
        setRegionIndeterminateCheckAll(true)
        cloneDataRegion[keyReg].prefectures[keyPref].checked = false
        if (isPrefecturesTrue.length === 1) {
          cloneDataRegion[keyReg].indeterminate = false
          cloneDataRegion[keyReg].checked = false
        }
        setDataRegionChecked(filterDataRegion(cloneDataRegion))
      }
    } else if (type === 'parent') {
      if (e.target.checked) {
        const isRegionTrue = cloneDataRegion.filter(val => val.checked)
        const regionLength = cloneDataRegion.length - 1
        if (isRegionTrue.length === regionLength) {
          setRegionIndeterminateCheckAll(false)
        } else {
          setRegionIndeterminateCheckAll(true)
        }
        cloneDataRegion[keyReg].indeterminate = false
        cloneDataRegion[keyReg].checked = true
        cloneDataRegion[keyReg].prefectures.forEach(val => {
          val.checked = true
        })
        setRegionCheckAll(true)
        setDataRegionChecked(filterDataRegion(cloneDataRegion))
      } else {
        const isRegionTrue = cloneDataRegion.filter(val => val.checked)
        cloneDataRegion[keyReg].indeterminate = false
        setRegionCheckAll(false)
        setRegionIndeterminateCheckAll(true)
        if (isRegionTrue.length === 1) {
          setRegionCheckAll(false)
          setRegionIndeterminateCheckAll(false)
        }
        cloneDataRegion[keyReg].checked = false
        cloneDataRegion[keyReg].prefectures.forEach(val => {
          val.checked = false
        })
        setDataRegionChecked(filterDataRegion(cloneDataRegion))
      }
    }
  }

  const handleCheckAll = (e, type) => {
    if (type === 'organizations') {
      const cloneOrganizationsData = [...organizationsData]
      const secondData = cloneOrganizationsData[organizationLocation]
      if (e.target.checked) {
        secondData.checked = true
        secondData.indeterminate = false
        secondData.secondLevel.forEach(valSecond => {
          valSecond.checked = true
          valSecond.indeterminate = false
          valSecond.thirdLevel.forEach(valThird => {
            valThird.checked = true
          })
        })
      } else {
        secondData.checked = false
        secondData.indeterminate = false
        secondData.secondLevel.forEach(valSecond => {
          valSecond.checked = false
          valSecond.indeterminate = false
          valSecond.thirdLevel.forEach(valThird => {
            valThird.checked = false
          })
        })
      }
      setOrganizationsData(cloneOrganizationsData)
    } else if (type === 'industry') {
      setIndustryCheckedList(e.target.checked ? industryData : [])
      setIndustryCheckedAll(e.target.checked)
      setCheckedIndeterminateIndustry(false)
    } else if (type === 'region') {
      const cloneDataRegion = [...dataRegion]
      if (e.target.checked) {
        setRegionCheckAll(true)
        setRegionIndeterminateCheckAll(false)
        cloneDataRegion.forEach(val => {
          val.checked = true
          val.indeterminate = false
          val.prefectures.forEach(val => {
            val.checked = true
          })
        })
      } else {
        setRegionCheckAll(false)
        setRegionIndeterminateCheckAll(false)
        cloneDataRegion.forEach(val => {
          val.checked = false
          val.indeterminate = false
          val.prefectures.forEach(val => {
            val.checked = false
          })
        })
      }
      setDataRegion(cloneDataRegion)
      setDataRegionChecked(filterDataRegion(cloneDataRegion))
    } else if (type === 'bidding') {
      setBiddingCheckedList(e.target.checked ? biddingData : [])
      setBiddingCheckedAll(e.target.checked)
      setCheckedIndeterminateBidding(false)
    }
  }

  const onSubmitChecklist = () => {
    if (typeModal === 'organizations') {
      const wrapOrganizationData = []
      const checkFilterOrganizationData = organizationsData.filter(val => val.checked)
      checkFilterOrganizationData.forEach(val => {
        val.secondLevel.forEach(val => {
          wrapOrganizationData.push(val.name)
          val.thirdLevel.forEach(val => {
            wrapOrganizationData.push(val.name)
          })
        })
      })
      setOrganizationsDataChecked(filterOrganizationsData(organizationsData))
      form.setFieldsValue({ organizations: wrapOrganizationData.join() })
    } else if (typeModal === 'industry') {
      const industryId = []
      industryCheckedList.forEach(val => {
        const filterId = originalDataIndustry.filter(obj => {
          return obj.name === val && obj.id
        })
        industryId.push(filterId[0].id)
      })
      setIndustryCheckedListNumber(industryId)
      form.setFieldsValue({ industries: industryCheckedList.join() })
    } else if (typeModal === 'region') {
      const wrapDataRegion = []
      const checkFilterDataRegion = dataRegion.filter(val => val.checked)
      checkFilterDataRegion.forEach(val => {
        val.prefectures.forEach(val => {
          wrapDataRegion.push(val.name)
        })
      })
      form.setFieldsValue({ regions: wrapDataRegion.join() })
    } else if (typeModal === 'bidding') {
      const biddingId = []
      biddingCheckedList.forEach(val => {
        const filterId = originalDataBidding.filter(obj => {
          return obj.name === val && obj.id
        })
        biddingId.push(filterId[0].id)
      })
      setBiddingCheckedListNumber(biddingId)
      form.setFieldsValue({ biddingMethods: biddingCheckedList.join() })
    }
    setChecklistModal(!checklistModal)
  }

  // End For Modal Checklist

  const changeKeywordField = (type, value, key) => {
    const cloneKeywordField = Object.assign({}, keywordField)
    cloneKeywordField[type][key] = value
    setkeywordField(cloneKeywordField)
  }

  const addKeywordField = type => {
    const cloneKeywordField = Object.assign({}, keywordField)
    cloneKeywordField[type].push('')
    setkeywordField(cloneKeywordField)
  }

  const removeKeywordField = (type, key) => {
    const cloneKeywordField = Object.assign({}, keywordField)
    cloneKeywordField[type].splice(key, 1)
    setkeywordField(cloneKeywordField)
  }

  const requestKeyword = async defaultKeywordField => {
    setIsLoading(true)
    await adminListingService
      .SEARCH_LISTING_BY_KEYWORD(
        stateListing.number,
        stateListing.size,
        defaultKeywordField || keywordField,
        stateUser.token,
      )
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
      .catch(() => {
        notification.error({
          message: '検索に失敗しました',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const onResetKeyword = () => {
    const defaultKeywordField = {
      or: [''],
      and: [''],
      not: [''],
    }
    setkeywordField(defaultKeywordField)
    requestKeyword(defaultKeywordField)
  }

  const onSubmitKeyword = () => {
    requestKeyword()
  }

  const onReset = async () => {
    form.resetFields()
    setClearStorage(clearStorage + 1)
    setIndustryCheckedListNumber([])
    setDataRegionChecked([])
    setBiddingCheckedListNumber([])
    await adminListingService
      .SEARCH_LISTING(1, stateListing.size, {}, stateUser.token)
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
      .catch(() => {
        notification.error({
          message: '検索に失敗しました',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const onSubmit = async event => {
    event.preventDefault()
    await form.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)
        const bodyPost = {
          organizations: organizationsDataChecked,
          industries: industryCheckedListNumber,
          regions: dataRegionChecked,
          biddingMethods: biddingCheckedListNumber,
          winnerPublicationDate: values.winnerPublicationDate,
          deadlineDate: values.deadlineDate,
          publicationDate: values.publicationDate,
        }
        if (values.winnerPublicationDate !== undefined) {
          bodyPost.winnerPublicationDateFrom = moment(values.winnerPublicationDate[0]).format(
            'YYYY/MM/DD',
          )
          bodyPost.winnerPublicationDateTo = moment(values.winnerPublicationDate[1]).format(
            'YYYY/MM/DD',
          )
        }
        if (values.deadlineDate !== undefined) {
          bodyPost.deadlineDateFrom = moment(values.deadlineDate[0]).format('YYYY/MM/DD')
          bodyPost.deadlineDateTo = moment(values.deadlineDate[1]).format('YYYY/MM/DD')
        }
        if (values.publicationDate !== undefined) {
          bodyPost.publicationDateFrom = moment(values.publicationDate[0]).format('YYYY/MM/DD')
          bodyPost.publicationDateTo = moment(values.publicationDate[1]).format('YYYY/MM/DD')
        }
        values.organizations === undefined && delete bodyPost.organizations
        values.industries === undefined && delete bodyPost.industries
        values.regions === undefined && delete bodyPost.regions
        values.biddingMethods === undefined && delete bodyPost.biddingMethods
        values.winnerPublicationDate === undefined && delete bodyPost.winnerPublicationDate
        values.deadlineDate === undefined && delete bodyPost.deadlineDate
        values.publicationDate === undefined && delete bodyPost.publicationDate

        await adminListingService
          .SEARCH_LISTING(1, stateListing.size, bodyPost, stateUser.token)
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
          .catch(() => {
            notification.error({
              message: '検索に失敗しました',
            })
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    })
  }

  const onSubmitExternal = async event => {
    event.preventDefault()
    await form.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)
        const bodyPost = {
          keyword: keywordField,
          organizations: organizationsDataChecked,
          industries: industryCheckedListNumber,
          regions: dataRegionChecked,
          biddingMethods: biddingCheckedListNumber,
          winnerPublicationDate: values.winnerPublicationDate,
          deadlineDate: values.deadlineDate,
          publicationDate: values.publicationDate,
        }
        if (values.winnerPublicationDate !== undefined) {
          bodyPost.winnerPublicationDateFrom = moment(values.winnerPublicationDate[0]).format(
            'YYYY/MM/DD',
          )
          bodyPost.winnerPublicationDateTo = moment(values.winnerPublicationDate[1]).format(
            'YYYY/MM/DD',
          )
        }
        if (values.deadlineDate !== undefined) {
          bodyPost.deadlineDateFrom = moment(values.deadlineDate[0]).format('YYYY/MM/DD')
          bodyPost.deadlineDateTo = moment(values.deadlineDate[1]).format('YYYY/MM/DD')
        }
        if (values.publicationDate !== undefined) {
          bodyPost.publicationDateFrom = moment(values.publicationDate[0]).format('YYYY/MM/DD')
          bodyPost.publicationDateTo = moment(values.publicationDate[1]).format('YYYY/MM/DD')
        }
        values.organizations === undefined && delete bodyPost.organizations
        values.industries === undefined && delete bodyPost.industries
        values.regions === undefined && delete bodyPost.regions
        values.biddingMethods === undefined && delete bodyPost.biddingMethods
        values.winnerPublicationDate === undefined && delete bodyPost.winnerPublicationDate
        values.deadlineDate === undefined && delete bodyPost.deadlineDate
        values.publicationDate === undefined && delete bodyPost.publicationDate

        setStateExternal(bodyPost)
      }
    })
  }

  return (
    <WrapperListingSearch>
      <ListingSearchComponent
        formFieldsDynamic={formFieldsDynamic}
        formFieldsText={formFieldsText}
        formFieldsDate={formFieldsDate}
        keywordField={keywordField}
        addKeywordField={addKeywordField}
        removeKeywordField={removeKeywordField}
        changeKeywordField={changeKeywordField}
        onSubmitKeyword={onSubmitKeyword}
        onResetKeyword={onResetKeyword}
        form={form}
        onSubmit={onSubmit}
        onReset={onReset}
        external={external}
        onSubmitExternal={onSubmitExternal}
      />
      <ListingModalComponent
        isLoading={isLoading}
        checklistModal={checklistModal}
        handleChecklistModal={handleChecklistModal}
        onSubmitChecklist={onSubmitChecklist}
        titleModal={titleModal}
        typeModal={typeModal}
        biddingData={biddingData}
        biddingCheckedList={biddingCheckedList}
        industryData={industryData}
        industryCheckedList={industryCheckedList}
        handleCheckGroup={handleCheckGroup}
        checkedIndeterminateBidding={checkedIndeterminateBidding}
        checkedIndeterminateIndustry={checkedIndeterminateIndustry}
        industryCheckedAll={industryCheckedAll}
        biddingCheckedAll={biddingCheckedAll}
        organizationsData={organizationsData}
        organizationSecondDataDisplay={organizationSecondDataDisplay}
        organizationLocation={organizationLocation}
        changeCheckedAll={changeCheckedAll}
        handleChangeOrganizations={handleChangeOrganizations}
        organizationShowDetail={organizationShowDetail}
        handleCheckAll={handleCheckAll}
        handleChangeRegion={handleChangeRegion}
        regionCheckAll={regionCheckAll}
        regionIndeterminateCheckAll={regionIndeterminateCheckAll}
        dataRegion={dataRegion}
      />
    </WrapperListingSearch>
  )
}

const WrapperListingSearchContainer = Form.create({
  name: 'ListingSearchContainer',
})(ListingSearchContainer)

export default WrapperListingSearchContainer
