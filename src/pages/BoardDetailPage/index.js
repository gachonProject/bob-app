import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import gravatar from "gravatar";
import { TopArea, Container, Title, Content, Buttons } from "./styles";
import dayjs from "dayjs";
import { getPostData, resetData } from "../../actions/board.actions";
import store from "../../store";
import { firestore } from "../../fbase";

const BoardDetailPage = () => {
  const { boardId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.board.postData);
  const owner = useSelector((state) => state.board.ownerData);
  console.log(isLoading);
  useEffect(() => {
    dispatch(getPostData(boardId));
    setIsLoading(false);
    console.log(isLoading);
    return [dispatch(resetData()), setIsLoading(false)];
  }, [dispatch]);

  // useEffect(() => {
  //   const db = firestore;
  //   var newCityRef = db.collection("board").doc();
  //   console.log(newCityRef);
  // }, []);

  return (
    <Layout>
      <Header title={"밥 친구 게시판"} />
      <Container>
        {!isLoading ? (
          <>
            <TopArea>
              <div className="detail-user-data">
                <div className="user-image">
                  {owner.email && (
                    <img
                      src={gravatar.url(owner.email, { s: "40px", d: "retro" })}
                      alt="프로필 사진"
                    />
                  )}
                </div>
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
                <button onClick={() => alert("신고완료")} className="btn btn-report">
                  신고하기
                </button>
                <button onClick={() => alert("채팅")} className="btn btn-chatting">
                  채팅하기
                </button>
              </Buttons>
            </TopArea>
            <Title>{post.title}</Title>
            <Content>{post.content}</Content>
          </>
        ) : null}
      </Container>
    </Layout>
  );
};

export default BoardDetailPage;
