const sendResponse = require("../services/responsiveHandler");
const { verifyToken } = require("../services/token");
const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return sendResponse(res, 401, "Please sign in first");
    const decoded = verifyToken(token);
    if (!decoded) return sendResponse(res, 401, "Please sign in again");
    req.user = decoded;
    next();
  } catch (error) {
    sendResponse(res, 401, "Please sign in again");
    console.log(error);
  }
};
module.exports = { authMiddleware };
