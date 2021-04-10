import React from 'react'
import moment from 'moment'
import { Radio, Select, DatePicker, Input, Col, Checkbox, Form, TimePicker } from 'antd'
import { isEmpty } from 'lodash'

const { Option } = Select
const { TextArea } = Input
const { Item } = Form

const _mappingItemForm = (items, getFieldDecorator, getFieldValue) =>
  items.map((item, key) => identifyType(item, key, getFieldDecorator, getFieldValue))

const identifyType = (item, key, getFieldDecorator, getFieldValue) => {
  if (item.type === 'address') {
    return addressForm(item, key, getFieldDecorator)
  } else if (item.type === 'checkbox') {
    return checkboxForm(item, key, getFieldDecorator)
  } else if (item.type === 'email') {
    return (
      <Col span={item?.size ?? 24} key={key}>
        <Item
          label={item?.label}
          style={{
            marginTop: item.label ? 0 : 40,
          }}
        >
          {getFieldDecorator(item.field_name, {
            rules: [
              {
                required: item.required,
                message: `入力してください ${item?.label ?? item?.field_name}!`,
              },
              {
                type: 'email',
                message: '有効なメールアドレスを入力してください！',
              },
            ],
            initialValue: _initialValue(
              item.type,
              item.field_name,
              item.initialValue,
              item.optional,
            ),
          })(
            _typeField(
              item.type,
              item.field_name,
              item.initialValue,
              item.optional,
              item.disabled,
              item.placeholder,
              item.isAdmin,
              item.prefix,
            ),
          )}
        </Item>
      </Col>
    )
  } else {
    return (
      <Col span={item?.size ?? 24} key={key}>
        <Item
          label={item?.label}
          style={{
            marginTop: item.label ? 0 : 40,
          }}
        >
          {getFieldDecorator(item.field_name, {
            rules: [
              {
                required: item.required,
                message: `入力してください ${item?.label ?? item?.field_name}!`,
              },
            ],
            initialValue: _initialValue(
              item.type,
              item.field_name,
              item.initialValue,
              item.optional,
            ),
          })(
            _typeField(
              item.type,
              item.field_name,
              item.initialValue,
              item.optional,
              item.disabled,
              item.placeholder,
              item.isAdmin,
              item.prefix,
            ),
          )}
        </Item>
      </Col>
    )
  }
}

const addressForm = (item, key, getFieldDecorator) => {
  let valueAddress = ''
  const address = item.initialValue.address
  if (!isEmpty(address)) {
    if (address.prefecture !== undefined) {
      valueAddress = address.prefecture !== '' ? address.prefecture : ''
      valueAddress = address.city !== '' ? `${valueAddress}, ${address.city}` : `${valueAddress}`
      valueAddress = address.area !== '' ? `${valueAddress}, ${address.area}` : `${valueAddress}`
      valueAddress =
        address.street !== '' ? `${valueAddress}, ${address.street}` : `${valueAddress}`
    } else {
      valueAddress = address
    }
  }

  return (
    <Col span={24} key={key}>
      <Form.Item label={item.label} name={item.field_name}>
        <Col span={5}>
          <Form.Item label="〒">
            {getFieldDecorator('postalCode', {
              initialValue: item.initialValue.postalCode,
            })(
              <Input
                onChange={e => item.onSearchPostal(e.target.value)}
                onKeyDown={e => (e.keyCode === 13 ? e.preventDefault() : '')}
              />,
            )}
          </Form.Item>
        </Col>
        {getFieldDecorator(item.field_name, {
          initialValue: valueAddress,
        })(<Input />)}
      </Form.Item>
    </Col>
  )
}

const _initialValue = (type, field, initialValue) => {
  if (field === 'date' || type === 'date') {
    return moment(initialValue, 'YYYY/MM/DD')
  } else if (field === 'timeStart' || type === 'time-range' || type === 'time') {
    return moment(initialValue, 'HH:mm:ss')
  } else if (field === 'timeEnd') {
    return moment(initialValue, 'HH:mm:ss')
  } else if (
    type === 'radio' ||
    type === 'select' ||
    type === 'text' ||
    type === 'textarea' ||
    type === 'email' ||
    type === 'checkbox' ||
    type === 'phone'
  ) {
    return initialValue
  } else {
    return
  }
}

const _mappingRadio = (items, isAdmin) => {
  if (isAdmin) {
    return (
      <Radio.Group>
        {items.map((item, key) => (
          <Radio key={key} value={item.id}>
            {item.otherName}
          </Radio>
        ))}
      </Radio.Group>
    )
  } else {
    return (
      <Radio.Group>
        {items.map((item, key) => (
          <Radio key={key} value={item.id}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
    )
  }
}

const _mappingSelect = items =>
  items.map(item => (
    <Option size="default" key={item.id} value={item.name}>
      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
    </Option>
  ))

const _typeField = (
  type,
  field,
  initialValue,
  optional,
  disabled,
  placeholder,
  isAdmin,
  prefix,
) => {
  if (type === 'date') {
    return <DatePicker size="default" format="YYYY/MM/DD" />
  } else if (type === 'select' && field === 'membership') {
    return (
      <Select size="default">
        <Option value={'yes'}>Yes</Option>
        <Option value={'no'}>No</Option>
      </Select>
    )
  } else if (type === 'select') {
    return <Select size="default">{_mappingSelect(optional)}</Select>
  } else if (type === 'radio') {
    return _mappingRadio(optional, isAdmin)
  } else if (type === 'textarea') {
    return <TextArea size="default" />
  } else if (type === 'phone') {
    return <Input size="default" addonBefore="+" style={{ width: '100%' }} />
  } else if (type === 'checkbox') {
    return (
      <Checkbox.Group size="default" style={{ width: '100%' }}>
        {_mappingCheckbox(optional)}
      </Checkbox.Group>
    )
  } else if (type === 'time' || type === 'time-range') {
    return (
      <TimePicker
        size="default"
        defaultOpenValue={moment('00:00', 'HH:mm')}
        format={'HH:mm'}
        disabled={disabled}
      />
    )
  } else if (type === 'dateRange') {
    return <DatePicker.RangePicker />
  } else if (type === 'text-prefix') {
    return (
      <Input
        size="default"
        prefix={prefix}
        style={{ paddingLeft: 80 }}
        placeholder={placeholder ?? ''}
        disabled={disabled}
      />
    )
  } else {
    return <Input size="default" placeholder={placeholder ?? ''} disabled={disabled} />
  }
}

const _mappingCheckbox = items =>
  items.map(item => (
    <Col span={8} key={item.id}>
      <Checkbox size="default" value={item.id}>
        {item.name}
      </Checkbox>
    </Col>
  ))

const checkboxForm = (item, key, getFieldDecorator) => (
  <Col span={24} key={key}>
    <Form.Item label={item.label}>
      {getFieldDecorator(item.field_name, {
        initialValue: item.initialValue,
        valuePropName: 'checked',
        rules: [{ required: item.required }],
      })(<div>{_mappingCheckbox(item.optional)}</div>)}
    </Form.Item>
  </Col>
)

export {
  _initialValue,
  _mappingRadio,
  _mappingSelect,
  _typeField,
  _mappingCheckbox,
  _mappingItemForm,
}
