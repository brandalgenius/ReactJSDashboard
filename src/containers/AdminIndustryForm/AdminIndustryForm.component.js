import React from 'react'
import { Modal, Form, Input } from 'antd'

const AdminIndustryModalForm = props => {
  const { visible, onCancel, onCreate, industry, isLoading, form } = props

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
        <Form.Item label="業種マスター">
          {getFieldDecorator('industryName', {
            rules: [
              {
                required: true,
                message: 'Please input the industry name',
              },
            ],
            initialValue: industry.name,
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

const AdminIndustryFormComponent = Form.create({ name: 'AdminIndustryModalForm' })(
  AdminIndustryModalForm,
)

export default AdminIndustryFormComponent
