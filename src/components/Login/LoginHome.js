import { useEffect, useState, useCallback  } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SplashPage from "./SplashPage";
import loginStyle from "./login.module.css";


const LoginHome = () => {
  const publicUrl = process.env.PUBLIC_URL;
  const [user, setUser] = useState(null);
  const [isSplash, setIsSplash] = useState(true)

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

      if (!userId || !userPw) {
        setErrMsg("아이디와 비밀번호를 모두 입력해주세요");
        return;
      }

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSplash(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []); 

  // 로그인 세션 유지
  useEffect(() => {
    const getUserSession = async () => {
      try {
        const res = await axios.get("/login");
        setUser(res.data.user);
      } catch (err) {
        console.log("세션 오류:", err);
      }
    };
    getUserSession();
  }, []);



  return (
    <div className={loginStyle.loginhomeBox}>
      {isSplash && <SplashPage />}
        <h1 className={loginStyle.loginLogo}>
         <img src={`${publicUrl}/images/loginLogo.svg`} alt="티켓팅 로고" />
        </h1>
        <div className={loginStyle.loginInputBox}>
        <form onSubmit={handleLogin}>
        <label>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            name="userId"
            value={userId}
            onChange={handleChange}
          />
        </label>

        <label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            name="userPw"
            value={userPw}
            onChange={handleChange}
          />
        {errMsg && <div className={loginStyle.loginErrorTxt}>{errMsg}</div>}
        </label>

        <p className={loginStyle.loginPwTxt}>비밀번호를 잊으셨나요?</p>
        
        <p className={loginStyle.loginJoinTxt}>초기 회원의 경우 회원가입이 되지 않으셨다면 아래 JOIN NOW  버튼을 눌러 <br /> 가입 후 로그인 해주세요.</p>
        <button type="submit" className={loginStyle.loginBtn}>
          로그인
        </button>
      </form>
       
        </div>

        <div>
          <Link to="/signup">
            <button className={loginStyle.loginJoinBtn}>회원가입</button>
          </Link>
        </div>
   </div>

  );
};

export default LoginHome;




