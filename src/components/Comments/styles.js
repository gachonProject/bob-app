import styled from "styled-components";

export const Container = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 0.5rem;
  margin-top: 1rem;
`;

export const Comment = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 0.5em 0.25em;
  border-radius: 4px;
  span.date {
    font-size: 0.75rem;
    color: #a4a4a4;
    margin-right: 0.25em;
  }

  & + last-child {
    border: none;
  }
`;

export const Buttons = styled.div``;
