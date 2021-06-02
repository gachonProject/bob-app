import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { firestore } from "../../fbase";

const AdminUserDetailPage = () => {
  const { uid } = useParams();
  const [posts, setPosts] = useState([]);
  const tarpost = [];
  const [postsid, setPostsid] = useState([]);
  const boid = [];
  const [user, setUser] = useState("");

  const getPosts = async () => {
    const db = await firestore;

    db.collection("board")
      .where("owner", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tarpost.push(doc.data().title);
          boid.push(doc.id);
        });
        setPosts(tarpost);
        setPostsid(boid);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    db.collection("users")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUser(doc.data().name);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Layout title={"관리자 기능"}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ marginTop: "120px" }}>사용자 명: {user}</h2>
        <h3 style={{ marginTop: "16px" }}>게시글 목록</h3>
        {posts.map((board, i) => (
          <div key={i}>
            <Link to={`/board/${postsid[i]}`}>{board}</Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AdminUserDetailPage;
