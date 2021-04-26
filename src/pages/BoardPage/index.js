import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import "./styles.css";
import { firestore } from "../../fbase";
import PostItem from "../../components/PostItem";

const BoardPage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [storageLength, setStorageLength] = useState(localStorage.length);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const db = await firestore.collection("board").orderBy("createdAt", "asc").get();
    db.forEach((document) => {
      const postObj = {
        ...document.data(),
        id: document.id,
      };
      setPosts((prev) => [postObj, ...prev]);
    });
  };

  useEffect(() => {
    getPosts();
    return () => setPosts([]);
  }, [setPosts]);

  const saveCoords = (coordsObj) => {
    localStorage.setItem("coords", JSON.stringify(coordsObj));
    setStorageLength((prevLength) => prevLength + 1);
    setIsLoading(false);
  };

  const handleGeoSuccess = useCallback((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude,
      longitude,
    };
    saveCoords(coordsObj);
  }, []);

  const handleGeoError = (error) => {
    alert("Error occurred. Error code: " + error.code);
  };

  useEffect(() => {
    if (storageLength === 1) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
        setIsLoading(true);
        alert("Geolocation API 사용이 가능합니다.");
      } else {
        alert("해당 브라우저에서 Geolocation API를 지원하지 않습니다.");
      }
    }
    return () => setIsLoading(false);
  }, []);

  const onChangePage = (post) => {
    history.push(`/board/${post.id}`);
  };

  return (
    <Layout>
      <Header title={"밥 친구 게시판"} />
      <div className="container">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} onChangePage={onChangePage} />
        ))}
        <div className="buttons">
          {isLoading ? (
            <div className="fix">위치 정보 계산중</div>
          ) : (
            <button className="fix btn-write" onClick={() => history.push("/write")}>
              작성
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BoardPage;
