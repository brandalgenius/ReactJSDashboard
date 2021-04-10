import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import Layout from 'layouts'

const routes = [
  // Landing
  {
    path: '/home',
    Component: lazy(() => import('pages/auth/login')),
    exact: true,
  },
  // Activation Link
  {
    path: '/activation/:email/:code',
    Component: lazy(() => import('pages/activation')),
    exact: true,
  },
  // Auth Pages
  {
    path: '/auth/login',
    Component: lazy(() => import('pages/auth/login')),
    exact: true,
  },
  {
    path: '/auth/forgot-password',
    Component: lazy(() => import('pages/auth/forgot-password')),
    exact: true,
  },
  {
    path: '/auth/register',
    Component: lazy(() => import('pages/auth/register')),
    exact: true,
  },
  {
    path: '/auth/lockscreen',
    Component: lazy(() => import('pages/auth/lockscreen')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('pages/auth/404')),
    exact: true,
  },
  {
    path: '/auth/500',
    Component: lazy(() => import('pages/auth/500')),
    exact: true,
  },
  {
    path: '/auth/forgot-password/:token',
    Component: lazy(() => import('pages/auth/new-password')),
    exact: true,
  },

  // Dashboard
  {
    path: '/dashboard/home',
    Component: lazy(() => import('pages/dashboard/home')),
    exact: true,
  },
  {
    path: '/dashboard/report/conversion',
    Component: lazy(() => import('pages/dashboard/report/conversion')),
    exact: true,
  },
  {
    path: '/dashboard/report/global',
    Component: lazy(() => import('pages/dashboard/report/global')),
    exact: true,
  },
  {
    path: '/dashboard/traffic',
    Component: lazy(() => import('pages/dashboard/traffic')),
    exact: true,
  },
  {
    path: '/dashboard/payment',
    Component: lazy(() => import('pages/dashboard/payment')),
    exact: true,
  },
  {
    path: '/dashboard/generate',
    Component: lazy(() => import('pages/dashboard/generate')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

@connect(mapStateToProps)
class Router extends React.Component {
  render() {
    const { history, routerAnimation } = this.props
    return (
      <ConnectedRouter history={history}>
        <Layout>
          <Route
            render={state => {
              const { location } = state
              return (
                <SwitchTransition>
                  <CSSTransition
                    key={location.pathname}
                    appear
                    classNames={routerAnimation}
                    timeout={routerAnimation === 'none' ? 0 : 300}
                  >
                    <Switch location={location}>
                      {routes.map(({ path, Component, exact }) => (
                        <Route
                          path={path}
                          key={path}
                          exact={exact}
                          render={props => {
                            return (
                              <div className={routerAnimation}>
                                <Suspense fallback={null}>
                                  <Component {...props} />
                                </Suspense>
                              </div>
                            )
                          }}
                        />
                      ))}
                      <Route exact path="/" render={() => <Redirect to="/home" />} />
                      <Redirect to="/auth/404" />
                    </Switch>
                  </CSSTransition>
                </SwitchTransition>
              )
            }}
          />
        </Layout>
      </ConnectedRouter>
    )
  }
}

export default Router
