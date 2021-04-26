import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 75px;
  padding: 0.5em 0.75em;
  border-bottom: 1px solid #ccc;
  p.postlist-content {
    flex: 1;
    font-size: 0.875rem;
    color: #757575;
  }
  div.postlist-meta-data {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    div.postlist-user-data {
      display: flex;
      color: #a4a4a4;
      span {
        margin-right: 5px;
      }
      span.date {
        color: #b71c1c;
      }
    }
  }
`;
