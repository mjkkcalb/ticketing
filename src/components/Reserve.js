import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Reserve = () => {
  const { title } = useParams();
  console.log(title);
  const decodedTitle = decodeURIComponent(title);
  console.log('decodedTitle:', decodedTitle);

  const location = useLocation();
  console.log(location);

  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    console.log('location.state:', location.state);

    // location.state에 eventData가 있으면 설정
    if (location.state && location.state.eventData) {
      setEventData(location.state.eventData);
    }
  }, [decodedTitle, location.state ]);

  return (
    <div>
      <h2>예약 페이지</h2>
      {eventData ? (
        <div>
          {/* eventData를 이용하여 필요한 정보 표시 */}
          <img
            src={eventData.MAIN_IMG || ''}
            alt={`Image for ${eventData.TITLE || ''}`}
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
          <p>제목: {eventData.TITLE || '-'}</p>
          <p>장소: {eventData.PLACE || '-'}</p>
          <p>분류: {eventData.CODENAME || '-'}</p>
          {eventData.DATE ? (
            <>
              <p>시작일: {eventData.DATE.split('~')[0]}</p>
              <p>끝난 일: {eventData.DATE.split('~')[1]}</p>
            </>
          ) : (
            <p>날짜 정보 없음</p>
          )}
          <p>요금: {eventData.USE_FEE || '-'}</p>
          {/* 기타 데이터 필요한 부분을 추가할 수 있습니다 */}
        </div>
      ) : (
        <p>데이터를 불러오는 중이거나 없습니다.</p>
      )}
    </div>
  );
};

export default Reserve;
