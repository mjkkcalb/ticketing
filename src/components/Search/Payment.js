import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import searchStyle from "./search.module.css";
import { BiCreditCard, BiMobile, BiDollarCircle, BiChevronLeft } from "react-icons/bi";

const Payment = () => {

  const publicUrl = process.env.PUBLIC_URL;

  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  

  const location = useLocation();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState('');


  useEffect(() => {
    console.log('location.state:', location.state);


    if (location.state && location.state.eventData) {
      setEventData(location.state.eventData)

      if (location.state.selectedDate) {
        console.log('Selected Date:', location.state.selectedDate);
      }
  
      if (location.state.numberOfPeople) {
        console.log('Number of People:', location.state.numberOfPeople);
      }
      if (location.state.id) {
        console.log('id:', location.state.id);
      }
    }
  }, [decodedTitle, location.state ]);

  const calculateTotalPrice = () => {
    const useFee = parseFloat(eventData.USE_FEE) || 0;
    const numberOfPeople = parseInt(location.state.numberOfPeople) || 0;
    const totalPrice = useFee * numberOfPeople;
    return totalPrice === 0 ? 0 : totalPrice || '-';
  };

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    } else {
      return '-';
    }
  };

  const handlePayment = async () => {

    if (!name || !phoneNumber || !email) {
      setNotification('이름, 휴대폰번호, 이메일은 필수 입력 사항입니다.');
      return;
    }
    
    setNotification('');

    try {
      console.log('Data to send:', {
        eventData,
        selectedDate: location.state.selectedDate,
        numberOfPeople: location.state.numberOfPeople,
      });
  
      const response = await axios.post(`/payment/${encodeURIComponent(title)}`, {
        eventData,
        selectedDate: location.state.selectedDate,
      numberOfPeople: location.state.numberOfPeople,
      });
       // 예약이 성공적으로 저장되었을 때 알림창 표시
       alert('결제가 완료되었습니다.');

        // 확인을 누르면 메인 화면으로 이동
        navigate('/main');
       // eventData 객체에서 _id를 가져옵니다.
      const reserveIdToDelete = location.state.id;

        // 해당 _id를 사용하여 예약 정보를 삭제합니다.
        const deleteResponse = await axios.delete(`/save/delete/${reserveIdToDelete}`);
        if (deleteResponse.status === 200) {
          console.log('예약 정보 삭제 성공');
        } else {
          console.error('예약 정보 삭제 실패');
        }
      
  
      if (response.status === 200) {
        console.log('Reservation successful!');
      }
    } catch (error) {
      console.error('Reservation error:', error);
    }
  };

  const handleCancel = () => {
    const confirmResult = window.confirm('결제를 취소하시겠습니까?');
    if (confirmResult) {
      // 확인을 누르면 이전 페이지로 이동
      navigate(-1);
    }
  };


  return (
    <div className={searchStyle.paymentBox} >
      {eventData ? (
      <div l>
      <div className={searchStyle.paymentTop}>
      <button onClick={handleCancel}><BiChevronLeft /></button>
        <h2>주문/결제</h2>
      </div>
      <div  className={searchStyle.paymentInfo}>
        <h3>예매정보</h3>
        <div className={searchStyle.paymentInfoBox}>
        <img
            src={eventData.MAIN_IMG || ''}
            alt={`Image for ${eventData.TITLE || ''}`}
  
          />
          <div className={searchStyle.paymentInfoTxt}> 
          <h4> {eventData.TITLE || '-'}</h4>
          <table>
            <tr>
              <th>장소</th>
              <td>{eventData.PLACE || '-'}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>위치</td>
            </tr>
            <tr>
              <th>연령</th>
              <td>제한 사항</td>
            </tr>
          </table>
        </div>
        </div>
        <table className={searchStyle.paymentPlusTxt}>
        <tr>
          <th>날짜</th>
          <td>{formatDate(location.state.selectedDate)}</td>
        </tr>
        <tr>
          <th>가격</th>
          <td> {eventData.IS_FREE || '-'}</td>
        </tr>
        </table>
      </div>
      <div className={searchStyle.paymentUserInfo}>
        <h3>이용자 정보</h3>
        <ul>
        <li>
            <p>이름</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </li>
          <li>
            <p>휴대폰번호</p>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </li>
          <li>
            <p>이메일</p>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </li>
        </ul>
        {notification && <p style={{ color: 'red' }}>{notification}</p>}
        <p  className={searchStyle.paymentUserInfoTxt}>* 실제 관람 / 이용하실 분의 실명과 휴대폰 번호를 입력하세요.</p>
      </div>
      <div className={searchStyle.paymentSum}>
        <h3>결제금액</h3>
        <table className={searchStyle.paymentSumTxt}>
        <tr>
          <th>입장료</th>
          <td> {eventData.IS_FREE || '-'}</td>
        </tr>
        <tr>
          <th>인원 수</th>
          <td> {location.state.numberOfPeople} 명</td>
        </tr>
        <tr>
          <th>최종 결제 금액</th>
          <td> {calculateTotalPrice()}원 </td>
        </tr>
        </table>
      </div >
      <div className={searchStyle.paymentType}>
        <h3>결제 수단</h3>
        <ul>
          <li>
            <img src={`${publicUrl}/images/naverpayLogo.png`} alt="#" />
            <p>네이버페이</p>
          </li>
          <li>
            <img src={`${publicUrl}/images/kakaopayLogo.png`} alt="#" />
            <p>카카오페이</p>
          </li>
          <li>
            <img src={`${publicUrl}/images/tossLogo.png`} alt="#" />
            <p>토스페이</p>
          </li>
          <li>
            <img src={`${publicUrl}/images/applepayLogo.png`} alt="#" />
            <p>애플페이</p>
          </li>
          <li>
            <img src={`${publicUrl}/images/paycoLogo.png`} alt="#" />
            <p>페이코</p>
          </li>
          <li>
          <BiCreditCard />
            <p>카드결제</p>
          </li>
          <li>
          <BiMobile />
            <p>휴대폰결제</p>
          </li>
          <li>
          <BiDollarCircle />
            <p>무통장입금</p>
          </li>
        </ul>
      </div>
      <button onClick={handlePayment} className={searchStyle.paymentBtn}>결제하기</button>
      </div>
      ) : (  <p>데이터를 불러오는 중이거나 없습니다.</p>
      )}
    </div>
    
  );
};

export default Payment;
