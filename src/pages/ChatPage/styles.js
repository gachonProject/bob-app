import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 0;
  height: 100%;
`;

export const ChatArea = styled.div`
  .my-msg {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .msg {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    .messageStyle {
      background: #fff;
      border: 1px solid #ccc;
      padding: 5px 10px;
      border-radius: 10px;
      margin: 5px;
      display: inline-block;
    }
  }
  .date {
    margin-bottom: 5px;
    font-size: 0.75rem;
  }
`;

export const ChatControls = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 64px;
  textarea {
    width: 90%;
  }
  button {
    width: 10%;
  }
`;
