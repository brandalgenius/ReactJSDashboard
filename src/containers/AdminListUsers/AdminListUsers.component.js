import React from 'react'
import { Table, Row, Col, Button, Modal } from 'antd'
import { history } from 'index'
import { AdminUsersForm } from 'containers'

const AdminListUsersComponent = props => {
  const {
    dataSource,
    columns,
    selectedIdUser,
    showModalEdit,
    onCloseModalEdit,
    setIsRefetch,
    setShowModalAdd,
    showModalAdd,
    onCloseModalAdd,
  } = props

  const _modalEdit = () => (
    <Modal
      title="Edit User"
      visible={showModalEdit}
      footer={null}
      onCancel={onCloseModalEdit}
      width={760}
    >
      <AdminUsersForm
        idUser={selectedIdUser}
        isEdit={true}
        setIsRefetch={setIsRefetch}
        onCloseModal={onCloseModalEdit}
      />
    </Modal>
  )

  const _modalAdd = () => (
    <Modal
      title="Add User"
      visible={showModalAdd}
      footer={null}
      onCancel={onCloseModalAdd}
      width={760}
    >
      <AdminUsersForm isEdit={false} setIsRefetch={setIsRefetch} onCloseModal={onCloseModalAdd} />
    </Modal>
  )

  return (
    <div>
      <Button icon="arrow-left" className="mb-3" onClick={() => history.push('/admin/my-profile')}>
        Back
      </Button>
      <Row justify="end" className="mb-3">
        <Col span={4} offset={20}>
          <Button onClick={() => setShowModalAdd(true)} block type="primary">
            ユーザーを追加する
          </Button>
        </Col>
      </Row>
      <Table dataSource={dataSource} columns={columns} rowKey={record => record.id} />
      {showModalEdit && _modalEdit()}
      {showModalAdd && _modalAdd()}
    </div>
  )
}

export default AdminListUsersComponent
