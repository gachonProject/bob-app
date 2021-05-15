import styled from "styled-components";

export const InputBox = styled.div`
  position: fixed;
  bottom: 72px;
  left: 0;
  right: 0;
  width: 90%;
  margin: 0 auto;
  form{
    margin:0 auto;
    input {
      width: 100%;
      height: 24px;
      background-color: #dee2e6;
      border: none;
      border-radius: 8px;
      padding: 0.5rem;
      outline: none;
      margin:0 auto;
    }
    input:focus {
      outline: none;
    }
  }

  .btn-comment {
    position: fixed;
    bottom: 72px;
    right:3%;
    width: 32px;
    height: 40px;
    background: none;
    border: none;
    border-radius:

    z-index: 3;
  }
`;
