import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Data = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data/culture');
        setData(response.data.response.body.items.item);
      } catch (error) {
        console.error('문화 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>문화 데이터</h2>
      {data && Array.isArray(data) ? (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <p>Title: {item.title}</p>
              <p>Creator: {item.creator}</p>
              <p>RegDate: {item.regDate}</p>
              <img src={item.referenceIdentifier} alt={`Image for ${item.title}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
              <a href={item.url} target="_blank" rel="noopener noreferrer">Link</a>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Data;
