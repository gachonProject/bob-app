import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRealtimeUsers } from "../../actions";
import AdminUser from "../../components/AdminUser";
import Layout from "../../components/Layout";

const AdminPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  useEffect(() => {
    dispatch(getRealtimeUsers());
  }, []);

  return (
    <Layout title={"관리자 기능"}>
      <div>
        <h1 style={{ textAlign: "center" }}>관리자</h1>
        <table style={{ width: "90%", textAlign: "center" }}>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>삭제</th>
          </tr>
          {users.map((user) => (
            <AdminUser user={user} key={user.uid} />
          ))}
        </table>
      </div>
    </Layout>
  );
};

export default AdminPage;
