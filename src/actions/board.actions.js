import { boardConstants } from "./constants";
import { auth, firestore, firebaseInstance } from "../fbase";

export const addPost = (contents) => {
  return (dispatch) => {
    const currentUser = auth.currentUser;
    const db = firestore;
    console.log(currentUser);

    db.collection("board")
      .add({
        ...contents,
        owner: currentUser.uid,
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
          type: `${boardConstants.GET_POST}_SUCCESS`,
          payload: { posts },
        });
      })
      .catch((error) => {
        dispatch({
          type: `${boardConstants.GET_POST}_FAILURE`,
        });
      });
  };
};

// export const firebase_board_list = () => {
//   return (dispatch) => {
//     return firestore
//       .collection("boards")
//       .orderBy("brddate", "desc")
//       .get()
//       .then((snapshot) => {
//         var rows = [];
//         snapshot.forEach((doc) => {
//           var childData = doc.data();
//           childData.brddate = dateFormat(childData.brddate, "yyyy-mm-dd");
//           rows.push(childData);
//         });
//         dispatch(board_list(rows));
//       });
//   };
// };
