import React from "react";
import { Link, useParams } from "react-router-dom";
import { Nav } from "./styles";

const Navbar = () => {
  const { path } = useParams();
  return (
    <Nav>
      <Link to="/board" className="nav__link">
        <i className="material-icons nav__icon">dashboard</i>
        <span className="nav__text">게시판</span>
      </Link>
      <Link to="/chatlist" className="nav__link">
        <i className="material-icons nav__icon">chat</i>
        <span className="nav__text">채팅목록</span>
      </Link>
      <Link to="/profile" className="nav__link">
        <i className="material-icons nav__icon">person</i>
        <span className="nav__text">프로필</span>
      </Link>
    </Nav>
  );
};

export default Navbar;
