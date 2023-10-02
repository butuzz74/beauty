const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/:userId", auth, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });    
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже!",
    });
  }
});
router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId === req.body._id) {
      const updateUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.status(200).send(updateUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже!",
    });
  }
});

module.exports = router;
