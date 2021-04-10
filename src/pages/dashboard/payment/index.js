import { Helmet } from 'react-helmet'
import React, { useEffect, useState } from 'react'
import Chart11 from 'components/kit-widgets/Charts/11'
import clickdealerService from 'services/clickdealer/clickdealerService'
import moment from 'moment-timezone'


const Payment = () => {
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
        <strong>Revenue</strong>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <Chart11 name="Your Revenue" total={dataConversions?.summary?.revenue ?? 0} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
