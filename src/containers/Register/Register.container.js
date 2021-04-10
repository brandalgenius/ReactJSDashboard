/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import RegisterComponent from './Register.component'
import { Form, message } from 'antd'
import { WrapperRegister } from './Register.style'
import JapanPostalCode from 'japan-postal-code'
import publicService from 'services/public/publicService'
import _, { isEmpty } from 'lodash'
import authService from 'services/auth/authService'

const RegisterContainer = props => {
  const [isShowConfirmation, setIsShowConfirmation] = useState(false)
  const { form } = props
  const [address, setAddress] = useState({})
  const [optionPrefectrue, setOptionPrefectrue] = useState([])
  const [optionPlans, setOptionPlans] = useState([])
  const [dataRegister, setDataRegister] = useState({})
  const [checkAll, setCheckAll] = useState([])
  const [isSuccessRegister, setIsSuccessRegister] = useState(false)

  const onSubmit = async event => {
    event.preventDefault()
    await form.validateFields(async (err, values) => {
      if (!err) {
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
            })
          }
        })

        await setDataRegister({
          companyName: values.companyName,
          companyNameKana: values.companyName,
          postalCode: values.postalCode,
          address: values.addres,
          phoneNumber: values.phoneNumber,
          faxNumber: values.faxNumber,
          picName: values.picName,
          picNameKana: values.picNameKana,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          planId: values.planId,
          prefectures: dataPrefecture,
        })

        // await dispatch({
        //   type: 'register/SET_STATE',
        //   payload: values,
        // })
        setIsShowConfirmation(true)
      }
    })
  }

  const submitRegistration = () => {
    authService
      .POST_REGISTRATION(dataRegister)
      .then(registered => {
        if (registered) {
          setIsSuccessRegister(true)
          setIsShowConfirmation(false)
          form.resetFields()
        }
      })
      .catch(() => message.error('エラーが発生しました。フォームをもう一度確認してください'))
  }

  const onSearchPostal = value => {
    if (value.length > 3) {
      JapanPostalCode.get(value, address => {
        setAddress({
          address,
        })
      })
    }
  }

  const onCloseModal = () => {
    setIsShowConfirmation(false)
  }

  const onCheckAll = async isChecked => {
    let name = ''
    let data = []
    if (isChecked) {
      await optionPrefectrue.map((prefecture, key) => {
        name = `area_${prefecture.id}`
        data.push(prefecture.areas.map(area => area.id))
      })
      await optionPrefectrue.map((prefecture, key) => {
        name = `area_${optionPrefectrue[key].id}`
        data[key].push(name)
        form.setFieldsValue({ [name]: data[key] })
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
      })
      await optionPrefectrue.map((prefecture, key) => {
        if (prefecture.id === id) {
          data[key].push(name)
          form.setFieldsValue({ [name]: data[key] })
        }
      })
      setCheckAll(data)
      setCheckAll(_.merge(checkAllCopy, data))
    } else {
      await optionPrefectrue.map((prefecture, key) => {
        if (prefecture.id === id) {
          data[key] = []
          form.setFieldsValue({ [name]: [] })
        }
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
        })
        setOptionPrefectrue(tempPrefecture)
      })

      publicService.GET_PLANS().then(plans => {
        setOptionPlans(plans)
      })
    }
    INIT_DATA()
  }, [])

  return (
    <WrapperRegister>
      <RegisterComponent
        form={form}
        onSubmit={onSubmit}
        isShowConfirmation={isShowConfirmation}
        onSearchPostal={onSearchPostal}
        address={address}
        optionPrefectrue={optionPrefectrue}
        dataRegister={dataRegister}
        onCloseModal={onCloseModal}
        optionPlans={optionPlans}
        onCheckAll={onCheckAll}
        checkAll={checkAll}
        onCheckByArea={onCheckByArea}
        submitRegistration={submitRegistration}
        isSuccessRegister={isSuccessRegister}
      />
    </WrapperRegister>
  )
}

const WrapperRegisterContainer = Form.create({
  name: 'RegisterContainer',
})(RegisterContainer)

export default WrapperRegisterContainer
