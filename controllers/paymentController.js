const Payment = require("../models/paymentModel");

exports.getPaymentPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const Paymentposts = await Payment.find()
      .sort({ wdate: -1 })
      .skip(skip)
      .limit(perPage)
      .lean();

    // 추가된 부분 시작
    const enrichedPaymentPosts = Paymentposts.map(post => {
      return {
        ...post,
        paymentMethod: post.paymentMethod || '',  // 수정된 부분
        paymentTime: post.paymentTime || null,    // 수정된 부분
      };
    });
    // 추가된 부분 끝

    const totalPaymentPosts = await Payment.countDocuments();
    const totalPaymentPages = Math.ceil(totalPaymentPosts / perPage);

    res.json({ docs: enrichedPaymentPosts, totalPaymentPages });
  } catch (error) {
    console.log("Paymentposts err: ", error);
    res.status(500).send("Paymentposts 서버 오류");
  }
};

exports.getPaymentPostTotal = async (req, res) => {
  try {
    const totalPaymentPosts = await Payment.countDocuments();
    res.json({ total: totalPaymentPosts });
  } catch (error) {
    console.log("오류: ", error);
    res.status(500).send("서버 오류");
  }
};


exports.getPayment = async (req, res) => {
  const { eventData, selectedDate, numberOfPeople, paymentMethod, paymentTime, totalPrice } = req.body;
  try {
    const newPayment = new Payment({ eventData, selectedDate, numberOfPeople,paymentMethod: paymentMethod, paymentTime: paymentTime, totalPrice });
    await newPayment.save();
    res.sendStatus(200);
  } catch (error) {
    console.log("작성 오류: ", error);
    res.status(500).send("서버 작성 오류");
  }
};


exports.getPaymentPostDelete = async (req, res) => {
  const PaymentId = req.params.id;
  try {
    await Payment.deleteOne({ _id: PaymentId });
    res.sendStatus(200);
  } catch (error) {
    console.log("삭제 오류: ", error);
    res.status(500).send("서버 삭제 오류");
  }
};
