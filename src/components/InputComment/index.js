import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addComment } from "../../actions/comment.action";
import { InputBox } from "./styles";

const InputComment = ({ history }) => {
  const [comment, setComment] = useState("");
  const loadedCoords = localStorage.getItem("coords");
  const parsedCoords = JSON.parse(loadedCoords);
  const lat = parsedCoords.latitude;
  const long = parsedCoords.longitude;
  const [cityName, setCityName] = useState("");
  const [dongName, setDongName] = useState("");
  const { boardId } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getLocation();
    }
    return () => (isMounted = false);
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

  const handleSubmitComments = (e) => {
    e.preventDefault();
    const contents = {
      comment,
      lat,
      long,
      cityName,
      dongName,
      boardId,
    };
    dispatch(addComment(contents));
    setComment("");
  };

  return (
    <InputBox>
      <form onSubmit={handleSubmitComments}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="댓글"
        />
        <button onSubmit={handleSubmitComments} className="btn btn-comment">
          입력
        </button>
      </form>
    </InputBox>
  );
};

export default InputComment;
