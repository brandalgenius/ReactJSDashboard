import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Avatar } from 'antd'
import memberService from 'services/member/memberService'
import userService from 'services/user/userService'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from 'lodash'
import { history } from 'index'

const MyProfileContainer = () => {
  const stateUser = useSelector(state => state.user)
  const [dataMemberInfo, setDataMemberInfo] = useState({})
  const dispatch = useDispatch()
  const isAdmin = stateUser.adminMember

  useEffect(() => {
    const getMemberInfo = async () => {
      await memberService.GET_MEMBER_INFO(stateUser.token).then(info => {
        if (info) {
          setDataMemberInfo(info)
        }
      })
    }
    const getMe = async () => {
      await userService.INFO_ME(stateUser.token).then(me => {
        if (me) {
          dispatch({
            type: 'user/SET_STATE',
            payload: {
              loading: false,
              email: me.email,
              fullName: me.fullName,
              fullNameKana: me.fullNameKana,
              phone: me.phone,
              profilePhoto: me.profilePhoto,
              role: me.role,
              token: stateUser.token,
              adminMember: me.adminMember,
              id: me.id,
            },
          })
          localStorage.setItem(
            'user',
            JSON.stringify({
              email: me.email,
              fullName: me.fullName,
              fullNameKana: me.fullNameKana,
              phone: me.phone,
              profilePhoto: me.profilePhoto,
              role: me.role,
              token: stateUser.token,
              authorized: true,
              adminMember: me.adminMember,
              id: me.id,
            }),
          )
        }
      })
    }
    if (isAdmin) {
      getMemberInfo()
    }
    getMe()
  }, [])

  const _mappingPrefecture = prefectures =>
    prefectures.map((prefecture, key) => <span key={key}>{prefecture.name}, </span>)

  const _mappingMemberUser = users =>
    users.map((user, index) => (
      <Row className="mb-3" key={index}>
        <Col span={8}>メールアドレス　{index + 1}</Col>
        <Col span={16}>{user.email}</Col>
      </Row>
    ))

  const _adminInfo = () => (
    <>
      <div className="card" style={{ padding: 16 }}>
        <div className="title text-center">
          <h2>お客様情報</h2>
        </div>
        <div className="card-header mb-3">
          <h4>会員情報</h4>
        </div>
        <Row className="mb-3">
          <Col span={8}>会社名</Col>
          <Col span={16}>{dataMemberInfo.companyName}</Col>
        </Row>
        <Row className="mb-3">
          <Col span={8}>会社名(カナ)</Col>
          <Col span={16}>{dataMemberInfo.companyNameKana}</Col>
        </Row>
        <Row className="mb-3">
          <Col span={8}>ご住所</Col>
          <Col span={16}>
            <Col span={24} className="mb-3">
              〒 {dataMemberInfo.postalCode}
            </Col>
            <Col span={24}>{dataMemberInfo.address}</Col>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col span={8}>電話番号</Col>
          <Col span={16}>{dataMemberInfo.phoneNumber}</Col>
        </Row>
        <Row className="mb-3">
          <Col span={8}>FAX番号</Col>
          <Col span={16}>{dataMemberInfo.faxNumber}</Col>
        </Row>
        <Row className="mb-3">
          <Col span={8}>ご契約担当者名 </Col>
          <Col span={16}>{dataMemberInfo.picName}</Col>
        </Row>
        <Row className="mb-3">
          <Col span={8}>ご契約担当者名(カナ) </Col>
          <Col span={16}>{dataMemberInfo.picNameKana}</Col>
        </Row>
        <Row className="mb-3">
          <Col span={8}>メールアドレス </Col>
          <Col span={16}>{dataMemberInfo.email}</Col>
        </Row>
        <Row className="mb-3">
          <Col span={8}>選択した発注地域 </Col>
          <Col span={16}>{_mappingPrefecture(dataMemberInfo.prefectures)}</Col>
        </Row>
        <Row className="mb-3">
          <Col span={8}>ご契約期間 </Col>
          <Col span={16}>{dataMemberInfo.planName}</Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button block type="primary" href={'/admin/my-profile/edit'}>
              登録情報の変更
            </Button>
          </Col>
        </Row>
        <div className="card-header mb-3 mt-5">
          <h4>登録済アカウント</h4>
        </div>
        {_mappingMemberUser(dataMemberInfo.users)}
        <Row>
          <Col span={24}>
            <Button block type="primary" href={'/admin/my-profile/users'}>
              アカウントの追加と削除
            </Button>
          </Col>
        </Row>
      </div>
    </>
  )

  const _userInfo = () => (
    <div className="card" style={{ padding: 16 }}>
      <Row>
        <Col span={3}>
          <Avatar shape="square" size={64} icon="user" src={stateUser.profilePhoto} />
        </Col>
        <Col span={16}>
          <Row className="mb-3">
            <Col span={8}>フルネーム </Col>
            <Col span={16}>{stateUser.fullName}</Col>
          </Row>
          <Row>
            <Col span={8}>フルネーム(カナ) </Col>
            <Col span={16}>{stateUser.fullNameKana}</Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3" style={{ textAlign: 'right' }}>
        <Button
          type="primary"
          className="mr-2"
          onClick={() => history.push(`/admin/my-profile/edit/${stateUser.id}`)}
        >
          Edit Info
        </Button>
        <Button type="default" onClick={() => history.push('/admin/my-profile/change-password')}>
          Change Password
        </Button>
      </Row>
    </div>
  )

  return (
    <div>
      {_userInfo()}
      {!isEmpty(dataMemberInfo) && isAdmin && _adminInfo()}
    </div>
  )
}

export default MyProfileContainer
