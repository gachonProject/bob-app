import React, { useCallback, useEffect, useState } from "react";
import { firestore } from "../../fbase";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import gravatar from "gravatar";
import { TopArea, Container, Title, Content } from "./styles";
import dayjs from "dayjs";

const BoardDetailPage = () => {
  const { boardId } = useParams();
  const [postData, setPostData] = useState({});
  const [userData, setUserData] = useState({});

  const getPostData = useCallback(async () => {
    const db = await firestore.collection("board").doc(boardId);
    db.get()
      .then((doc) => {
        if (doc.exists) {
          setPostData(doc.data());
          console.log(doc.data());
          console.log(postData);
        } else {
          alert("존재하지 않는 게시물입니다");
        }
      })
      .catch((error) => {
        alert("게시글 조회에 실패했습니다.");
      });
    // firestore
    //   .collection("board")
    //   .doc(boardId)
    //   .onSnapshot((doc) => {
    //     console.log("Current data: ", doc.data());
    //     setPostData(doc.data());
    //     console.log(postData);
    //   });
  }, [boardId, postData, setPostData]);

  const getUserData = useCallback(() => {
    const db = firestore.collection("users").doc(postData.owner);
    console.log(postData.owner);
    db.get()
      .then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
          console.log(userData);
          console.log(doc.data());
        } else {
          console.log("존재하지 않는 게시자입니다..");
          console.log(doc.data());
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("게시자 조회에 실패했습니다.");
      });
  }, []);

  useEffect(() => {
    getPostData();
    console.log(postData);
    getUserData();
  }, []);
  // useEffect(() => {
  //   console.log(postData.owner);
  //   getUserData();
  //   return () => setUserData({});
  // }, []);

  return (
    <Layout>
      <Header title={"밥 친구 게시판"} />
      <Container>
        <TopArea>
          <div className="detail-user-data">
            <div className="user-image">
              <img
                src={gravatar.url(userData.email, { s: "40px", d: "retro" })}
                alt="프로필 사진"
              />
            </div>
            <div className="meta-data">
              <span className="owner">익명</span>
              <span className="date">{dayjs(postData.createdAt).format("MM/DD h:mm A")}</span>
            </div>
          </div>
          <div className="detail-buttons">
            <button onClick={() => alert("신고완료")} className="report">
              신고하기
            </button>
          </div>
        </TopArea>
        <Title>{postData.title}</Title>
        <Content>{postData.content}</Content>
      </Container>
    </Layout>
  );
};

export default BoardDetailPage;
