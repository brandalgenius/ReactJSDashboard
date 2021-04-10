import React from 'react'
import style from './style.module.scss'

class Footer extends React.Component {
  render() {
    return (
      <div className={style.footer}>
        <div className={style.footerInner}>
          <br />
          <p className="mb-0">Copyright © 2020 Jalan Ninja</p>
        </div>
      </div>
    )
  }
}

export default Footer
