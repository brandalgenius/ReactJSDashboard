import React, { useState, useEffect } from 'react'
import UserListSearchComponent from './UserListSearch.component'
import { Form, notification } from 'antd'
import publicService from 'services/public/publicService'
import adminMemberService from 'services/admin/member/adminMemberService'
import hardcode from 'config/hardcode'
import JapanPostalCode from 'japan-postal-code'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from 'lodash'

const UserListSearchContainer = props => {
  const { form } = props
  const [optionPlans, setOptionPlans] = useState([])
  const stateMembersSearch = useSelector(state => state.membersSearch)
  const [address, setAddress] = useState({})
  const stateUser = useSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(false)
  const [checklistModal, setChecklistModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [typeModal, setTypeModal] = useState('')
  const [dataRegion, setDataRegion] = useState([])
  const [dataRegionChecked, setDataRegionChecked] = useState([])
  const [regionCheckAll, setRegionCheckAll] = useState(true)
  const [doSearchArea, setDoSearchArea] = useState(false)
  const [regionIndeterminateCheckAll, setRegionIndeterminateCheckAll] = useState(false)
  const [clearStorage, setClearStorage] = useState(0)
  const [optionStatus, setOptionStatus] = useState([])
  const [showButtonSubmitModal, setShowButtonSubmitModal] = useState(true)

  const dispatch = useDispatch()
  const onSearchPostal = value => {
    if (value.length > 3) {
      JapanPostalCode.get(value, address => {
        setAddress({
          address,
        })
      })
    }
  }

  const getNameStatus = id => {
    let name = ''
    hardcode.STATUS.map(status => {
      if (status.id === id) {
        name = status.en_name
      }
      return ''
    })
    return name
  }

  const onSubmit = async event => {
    event.preventDefault()
    await form.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)
        const bookmark = form.getFieldValue('bookmark')
        const bookmarkEmpty = isEmpty(bookmark) || bookmark === undefined
        const emailDelivery = form.getFieldValue('emailDelivery')
        const emailDeliveryEmpty = isEmpty(emailDelivery) || emailDelivery === undefined
        const bodyPost = {
          planId: values.planId,
          status: getNameStatus(values.status),
          unpaid: values.unpaid,
          companyName: values.companyName,
          postalCode: values.postalCode,
          address: values.address,
          phoneNumber: values.phoneNumber,
          faxNumber: values.faxNumber,
          email: values.email,
          picName: values.picName,
          picNameKana: values.picNameKana,
          doSearchArea: doSearchArea,
          prefectures: values.prefectures,
          doSearchBookmark: bookmarkEmpty ? false : true,
          bookmark: values.bookmark,
          doSearchEmailDelivery: emailDeliveryEmpty ? false : true,
          emailDelivery: values.emailDelivery,
        }

        if (values.registrationDate !== undefined) {
          bodyPost.registrationDateFrom = moment(values.registrationDate[0]).format('YYYY/MM/DD')
          bodyPost.registrationDateTo = moment(values.registrationDate[1]).format('YYYY/MM/DD')
        }
        if (values.paidMemberDate !== undefined) {
          bodyPost.paidMemberDateFrom = moment(values.paidMemberDate[0]).format('YYYY/MM/DD')
          bodyPost.paidMemberDateTo = moment(values.paidMemberDate[1]).format('YYYY/MM/DD')
        }
        if (values.expiredDate !== undefined) {
          bodyPost.expiredDateFrom = moment(values.expiredDate[0]).format('YYYY/MM/DD')
          bodyPost.expiredDateTo = moment(values.expiredDate[1]).format('YYYY/MM/DD')
        }
        values.planId === undefined && delete bodyPost.planId
        values.status === undefined && delete bodyPost.status
        values.unpaid === undefined && delete bodyPost.unpaid
        values.companyName === undefined && delete bodyPost.companyName
        values.postalCode === undefined && delete bodyPost.postalCode
        values.address === '' && delete bodyPost.address
        values.phoneNumber === undefined && delete bodyPost.phoneNumber
        values.faxNumber === undefined && delete bodyPost.faxNumber
        values.email === undefined && delete bodyPost.email
        values.picName === undefined && delete bodyPost.picName
        values.picNameKana === undefined && delete bodyPost.picNameKana
        values.prefectures === undefined && delete values.prefectures
        isEmpty(values.prefectures) && delete values.prefectures

        await adminMemberService
          .SEARCH_MEMBER_PAGE(
            stateMembersSearch.number,
            stateMembersSearch.size,
            bodyPost,
            stateUser.token,
          )
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
  const onReset = () => {
    form.resetFields()
    setClearStorage(clearStorage + 1)
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
    if (type === 'region') {
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
    }
  }

  const onSubmitChecklist = () => {
    if (typeModal === 'region') {
      const wrapDataRegion = []
      const wrapIdPrefectures = []
      const checkFilterDataRegion = dataRegion.filter(val => val.checked)
      checkFilterDataRegion.forEach(val => {
        wrapDataRegion.push(val.name)
        val.prefectures.map(prefecture => {
          wrapIdPrefectures.push(prefecture.id)
          return ''
        })
      })
      form.setFieldsValue({ regions: wrapDataRegion.join() })
      form.setFieldsValue({ prefectures: wrapIdPrefectures })
      setDoSearchArea(true)
    }
    setChecklistModal(!checklistModal)
  }

  // End For Modal Checklist
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

  const handleChecklistModal = async type => {
    setChecklistModal(!checklistModal)
    if (type === 'region') {
      setShowButtonSubmitModal(true)
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
    } else if (type === 'bookmark') {
      setTitleModal('Bookmark setting')
      setTypeModal(type)
      setShowButtonSubmitModal(false)
    } else if (type === 'emailDelivery') {
      setTitleModal('Email Delivery setting')
      setTypeModal(type)
      setShowButtonSubmitModal(false)
    }
  }

  const onSubmitBookmarkSetting = async values => {
    let dataPrefectures = []

    if (!isEmpty(values.regions)) {
      values.regions.map(region => {
        region.prefectures.map(prefecture => {
          dataPrefectures.push(prefecture.id)
          return ''
        })
        return ''
      })
    }

    const bookmarkValues = {
      or: values.keyword.or,
      and: values.keyword.and,
      not: values.keyword.not,
      organizations: values.organizations,
      prefectures: dataPrefectures,
      biddingMethodId: values.biddingMethods,
      industryId: values.industries,
    }
    if (values.winnerPublicationDate !== undefined) {
      bookmarkValues.winnerPublicationDateFrom = moment(values.winnerPublicationDate[0]).format(
        'YYYY/MM/DD',
      )
      bookmarkValues.winnerPublicationDateTo = moment(values.winnerPublicationDate[1]).format(
        'YYYY/MM/DD',
      )
    }
    if (values.deadlineDate !== undefined) {
      bookmarkValues.deadlineDateFrom = moment(values.deadlineDate[0]).format('YYYY/MM/DD')
      bookmarkValues.deadlineDateTo = moment(values.deadlineDate[1]).format('YYYY/MM/DD')
    }
    if (values.publicationDate !== undefined) {
      bookmarkValues.publicationDateFrom = moment(values.publicationDate[0]).format('YYYY/MM/DD')
      bookmarkValues.publicationDateTo = moment(values.publicationDate[1]).format('YYYY/MM/DD')
    }
    values.organizations === undefined && delete bookmarkValues.organizations
    values.industries === undefined && delete bookmarkValues.industries
    values.regions === undefined && delete bookmarkValues.regions
    values.biddingMethods === undefined && delete bookmarkValues.biddingMethods
    values.winnerPublicationDate === undefined && delete bookmarkValues.winnerPublicationDate
    values.deadlineDate === undefined && delete bookmarkValues.deadlineDate
    values.publicationDate === undefined && delete bookmarkValues.publicationDate
    isEmpty(bookmarkValues.prefectures) && delete bookmarkValues.prefectures
    bookmarkValues.biddingMethodId === undefined && delete bookmarkValues.biddingMethodId
    bookmarkValues.industryId === undefined && delete bookmarkValues.industryId

    form.setFieldsValue({ bookmark: bookmarkValues })
    setChecklistModal(!checklistModal)
  }

  const onSubmitEmailSetting = async values => {
    let dataPrefectures = []

    if (!isEmpty(values.regions)) {
      values.regions.map(region => {
        region.prefectures.map(prefecture => {
          dataPrefectures.push(prefecture.id)
          return ''
        })
        return ''
      })
    }

    const emailDeliveryValues = {
      or: values.keyword.or,
      and: values.keyword.and,
      not: values.keyword.not,
      organizations: values.organizations,
      prefectures: dataPrefectures,
      biddingMethodId: values.biddingMethods,
      industryId: values.industries,
    }
    if (values.winnerPublicationDate !== undefined) {
      emailDeliveryValues.winnerPublicationDateFrom = moment(
        values.winnerPublicationDate[0],
      ).format('YYYY/MM/DD')
      emailDeliveryValues.winnerPublicationDateTo = moment(values.winnerPublicationDate[1]).format(
        'YYYY/MM/DD',
      )
    }
    if (values.deadlineDate !== undefined) {
      emailDeliveryValues.deadlineDateFrom = moment(values.deadlineDate[0]).format('YYYY/MM/DD')
      emailDeliveryValues.deadlineDateTo = moment(values.deadlineDate[1]).format('YYYY/MM/DD')
    }
    if (values.publicationDate !== undefined) {
      emailDeliveryValues.publicationDateFrom = moment(values.publicationDate[0]).format(
        'YYYY/MM/DD',
      )
      emailDeliveryValues.publicationDateTo = moment(values.publicationDate[1]).format('YYYY/MM/DD')
    }
    values.organizations === undefined && delete emailDeliveryValues.organizations
    values.industries === undefined && delete emailDeliveryValues.industries
    values.regions === undefined && delete emailDeliveryValues.regions
    values.biddingMethods === undefined && delete emailDeliveryValues.biddingMethods
    values.winnerPublicationDate === undefined && delete emailDeliveryValues.winnerPublicationDate
    values.deadlineDate === undefined && delete emailDeliveryValues.deadlineDate
    values.publicationDate === undefined && delete emailDeliveryValues.publicationDate
    isEmpty(emailDeliveryValues.prefectures) && delete emailDeliveryValues.prefectures
    emailDeliveryValues.biddingMethodId === undefined && delete emailDeliveryValues.biddingMethodId
    emailDeliveryValues.industryId === undefined && delete emailDeliveryValues.industryId

    form.setFieldsValue({ emailDelivery: emailDeliveryValues })
    setChecklistModal(!checklistModal)
  }

  // clear session storage after reload browser, used for modal cache url
  useEffect(() => {
    sessionStorage.clear()
  }, [clearStorage])

  useEffect(() => {
    publicService.GET_PLANS().then(plans => {
      let dataPlans = [
        {
          id: 0,
          name: '全て',
          otherName: '全て',
        },
      ]
      plans.map(plan => {
        dataPlans.push({
          id: plan.id,
          name: plan.name,
          otherName: plan.otherName,
        })
        return ''
      })
      setOptionPlans(dataPlans)
    })
    publicService.GET_STATUS(stateUser.token).then(status => {
      let dataStatus = [
        {
          id: 0,
          name: '全て',
          code: 'ALL',
        },
      ]
      status.map(item => {
        dataStatus.push({
          id: item.id,
          name: item.name,
          code: item.code,
        })
        return ''
      })
      setOptionStatus(dataStatus)
    })
  }, [])

  const optionUnpaid = [
    {
      id: 0,
      name: '入金未済',
      value: true,
    },
  ]

  const formFields = [
    {
      label: '登録年月日',
      required: false,
      field_name: 'registrationDate',
      type: 'dateRange',
      size: 24,
    },
    {
      label: '有料会員 登録年月日',
      required: false,
      field_name: 'paidMemberDate',
      type: 'dateRange',
      size: 24,
    },
    {
      label: '有料会員期限切れ年月日',
      required: false,
      field_name: 'expiredDate',
      type: 'dateRange',
      size: 24,
    },
    {
      label: '契約期間',
      required: false,
      field_name: 'planId',
      type: 'radio',
      size: 24,
      optional: optionPlans,
      isAdmin: true,
    },
    {
      label: 'ステータス',
      required: false,
      field_name: 'status',
      type: 'radio',
      size: 24,
      optional: optionStatus,
    },
    {
      label: '料金支払い',
      required: false,
      field_name: 'unpaid',
      type: 'checkbox',
      size: 24,
      optional: optionUnpaid,
    },
    {
      label: '会社名',
      required: false,
      field_name: 'companyName',
      type: 'text',
      size: 24,
      placeholder: '例　株式会社Tender',
    },
    {
      label: 'ご住所',
      required: false,
      field_name: 'address',
      type: 'address',
      size: 24,
      initialValue: address,
      placeholder: '',
      onSearchPostal: onSearchPostal,
    },
    {
      label: '電話番号',
      required: false,
      field_name: 'phoneNumber',
      type: 'text',
      size: 24,
      placeholder: '例　0312345678',
    },
    {
      label: 'FAX番号',
      required: false,
      field_name: 'faxNumber',
      type: 'text',
      size: 24,
      placeholder: '例　0312345678',
    },
    {
      label: 'ご契約担当者名',
      required: false,
      field_name: 'picName',
      type: 'text',
      size: 24,
      placeholder: '例　山田太郎',
    },
    {
      label: 'ご契約担当者名(カナ)',
      required: false,
      field_name: 'picNameKana',
      type: 'text',
      size: 24,
      placeholder: '例　ヤマダタロウ',
    },
    {
      label: 'メールアドレス',
      required: false,
      field_name: 'email',
      type: 'email',
      size: 24,
      placeholder: '例　taro@tender.com',
    },
  ]
  return (
    <div>
      <UserListSearchComponent
        formFields={formFields}
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        onReset={onReset}
        typeModal={typeModal}
        handleCheckAll={handleCheckAll}
        dataRegion={dataRegion}
        regionCheckAll={regionCheckAll}
        handleChangeRegion={handleChangeRegion}
        titleModal={titleModal}
        checklistModal={checklistModal}
        handleChecklistModal={handleChecklistModal}
        onSubmitChecklist={onSubmitChecklist}
        regionIndeterminateCheckAll={regionIndeterminateCheckAll}
        onSubmitBookmarkSetting={onSubmitBookmarkSetting}
        showButtonSubmitModal={showButtonSubmitModal}
        onSubmitEmailSetting={onSubmitEmailSetting}
      />
    </div>
  )
}

const WrapperUserListSearchContainer = Form.create({
  name: 'UserListSearchContainer',
})(UserListSearchContainer)

export default WrapperUserListSearchContainer
