import { commentConstants } from "./constants";
import { auth, firebaseInstance, firestore } from "../fbase";

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return year + month + day + " " + hours + ":" + minutes + ":" + seconds;
};

export const addComment = (contents) => {
  return async (dispatch) => {
    const currentUser = auth.currentUser;
    const db = firestore;

    db.collection("comments")
      .add({
        ...contents,
        owner: currentUser.uid,
        ownerEmail: currentUser.email,
        createdAt: getToday(),
      })
      .then((data) => {
        dispatch({
          type: `${commentConstants.ADD_COMMENT}_SUCCESS`,
        });
        console.log("댓글 등록", data);
      })
      .catch(() => {
        dispatch({
          type: `${commentConstants.ADD_COMMENT}_FAILURE`,
        });
      });
  };
};

export const getCommentList = (boardId) => {
  return async (dispatch) => {
    // console.log(boardId);
    const db = firestore;
    const unsubscribe = db
      .collection("comments")
      .where("boardId", "==", boardId)
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const comments = [];
        querySnapshot.forEach((document) => {
          const commentObj = {
            ...document.data(),
            id: document.id,
          };
          comments.push(commentObj);
        });
        // console.log(comments);
        dispatch({
          type: `${commentConstants.GET_COMMENTS}_SUCCESS`,
          payload: { comments },
        });
      });

    return unsubscribe;
  };
};
