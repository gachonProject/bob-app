import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../actions/board.actions";
import axios from "axios";
import Layout from "../../components/Layout";
import { Container, Form, FormWrap, InputTitle, InputContent } from "./styles";

const BoardWritePage = ({ history }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const loadedCoords = localStorage.getItem("coords");
  const parsedCoords = JSON.parse(loadedCoords);
  const lat = parsedCoords.latitude;
  const long = parsedCoords.longitude;
  const [cityName, setCityName] = useState("");
  const [dongName, setDongName] = useState("");

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
  };

  const dispatch = useDispatch();

  const onSubmitWriteForm = (e) => {
    e.preventDefault();
    const contents = {
      title,
      content,
      lat,
      long,
      cityName,
      dongName,
    };
    console.log(lat, long);
    dispatch(addPost(contents));
    history.push("/board");
  };
  return (
    <Layout title={"글 작성"}>
      <Container>
        <FormWrap>
          <Form onSubmit={onSubmitWriteForm}>
            <InputTitle
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <InputContent
              type="text"
              placeholder="내용"
              value={content}
              minRows={5}
              onChange={(e) => setContent(e.target.value)}
            ></InputContent>
            <button type="submit">작성</button>
          </Form>
        </FormWrap>
      </Container>
    </Layout>
  );
};

export default BoardWritePage;
