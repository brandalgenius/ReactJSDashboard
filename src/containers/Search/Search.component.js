import React from 'react'
import { Select, Form, Row, Col, DatePicker } from 'antd'
const { Option } = Select

const SearchComponent = props => {
  const { handleChange, handleChangeDateRangePicker, showDateRange } = props
  const { getFieldDecorator } = props.form
  const optionDate = [
    {
      name: 'Today',
      value: 'today',
    },
    {
      name: 'Yesterday',
      value: 'yesterday',
    },
    {
      name: 'Week to Date',
      value: 'weekToDate',
    },
    {
      name: 'Last Week',
      value: 'lastWeek',
    },
    {
      name: 'Last 30 Days',
      value: 'last30Days',
    },
    {
      name: 'Last Month',
      value: 'lastMonth',
    },
    {
      name: 'Custom Date',
      value: 'customDate',
    },
  ]

  return (
    <div>
      <Form layout="inline">
        <Row>
          <Col span={12}>
            <Form.Item label="Select Date">
              {getFieldDecorator('date', {
                initialValue: 'today',
              })(
                <Select style={{ width: 240 }} onChange={handleChange}>
                  {optionDate.map(option => (
                    <Option value={option.value}>{option.name}</Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            {showDateRange && (
              <DatePicker.RangePicker
                onChange={handleChangeDateRangePicker}
                open={true}
                format="MM/DD/YYYY"
              />
            )}
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default SearchComponent
