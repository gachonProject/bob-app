import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostData, updatePost } from "../../actions/board.actions";
import axios from "axios";
import { useParams } from "react-router";
import { firestore } from "../../fbase";
import Layout from "../../components/Layout";
import { Container, Form, FormWrap, InputContent, InputTitle } from "../BoardWritePage/styles";

const BoardUpdate = ({ history }) => {
  const { boardId } = useParams();
  const post = useSelector((state) => state.board.postData);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const loadedCoords = localStorage.getItem("coords");
  const parsedCoords = JSON.parse(loadedCoords);
  const lat = parsedCoords.latitude;
  const long = parsedCoords.longitude;
  const [cityName, setCityName] = useState("");
  const [dongName, setDongName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    const getLocation = async () => {
      const key = "30ee4841c133d7b69f5287ba46b3c9f3";
      const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${long}&y=${lat}&input_coord=WGS84`;
      const res = await axios.get(url, {
        headers: { Authorization: "KakaoAK " + key },
      });
      if (isMounted) {
        setCityName(res.data.documents[0].address.region_2depth_name);
        setDongName(res.data.documents[0].address.region_3depth_name);
      }
    };
    dispatch(getPostData(boardId));
    getLocation();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
  }, [post]);

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
    dispatch(updatePost(contents, boardId));
    history.push(`/board/${link}`);
  };

  const link = firestore.collection("board").doc(boardId).id;

  return (
    <Layout title={"게시글 수정"}>
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

export default BoardUpdate;
