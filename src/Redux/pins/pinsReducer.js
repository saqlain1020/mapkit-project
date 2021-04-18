import { SET_ALL_PINS, CLEAN_ALL_PINS } from "./pinsConstants";

const initialState = {
  allPins: [],
};

const pinsReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case SET_ALL_PINS:
      return {
        ...state,
        allPins: [...payload],
      };
    case CLEAN_ALL_PINS:
      return {
        ...state,
        allPins: [],
      };
    default:
      return state;
  }
};

export default pinsReducer;
