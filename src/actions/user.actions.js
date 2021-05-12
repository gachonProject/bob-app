import { userConstants } from "./constants";
import { firestore } from "../fbase";

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return year + month + day + " " + hours + ":" + minutes + ":" + seconds;
};

export const getRealtimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

    const db = firestore;
    const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== uid) {
          users.push(doc.data());
        }
      });

      dispatch({ type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`, payload: { users } });
    });
    return unsubscribe;
  };
};

export const updateMessage = (msgObj) => {
  return async (dispatch) => {
    const db = firestore;
    db.collection("conversations")
      .add({
        ...msgObj,
        isView: false,
        createdAt: getDate(),
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRealtimeConversations = (user) => {
  return async (dispatch) => {
    const db = firestore;
    db.collection("conversations")
      .where("user_uid_1", "in", [user.uid_1, user.uid_2])
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2) ||
            (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
          ) {
            conversations.push(doc.data());
          }
          if (conversations.length >= 0) {
            dispatch({
              type: userConstants.GET_REALTIME_MESSAGES,
              payload: { conversations },
            });
          } else {
            dispatch({
              type: `${userConstants.GET_REALTIME_MESSAGES}_FAILURE`,
              payload: { conversations: [] },
            });
          }
        });
        console.log(conversations);
      });
    // user_uid_1 === 'myId' and user_uid_2 === 'yourId'
    // OR user_uid_1 === 'yourId' and user_uid_2 === 'myId'
  };
};

export const getConversationList = (uid) => {
  return async (dispatch) => {
    const db = firestore;
    if (uid) {
      db.collection("conversations")
        .where("user_uid_1", "==", uid)
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnpshot) => {
          const conversationList = [];
          querySnpshot.forEach((doc) => {
            if (!conversationList.includes(doc.data().user_uid_2)) {
              conversationList.push(doc.data());
              conversationList.push(doc.data().user_uid_2);
            }
            // console.log(doc.data());
            dispatch({
              type: userConstants.GET_CONVERSATION_LIST,
              payload: { conversationList },
            });
          });
          console.log(conversationList);
        });
    }
  };
};
