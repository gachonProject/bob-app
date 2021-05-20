import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PostItem from "../../components/PostItem";
import { Buttons, Container, SearchBar } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "../../actions/board.actions";
import PullToRefresh from "react-simple-pull-to-refresh";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const BoardPage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.posts);
  const [search, setSearch] = useState("");
  const [click, setClick] = useState(0);
  const loadedCoords = localStorage?.getItem("coords");
  const parsedCoords = JSON.parse(loadedCoords);
  const lat = parsedCoords?.latitude;
  const long = parsedCoords?.longitude;
  const [cityName, setCityName] = useState("");
  const [dongName, setDongName] = useState("");
  const [fullName, setfullName] = useState("");

  useEffect(() => {
    dispatch(getPostList());
  }, [dispatch]);

  const saveCoords = (coordsObj) => {
    localStorage.setItem("coords", JSON.stringify(coordsObj));
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

  // console.log(localStorage.getItem("coords"));

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

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const key = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${long}&y=${lat}&input_coord=WGS84`;
    const res = await axios.get(url, {
      headers: { Authorization: "KakaoAK " + key },
    });
    setCityName(res.data.documents[0].address.region_2depth_name);
    setDongName(res.data.documents[0].address.region_3depth_name);
    setfullName(setCityName + setDongName);
  };

  const onChangePage = (post) => {
    history.push(`/board/${post.id}`);
  };

  return (
    <Layout title={"밥 친구 게시판"}>
      {!isLoading ? (
        <Container>
          <SearchBar>
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="제목 또는 지역을 입력해주세요"
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchBar>
          <Buttons>
            <button
              onChange={(e) => setClick(e.target.value)}
              onClick={() => {
                setClick(0);
              }}
              className="btn-filter btn-view-all"
            >
              모든 게시글
            </button>
            <button
              onChange={(e) => setClick(e.target.value)}
              onClick={() => {
                setClick(1);
              }}
              className="btn-filter btn-view-current"
            >
              현재 위치 게시글
            </button>
          </Buttons>
          <PullToRefresh onRefresh={dispatch(getPostList)}>
            {board.map((post) => {
              const title = post.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
              const city = post.cityName.toLowerCase().indexOf(search.toLowerCase()) >= 0;
              const dong = post.dongName.toLowerCase().indexOf(search.toLowerCase()) >= 0;
              if (click === 0 && (title || city || dong)) {
                return <PostItem key={post.id} post={post} onChangePage={onChangePage} />;
              } else if (click === 1 && cityName === post.cityName && (title || city || dong)) {
                return <PostItem key={post.id} post={post} onChangePage={onChangePage} />;
              }
            })}
          </PullToRefresh>
          <Buttons>
            {isLoading ? (
              <div className="fix">위치 정보 계산중</div>
            ) : (
              <button className="fix btn-write" onClick={() => history.push("/write")}>
                <FontAwesomeIcon icon={faPencilAlt} />
                <h3>작성</h3>
              </button>
            )}
          </Buttons>
        </Container>
      ) : (
        <p>로딩중</p>
      )}
    </Layout>
  );
};

export default BoardPage;
