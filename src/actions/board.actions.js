import { boardConstants } from "./constants";
import { auth, firestore } from "../fbase";

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

export const addPost = (contents) => {
  return (dispatch) => {
    const currentUser = auth.currentUser;
    const db = firestore;

    db.collection("board")
      .add({
        ...contents,
        owner: currentUser.uid,
        ownerEmail: currentUser.email,
        createdAt: getToday(),
        reportCount: 0,
        reportUsers: [],
      })
      .then((data) => {
        dispatch({
          type: `${boardConstants.ADD_POST}_SUCCESS`,
        });
        console.log("게시글 등록", data);
      })
      .catch(() => {
        dispatch({
          type: `${boardConstants.ADD_POST}_FAILURE`,
        });
      });
  };
};

export const getPostList = () => {
  return async (dispatch) => {
    const db = firestore;
    const unsubscribe = db
      .collection("board")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((document) => {
          const postObj = {
            ...document.data(),
            id: document.id,
          };
          posts.push(postObj);
        });
        console.log(posts);
        dispatch({
          type: `${boardConstants.GET_POSTS}_SUCCESS`,
          payload: { posts },
        });
      })
      .catch((error) => {
        dispatch({
          type: `${boardConstants.GET_POSTS}_FAILURE`,
        });
      });
    return unsubscribe;
  };
};

export const getPostData = (boardId) => {
  return async (dispatch) => {
    const db = await firestore.collection("board").doc(boardId);
    const unsubscribe = db
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({
            type: `${boardConstants.GET_POST_DATA}_SUCCESS`,
            payload: doc.data(),
          });
          // console.log(doc.data().owner);
          const db2 = firestore.collection("users").doc(doc.data().owner);
          db2
            .get()
            .then((doc) => {
              if (doc.exists) {
                dispatch({
                  type: `${boardConstants.GET_OWNER_DATA}_SUCCESS`,
                  payload: doc.data(),
                });
                // console.log(doc.data());
              } else {
                console.log(doc);
                // console.log("존재하지 않는 게시자입니다..");
              }
            })
            .catch((error) => {
              console.log(error);
              console.log("게시자 조회에 실패했습니다.");
            });
        } else {
          // alert("존재하지 않는 게시물입니다");
          dispatch({
            type: `${boardConstants.GET_POST_DATA}_FAILURE`,
          });
        }
      })
      .catch((error) => {
        alert("게시글 조회에 실패했습니다.");
        dispatch({
          type: `${boardConstants.GET_POST_DATA}_FAILURE`,
        });
      });
    return unsubscribe;
  };
};

export const updatePost = (contents, boardId) => {
  return async (dispatch) => {
    const db = await firestore;

    db.collection("board")
      .doc(boardId)
      .update({
        ...contents,
        date: getToday(),
      })
      .then((data) => {
        dispatch({
          type: `${boardConstants.UPDATE_POST}_SUCCESS`,
        });
        console.log("게시글 등록", data);
      })
      .catch(() => {
        dispatch({
          type: `${boardConstants.UPDATE_POST}_FAILURE`,
        });
      });
  };
};

export const resetData = () => {
  return (dispatch) => {
    dispatch({
      type: `${boardConstants.RESET_DATA}_SUCCESS`,
    });
  };
};
