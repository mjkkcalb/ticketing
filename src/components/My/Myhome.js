import React, { useEffect, useCallback,  useState , useRef} from "react";
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import { Avatar } from "antd";
import Footer from "../Footer/Footer";


const Myhome = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const fileInput = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

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


      // 로그아웃
      const handleLogout = useCallback(async () => {
        try {
          const res = await axios.get("/logout");
          if (res.data.user === null) {
            setUser(null);
            navigate("/");
          }
        } catch (err) {
          console.log("로그아웃 오류:", err);
        }
      }, [navigate]);

  return (
    <div>
       <Avatar 
        src={Image} 
        style={{margin:'20px'}} 
        size={200} 
        onClick={() => {fileInput.current.click()}}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleImageChange}
      />
      <div>
         {user && (
          <>
            <h1>{user.userName}님</h1>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Myhome;