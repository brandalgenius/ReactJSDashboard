import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'
import { history } from 'index'

@Form.create()
@connect(({ user, settings }) => ({
  user,
  authProvider: settings.authProvider,
  logo: settings.logo,
}))
class Login extends React.Component {
  onSubmit = async event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields(async (error, values) => {
      if (!error) {
        if (values.username === 'jalanninja' && values.password === 'jalanninja') {
          dispatch({
            type: 'user/SET_STATE',
            payload: {
              loading: false,
              email: 'jalan@ninja.com',
              fullName: 'Jalan',
              fullNameKana: 'Jalan Ninja',
              phone: '-',
              profilePhoto:
                'https://c7.uihere.com/files/157/327/814/computer-icons-encapsulated-postscript-social-media-ninja-avatar.jpg',
              role: 'ROLE_ADMINISTRATOR',
              token: 'kontol',
              adminMember: true,
              id: 1,
            },
          })
          dispatch({
            type: 'user/LOGIN',
            payload: {
              loading: false,
              user: {
                username: values.username,
                token: 'kontol',
              },
            },
          })
          notification.success({
            message: 'Logged In',
            description: 'You have successfully logged in !',
          })
          localStorage.setItem(
            'user',
            JSON.stringify({
              email: 'jalan@ninja.com',
              fullName: 'Jalan',
              fullNameKana: 'Jalan Ninja',
              phone: '-',
              profilePhoto:
                'https://c7.uihere.com/files/157/327/814/computer-icons-encapsulated-postscript-social-media-ninja-avatar.jpg',
              role: 'ROLE_ADMINISTRATOR',
              token: 'kontol',
              adminMember: true,
              id: 1,
            }),
          )
          history.push('/dashboard/home')
        }
      }
    })
  }

  render() {
    const {
      form,
      user: { loading },
    } = this.props
    return (
      <div>
        <div className="text-center mb-5">
          <h2 className="mb-5 mt-5 px-3">
            <strong>jalan.ninja</strong>
          </h2>
        </div>
        <div className={`card ${style.container}`}>
          <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit} className="mb-4">
            <Form.Item>
              {form.getFieldDecorator('username', {
                rules: [{ required: true, message: 'Username must be filled !' }],
              })(<Input size="large" placeholder="username !" />)}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('password', {
                rules: [{ required: true, message: 'Your password must be filled' }],
              })(<Input size="large" type="password" placeholder="password" />)}
            </Form.Item>
            <Form.Item style={{ display: 'none' }}>
              {form.getFieldDecorator('rememberMe', {
                initialValue: false,
                valuePropName: 'checked',
                rules: [{ required: false }],
              })(<Checkbox>私を覚えてますか</Checkbox>)}
            </Form.Item>
            <Button
              type="primary"
              size="large"
              className="text-center w-100"
              htmlType="submit"
              loading={loading}
            >
              <strong>Login</strong>
            </Button>
          </Form>
          <Link to="/auth/forgot-password" className="kit__utils__link font-size-16">
            password nya lupa ? klik disini
          </Link>
        </div>
        <div className="text-center pt-2 mb-auto">
          <span className="mr-2">Belum punya akun ? </span>
          <Link to="/auth/register" className="kit__utils__link font-size-16">
            daftar sini gratis
          </Link>
        </div>
      </div>
    )
  }
}

export default Login
