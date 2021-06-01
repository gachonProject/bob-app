import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { firestore } from "../../fbase";
import { Container } from "./styles";
import gravatar from "gravatar";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getPostData } from "../../actions/board.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const PostItem = ({ post, onChangePage }) => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const firstLine = post.content.slice(0, 40);

  useEffect(() => {
    dispatch(getPostData(post.id));
  }, []);

  // console.log(post.id);

  const getUserData = useCallback(async () => {
    const db = await firestore.collection("users").doc(post.owner);
    // console.log(post);
    await db
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          // alert("존재하지 않는 게시자입니다..");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("게시자 조회에 실패했습니다.");
      });
  }, [userData]);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container onClick={() => onChangePage(post)}>
      <h3 className="postlist-title">{post.title}</h3>
      <p className="postlist-content">{firstLine}</p>
      <div className="postlist-meta-data">
        <div className="postlist-user-data">
          {userData && (
            <img
              style={{ marginRight: "4px" }}
              src={gravatar.url("", { s: "24", d: "retro" })}
              alt="프로필 사진"
            />
          )}
          <span>익명 </span>
          <span> | </span>
          <span> {post.dongName}</span>
          <span> | </span>
          <span className="date"> {dayjs(post.createdAt).format("MM/DD h:mm A")}</span>
        </div>
        <div className="postlist-sub-data">
          <FontAwesomeIcon icon={faComment} />
          <span className="comments" style={{ marginLeft: "8px" }}>
            {post.commentLength ? post.commentLength : 0}
          </span>
        </div>
      </div>
    </Container>
  );
};

export default PostItem;
