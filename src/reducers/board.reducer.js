import { boardConstants } from "../actions/constants";
import { toast } from "react-toastify";

const initState = {
  posts: [],
  postData: {},
  ownerData: {},
};

export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case `${boardConstants.ADD_POST}_SUCCESS`: {
      toast.success("게시글이 등록되었습니다.");
      return state;
    }

    case `${boardConstants.ADD_POST}_FAILURE`: {
      toast.error("게시글 등록 중 오류가 발생했습니다.");
      return state;
    }

    case `${boardConstants.REMOVE_POST}_SUCCESS`: {
      toast.warn("게시글이 삭제되었습니다.");
      return state;
    }

    case `${boardConstants.GET_POSTS}_SUCCESS`: {
      state = {
        ...state,
        posts: action.payload.posts,
      };
      break;
    }

    case `${boardConstants.GET_POSTS}_FAILURE`: {
      return state;
    }

    case `${boardConstants.GET_POST_DATA}_SUCCESS`: {
      state = {
        ...state,
        postData: action.payload,
      };
      break;
    }

    case `${boardConstants.GET_POST_DATA}_FAILURE`: {
      return state;
    }

    case `${boardConstants.GET_OWNER_DATA}_SUCCESS`: {
      state = {
        ...state,
        ownerData: action.payload,
      };
      break;
    }

    case `${boardConstants.GET_OWNER_DATA}_FAILURE`: {
      return state;
    }

    case `${boardConstants.REMOVE_POST}_FAILURE`: {
      toast.error("게시글 삭제 중 오류가 발생했습니다.");
      return state;
    }

    case `${boardConstants.RESET_DATA}_SUCCESS`: {
      state = {
        postData: {},
        posts: [],
        ownerData: {},
      };
    }

    // case `${boardConstants.UPDATE_POST}_SUCCESS`
  }
  return state;
};
