const express = require("express");
const router = express.Router({ mergeParams: true });
const Order = require("../models/Order");
const sendEmail = require("../emails/email1");

router.get("/", async (req, res) => {
  try {
    const list = await Order.find({ userId: userId });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже!",
    });
  }
});
router.post("/user", async (req, res) => {
  try {
    const list = await Order.find({ userId: req.body.userId });
    const period =
      Date.parse(req.body.startDate) - Date.parse(req.body.endDate);
    let newList;
    if (period !== 0) {
      newList = [
        ...list.filter(
          (e) =>
            Date.parse(e.date) >= Date.parse(req.body.startDate) &&
            Date.parse(e.date) <= Date.parse(req.body.endDate)
        ),
      ];
    } else {
      newList = [...list];
    }
    if (req.body.massage) {
      newList = [...newList.filter((e) => e.massage === req.body.massage)];
    }
    res.status(200).send(newList);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже!",
    });
  }
});
router.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findOne({ _id: orderId });
    res.status(200).send(order);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже!",
    });
  }
});
router.post("/", async (req, res) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  // console.log(new Intl.DateTimeFormat("ru", options).format(new Date(req.body.date)))
  try {
    const { nick, phone, massage, date } = req.body;
    const newOrder = await Order.create({ ...req.body });
    res.status(201).send(newOrder);
    sendEmail(
      nick,
      phone,
      massage,
      new Intl.DateTimeFormat("ru", options).format(new Date(date))
    );
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже!",
    });
  }
});
module.exports = router;
