import { commentConstants } from "../actions/constants";
import { toast } from "react-toastify";

const initState = {
  comments: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case `${commentConstants.ADD_COMMENT}_SUCCESS`: {
      return state;
    }

    case `${commentConstants.GET_COMMENTS}_SUCCESS`: {
      state = {
        ...state,
        comments: action.payload.comments,
      };
      break;
    }
  }

  return state;
};
