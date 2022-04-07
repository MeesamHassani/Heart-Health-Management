import * as T from '../type';

const initialState = {
  allData: null,
  prediction: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.FETCH_ALL_DATA:
      return {
        ...state,
        allData: action.payload,
      };
    case T.GET_PREDICTION:
      return {
        ...state,
        prediction: action.payload,
      };
    default:
      return state;
  }
};
