import React, { useEffect, useState } from 'react'
import AdminListUsersComponent from './AdminListUsers.component'
import { useSelector } from 'react-redux'
import memberService from 'services/member/memberService'
import { Button, Popconfirm, notification } from 'antd'

const AdminListUsersContainer = () => {
  const stateUser = useSelector(state => state.user)
  const [dataMemberInfo, setDataMemberInfo] = useState({})
  const isAdmin = stateUser.adminMember
  const [isRefetch, setIsRefetch] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [selectedIdUser, setSelectedIdUser] = useState('')
  const [showModalAdd, setShowModalAdd] = useState(false)

  const columns = [
    {
      title: 'フルネーム',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'フルネーム(カナ)',
      dataIndex: 'fullNameKana',
      key: 'fullNameKana',
    },
    {
      title: 'メールアドレス',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '管理者',
      dataIndex: 'admin',
      key: 'admin',
      render: text => (text === true ? <div>Yes</div> : <div>No</div>),
    },
    {
      title: 'アクション',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button style={{ marginRight: 8 }} onClick={() => onEditUser(record.id)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure delete this user?"
            onConfirm={() => deleteUser(record.id)}
            onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed">Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  const onCloseModalEdit = () => {
    setShowModalEdit(false)
    setSelectedIdUser('')
  }

  const onCloseModalAdd = () => {
    setShowModalAdd(false)
  }

  const onEditUser = async id => {
    setSelectedIdUser(id)
    setShowModalEdit(true)
  }

  const deleteUser = async id => {
    setIsRefetch(true)
    await memberService
      .DELETE_MEMBER_USER(id, stateUser.token)
      .then(deleted => {
        if (deleted) {
          notification.success({
            message: 'ユーザーの削除に成功しました',
          })
        }
      })
      .catch(() => {
        notification.error({
          message: '削除できませんでした',
        })
      })
  }

  useEffect(() => {
    const getMemberInfo = async () => {
      await memberService.GET_MEMBER_INFO(stateUser.token).then(info => {
        if (info) {
          setDataMemberInfo(info)
        }
      })
    }
    if (isAdmin) {
      getMemberInfo()
    }
  }, [])

  useEffect(() => {
    const getMemberInfo = async () => {
      await memberService.GET_MEMBER_INFO(stateUser.token).then(info => {
        if (info) {
          setDataMemberInfo(info)
        }
      })
      setIsRefetch(false)
    }
    if (isRefetch && isAdmin) {
      getMemberInfo()
    }
  }, [isRefetch])

  return (
    <div>
      <AdminListUsersComponent
        columns={columns}
        dataSource={dataMemberInfo.users}
        showModalEdit={showModalEdit}
        selectedIdUser={selectedIdUser}
        onCloseModalEdit={onCloseModalEdit}
        setIsRefetch={setIsRefetch}
        showModalAdd={showModalAdd}
        setShowModalAdd={setShowModalAdd}
        onCloseModalAdd={onCloseModalAdd}
      />
    </div>
  )
}

export default AdminListUsersContainer
