import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PostItem from "../../components/PostItem";
import { Buttons, Container } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "../../actions/board.actions";
import PullToRefresh from "react-simple-pull-to-refresh";

const BoardPage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [storageLength, setStorageLength] = useState(localStorage.length);
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.posts);

  useEffect(() => {
    dispatch(getPostList());
  }, [dispatch]);

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

  console.log(localStorage.getItem("coords"));

  useEffect(() => {
    if (localStorage.getItem("coords") === null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
        setIsLoading(true);
        // alert("Geolocation API 사용이 가능합니다.");
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
    <Layout title={"밥 친구 게시판"}>
      <Container>
        <PullToRefresh onRefresh={dispatch(getPostList)}>
          {board.map((post) => (
            <PostItem key={post.id} post={post} onChangePage={onChangePage} />
          ))}
        </PullToRefresh>
        <Buttons>
          {isLoading ? (
            <div className="fix">위치 정보 계산중</div>
          ) : (
            <button className="fix btn-write" onClick={() => history.push("/write")}>
              <h3>작성</h3>
            </button>
          )}
        </Buttons>
      </Container>
    </Layout>
  );
};

export default BoardPage;
