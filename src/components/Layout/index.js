import React from "react";
import Header from "../Header";
import Navbar from "../Navbar";
import { Container } from "./styles";

const Layout = (props) => {
  return (
    <Container>
      <Header title={props.title} />
      {props.children}
      <Navbar />
    </Container>
  );
};

export default Layout;
