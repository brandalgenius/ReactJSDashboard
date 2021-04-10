import React, { useEffect, useState } from 'react'
import ConversionTableComponent from 'components/ConversionTable'
import clickdealerService from 'services/clickdealer/clickdealerService'
import moment from 'moment-timezone'
import { Row, Col } from 'antd'
import { Search } from 'containers'

const ConversionReportPage = () => {
  const [dataConversions, setDataConversion] = useState([])

  const onChangeDateFilter = async (dateStart, dateEnd, startRow, limitRow) => {
    await clickdealerService
      .GET_REPORT_CONVERSION(`${dateStart}+00:00:00`, `${dateEnd}+23:59:59`, startRow, limitRow)
      .then(conversions => {
        if (conversions) {
          setDataConversion(conversions)
        }
      })
  }

  useEffect(() => {
    const GET_CONVERSION = async () => {
      await clickdealerService
        .GET_REPORT_CONVERSION(
          `${moment()
            .tz('Europe/London')
            .format('MM/DD/YYYY')}+00:00:00`,
          `${moment()
            .tz('Europe/London')
            .format('MM/DD/YYYY')}+23:59:59`,
        )
        .then(conversions => {
          if (conversions) {
            setDataConversion(conversions)
          }
        })
    }
    GET_CONVERSION()
  }, [])

  return (
    <div>
      <Row>
        <Col span={24}>
          <Search onChangeDate={onChangeDateFilter} />
        </Col>
      </Row>
      <ConversionTableComponent dataSource={dataConversions.conversions} />
    </div>
  )
}

export default ConversionReportPage
