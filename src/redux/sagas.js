import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import register from './register/sagas'
import listing from './listing/sagas'
import institution from './institution/sagas'
import membersSearch from './membersSearch/sagas'
import industry from './industry/sagas'
import biddingMethod from './biddingMethod/sagas'
import category from './category/sagas'

export default function* rootSaga() {
  yield all([
    user(),
    menu(),
    settings(),
    register(),
    institution(),
    membersSearch(),
    listing(),
    industry(),
    biddingMethod(),
    category(),
  ])
}
