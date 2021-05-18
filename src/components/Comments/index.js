import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentList } from "../../actions/comment.action";
import InputComment from "../InputComment";
import { Comment, Container, Buttons } from "./styles";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { firestore } from "../../fbase";

const Comments = () => {
  const { boardId } = useParams();
  const currentUser = useSelector((state) => state.auth);
  const comments = useSelector((state) => state.comment.comments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommentList(boardId));
  }, []);

  const removeComment = (id) => {
    firestore.collection("comments").doc(id).delete();
    alert("댓글이 삭제되었습니다.");
  };

  console.log(comments);
  return (
    <Container>
      {comments.map((comment) => (
        <Comment key={comment.id}>
          <div>
            <div className="comment-info">
              <div className="info-user">
                <span>익명</span>
              </div>
              {currentUser.uid === comment.owner && (
                <Buttons>
                  <button onClick={() => removeComment(comment.id)}>삭제</button>
                </Buttons>
              )}
            </div>
            <p className="comment-content">{comment.comment}</p>
            <span className="date">{dayjs(comment.createdAt).format("MM/DD hh:mm")}</span>
          </div>
        </Comment>
      ))}
      <InputComment />
    </Container>
  );
};

export default Comments;
