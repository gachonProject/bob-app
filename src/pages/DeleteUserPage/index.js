import React, { useEffect } from "react";
import { deleteAccount } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Container } from "./styles";
import { Buttons } from "../ProfilePage/styles";
import Layout from "../../components/Layout";
import { firestore } from "../../fbase";

const DeleteUserPage = ({ history }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      return <Redirect to="/login" />;
    }
  }, [auth]);

  let boardid = [];
  let commentid = [];
  let convid1 = [];
  let convid2 = [];

  useEffect(() => {
    if (!auth.authenticated) {
      return <Redirect to="/login" />;
    }
  }, [auth]);

  firestore
    .collection("board")
    .where("owner", "==", auth.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        boardid.push(doc.id);
      });
    })
    .catch((error) => {});

  firestore
    .collection("comments")
    .where("owner", "==", auth.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        commentid.push(doc.id);
      });
    })
    .catch((error) => {});

  firestore
    .collection("conversations")
    .where("user_uid_1", "==", auth.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        convid1.push(doc.id);
      });
    })
    .catch((error) => {});

  firestore
    .collection("conversations")
    .where("user_uid_2", "==", auth.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        convid2.push(doc.id);
      });
    })
    .catch((error) => {});

  const onDeleteUser = () => {
    dispatch(deleteAccount(auth.uid));
    boardid.map((board) => {
      firestore
        .collection("board")
        .doc(board)
        .delete()
        .then(() => {})
        .catch((error) => {});
      const comid = [];
      firestore
        .collection("comments")
        .where("boardId", "==", board)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            comid.push(doc.id);
          });
        })
        .catch((error) => {});
      comid.map((com) => {
        firestore
          .collection("comments")
          .doc(com)
          .delete()
          .then(() => {})
          .catch((error) => {});
      });
    });

    commentid.map((comment) => {
      firestore
        .collection("comments")
        .doc(comment)
        .delete()
        .then(() => {})
        .catch((error) => {});
    });

    convid1.map((con1) => {
      firestore
        .collection("conversations")
        .doc(con1)
        .delete()
        .then(() => {})
        .catch((error) => {});
    });

    convid2.map((con2) => {
      firestore
        .collection("conversations")
        .doc(con2)
        .delete()
        .then(() => {})
        .catch((error) => {});
    });
  };

  return (
    <>
      <Layout title={"?????? ??????"}>
        <Container>
          <div className="alert-message">
            <p>?????? ???????????? ???????????????????</p>
            <p>???????????? ??? ???????????? ?????? ???????????? ?????????</p>
            <p>?????? ???????????????.</p>
          </div>
          <Buttons>
            <button className="btn btn-cancel" onClick={() => history.push("/profile")}>
              ??????
            </button>
            <button className="btn btn-logout" onClick={onDeleteUser}>
              ?????? ??????
            </button>
          </Buttons>
        </Container>
      </Layout>
    </>
  );
};

export default DeleteUserPage;
