const axios = require("axios");

const getCultureData = async (req, res) => {
  try {
    const searchValue = req.query.q;

    const response = await axios.get(
      "http://api.kcisa.kr/openapi/API_CCA_142/request",
      {
        params: {
          serviceKey: process.env.ServiceKey,
          numOfRows: 20,
          pageNo: 1,
          infoTp: "026",
          searchValue: searchValue, 
        },
      }
    );
    console.log('Received data from external API:', response.data);

    res.json(response.data);
  } catch (error) {
    // 에러 처리
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCultureData,
};
