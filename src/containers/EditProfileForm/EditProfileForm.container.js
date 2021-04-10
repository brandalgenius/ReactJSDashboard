import React, { useState, useEffect } from 'react'
import { Form, notification } from 'antd'
import JapanPostalCode from 'japan-postal-code'
import publicService from 'services/public/publicService'
import _, { isEmpty } from 'lodash'
import EditProfileFormComponent from './EditProfileForm.component'
import { WrapperRegister } from './EditProfileForm.style'
import { useSelector } from 'react-redux'
import memberService from 'services/member/memberService'

const EditProfileFormContainer = props => {
  const { form } = props
  const [address, setAddress] = useState({})
  const [optionPrefectrue, setOptionPrefectrue] = useState([])
  const [optionPlans, setOptionPlans] = useState([])
  const [checkAll, setCheckAll] = useState([])
  const stateUser = useSelector(state => state.user)
  const [dataMemberInfo, setDataMemberInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const isAdmin = stateUser.adminMember

  const onSubmit = async event => {
    event.preventDefault()
    await form.validateFields(async (err, values) => {
      if (!err) {
        setIsLoading(true)
        let name = ''
        let dataPrefecture = []

        await optionPrefectrue.map(prefecture => {
          name = `area_${prefecture.id}`
          if (values[name] !== undefined) {
            values[name].map((idArea, key) => {
              if (idArea !== name) {
                dataPrefecture.push({
                  id: idArea,
                  name: prefecture.areas[key].name,
                })
              }
              return ''
            })
          }
          return ''
        })

        let dataEdit = {
          companyName: values.companyName,
          companyNameKana: values.companyNameKana,
          postalCode: values.postalCode,
          address: values.address,
          phoneNumber: values.phoneNumber,
          faxNumber: values.faxNumber,
          picName: values.picName,
          picNameKana: values.picNameKana,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          planId: values.planId,
          prefectures: dataPrefecture,
        }

        await memberService
          .UPDATE_MEMBER(dataEdit, stateUser.token)
          .then(updated => {
            if (updated) {
              notification.success({
                message: 'Success update profile',
              })
            }
          })
          .catch(e => {
            notification.error({
              message: e.data.error,
              description: e.data.message,
            })
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    })
  }

  const onSearchPostal = value => {
    if (value.length > 3) {
      JapanPostalCode.get(value, address => {
        setAddress({ address })
      })
    }
  }

  const onCheckAll = async isChecked => {
    let name = ''
    let data = []
    if (isChecked) {
      await optionPrefectrue.map((prefecture, key) => {
        name = `area_${prefecture.id}`
        data.push(prefecture.areas.map(area => area.id))
        return ''
      })
      await optionPrefectrue.map((prefecture, key) => {
        name = `area_${optionPrefectrue[key].id}`
        data[key].push(name)
        form.setFieldsValue({ [name]: data[key] })
        return ''
      })
      setCheckAll(data)
    } else {
      optionPrefectrue.map(async (prefecture, key) => {
        name = `area_${prefecture.id}`
        form.setFieldsValue({ [name]: [] })
      })
      setCheckAll([])
    }
  }

  const onCheckByArea = async (area, isChecked) => {
    const id = parseInt(_.split(area, 'area_')[1])
    let name = ''
    let data = []
    let checkAllCopy = _.clone(checkAll)
    if (isEmpty(data)) {
      await optionPrefectrue.map((prefecture, key) => {
        data.push([])
        return ''
      })
    }
    if (isChecked) {
      await optionPrefectrue.map((prefecture, key) => {
        if (prefecture.id === id) {
          name = `area_${prefecture.id}`
          let merge = _.merge(
            data[key],
            prefecture.areas.map(area => area.id),
          )
          data[key].concat(merge)
        }
        return ''
      })
      await optionPrefectrue.map((prefecture, key) => {
        if (prefecture.id === id) {
          data[key].push(name)
          form.setFieldsValue({ [name]: data[key] })
        }
        return ''
      })

      setCheckAll(data)
      setCheckAll(_.merge(checkAllCopy, data))
    } else {
      await optionPrefectrue.map((prefecture, key) => {
        if (prefecture.id === id) {
          name = `area_${prefecture.id}`
          data[key] = []
          form.setFieldsValue({ [name]: data[key] })
        }
        return ''
      })
      setCheckAll(data)
    }
  }

  useEffect(() => {
    const INIT_DATA = () => {
      publicService.GET_AREAS().then(prefecture => {
        let tempPrefecture = []
        prefecture.map((item, key) => {
          tempPrefecture.push({
            id: item.id,
            name: item.name,
            areas: item.prefectures,
          })
          return ''
        })
        setOptionPrefectrue(tempPrefecture)
      })

      publicService.GET_PLANS().then(plans => {
        setOptionPlans(plans)
      })
    }
    INIT_DATA()
  }, [])

  useEffect(() => {
    const getMemberInfo = async () => {
      await memberService.GET_MEMBER_INFO(stateUser.token).then(info => {
        if (info) {
          setDataMemberInfo(info)
          setAddress({
            address: info.address,
            postalCode: info.postalCode,
          })
        }
      })
    }
    if (isAdmin) {
      getMemberInfo()
    }
  }, [])

  useEffect(() => {
    const getPrefecture = async () => {
      let name = ''
      let data = []
      let posKey = 0
      if (isEmpty(data)) {
        await optionPrefectrue.map((prefecture, key) => {
          data.push([])
          return ''
        })
      }
      if (!isEmpty(dataMemberInfo.prefectures)) {
        await dataMemberInfo.prefectures.map(async memberPrefecture => {
          await optionPrefectrue.map(async (prefecture, key) => {
            prefecture.areas.map(area => {
              if (memberPrefecture.id === area.id) {
                name = `area_${prefecture.id}`
                data[key].push(memberPrefecture.id)
                posKey = key
                return ''
              }
              return ''
            })
          })
        })
        form.setFieldsValue({ [name]: data[posKey] })
        form.setFieldsValue({ planId: dataMemberInfo.planId })
        setCheckAll(data)
      }
    }
    getPrefecture()
  }, [optionPrefectrue, dataMemberInfo])

  return (
    <WrapperRegister>
      <EditProfileFormComponent
        form={form}
        onSubmit={onSubmit}
        onSearchPostal={onSearchPostal}
        address={address}
        optionPrefectrue={optionPrefectrue}
        optionPlans={optionPlans}
        onCheckAll={onCheckAll}
        checkAll={checkAll}
        onCheckByArea={onCheckByArea}
        dataMemberInfo={dataMemberInfo}
        isLoading={isLoading}
      />
    </WrapperRegister>
  )
}

const WrapperEditProfileFormContainer = Form.create({
  name: 'EditProfileFormContainer',
})(EditProfileFormContainer)

export default WrapperEditProfileFormContainer
