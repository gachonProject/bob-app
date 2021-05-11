import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getConversationList } from "../../actions/user.actions";
import Layout from "../../components/Layout";
import { firestore } from "../../fbase";

const ChatListPage = () => {
  const currentUser = useSelector((state) => state.auth);
  // const conversationList = useSelector((state) => state.user.conversationList);
  // const conversations = useSelector((state) => state.user.conversations);
  // const dispatch = useDispatch();
  const [conversationList, setConversationList] = useState([]);

  console.log(currentUser);
  const getConversationList = async () => {
    const db = await firestore;
    if (currentUser.uid) {
      await db
        .collection("conversations")
        // .where("user_uid_1", "==", currentUser.uid)
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnpshot) => {
          const conversations = [];
          querySnpshot.forEach((doc) => {
            // console.log(doc.data());
            if (
              doc.data().user_uid_1 === currentUser.uid ||
              doc.data().user_uid_2 === currentUser.uid
            ) {
              if (
                !conversations.includes(
                  [doc.data().user_uid_1, doc.data().user_uid_2].sort().join("")
                )
              ) {
                conversations.push({
                  members: [doc.data().user_uid_1, doc.data().user_uid_2].sort(),
                  message: doc.data().message,
                });

                conversations.push([doc.data().user_uid_1, doc.data().user_uid_2].sort().join(""));
              }
            }
          });
          setConversationList(conversations);
          console.log(conversationList);
          console.log(conversations);
        });
    }
  };

  useEffect(() => {
    getConversationList();
  }, []);

  return (
    <Layout title={"채팅목록"}>
      <h1>채팅목록</h1>
      {conversationList.map((room) =>
        // 현재 반복문을 돌고 있는 room이 객체일 시
        room.members ? (
          // 접속중인 유저와 채팅 방 멤버의 첫번째 요소가 같으면
          currentUser.uid === room.members[0] ? (
            // 두번째 params로 채팅 방 멤버의 두번째 요소로 지정
            <Link to={`chatlist/${currentUser.uid}/${room.members[1]}`}>
              <div>{room.message}</div>
            </Link>
          ) : (
            <Link to={`chatlist/${currentUser.uid}/${room.members[0]}`}>
              <div>{room.message}</div>
            </Link>
          )
        ) : // 반복문을 돌고 있는 room이 객체가 아니면 렌더링 안함
        null
      )}
    </Layout>
  );
};

export default ChatListPage;
