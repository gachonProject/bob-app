import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions";
import Layout from "../../components/Layout";
import gravatar from "gravatar";
import { Container, UserInfo, Account, Buttons } from "./styles";

const ProfilePage = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Layout title="프로필">
      <Container>
        <UserInfo>
          <div className="user-image">
            <img src={gravatar.url(auth.email, { s: "72px", d: "retro" })} alt={auth.name} />
          </div>
          <div className="user-data">
            <b className="email">이메일: {auth.email}</b>
            <span>이름: {auth.name}</span>
          </div>
        </UserInfo>
        <Account>
          <h3>계정</h3>
          <Link to="/changepassword">비밀번호 변경</Link>
          <Link to="/deleteuser">회원 탈퇴</Link>
        </Account>
        <Buttons>
          <button className="btn btn-logout" onClick={() => dispatch(logout(auth.uid))}>
            <h3>로그아웃</h3>
          </button>
        </Buttons>
        {auth.email === "admin@gmail.com" ? (
          <Account>
            <h3>관리자 기능</h3>
            <Link to="/admin">회원관리</Link>
          </Account>
        ) : null}
      </Container>
    </Layout>
  );
};

export default ProfilePage;
