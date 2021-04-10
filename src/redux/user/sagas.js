import { all, takeEvery, put, call } from 'redux-saga/effects'
import { store as reduxStore } from 'index'
import { FB_currentAccount, FB_logout } from 'services/firebase.auth'
import { JWT_currentAccount, JWT_logout } from 'services/jwt.auth'
import actions from './actions'

export function* LOGIN({ payload }) {
  const isLoading = payload.loading
  if (isLoading) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: true,
      },
    })
  } else {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }

  if (payload.user.token !== '') {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: payload.loading,
        username: payload.user.username,
        token: payload.user.token,
        authorized: true,
      },
    })
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
  }
}

export function* LOAD_CURRENT_ACCOUNT() {
  const provider = reduxStore.getState().settings.authProvider
  const currentAccount = provider === 'firebase' ? FB_currentAccount : JWT_currentAccount
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(currentAccount)
  if (response) {
    const { uid: id, email, photoURL: avatar } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        name: 'Administrator',
        email,
        avatar,
        role: 'admin',
        authorized: true,
      },
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  const provider = reduxStore.getState().settings.authProvider
  const logout = provider === 'firebase' ? FB_logout : JWT_logout
  yield call(logout)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
    },
  })
  localStorage.clear('user')
  localStorage.clear('menu')
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
