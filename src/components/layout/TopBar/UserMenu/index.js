import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Menu, Dropdown, Avatar, Badge } from 'antd'
import styles from './style.module.scss'
import { Link } from 'react-router-dom'

@connect(({ user }) => ({ user }))
class ProfileMenu extends React.Component {
  state = {
    count: 0,
  }

  logout = e => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch({
      type: 'user/LOGOUT',
    })
  }

  addCount = () => {
    let { count } = this.state
    count += 1
    this.setState({
      count,
    })
  }

  render() {
    const { user } = this.props
    const { count } = this.state
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          Hi, <strong>{user.fullName}</strong>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link to="/admin/my-profile">
            <i className="fe fe-user mr-2" />
            My Profile
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="#" onClick={this.logout}>
            <i className="fe fe-log-out mr-2" />
            <FormattedMessage id="topBar.profileMenu.logout" />
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown
        overlay={menu}
        trigger={['click']}
        onVisibleChange={() => {
          return
        }}
      >
        <div className={styles.dropdown}>
          <Badge count={count}>
            <Avatar
              src={user.profilePhoto}
              className={styles.avatar}
              shape="square"
              size="large"
              icon="user"
            />
          </Badge>
        </div>
      </Dropdown>
    )
  }
}

export default ProfileMenu
