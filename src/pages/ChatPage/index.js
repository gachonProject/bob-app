import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../../components/Layout";
import { Container, ChatControls, ChatArea } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getRealtimeConversations, updateMessage } from "../../actions";
import dayjs from "dayjs";

const ChatPage = () => {
  const { uid_1 } = useParams();
  const { uid_2 } = useParams();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRealtimeConversations({ uid_1, uid_2 }));
    setUserUid(uid_2);
    console.log(user.conversations);
  }, []);

  const submitMessage = (e) => {
    e.preventDefault();

    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };

    if (message !== "") {
      dispatch(updateMessage(msgObj)).then(() => {
        setMessage("");
      });
    }
    console.log(msgObj);
  };

  return (
    <Layout title={"채팅"} style={{ marginBottom: "0" }}>
      <Container>
        <ChatArea>
          <div>
            {uid_1 === auth.uid
              ? user.conversations.map((con, i) => (
                  <div
                    key={con.user_uid_1 + i}
                    className={con.user_uid_1 === auth.uid ? "my-msg" : "msg"}
                  >
                    {con.user_uid_1 === auth.uid && (
                      <span className="date">{dayjs(con.createdAt).format("MM/DD h:mm A")}</span>
                    )}
                    <p
                      className="messageStyle"
                      style={{ background: con.user_uid_1 === auth.uid ? "#ffc9c9" : "#fff" }}
                    >
                      {con.message}
                    </p>
                    {con.user_uid_2 === auth.uid && (
                      <span className="date">{dayjs(con.createdAt).format("MM/DD h:mm A")}</span>
                    )}
                  </div>
                ))
              : null}
          </div>

          <ChatControls>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
            />
            <button onClick={submitMessage}>send</button>
          </ChatControls>
        </ChatArea>
      </Container>
    </Layout>
  );
};

export default ChatPage;
