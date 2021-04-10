import React, { useEffect, useState } from 'react'
import AdminRegisterUserComponent from './AdminRegisterUser.component'
import { Form, notification } from 'antd'
import moment from 'moment'
import publicService from 'services/public/publicService'
import JapanPostalCode from 'japan-postal-code'
import adminMemberService from 'services/admin/member/adminMemberService'
import { useSelector } from 'react-redux'
import { history } from 'index'
import PropTypes from 'prop-types'

const AdminRegisterUserContainer = props => {
  const { form, isEdit = false } = props
  const [address, setAddress] = useState({})
  const [optionPlans, setOptionPlans] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const stateUser = useSelector(state => state.user)
  const [checklistModal, setChecklistModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [typeModal, setTypeModal] = useState('')
  const [dataRegion, setDataRegion] = useState([])
  const [dataRegionChecked, setDataRegionChecked] = useState([])
  const [regionCheckAll, setRegionCheckAll] = useState(true)
  const [dataMember, setDataMember] = useState({})
  const [visibleModalDynamic, setVisibleModalDynamic] = useState(false)
  const [optionStatus, setOptionStatus] = useState([])
  const [showButtonSubmitModal, setShowButtonSubmitModal] = useState(true)
  console.log(dataRegionChecked)
  const onSearchPostal = value => {
    if (value.length > 3) {
      JapanPostalCode.get(value, address => {
        setAddress({
          address,
        })
      })
    }
  }

  const handleChangeRegion = (e, type, keyReg, keyPref) => {
    const cloneDataRegion = [...dataRegion]
    if (type === 'children') {
      if (e.target.checked) {
        cloneDataRegion[keyReg].checked = true
        cloneDataRegion[keyReg].prefectures[keyPref].checked = true
        setDataRegionChecked(filterDataRegion(cloneDataRegion))
        setRegionCheckAll(true)
      } else {
        const isPrefecturesTrue = cloneDataRegion[keyReg].prefectures.filter(val => val.checked)
        if (isPrefecturesTrue.length === 1) {
          cloneDataRegion[keyReg].checked = false
        }
        cloneDataRegion[keyReg].prefectures[keyPref].checked = false
        setDataRegionChecked(filterDataRegion(cloneDataRegion))
      }
    } else if (type === 'parent') {
      if (e.target.checked) {
        cloneDataRegion[keyReg].checked = true
        cloneDataRegion[keyReg].prefectures.forEach(val => {
          val.checked = true
        })
        setRegionCheckAll(true)
        setDataRegionChecked(filterDataRegion(cloneDataRegion))
      } else {
        const isRegionTrue = cloneDataRegion.filter(val => val.checked)
        if (isRegionTrue.length === 1) {
          setRegionCheckAll(false)
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
        cloneDataRegion.forEach(val => {
          val.checked = true
          val.prefectures.forEach(val => {
            val.checked = true
          })
        })
      } else {
        setRegionCheckAll(false)
        cloneDataRegion.forEach(val => {
          val.checked = false
          val.prefectures.forEach(val => {
            val.checked = false
          })
        })
      }
      setDataRegion(cloneDataRegion)
      setDataRegionChecked(filterDataRegion(cloneDataRegion))
    }
  }

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
      setTitleModal('発注地域')
      setTypeModal(type)
      return await publicService
        .GET_AREAS()
        .then(res => {
          if (res.length > 0) {
            const addCheckedDataRegion = res
            addCheckedDataRegion.forEach(val => {
              val.checked = false
              val.prefectures.forEach(val => {
                val.checked = false
              })
            })
            setDataRegion(res)
            let existPrefecture = []
            if (isEdit) {
              dataMember.prefectures.map(memberPrefecture => {
                res.map(resPrefectures => {
                  resPrefectures.prefectures.map(prefecture => {
                    if (prefecture.id === memberPrefecture.id) {
                      existPrefecture = resPrefectures
                      existPrefecture.checked = true
                      existPrefecture.prefectures.forEach(val => {
                        val.checked = true
                      })
                      setDataRegionChecked(existPrefecture)
                    }
                    return ''
                  })
                  return ''
                })
                return ''
              })
            } else {
              setDataRegionChecked(filterDataRegion(addCheckedDataRegion))
            }
          }
        })
        .catch(() => {
          notification.error({
            message: '検索に失敗しました',
          })
        })
    } else if (type === 'deposit') {
      setTitleModal('Deposit Management')
      setTypeModal(type)
      setShowButtonSubmitModal(false)
    }
  }

  const handleModalDynamic = async (type, key) => {
    setVisibleModalDynamic(!visibleModalDynamic)
    if (type === 'bookmark') {
      setTitleModal(`Bookmark Setting User ${key + 1}`)
      setTypeModal(type)
    } else if (type === 'item-delivery') {
      setTitleModal(`Item Delivery Setting User ${key + 1}`)
      setTypeModal(type)
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
          wrapIdPrefectures.push({ id: prefecture.id })
          return ''
        })
      })
      form.setFieldsValue({ regions: wrapDataRegion.join() })
      form.setFieldsValue({ prefectures: wrapIdPrefectures })
    }
    setChecklistModal(!checklistModal)
  }

  const formFields = [
    {
      label: '登録年月日',
      required: false,
      field_name: 'registrationDate',
      type: 'date',
      size: 24,
      initialValue: moment(),
    },
    {
      label: '有料会員 登録年月日',
      required: false,
      field_name: 'paidMemberDate',
      type: 'date',
      size: 24,
      initialValue: moment(),
    },
    {
      label: '有料会員期限切れ年月日',
      required: false,
      field_name: 'expiredDate',
      type: 'date',
      size: 24,
      initialValue: moment(),
    },
    {
      label: '支払い方法',
      required: false,
      field_name: 'planId',
      type: 'radio',
      size: 24,
      optional: optionPlans,
      initialValue: isEdit && dataMember.planId,
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
      label: '会社名',
      required: false,
      field_name: 'companyName',
      type: 'text',
      size: 24,
      initialValue: isEdit ? dataMember.companyName : '',
      placeholder: '例　株式会社Tender',
    },
    {
      label: '会社名(カナ)',
      required: false,
      field_name: 'companyNameKana',
      type: 'text',
      size: 24,
      initialValue: isEdit ? dataMember.companyNameKana : '',
      placeholder: '例　カブシキカイシャテンダー',
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
      initialValue: isEdit ? dataMember.phoneNumber : '',
      placeholder: '例　0312345678',
    },
    {
      label: 'FAX番号',
      required: false,
      field_name: 'faxNumber',
      type: 'text',
      size: 24,
      initialValue: isEdit ? dataMember.faxNumber : '',
      placeholder: '例　0312345678',
    },
    {
      label: 'ご契約担当者名',
      required: false,
      field_name: 'picName',
      type: 'text',
      size: 24,
      initialValue: isEdit ? dataMember.picName : '',
      placeholder: '例　山田太郎',
    },
    {
      label: 'ご契約担当者名(カナ)',
      required: false,
      field_name: 'picNameKana',
      type: 'text',
      size: 24,
      initialValue: isEdit ? dataMember.picNameKana : '',
      placeholder: '例　ヤマダタロウ',
    },
  ]

  const formFieldsUser = [
    {
      label: 'フルネーム',
      required: false,
      field_name: 'fullName',
      type: 'text',
      size: 24,
      placeholder: 'フルネーム',
    },
    {
      label: 'フルネーム(カナ)',
      required: false,
      field_name: 'fullNameKana',
      type: 'text',
      size: 24,
      placeholder: 'フルネーム(カナ)',
    },
    {
      label: 'メールアドレス',
      required: false,
      field_name: 'emailUser',
      type: 'email',
      size: 24,
      placeholder: 'メールアドレス',
    },
  ]

  const onReset = () => {
    form.resetFields()
  }

  const onSubmit = async event => {
    event.preventDefault()
    await form.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)
        let users = []
        values.keys.map(key => {
          users.push({
            fullName: values.fullName[key],
            fullNameKana: values.fullNameKana[key],
            email: values.emailUser[key],
            password: values.password[key],
            confirmPassword: values.confirmPassword[key],
          })
          return ''
        })
        let bodyPost = {
          companyName: values.companyName,
          postalCode: values.postalCode,
          address: values.address,
          phoneNumber: values.phoneNumber,
          faxNumber: values.faxNumber,
          picName: values.picName,
          picNameKana: values.picNameKana,
          planId: values.planId,
          status: values.status,
          prefectures: values.prefectures,
          email: values.emailUser[0],
          expiredDate: moment(values.expiredDate).format('YYYY/MM/DD'),
          paidMemberDate: moment(values.paidMemberDate).format('YYYY/MM/DD'),
          registrationDate: moment(values.registrationDate).format('YYYY/MM/DD'),
          users: users,
          remarks: values.remarks,
        }
        await adminMemberService
          .ADD_MEMBER(bodyPost, stateUser.token)
          .then(res => {
            if (res) {
              notification.success({
                message: 'メンバーを追加しました',
              })
              history.push('/admin/members')
            }
          })
          .catch(() => {
            notification.error({
              message: '問題が発生しました',
            })
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    })
  }

  const onSubmitEdit = async event => {
    event.preventDefault()
    await form.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)
        let users = []

        values.keys.map(key => {
          if (values.password !== undefined && values.confirmPassword !== undefined) {
            users.push({
              id: values.id[key],
              fullName: values.fullName[key],
              fullNameKana: values.fullNameKana[key],
              email: values.emailUser[key],
              password: values.password[key],
              confirmPassword: values.confirmPassword[key],
            })
          } else {
            users.push({
              id: values.id[key],
              fullName: values.fullName[key],
              fullNameKana: values.fullNameKana[key],
              email: values.emailUser[key],
            })
          }
          if (values.id[key] === '') {
            delete users[key].id
          }
          return ''
        })

        let bodyPost = {
          companyName: values.companyName,
          postalCode: values.postalCode,
          address: values.address,
          phoneNumber: values.phoneNumber,
          faxNumber: values.faxNumber,
          picName: values.picName,
          picNameKana: values.picNameKana,
          planId: values.planId,
          status: values.status,
          prefectures: values.prefectures,
          email: values.emailUser[0],
          expiredDate: moment(values.expiredDate).format('YYYY/MM/DD'),
          paidMemberDate: moment(values.paidMemberDate).format('YYYY/MM/DD'),
          registrationDate: moment(values.registrationDate).format('YYYY/MM/DD'),
          users: users,
          remarks: values.remarks,
        }
        await adminMemberService
          .UPDATE_MEMBER(props.match.params.id, bodyPost, stateUser.token)
          .then(res => {
            if (res) {
              notification.success({
                message: 'メンバーを追加しました',
              })
              history.push('/admin/members')
            }
          })
          .catch(() => {
            notification.error({
              message: '問題が発生しました',
            })
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    })
  }

  const onRemoveUser = k => {
    const keys = form.getFieldValue('keys')
    if (keys.length === 1) {
      return
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }

  const onAddUser = () => {
    const keys = form.getFieldValue('keys')
    const addCount = keys[keys.length - 1] + 1
    const nextKeys = keys.concat(addCount)
    form.setFieldsValue({
      keys: nextKeys,
    })
  }

  useEffect(() => {
    publicService.GET_PLANS().then(plans => {
      setOptionPlans(plans)
    })
    publicService.GET_STATUS(stateUser.token).then(status => {
      setOptionStatus(status)
    })
    if (isEdit) {
      adminMemberService.GET_MEMBER(props.match.params.id, stateUser.token).then(member => {
        setDataMember(member)
        setAddress({
          address: member.address,
          postalCode: member.postalCode,
        })
      })
    }
  }, [])

  return (
    <div>
      <AdminRegisterUserComponent
        form={form}
        formFields={formFields}
        onSubmit={onSubmit}
        onReset={onReset}
        isLoading={isLoading}
        onRemoveUser={onRemoveUser}
        onAddUser={onAddUser}
        formFieldsUser={formFieldsUser}
        typeModal={typeModal}
        handleCheckAll={handleCheckAll}
        dataRegion={dataRegion}
        regionCheckAll={regionCheckAll}
        handleChangeRegion={handleChangeRegion}
        titleModal={titleModal}
        checklistModal={checklistModal}
        handleChecklistModal={handleChecklistModal}
        onSubmitChecklist={onSubmitChecklist}
        isEdit={isEdit}
        dataMember={dataMember}
        onSubmitEdit={onSubmitEdit}
        handleModalDynamic={handleModalDynamic}
        visibleModalDynamic={visibleModalDynamic}
        showButtonSubmitModal={showButtonSubmitModal}
      />
    </div>
  )
}

const WrappedAdminRegisterUserContainer = Form.create({ name: 'AdminRegisterUserContainer' })(
  AdminRegisterUserContainer,
)

AdminRegisterUserContainer.propTypes = {
  isEdit: PropTypes.bool,
}

export default WrappedAdminRegisterUserContainer
