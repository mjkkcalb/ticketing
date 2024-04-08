import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import searchStyle from "./search.module.css";
import { BiX, BiChevronLeft } from "react-icons/bi";
import axios from "axios";

const Reserve = () => {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);

  const location = useLocation();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  const handleReserve = async () => {
    try {
      console.log('Data to send:', {
        eventData,
        selectedDate,
        numberOfPeople,
      });

      
  
      const response = await axios.post(`/reserve/${encodeURIComponent(title)}`, {
        eventData,
        selectedDate,
        numberOfPeople,
      });
  
      if (response.status === 200) {
        console.log('Reservation successful!');

        const confirmResult = window.confirm('장바구니에 저장하시겠습니까?');

        // 확인을 누르면 /save 페이지로 이동
        if (confirmResult) {
          navigate('/save');
        }
      }
    } catch (error) {
      console.error('Reservation error:', error);

    }
  };

  useEffect(() => {
    console.log('location.state:', location.state);

    // location.state에 eventData가 있으면 설정
    if (location.state && location.state.eventData) {
      setEventData(location.state.eventData);
    }
  }, [decodedTitle, location.state ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const increasePeople = () => {
    setNumberOfPeople(prevCount => prevCount + 1);
  };

  const decreasePeople = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(prevCount => prevCount - 1);
    }
  };

  const handleCancel = () => {
      navigate(-1);
  };

  return (
    <div >
      {eventData ? (
        <div className={searchStyle.reserveBox}>
          {/* eventData를 이용하여 필요한 정보 표시 */}
          <img
            src={eventData.MAIN_IMG || ''}
            alt={`Image for ${eventData.TITLE || ''}`}
            className={searchStyle.reserveBoxImg}
          />
          <button onClick={handleCancel} className={searchStyle.reserveCancleBtn}><BiChevronLeft /></button>
          <div className={searchStyle.reserveBoxTxt}>
          <p>{eventData.CODENAME || '-'}</p>
          <p>{eventData.TITLE || '-'}</p>
          <p>{eventData.PLACE || '-'}</p>
          {eventData.DATE ? (
            <>
              <p>{eventData.DATE.split('~')[0]} / {eventData.DATE.split('~')[1]}</p>
            </>
          ) : (
            <p>날짜 정보 없음</p>
          )}
          <p>{eventData.IS_FREE || '-'}</p>

          <hr />
          <h3>안내
            
          </h3>
          <button onClick={openModal} className={searchStyle.reserveBoxBtn}>예약하기</button>
        </div>
        </div>
      ) : (
        <p>데이터를 불러오는 중이거나 없습니다.</p>
      )}
      
       {/* 모달 */}
      {isModalOpen && (
        <div className={searchStyle.reserveModalBack}>
        <div className={searchStyle.reserveModal}>
          <div className={searchStyle.reserveModalContent}>
          <div className={searchStyle.reserveModalContentTop}>
          <button onClick={closeModal}><BiX /></button>
          </div>
            <h3>날짜 선택</h3>
            
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              formatDay={(locale, date) => moment(date).format("DD")}
              locale="ko-KR"
               showNavigation={true}
              className={searchStyle.calendarContainer}
              tileClassName={({ date, view }) => {
                // 날짜와 뷰에 따라 스타일을 동적으로 적용
                if (view === 'month') {
                  const isCurrentDate = moment(date).isSame(moment(), 'day');
                  const isSelectedDate = moment(date).isSame(selectedDate, 'day');
      
                  return `
                    ${isCurrentDate ? searchStyle.currentDate : ''}
                    ${isSelectedDate ? searchStyle.selectedDate : ''}
                  `;
                }
      
                return '';
              }}
            />
            <h3>인원 선택</h3>
            <div className="people-selector">
              <button onClick={decreasePeople}>-</button>
              <span>{numberOfPeople}</span>
              <button onClick={increasePeople}>+</button>
            </div>
            <Link
            to={`/payment/${encodeURIComponent(eventData.TITLE)}`}
            state= { {eventData: eventData,  selectedDate: selectedDate,
              numberOfPeople: numberOfPeople,}}
            onClick={() => console.log('Link clicked', eventData.TITLE, eventData)}
            >
            <button className={searchStyle.reservePaymentBtn}>결제하기</button>
            </Link>
            <button  onClick={handleReserve} className={searchStyle.reserveBtn}>장바구니</button>
            
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Reserve;

