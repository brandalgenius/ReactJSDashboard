import React, { Fragment } from 'react'
import { Row, Col, Card, Checkbox } from 'antd'
import PropTypes from 'prop-types'

function ChecklistPrefectures({
  handleCheckAll,
  regionCheckAll,
  regionIndeterminateCheckAll,
  dataRegion,
  handleChangeRegion,
}) {
  return (
    <Col span={24}>
      <Row style={{ marginBottom: 16 }}>
        <Checkbox
          onChange={e => handleCheckAll(e, 'region')}
          checked={regionCheckAll}
          indeterminate={regionIndeterminateCheckAll}
        >
          全て✔する
        </Checkbox>
      </Row>
      <Card>
        <Row>
          {dataRegion.map((val, key) => {
            return (
              <Fragment key={`reg-${val.name}`}>
                <Col span={4}>
                  <Checkbox
                    indeterminate={val.indeterminate}
                    onChange={e => handleChangeRegion(e, 'parent', key)}
                    checked={val.checked}
                    value={val.id}
                  >
                    {val.name}
                  </Checkbox>
                </Col>
                <Col span={20}>
                  {val.prefectures.map((valPref, keyPref) => (
                    <Checkbox
                      key={`reg-${valPref.name}`}
                      onChange={e => handleChangeRegion(e, 'children', key, keyPref)}
                      checked={valPref.checked}
                      value={valPref.id}
                      style={{ margin: '0 15px' }}
                    >
                      {valPref.name}
                    </Checkbox>
                  ))}
                </Col>
              </Fragment>
            )
          })}
        </Row>
      </Card>
    </Col>
  )
}

ChecklistPrefectures.propTypes = {
  handleCheckAll: PropTypes.func,
  regionCheckAll: PropTypes.bool,
  dataRegion: PropTypes.array,
  handleChangeRegion: PropTypes.func,
}

export default ChecklistPrefectures
