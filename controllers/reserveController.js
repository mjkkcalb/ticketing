
const Reserve = require("../models/reserveModel");

exports.getReservePosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const Reserveposts = await Reserve.find()
      .sort({ wdate: -1 })
      .skip(skip)
      .limit(perPage)
      .lean();
    const totalReservePosts = await Reserve.countDocuments();
    const totalReservePages = Math.ceil(totalReservePosts / perPage);

    res.json({ docs: Reserveposts, totalReservePages });
  } catch (error) {
    console.log("Reserveposts err: ", error);
    res.status(500).send("Reserveposts 서버 오류");
  }
};

exports.getReservePostTotal = async (req, res) => {
  try {
    const totalReservePosts = await Reserve.countDocuments();
    res.json({ total: totalReservePosts });
  } catch (error) {
    console.log("오류: ", error);
    res.status(500).send("서버 오류");
  }
};


exports.getReserve = async (req, res) => {
  const { eventData, selectedDate, numberOfPeople } = req.body;
  try {
    const newReserve = new Reserve({ eventData, selectedDate, numberOfPeople });
    await newReserve.save();
    res.sendStatus(200);
  } catch (error) {
    console.log("작성 오류: ", error);
    res.status(500).send("서버 작성 오류");
  }
};


exports.getReservePostDelete = async (req, res) => {
  const ReserveId = req.params.id;
  try {
    await Reserve.deleteOne({ _id: ReserveId });
    res.sendStatus(200);
  } catch (error) {
    console.log("삭제 오류: ", error);
    res.status(500).send("서버 삭제 오류");
  }
};

exports.getReservePostUpdate = async (req, res) => {
  const { id, selectedDate, numberOfPeople} = req.body;
  try {
    await Reserve.updateOne({ _id: id }, { selectedDate, numberOfPeople });
    res.sendStatus(200);
  } catch (error) {
    console.log("수정 오류: ", error);
    res.status(500).send("서버 수정 오류");
  }
};
