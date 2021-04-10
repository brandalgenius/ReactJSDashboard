import React from 'react'
import { Button, Icon, Upload, Form, Input, Row, Col, Avatar } from 'antd'

const UploadPhotoComponent = props => {
  const { propsUpload, form, deletePhoto, user } = props
  const photoEmpty = form.getFieldValue('photo') === '' || form.getFieldValue('photo') === undefined

  return (
    <div>
      <Row className="mb-2">
        <Form.Item style={{ display: 'none' }}>
          {form.getFieldDecorator('photo', { initialValue: user.profilePhoto })(
            <Input disabled={true} hidden={true} />,
          )}
        </Form.Item>
        <Col span={3}>
          <Avatar shape="square" size={64} icon="user" src={form.getFieldValue('photo')} />
        </Col>
        <Col span={10}>
          {photoEmpty ? (
            <Upload {...propsUpload}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          ) : (
            <Button type="danger" onClick={deletePhoto}>
              Change
            </Button>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default UploadPhotoComponent
