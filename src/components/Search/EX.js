import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import searchStyle from "./search.module.css";
import axios from 'axios';
import Footer from '../Footer/Footer';

const EX = () => {
  const publicUrl = process.env.PUBLIC_URL;

  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showExpired, setShowExpired] = useState(false);
  const [showScheduled, setShowScheduled] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredSearchData, setFilteredSearchData] = useState([]);

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

        if (showExpired && status === '종료됨') {
          return titleMatch && categoryMatch;
        }

        if (showScheduled && (status === '진행 예정' || status === '진행 중')) {
          return titleMatch && categoryMatch;
        }

        return titleMatch && categoryMatch && !showExpired && !showScheduled;
      })
    : [];

  return (
    
    <div className={searchStyle.searchBox}>
      <div className={searchStyle.searchTop}>
      <h1 className={searchStyle.searchLogo}>
        <img src={`${publicUrl}/images/logo.svg`} alt="티켓팅 로고" />
      </h1>
      <div className={searchStyle.searchinput}>
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
      <div className={searchStyle.searchcheckbox}>
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
      </div>
      {filteredData.length > 0 ? (
        <div className={searchStyle.searchListTop}>
          {filteredData.map((item, index) => (
            <div key={index} className={searchStyle.searchList}>
              
              <img src={item.MAIN_IMG} alt={`Image for ${item.TITLE}`} className={searchStyle.searchListImg} />
              <div className={searchStyle.searchListTxt}>
              <div className={searchStyle.searchListinfo}>
              <p> {item.TITLE}</p>
              <p> {item.PLACE || '-'}</p>
              <p> {item.CODENAME || '-'}</p>
              <p>{item.DATE.split('~')[0]} - {item.DATE.split('~')[1]}</p>
              <p>요금: {item.IS_FREE || '-'}</p>
              </div>
              <div className={searchStyle.searchListReserve}>
              <p style={{ color: getStatus(item.DATE.split('~')[0], item.DATE.split('~')[1]).color }}>
                {getStatus(item.DATE.split('~')[0], item.DATE.split('~')[1]).status}
              </p>
              <Link
                to={`/reserve/${encodeURIComponent(item.TITLE)}`}
                state= { {eventData: item }}
                onClick={() => console.log('Link clicked', item.TITLE, item)}
              >
                <button>예약하기</button>
              </Link>
              </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={searchStyle.searchLodingTxt}>검색 결과가 없습니다.</p>
      )}
      <Footer/>
    </div>
  );
};

export default EX;
