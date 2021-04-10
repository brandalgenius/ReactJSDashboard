import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Card, Icon, Input } from 'antd'
import { _mappingItemForm } from 'utils/formUtils'
import { WrapperButtonPrefix } from './MailAdd.style'

const { Item } = Form

const objType = {
  formFieldsDynamic: PropTypes.object,
  formFieldsText: PropTypes.array,
  keywordField: PropTypes.object,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  isLoading: PropTypes.bool,
  addKeywordField: PropTypes.func,
  removeKeywordField: PropTypes.func,
  changeKeywordField: PropTypes.func,
  form: PropTypes.object,
}

const MailAdd = props => {
  const {
    form,
    formFieldsDynamic,
    formFieldsText,
    keywordField,
    addKeywordField,
    removeKeywordField,
    changeKeywordField,
    onSubmit,
    onReset,
  } = props

  const renderMappingForm = () => (
    <Form layout="inline" onSubmit={onSubmit}>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Card type="inner">
            <Item label={formFieldsDynamic.label}>
              <Row>
                <Col span={2}>OR検索</Col>
                <Col span={22}>
                  <Row gutter={4}>
                    {keywordField.or.map((val, key) => (
                      <Col span={6} key={`or-${key}`}>
                        <Input
                          name={`or-${key}`}
                          onChange={e => changeKeywordField('or', e.target.value, key)}
                          value={val}
                          addonAfter={
                            <Icon
                              type="delete"
                              theme="filled"
                              onClick={() => removeKeywordField('or', key)}
                            />
                          }
                        />
                      </Col>
                    ))}
                    <Button onClick={() => addKeywordField('or')}>+ OR検索</Button>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={2}>AND検索</Col>
                <Col span={22}>
                  <Row gutter={4}>
                    {keywordField.and.map((val, key) => (
                      <Col span={6} key={`and-${key}`}>
                        <Input
                          name={`and-${key}`}
                          onChange={e => changeKeywordField('and', e.target.value, key)}
                          value={val}
                          addonAfter={
                            <Icon
                              type="delete"
                              theme="filled"
                              onClick={() => removeKeywordField('and', key)}
                            />
                          }
                        />
                      </Col>
                    ))}
                    <Button onClick={() => addKeywordField('and')}>+ AND検索</Button>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={2}>NOT検索</Col>
                <Col span={22}>
                  <Row gutter={4}>
                    {keywordField.not.map((val, key) => (
                      <Col span={6} key={`not-${key}`}>
                        <Input
                          name={`not-${key}`}
                          onChange={e => changeKeywordField('not', e.target.value, key)}
                          value={val}
                          addonAfter={
                            <Icon
                              type="delete"
                              theme="filled"
                              onClick={() => removeKeywordField('not', key)}
                            />
                          }
                        />
                      </Col>
                    ))}
                    <Button onClick={() => addKeywordField('not')}>+ NOT検索</Button>
                  </Row>
                </Col>
              </Row>
            </Item>
          </Card>
        </Col>
        <Col span={24}>
          <Card type="inner">
            <WrapperButtonPrefix>
              {_mappingItemForm(formFieldsText, form.getFieldDecorator, form.getFieldValue)}
            </WrapperButtonPrefix>
          </Card>
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button htmlType="submit" type="primary">
            検索する
          </Button>
          <Button onClick={onReset} style={{ marginLeft: 10 }}>
            リセット
          </Button>
        </Col>
      </Row>
    </Form>
  )

  return (
    <div className="card">
      <div className="card-header">索検</div>
      <div className="card-body">{renderMappingForm()}</div>
    </div>
  )
}

MailAdd.propTypes = objType

export default MailAdd
