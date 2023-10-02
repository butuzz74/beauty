const express = require("express");
const bctypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");
const router = express.Router({ mergeParams: true });
const tokenService = require("../services/token.services");
const User = require("../models/User");
const sendEmail = require("../emails/emails");

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefreshToken(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);
    if (!data || !dbToken || data._id !== dbToken?.user?.toString()) {
      return res.status(401).json({
        message: "Unauthorised",
      });
    }
    const tokens = tokenService.generate({ _id: dbToken.user.toString() });
    await tokenService.save(dbToken.user.toString, tokens.refreshToken);
    res.status(201).send({ ...tokens, _id: dbToken.user.toString() });
  } catch (error) {
    res.status(500).send({
      message: "На сервере произошла ошибка. Попробуйте позже!",
    });
  }
});
router.post(
  "/signin",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Пароль должен содержать не менее 8 символов").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        res.status(400).json({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }
      const isEqualPassword = await bctypt.compare(
        password,
        existingUser.password
      );
      if (!isEqualPassword) {
        res.status(400).json({
          error: {
            message: "PASSWORD_UNCORRECT",
            code: 400,
          },
        });
      }
      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);
      res.status(201).send({ ...tokens, userId: existingUser._id });
    } catch (error) {
      res.status(500).send({
        message: "На сервере произошла ошибка. Попробуйте позже!",
      });
    }
  }
);
router.post(
  "/signup",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Пароль должен содержать не менее 8 символов").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({
          error: {
            message: "EMAIL_EXIST",
            code: 400,
          },
        });
      }
      const hashPassword = await bctypt.hash(password, 12);
      const newUser = await User.create({
        ...req.body,
        password: hashPassword,
      });
      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);
      res.status(201).send({ ...tokens, userId: newUser._id });       
      sendEmail(req.body.email, req.body.nick);     
    } catch (error) {
      res.status(500).send({
        message: "На сервере произошла ошибка. Попробуйте позже!",
      });
    }
  }
);

module.exports = router;
