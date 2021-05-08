import React from "react";
import Header from "../Header";
import Navbar from "../Navbar";
import { Container } from "./styles";

const Layout = ({ children, title, style }) => {
  return (
    <Container style>
      <Header title={title} />
      {children}
      <Navbar />
    </Container>
  );
};

export default Layout;
