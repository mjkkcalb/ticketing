import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EX = () => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showExpired, setShowExpired] = useState(false);
  const [showScheduled, setShowScheduled] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/ex/twoculture');
        setData(response.data.culturalEventInfo.row);
      } catch (error) {
        console.error('문화 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleShowExpiredChange = () => {
    setShowExpired(!showExpired);
  };

  const handleShowScheduledChange = () => {
    setShowScheduled(!showScheduled);
  };

  const compareDates = (date1, date2) => {
    const dateTime1 = new Date(date1.replace(/-/g, '/'));
    const dateTime2 = new Date(date2.replace(/-/g, '/'));
    return dateTime1.getTime() - dateTime2.getTime();
  };

  const getStatus = (startDate, endDate) => {
    const startDateTime = new Date(startDate.replace(/-/g, '/'));
    const endDateTime = new Date(endDate.replace(/-/g, '/'));

    if (endDateTime < currentDate) {
      return { status: '종료됨', color: 'red' };
    } else if (startDateTime > currentDate) {
      return { status: '진행 예정', color: 'blue' };
    } else {
      return { status: '진행 중', color: 'green' };
    }
  };

  const filteredData = data
    ? Object.values(data).filter((item) => {
        const titleMatch = item.TITLE.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = selectedCategory === '' || item.CODENAME === selectedCategory;
        const [startDate, endDate] = item.DATE.split('~');
        const { status } = getStatus(startDate, endDate);

        // 종료된 이벤트 필터링
        if (showExpired && status === '종료됨') {
          return titleMatch && categoryMatch;
        }

        // 예약 가능 이벤트 필터링
        if (showScheduled && (status === '진행 예정' || status === '진행 중')) {
          return titleMatch && categoryMatch;
        }

        // 일반적인 필터링
        return titleMatch && categoryMatch && !showExpired && !showScheduled;
      })
    : [];

  return (
    <div>
      <h2>문화 데이터</h2>
      <div>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">전체</option>
          <option value="콘서트">콘서트</option>
          <option value="전시/미술">전시</option>
          <option value="연극">연극</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showExpired}
            onChange={handleShowExpiredChange}
          />
          종료된 이벤트 보기
        </label>
        <label>
          <input
            type="checkbox"
            checked={showScheduled}
            onChange={handleShowScheduledChange}
          />
          예약 가능 이벤트 보기
        </label>
      </div>
      {filteredData.length > 0 ? (
        <div>
          {filteredData.map((item, index) => (
            <div key={index}>
              <p style={{ color: getStatus(item.DATE.split('~')[0], item.DATE.split('~')[1]).color }}>
                {getStatus(item.DATE.split('~')[0], item.DATE.split('~')[1]).status}
              </p>
              <img
                src={item.MAIN_IMG}
                alt={`Image for ${item.TITLE}`}
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
              <p>제목: {item.TITLE}</p>
              <p>장소: {item.PLACE || '-'}</p>
              <p>분류: {item.CODENAME || '-'}</p>
              <p>시작일: {item.DATE.split('~')[0]}</p>
              <p>끝난 일: {item.DATE.split('~')[1]}</p>
              <p>요금: {item.USE_FEE || '-'}</p>
              <Link
                to={{
                  pathname: `/reserve/${encodeURIComponent(item.TITLE)}`,
                  state: { eventData: item }
                }}
                onClick={() => console.log('Link clicked', item.TITLE, item)}
              >
                <button>예약하기</button>
              </Link>
              {/* <a
                href={item.HMPG_ADDR}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </a> */}
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default EX;
