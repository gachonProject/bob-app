import styled from "styled-components";

export const ChatContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

export const ChatData = styled.div`
  display: flex;
  justify-content: space-between;
  .user {
    font-weight: bold;
  }
  .date {
    font-size: 0.875rem;
    color: #a4a4a4;
  }
`;

export const ChatPreview = styled.div`
  margin-top: 0.5rem;
`;
