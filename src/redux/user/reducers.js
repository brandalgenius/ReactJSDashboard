import actions from './actions'

const initialState = {
  id: '',
  name: '',
  email: '',
  fullName: '',
  fullNameKana: '',
  phone: '',
  profilePhoto: '',
  role: '',
  adminMember: false,
  token: '',
  avatar: '',
  authorized: false,
  loading: false,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
