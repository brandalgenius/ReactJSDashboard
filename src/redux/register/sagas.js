import { all, takeEvery, put } from 'redux-saga/effects'
import actions from './actions'

export function* SUBMIT({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload,
  })
}

export default function* rootSaga() {
  yield all([takeEvery(actions.SET_STATE, SUBMIT)])
}
