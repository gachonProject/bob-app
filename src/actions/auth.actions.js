import { auth, firestore, firebaseInstance } from "../fbase";
import { authConstants } from "./constants";

export const signup = (user) => {
  //   const { auth, firestore } = firebase;
  return async (dispatch) => {
    const db = firestore;
    dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });
    auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log("data: ", data);
        const currentUser = auth.currentUser;
        const name = user.name;
        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            // 성공 시
            db.collection("users")
              .doc(data.user.uid)
              .set({
                name,
                email: user.email,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true,
                reportCount: 0,
              })
              .then(() => {
                const loggedInUser = {
                  name,
                  uid: data.user.uid,
                  email: user.email,
                };
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("User logged in successfully");
                dispatch({
                  type: `${authConstants.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
              });
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: `${authConstants.USER_LOGIN}_FAILURE`,
              payload: { error },
            });
          });
      })
      .catch((error) => {
        console.log(user);
      });
  };
};

export const signIn = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });
    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);

        const db = firestore;
        db.collection("users")
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const name = data.user.displayName;
            const loggedInUser = {
              name,
              uid: data.user.uid,
              email: data.user.email,
            };
            localStorage.setItem("user", JSON.stringify(loggedInUser));

            dispatch({
              type: `${authConstants.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedInUser },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: `${authConstants.USER_LOGIN}_FAILURE`,
          payload: { error },
        });
        alert("아이디 또는 비밀번호를 확인해주세요.");
      });
  };
};

export const isLoggedInUser = () => {
  return async (dispatch) => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    if (user) {
      dispatch({
        type: `${authConstants.USER_LOGIN}_SUCCESS`,
        payload: { user },
      });
    } else {
      dispatch({
        type: `${authConstants.USER_LOGIN}_FAILURE`,
        payload: { error: "Login again please" },
      });
    }
  };
};

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstants.USER_LOGOUT}_REQUEST` });
    // 로그아웃
    const db = firestore;
    db.collection("users")
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        auth
          .signOut()
          .then(() => {
            localStorage.clear();
            dispatch({ type: `${authConstants.USER_LOGOUT}_SUCCESS` });
          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: `${authConstants.USER_LOGOUT}_FAILURE`, payload: { error } });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const reauthentificate = (currentPassword) => {
  const user = auth.currentUser;
  const cred = firebaseInstance.auth.EmailAuthProvider.credential(user.email, currentPassword);
  return user.reauthenticateWithCredential(cred);
};

export const changePassword = (currentPassword, newPassword) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstants.CHANGE_PASSWORD}_REQUEST` });
    reauthentificate(currentPassword)
      .then(() => {
        const user = auth.currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            alert("비밀번호 변경 완료");
          })
          .catch((error) => {
            alert("현재 비밀번호가 일치하지 않습니다.");
          });
      })
      .catch((error) => {
        alert("현재 비밀번호가 일치하지 않습니다.");
      });
  };
};

export const deleteAccount = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstants.DELETE_USER}_REQUEST` });
    const db = firestore;

    const currentUser = auth.currentUser;
    currentUser.delete();

    db.collection("users")
      .doc(uid)
      .delete()
      .then(() => {
        // alert("회원 탈퇴 성공");
        auth.signOut().then(() => {
          localStorage.clear();
          dispatch({ type: `${authConstants.USER_LOGOUT}_SUCCESS` });
          alert("회원 탈퇴 성공");
        });
      })
      .catch((error) => {
        console.log(error);
        alert("회원탈퇴 실패");
      });
  };
};
