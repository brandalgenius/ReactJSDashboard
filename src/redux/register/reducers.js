import actions from './actions'

const initialState = {
  companyName: '',
  companyNameKana: '',
  postalCode: '',
  address: '',
  phoneNumber: '',
  faxNumber: '',
  picName: '',
  picNameKana: '',
  email: '',
  password: '',
  confirmPassword: '',
  planId: 0,
  areas: [],
}

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
