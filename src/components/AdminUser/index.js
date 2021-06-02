import React, { useCallback, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../fbase";

const AdminUser = ({ user: u }) => {
  let [user, setUser] = useState(u);

  let boardid = [];
  firestore
    .collection("board")
    .where("owner", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        boardid.push(doc.id);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  function del() {
    const uuser = auth;

    uuser
      .delete(user.uid)
      .then(function () {})
      .catch(function (error) {});

    boardid.map((board) => {
      firestore
        .collection("board")
        .doc(board)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    });

    firestore
      .collection("users")
      .doc(user.uid)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  return (
    <>
      <tr>
        {user.email !== "admin@gmail.com" ? (
          <>
            <td>
              <Link to={`/adminuserdetail/${user.uid}`}>{user.name}</Link>
            </td>
            <td>
              <Link to={`/adminuserdetail/${user.uid}`}>{user.email}</Link>
            </td>
            <td>
              <button onClick={del}>Delete</button>
            </td>
          </>
        ) : null}
      </tr>
    </>
  );
};

export default AdminUser;
