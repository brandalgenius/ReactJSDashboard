import React from 'react'
import Sparkline from '@rowno/sparkline'
import style from './style.module.scss'

const Chart11 = props => {
  const { name, total, statistics = [] } = props
  const options = {
    width: 120,
    height: 110,
    lines: [
      {
        values: statistics,
        colors: {
          area: 'rgba(75,124,243, 0.1)',
          line: '#4b7cf3',
        },
      },
    ],
  }
  return (
    <div className="card-body overflow-hidden position-relative">
      <div className="font-size-36 font-weight-bold text-dark mb-n2">{total}</div>
      <div className="text-uppercase">{name}</div>
      <div className={style.chartContainer}>
        <div className={style.chart}>
          <Sparkline {...options} />
        </div>
      </div>
    </div>
  )
}

export default Chart11
