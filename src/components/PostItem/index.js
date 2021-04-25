import React from "react";
import { Container } from "./styles";

const PostItem = ({ post, onChangePage }) => {
  console.log(post);
  const firstLine = post.content.slice(0, 40);
  console.log("hihihihii");
  return (
    <Container onClick={() => onChangePage(post)}>
      <h3 className="postlist-title">{post.title}</h3>
      <p className="postlist-content">{firstLine}</p>
      <div className="postlist-meta-data">
        <div className="postlist-user-data">
          <span>익명 </span>
          <span> | </span>
          <span> {post.dongName}</span>
          <span> | </span>
          <span className="date"> {post.createdAt.slice(0, 4)}</span>
        </div>
        <div className="postlist-sub-data">
          <span className="comments">0</span>
        </div>
      </div>
    </Container>
  );
};

export default PostItem;
