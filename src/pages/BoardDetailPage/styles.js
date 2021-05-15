import styled from "styled-components";

export const Container = styled.div`
  margin-top: 56px;
  padding: 1rem 0.875rem;
  max-width: 100%;
  overflow: hidden;
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
      .location-and-date {
        font-size: 0.75rem;
        color: #a4a4a4;
        span.date {
          margin-right: 0.25em;
        }
        span.location {
          margin-left: 0.25em;
          color: #b71c1c;
        }
      }
    }
  }
  button.btn {
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

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  button {
    margin-bottom: 0.5em;
  }
  .control {
    display: flex;
    button:first-child {
      margin-right: 0.5em;
    }
  }
`;
