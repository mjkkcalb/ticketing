import { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginStyle from "./login.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("가입 확인");
  const [formData, setFormData] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userGroup: "",
    userEmail: "",
  });
  const { userId, userPw, userName, userGroup, userEmail } = formData;

    // 사용자 입력 값을 폼 데이터에 업데이트
    const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }, []);


    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const res = await axios.post("/signup", formData);
        if (res.status !== 200) {
          // 회원가입 실패가 throw를 사용해 setMsg로 넘어간다
          throw new Error("회원가입 실패");
        }
        alert("회원가입 성공");
        navigate("/");
      } catch (err) {
        setMsg(err.message);
      }
      console.log("formData :", formData);
    };
  return (
    <div className={loginStyle.singupBox}>
      <div className={loginStyle.singupTop}>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
        <h2>회원가입</h2>
      </div>
      <div  className={loginStyle.singupInputBox}> 
<form onSubmit={handleSubmit}>
  <label>
    <p>아이디</p>
    <div  className={loginStyle.singupflexBox}>
    <input
      type="text"
      placeholder="아이디"
      name="userId"
      value={userId}
      onChange={handleChange}
      className={loginStyle.singupInputfirst}
    />
    <button className={loginStyle.singupSecone}> 중복확인</button>
    </div>
  </label>

  <label>
  <p>비밀번호</p>
    <input
      type="password"
      placeholder="비밀번호"
      name="userPw"
      value={userPw}
      onChange={handleChange}
      className={loginStyle.singupInput}
    />
  </label>

  <label>
  <p>닉네임</p>
    <input
      type="text"
      placeholder="닉네임"
      name="userName"
      value={userName}
      onChange={handleChange}
      className={loginStyle.singupInput}
    />
  </label>

  <label>
  <p>이메일</p>
    <input
      type="email"
      placeholder="이메일"
      name="userEmail"
      value={userEmail}
      onChange={handleChange}
      className={loginStyle.singupInput}
    />
  </label>

  <label>
  <p>휴대폰 번호</p>
  <div className={loginStyle.singupflexBox}>
    <input
      type="text"
      placeholder="휴대폰 번호"
      name="userGroup"
      value={userGroup}
      onChange={handleChange}
      className={loginStyle.singupInputfirst}
    />
    <button className={loginStyle.singupSecone}> 인증번호 받기</button>
    </div>
  </label>


  {/* {msg && <div className={loginStyle.singupMsg}>{msg}</div>} */}
  <button type="submit"  className={loginStyle.singupBnt}>
    가입하기
  </button>
</form>
</div>
    </div>
  );
};

export default SignUp;