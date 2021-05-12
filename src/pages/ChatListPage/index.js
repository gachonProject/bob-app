import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { firestore } from "../../fbase";
import dayjs from "dayjs";
import { ChatContainer, ChatData, ChatPreview } from "./styles";

const ChatListPage = () => {
  const currentUser = useSelector((state) => state.auth);
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
                  createdAt: doc.data().createdAt,
                });

                conversations.push([doc.data().user_uid_1, doc.data().user_uid_2].sort().join(""));
                console.log(doc.data());
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
      {conversationList.map((room) =>
        // 현재 반복문을 돌고 있는 room이 객체일 시
        room.members ? (
          /**
           * 접속중인 유저의 id를 첫번째 params로,
           * 접속중인 유저의 id와 반대(상대방)id를 두번째 params로 지정
           * */
          <Link
            to={
              currentUser.uid === room.members[0]
                ? `chatlist/${currentUser.uid}/${room.members[1]}`
                : `chatlist/${currentUser.uid}/${room.members[0]}`
            }
          >
            <ChatContainer>
              <ChatData>
                <div className="user">익명</div>
                <div className="date">{dayjs(room.createdAt).format("MM/DD hh:mm")}</div>
              </ChatData>
              <ChatPreview>{room.message}</ChatPreview>
              <div></div>
            </ChatContainer>
          </Link>
        ) : // 반복문을 돌고 있는 room이 객체가 아니면 렌더링 안함
        null
      )}
    </Layout>
  );
};

export default ChatListPage;
