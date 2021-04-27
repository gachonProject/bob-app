import { boardConstants } from "./constants";
import { auth, firestore } from "../fbase";

export const addPost = (contents) => {
  return (dispatch) => {
    const currentUser = auth.currentUser;
    const db = firestore;
    console.log(currentUser);

    db.collection("board")
      .add({
        ...contents,
        owner: currentUser.uid,
        ownerEmail: currentUser.email,
        createdAt: new Date().toString(),
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
  return (dispatch) => {
    const db = firestore;
    db.collection("board")
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
  };
};

export const getPostData = (boardId) => {
  return (dispatch) => {
    const db = firestore.collection("board").doc(boardId);
    db.get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({
            type: `${boardConstants.GET_POST_DATA}_SUCCESS`,
            payload: doc.data(),
          });
          console.log(doc.data().owner);
          const db2 = firestore.collection("users").doc(doc.data().owner);
          db2
            .get()
            .then((doc) => {
              if (doc.exists) {
                dispatch({
                  type: `${boardConstants.GET_OWNER_DATA}_SUCCESS`,
                  payload: doc.data(),
                });
                console.log(doc.data());
              } else {
                console.log(doc);
                console.log("존재하지 않는 게시자입니다..");
              }
            })
            .catch((error) => {
              console.log(error);
              console.log("게시자 조회에 실패했습니다.");
            });
        } else {
          alert("존재하지 않는 게시물입니다");
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
  };
};
