import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Logins= () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    userId: "",
    userPw: "",
  });
  const { userId, userPw } = formData;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post("/login", formData);
        if (res.data.user) {
          alert(`로그인 성공: ${res.data.user.userId}`);
          navigate("/main");
        } else {
          throw new Error("로그인 실패");
        }
      } catch (err) {
        console.log("로그인 오류 : ", err);
        setErrMsg("아이디나 비밀번호가 틀렸습니다");
      }
      console.log("전송된 id, pw", formData);
    },
    [formData, navigate]
  );
  return (
    <container>
 <form onSubmit={handleLogin}>
    <label>
      아이디
      <input
        type="text"
        placeholder="아이디를 입력하세요"
        name="userId"
        value={userId}
        onChange={handleChange}
      />
    </label>

    <label>
      비밀번호
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        name="userPw"
        value={userPw}
        onChange={handleChange}
      />
    </label>

    {errMsg && <div style={{ color: 'red', marginBottom: '1rem' }}>{errMsg}</div>}

    <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '0.5rem 1rem', border: 'none' }}>
      로그인
    </button>
  </form>

    </container>
  );
};

export default Logins;