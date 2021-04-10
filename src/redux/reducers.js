import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import register from './register/reducers'
import membersSearch from './membersSearch/reducers'
import institution from './institution/reducers'
import listing from './listing/reducers'
import industry from './industry/reducers'
import biddingMethod from './biddingMethod/reducers'
import category from './category/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    register,
    membersSearch,
    institution,
    listing,
    industry,
    biddingMethod,
    category,
  })
