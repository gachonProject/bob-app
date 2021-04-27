import styled from "styled-components";

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 65px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  display: flex;
  overflow-x: auto;
  .nav__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    min-width: 50px;
    overflow: hidden;
    white-space: nowrap;
    font-family: sans-serif;
    font-size: 13px;
    color: #444444;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.1s ease-in-out;
    padding-bottom: 10px;
  }

  .nav__link:hover {
    background-color: #eeeeee;
  }

  .nav__link--active {
    color: #009578;
  }

  .nav__icon {
    font-size: 18px;
  }
`;
