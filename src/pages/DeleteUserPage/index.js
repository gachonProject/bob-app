import React, { useEffect } from "react";
import { deleteAccount } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Container } from "./styles";
import { Buttons } from "../ProfilePage/styles";
import Layout from "../../components/Layout";

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

  return (
    <>
      <Layout title={"회원 탈퇴"}>
        <Container>
          <div className="alert-message">
            <p>정말 회원탈퇴 하시겠습니까?</p>
            <p>회원탈퇴 시 작성하신 모든 게시물과 댓글이</p>
            <p>함께 삭제됩니다.</p>
          </div>
          <Buttons>
            <button className="btn btn-cancel">취소</button>
            <button className="btn btn-logout" onClick={onDeleteUser}>
              회원 탈퇴
            </button>
          </Buttons>
        </Container>
      </Layout>
    </>
  );
};

export default DeleteUserPage;
