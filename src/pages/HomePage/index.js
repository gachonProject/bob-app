import { Link } from "react-router-dom";
import "./style.css";

const HomePage = () => {
  return (
    <div>
      <Link to="/board">
        <h1>게시판</h1>
      </Link>
      <Link to="/chatlist">
        <h1>채팅목록</h1>
      </Link>
      <Link to="/profile">
        <h1>프로필</h1>
      </Link>
    </div>
  );
};

export default HomePage;
