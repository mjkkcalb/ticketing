import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import saveStyle from "./save.module.css";
import Footer from "../Footer/Footer";
import { BiX } from "react-icons/bi";

const Save = () => {
  const publicUrl = process.env.PUBLIC_URL;
  
  const [reserves, setReserves] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const [eventData, setEventData] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [numberOfPeople, setNumberOfPeople] = useState();



  const getReserveData = async () => {
    try {
      setLoading(true);
  
      const result = await axios.get(`/save`, {
        params: {
          eventData,
          selectedDate,
          numberOfPeople,
        },
      });
  
      const reservesData = result.data.docs.map((reserve, index) => {
        const id = reserve._id ? reserve._id.toString() : null;
  
        if(id && reserve.eventData) {
          return {
            title: reserve.eventData.TITLE,
            eventData: reserve.eventData,
            mainImg: reserve.eventData.MAIN_IMG,
            selectedDate: reserve.selectedDate,
            numberOfPeople: reserve.numberOfPeople,
            id: id,
          };
        } else {
          return null; // _id가 없는 경우 해당 요소를 무시합니다.
        }
      }).filter(reserve => reserve !== null);
  
      setReserves(reservesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReserveData();
  }, [eventData, selectedDate, numberOfPeople,]);

  const onDelete = async (reserve) => {
    console.log("삭제 버튼이 눌림. 현재 reserve의 id 값:", reserve.id);

    const reCheck = window.confirm(`${reserve.title} 글을 삭제하시겠습니까?`);
  
    if (reCheck) {
      try {
        await axios.delete(`/save/delete/${reserve.id}`);
        getReserveData();
      } catch (error) {
        console.log("데이터 삭제 중 오류: ", error);
      }
    }
  };


  return (
    <div className={saveStyle.saveBox}>
      <div className={saveStyle.saveTop}>
      <h1 className={saveStyle.saveLogo}>
        <img src={`${publicUrl}/images/logo.svg`} alt="티켓팅 로고" />
      </h1>
      </div>
      <div className={saveStyle.saveList}>
    {loading ? (
      <h2>로딩중입니다...</h2>
    ) : (
      <div>
        {reserves.length === 0 ? (
          <p>현재 저장된 데이터가 없습니다.</p>
        ) : (
          reserves.map((reserve, index) => (
            <div key={index} className={saveStyle.saveListItem}>
              <img src={reserve.mainImg} alt={`이벤트 이미지 - ${reserve.title}`}  />
              <div className={saveStyle.saveListTxt}>
              <p> {reserve.title}</p>
              <p> {new Date(reserve.selectedDate).toLocaleDateString("ko-KR")}</p>
              <p>인원: {reserve.numberOfPeople}명</p>
              </div>
              <button onClick={() => onDelete(reserve)} className={saveStyle.saveDeleteBtn}><BiX /></button>

              <Link
                to={`/payment/${encodeURIComponent(reserve.title)}`}
                state={{ eventData: reserve.eventData, selectedDate: reserve.selectedDate, numberOfPeople: reserve.numberOfPeople, id: reserve.id }}
                onClick={() => console.log('Link clicked', reserve.title, reserve.id)} className={saveStyle.savepaymentBtn}
              >
                <button>결제하기</button>
              </Link>
            </div>
          ))
        )}
      </div>
    )}
  </div>
  <Footer/>
  </div>
  );
};

export default Save;
