import React from 'react'
import UserMenu from './UserMenu'
import style from './style.module.scss'

class TopBar extends React.Component {
  render() {
    return (
      <div className={style.topbar}>
        <div className="mr-auto"></div>
        <div className="">
          <UserMenu />
        </div>
      </div>
    )
  }
}

export default TopBar
