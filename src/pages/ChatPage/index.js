import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Layout from "../../components/Layout";
import { Container } from "./styles";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getRealtimeConversations, updateMessage } from "../../actions";

const ChatPage = () => {
  const { uid_1 } = useParams();
  const { uid_2 } = useParams();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  const dispatch = useDispatch();
  let unsubscribe = useRef();

  useEffect(() => {
    dispatch(getRealtimeConversations({ uid_1, uid_2 }));
    setUserUid(uid_2);
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
    <Layout title={"채팅"}>
      <Container>
        <div className="chatArea">
          <div className="chatHeader">상대방</div>
          <div className="messageSections">
            {user.conversations.map((con, i) => (
              <div
                key={con.user_uid_1 + i}
                style={{ textAlign: con.user_uid_1 === auth.uid ? "right" : "left" }}
              >
                <p className="messageStyle">{con.message}</p>
              </div>
            ))}
          </div>

          <div className="chatControls">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write Message.."
            />
            <button onClick={submitMessage}>send</button>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ChatPage;
