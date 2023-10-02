const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/massage", require("./massage.routes"));
router.use("/user", require("./user.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/order", require("./order.routes"))

module.exports = router;
