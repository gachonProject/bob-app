import styled from "styled-components";

export const Container = styled.div`
  margin: 5em 0.5em 0;
`;

export const UserInfo = styled.section`
  display: flex;
  .user-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 8px;
  }
  .user-image {
    img {
      border-radius: 16px;
    }
  }
`;

export const Account = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5em;
  margin: 1em 0;
  a {
    margin-top: 8px;
    text-decoration: none;
    color: black;
  }
  a:hover,
  a:active {
    color: black;
    text-decoration: none;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  .btn {
    display: inline-flex;
    justify-content: center;
    width: 100%;
    outline: none;
    border-radius: 4px;
    color: #c62828;
    font-weight: bold;
    cursor: pointer;
    padding: 8px 12px;
    font-size: 16px;
    background: white;
  }

  .btn-logout {
    border: 2px solid #c62828;
    color: #c62828;
  }

  .btn-cancel {
    color: #868e96;
    border: 2px solid #868e96;
    margin-right: 16px;
  }

  .btn-logout h3 {
    margin: 0 auto;
  }
`;
