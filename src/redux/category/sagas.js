import { all, takeEvery, put } from 'redux-saga/effects'
import actions from './actions'

export function* SUBMIT({ payload }) {
    // console.log(payload)
  yield put({
    type: actions.SET_STATE,
    payload,
  })
}

export function* PAGE({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload,
  })
}

export default function* rootSaga() {
  yield all([takeEvery(actions.SUBMIT, SUBMIT), takeEvery(actions.PAGE, PAGE)])
}