import styled from "styled-components";

export const Container = styled.div`
  margin-top: 56px;
  padding: 1rem 0.875rem;
`;

export const TopArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div.detail-user-data {
    display: flex;
    align-items: center;
    div.user-image {
      margin-right: 0.5em;
      img {
        border-radius: 0.4em;
      }
    }
    div.meta-data {
      display: flex;
      flex-direction: column;
      span.owner {
        font-weight: 600;
      }
      span.date {
        font-size: 0.75rem;
        color: #a4a4a4;
      }
    }
  }
  button.report {
    border: 1px solid #ccc;
    border-radius: 0.4em;
    padding: 0.25em 0.375em;
    background-color: inherit;
    font-weight: bold;
    color: #a4a4a4;
    font-size: 0.75em;
  }
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  margin: 0.5em 0;
`;

export const Content = styled.div`
  color: #212529;
`;
