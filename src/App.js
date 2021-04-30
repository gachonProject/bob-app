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
import { useEffect } from "react";
import { isLoggedInUser } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import BoardWritePage from "./pages/BoardWritePage";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <PrivateRoute exact path="/board" component={BoardPage} />
          <PrivateRoute path="/board/:boardId" component={BoardDetailPage} />
          <PrivateRoute exact path="/chatlist" component={ChatListPage} />
          <PrivateRoute path="/chatlist/:uid_1/:uid_2" component={ChatPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/changepassword" component={ChangePasswordPage} />
          <PrivateRoute path="/deleteuser" component={DeleteUserPage} />
          <PrivateRoute path="/write" component={BoardWritePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
