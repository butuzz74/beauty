const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get("accessSecret"), {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, config.get("refreshSecret"));
    return {
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }
  async save(userId, refreshToken) {
    const data = await Token.findOne({ user: userId });    
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    const token = Token.create({ user: userId, refreshToken });
    return token;
  }
  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshSecret"));
    } catch (error) {
      return null;
    }
  }
  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("accessSecret"));
    } catch (error) {
      return null;
    }
  }
  async findToken(refreshToken) {
    try {
      return Token.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
