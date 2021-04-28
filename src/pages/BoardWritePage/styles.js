import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 5em auto;
`;

export const FormWrap = styled.div`
  margin: 0 auto;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 0 auto;
  padding: 1em;
`;

export const InputTitle = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 0.5em;
`;

export const InputContent = styled(TextareaAutosize)`
  margin-top: 1em;
  padding: 0.5em;
  border: none;
  resize: none;
`;
