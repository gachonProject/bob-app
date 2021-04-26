import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 56px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  .fix {
    position: fixed;
    display: block;
    bottom: 80px;
    margin: 0 auto;
    width: 57px;
    text-align: center;
  }
  .btn-write {
    display: inline-flex;
    outline: none;
    border: 2px solid #c62828;
    border-radius: 0.75em;
    color: #c62828;
    font-weight: bold;
    cursor: pointer;
    padding: 8px 12px;
    font-size: 16px;
    background: white;
  }
`;
