import React from 'react'
import { Modal, Form, Input } from 'antd'

const AdminBiddingMethodModalForm = props => {
  const { visible, onCancel, onCreate, biddingMethod, isLoading, form } = props

  const { getFieldDecorator } = form

  return (
    <Modal
      visible={visible}
      title="新しいテキストを追加"
      okText="保存​"
      cancelText="キャンセル"
      onCancel={onCancel}
      onOk={onCreate}
      confirmLoading={isLoading}
    >
      <Form layout="vertical">
        <Form.Item label="入札方式マスター">
          {getFieldDecorator('biddingMethodName', {
            rules: [
              {
                required: true,
                message: 'Please input the bidding method name',
              },
            ],
            initialValue: biddingMethod.name,
          })(<Input disabled={true} />)}
        </Form.Item>
        <Form.Item label="テキスト">
          {getFieldDecorator('rawText', {
            rules: [
              {
                required: true,
                message: 'Please input the text',
              },
            ],
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

const AdminBiddingMethodFormComponent = Form.create({ name: 'AdminBiddingMethodModalForm' })(
  AdminBiddingMethodModalForm,
)

export default AdminBiddingMethodFormComponent
