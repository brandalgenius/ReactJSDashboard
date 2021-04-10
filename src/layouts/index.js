import React, { Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
// import Loader from 'components/layout/Loader'
import PublicLayout from './Public'
import AuthLayout from './Auth'
import MainLayout from './Main'

const Layouts = {
  public: PublicLayout,
  auth: AuthLayout,
  main: MainLayout,
}

@withRouter
@connect(({ user }) => ({ user }))
class Layout extends React.PureComponent {
  previousPath = ''

  componentDidUpdate(prevProps) {
    const {
      location: { pathname },
    } = this.props
    const {
      location: { pathname: prevPathname },
    } = prevProps
    if (pathname !== prevPathname) {
      window.scrollTo(0, 0)
    }
  }

  componentDidMount() {
    const stateUser = JSON.parse(localStorage.getItem('user'))
    const { dispatch } = this.props
    if (stateUser !== null) {
      dispatch({
        type: 'user/SET_STATE',
        payload: {
          loading: false,
          email: stateUser.email,
          fullName: stateUser.fullName,
          fullNameKana: stateUser.fullNameKana,
          phone: stateUser.phone,
          profilePhoto: stateUser.profilePhoto,
          role: stateUser.role,
          token: stateUser.token,
          adminMember: stateUser.adminMember,
          id: stateUser.id,
        },
      })
      dispatch({
        type: 'user/LOGIN',
        payload: {
          loading: false,
          user: {
            username: stateUser.username,
            token: stateUser.token,
          },
        },
      })
      // history.push('/admin/home')
    }
  }

  render() {
    const {
      children,
      location: { pathname, search },
      user,
    } = this.props

    // NProgress Management
    const currentPath = pathname + search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    setTimeout(() => {
      NProgress.done()
      this.previousPath = currentPath
    }, 300)

    // Layout Rendering
    const getLayout = () => {
      if (pathname === '/' || pathname === '/home') {
        return 'public'
      }

      if (/^\/auth(?=\/|$)/i.test(pathname) || /^\/activation(?=\/|$)/i.test(pathname)) {
        return 'auth'
      }
      return 'main'
    }

    const Container = Layouts[getLayout()]
    const isUserAuthorized = user.authorized
    const isUserLoading = user.loading
    const isAuthLayout = getLayout() === 'auth'
    const isDashboardLayout = getLayout() === 'main'

    const BootstrappedLayout = () => {
      // show loader when user in check authorization process, not authorized yet and not on login pages
      if (isUserLoading && !isUserAuthorized && !isAuthLayout) {
        return null
      }

      if (isDashboardLayout && !isUserAuthorized) {
        return <Redirect to="/auth/login" />
      }

      return <Container>{children}</Container>
    }

    return (
      <Fragment>
        <Helmet titleTemplate="Jalan Ninja | %s" title="Admin" />
        {BootstrappedLayout()}
      </Fragment>
    )
  }
}

export default Layout
