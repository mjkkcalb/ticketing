const axios = require("axios");

const getTwoCultureData = async (req, res) => {
  try {
    const searchValue = req.query.q;

    const response = await axios.get(
      `http://openapi.seoul.go.kr:8088/${process.env.APPKEY}/json/culturalEventInfo/1/1000/`,
      {
        params: {
          Type: "json",
          Service: "culturalEventInfo",
          StartIndex: 1,
          EndIndex: 1000,
          searchValue: searchValue,
        },
      }
    );


    const processedData = processCultureData(response.data); 
    res.json(processedData);
  } catch (error) {
    // 에러 처리
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const processCultureData = (data) => {
  return data; 
};

const reserveData = async (req, res) => {
  try {
    const searchValue = req.params.title;

    const response = await axios.get(
      `http://openapi.seoul.go.kr:8088/${process.env.APPKEY}/json/culturalEventInfo/1/1000/`,
      {
        params: {
          Type: "json",
          Service: "culturalEventInfo",
          StartIndex: 1,
          EndIndex: 5,
          searchValue: searchValue,
        },
      }
    );

    const reserveData = processReserveData(response.data); // 예약 페이지에 필요한 데이터만 추출
    res.json(reserveData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const processReserveData = (data) => {
  // 예약 페이지에 필요한 정보만을 추출하여 반환
  return {
    title: data.title,
    place: data.place,
    startDate: data.startDate,
    endDate: data.endDate,
    // ... 기타 필요한 정보들
  };
};



module.exports = {
  getTwoCultureData,
  reserveData
};
