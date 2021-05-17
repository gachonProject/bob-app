import React, { useEffect } from "react";
import { deleteAccount } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

const DeleteUserPage = ({ history }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      return <Redirect to="/login" />;
    }
  }, [auth]);

  const onDeleteUser = () => {
    dispatch(deleteAccount(auth.uid));
    // history.push("/login");
  };

  return <button onClick={onDeleteUser}>회원 탈퇴</button>;
};

export default DeleteUserPage;
