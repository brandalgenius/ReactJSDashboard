import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Chart11 from 'components/kit-widgets/Charts/11'
import TrafficTableComponent from 'components/Traffic'
import ConversionTableComponent from 'components/ConversionTable'
import GlobalTableComponent from 'components/GlobalTable/GlobalTable.component'
import clickdealerService from 'services/clickdealer/clickdealerService'
import moment from 'moment-timezone'

const DashboardHome = () => {
  const [dataConversions, setDataConversion] = useState([])

  useEffect(() => {
    const GET_CONVERSION = async () => {
      await clickdealerService
        .GET_GLOBAL_CONVERSION(
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
      <Helmet title="Dashboard: Analytics" />
      <div className="cui__utils__heading">
        <strong>Summary</strong>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <Chart11 name="Valid Click" total={dataConversions?.summary?.revenue ?? 0} />
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <Chart11 name="Invalid Click" total={dataConversions?.summary?.conversions ?? 0} />
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <Chart11 name="Total Revenue" total={dataConversions?.summary?.conversions ?? 0} />
          </div>
        </div>
      </div>
      <div className="cui__utils__heading">
        <strong>Conversion Report</strong>
        <ConversionTableComponent dataSource={dataConversions.conversions} />
        </div>
      <div className="cui__utils__heading">
      <strong>Global Traffic</strong>
      <GlobalTableComponent dataSource={dataConversions.subaffiliates} />
      </div>
      <div className="cui__utils__heading">
      <strong>Traffic Log</strong>
      <TrafficTableComponent dataSource={dataConversions.conversions} />
      </div>
    </div>
  )
}

export default DashboardHome
