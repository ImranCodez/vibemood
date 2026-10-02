const sendResponse = require("../services/responsiveHandler");

const rolecheckmiddleware = (...roles) => {
  return (req, res, next) => {
    try {
      if (roles.includes(req.user.role)) {
        console.log("hea hoise");
        return next();
      }
      return sendResponse(res, 403, "Forbidden");
      console.log(req?.user?.role);
      console.log(roles);
    } catch (error) {
      sendResponse(res, 500, "Internal server error");
    }
  };
};

module.exports = rolecheckmiddleware;
