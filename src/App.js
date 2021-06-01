import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BoardPage from "./pages/BoardPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import ProfilePage from "./pages/ProfilePage";
import ChatListPage from "./pages/ChatListPage";
import ChatPage from "./pages/ChatPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import DeleteUserPage from "./pages/DeleteUserPage";
import PrivateRoute from "./components/PrivateRoute";
import BoardWritePage from "./pages/BoardWritePage";
import BoardUpdatePage from "./pages/BoardUpdatePage";
import AdminPage from "./pages/AdminPage";
import AdminUserDetailPage from "./pages/AdminUserDetailPage";
import ResetPWPage from "./pages/ResetPWPage";
import { useEffect } from "react";
import { isLoggedInUser } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { messaging } from "./fbase";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, []);

  //사용자에게 허가를 받아 토큰을 가져옵니다.
  useEffect(() => {
    const msg = messaging;
    msg
      .requestPermission()
      .then(() => {
        return msg.getToken();
      })
      .then((data) => {
        console.warn("token", data);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={BoardPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/resetpw" component={ResetPWPage} />
          <PrivateRoute exact path="/board" component={BoardPage} />
          <PrivateRoute path="/board/:boardId" component={BoardDetailPage} />
          <PrivateRoute exact path="/chatlist" component={ChatListPage} />
          <PrivateRoute path="/chatlist/:uid_1/:uid_2" component={ChatPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/changepassword" component={ChangePasswordPage} />
          <PrivateRoute path="/deleteuser" component={DeleteUserPage} />
          <PrivateRoute path="/write" component={BoardWritePage} />
          <PrivateRoute path="/update/:boardId" component={BoardUpdatePage} />
          <PrivateRoute path="/admin" component={AdminPage} />
          <PrivateRoute path="/adminuserdetail/:uid" component={AdminUserDetailPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
