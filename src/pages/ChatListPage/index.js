import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationList } from "../../actions/user.actions";
import Layout from "../../components/Layout";

const ChatListPage = () => {
  const currentUser = useSelector((state) => state.auth);
  const conversationList = useSelector((state) => state.user.conversationList);
  const dispatch = useDispatch();
  // console.log(currentUser);
  // const getConversationList = async () => {
  //   const db = await firestore;
  //   if (currentUser.uid) {
  //     await db
  //       .collection("conversations")
  //       .where("user_uid_1", "==", currentUser.uid)
  //       .orderBy("createdAt", "desc")
  //       .onSnapshot((querySnpshot) => {
  //         const conversations = [];
  //         querySnpshot.forEach((doc) => {
  //           if (!conversations.includes(doc.data().user_uid_2)) {
  //             conversations.push(doc.data());
  //             conversations.push(doc.data().user_uid_2);
  //           }
  //           console.log(doc.data());
  //         });
  //         console.log(conversations);
  //       });
  //   }
  // };

  useEffect(() => {
    dispatch(getConversationList(currentUser.uid));
  }, []);
  console.log(conversationList);

  return (
    <Layout title={"채팅목록"}>
      <h1>채팅목록</h1>
    </Layout>
  );
};

export default ChatListPage;
