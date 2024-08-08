const ErrorHandler = require("../utils/errorHandler");
const errorCatch = require("./errorCatchWrapper");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
exports.adminAuth = errorCatch(async (req, res, next) => {
  const token = req.cookies["tokenA"];
  if (!token) {
    req.authorized = false;
    return res.status(401).send({ message: "You have to login first!" });
  }

  jwt.verify(token, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
    if (err) {
      req.authorized = false;
      return res.status(401).send({ message: "You have to login first!" });
    } else {
      req.authorized = true;
      req.admin = decoded.id;
      next();
    }
  });
});


// exports.authAction = errorCatch(async (req, res, next) => {
//   console.log('autorized:', req.authorized);
//   if (!req.authorized)
//     return res.status(401).json({ success: false, unauthorized: true });
//   next();
// });
exports.userAuth = errorCatch(async (req, res, next) => {
  const token = req.cookies["tokenU"];

  if (!token) {
    req.authorized = false;
    return next(new ErrorHandler("Authentication Failed", 400));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      req.authorized = false;
      return next(new ErrorHandler("Authentication Failed", 400));
    } else {
      req.authorized = true;
      req.user = decoded;
      console.log("token:", decoded);
    }
    next();
  });
});
