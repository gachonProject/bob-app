import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";
// import { useDispatch, useSelector } from "react-redux";

const Header = ({ title }) => {
  // const auth = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#fafafa", color: "#c62828" }}>
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ textAlign: "center" }}>{title}</h2>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
