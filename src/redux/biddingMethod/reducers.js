import actions from './actions'

const initialState = {
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    offset: 0,
    paged: true,
    unpaged: false,
  },
  totalPages: 0,
  totalElements: 0,
  last: false,
  first: false,
  sort: {
    sorted: false,
    unsorted: true,
    empty: true,
  },
  size: 10,
  number: 1,
  numberOfElements: 0,
  empty: true,
  biddingMethodId: null,
  details: [],
}

export default function biddingMethodReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
