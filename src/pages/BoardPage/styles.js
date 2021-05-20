import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 56px;
  margin-bottom: 65px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 12px;
  .fix {
    position: fixed;
    display: block;
    bottom: 80px;
    margin: 0 auto;
    width: 100px;
    text-align: center;
  }
  .btn-write {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: 1px solid #495057;
    border-radius: 24px;
    background: #f8f9fa;
    color: #495057;
    font-weight: bold;
    cursor: pointer;
    padding: 8px 12px;
    font-size: 16px;
    svg {
      color: #c62828;
      margin-right: 6px;
    }
  }
  .btn-filter {
    background: #f8f9fa;
    border: 1px solid #c62828;
    border-radius: 8px;
    padding: 12px;
  }
  .btn-filter:first-child {
    margin-right: 16px;
  }
  .btn-view-all {
  }
  .btn-view-current {
  }
`;

export const SearchBar = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 16px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  box-shadow: 5px 2px 5px gray;
  border: 2px solid #c62828;
  border-radius: 24px;
  svg {
    margin-left: 16px;
    color: #868e96;
  }
  input {
    background: #f8f9fa;
    width: 100%;
    padding: 12px;
    padding-left: 8px;
    font-size: 16px;
    border: none;
    outline: none;
    border-radius: 24px;
  }
`;
