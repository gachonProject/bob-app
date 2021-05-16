import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Layout from "../../components/Layout";
import gravatar from "gravatar";
import { TopArea, Container, Title, Content, Buttons } from "./styles";
import dayjs from "dayjs";
import { getPostData } from "../../actions/board.actions";
import { firestore } from "../../fbase";
import Comments from "../../components/Comments";

const BoardDetailPage = ({ history }) => {
  const { boardId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth);
  const post = useSelector((state) => state.board.postData);
  const owner = useSelector((state) => state.board.ownerData);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      dispatch(getPostData(boardId));
    }
    return () => {
      isSubscribed = false;
    };
  }, [isLoading]);

  useEffect(() => {
    // dispatch(resetData());
    console.log("나 있다", post, isLoading);
    if (Object.keys(post).length !== 0) setIsLoading(false);
    else setIsLoading(true);
    console.log(isLoading);

    // return () => dispatch(resetData());
  }, [post, isLoading]);

  // console.log(isLoading);

  const removePost = () => {
    firestore.collection("board").doc(boardId).delete();
    alert("삭제되었습니다.");
    history.push("/board");
  };

  return (
    <Layout title={"밥 친구 게시판"}>
      <Container>
        {!isLoading ? (
          <>
            <TopArea>
              <div className="detail-user-data">
                {!isLoading && (
                  <div className="user-image">
                    {owner.email && (
                      <img
                        src={gravatar.url(owner.email, { s: "40px", d: "retro" })}
                        alt="프로필 사진"
                      />
                    )}
                  </div>
                )}
                <div className="meta-data">
                  <span className="owner">익명</span>
                  <div className="location-and-date">
                    <span className="date">{dayjs(post.createdAt).format("MM/DD h:mm A")}</span>
                    <span>|</span>
                    <span className="location">{post.dongName}</span>
                  </div>
                </div>
              </div>
              <Buttons>
                {currentUser.uid !== owner.uid ? (
                  <>
                    <button
                      onClick={() => history.push(`/chatlist/${currentUser.uid}/${owner.uid}`)}
                      className="btn btn-chatting"
                    >
                      채팅
                    </button>
                    <button onClick={() => alert("신고완료")} className="btn btn-report">
                      신고
                    </button>
                  </>
                ) : (
                  <div className="control">
                    <button className="btn" onClick={() => history.push(`/update/${boardId}`)}>
                      수정
                    </button>
                    <button className="btn" onClick={removePost}>
                      삭제
                    </button>
                  </div>
                )}
              </Buttons>
            </TopArea>
            <Title>{post.title}</Title>
            <Content>{post.content}</Content>
          </>
        ) : (
          <div>loading</div>
        )}
        <Comments />
      </Container>
    </Layout>
  );
};

export default BoardDetailPage;
