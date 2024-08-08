const errorCatch = require("../middlewares/errorCatchWrapper");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const Errorhandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

exports.userSignUp = errorCatch(async (req, res, next) => {
  const { fName, lName, email, password } = req.body;

  const user = await User.create({
    fName,
    lName,
    email,
    password,
  });
  if (!user) {
    return next(new Errorhandler("User Not Created"));
  }
  const token = await user.getJWTToken();
  res.cookie("tokenU", token, {
    withCredentials: true,
    httpOnly: false,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), // Convert days to milliseconds
    domain:process.env.COOKIE_DOMAIN
  });
  res.status(201).json({
    success: true,
    data: {
      fName: user.fName,
      lName: user.lName,
      _id: user._id,
    },
  });
});

exports.userLogin = errorCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Errorhandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    return next(new Errorhandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid email or password", 401));
  }
  user.password = password;
  await user.save();

  const token = await user.getJWTToken();
  res.cookie("tokenU", token, {
    withCredentials: true,
    httpOnly: false,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), // Convert days to milliseconds
    // domain:process.env.COOKIE_DOMAIN
  });
  res.status(200).json({
    success: true,
    data: {
      fName: user.fName,
      lName: user.lName,
      _id: user._id,
    },
  });
});

exports.ValidateUser = errorCatch(async (req, res, next) => {
  const token = req.cookies["tokenU"];

  if (!token) {
    return next(new ErrorHandler("Authentication Failed", 400));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ErrorHandler("Authentication Failed", 400));
    } else {
      res.status(200).json({
        valid: true,
        user: decoded,
      });
    }
  });
});

exports.userLogout = errorCatch(async (req, res, next) => {
  res.clearCookie("tokenU", { withCredentials: true });

  // Send response
  res.status(200).json({
    message: "User logout successful!",
    success: true,
  });
});

exports.sendForgotPasswordEmail = errorCatch(async (req, res, next) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("email not exist", 404));
  }
  const otp = user.generateOtp();
  user.otp = otp;
  const subject = "Forgot Password";
  const message = `<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
   <p style="font-size: 18px; font-weight: bold;">OTP Verification</p>
   <p>Please confirm your OTP</p>
   <p>Here is your OTP code: <span style="font-weight: bold;">${otp}</span></p>
   </div>
   `;
  const option = {
    toemail: req.body.email,
    subject,
    message,
  };
  sendEmail(option)
    .then(async () => {
      await user.save();
      res.status(201).json({
        success: true,
        message: `OTP sent successfully to ${user?.email}`,
      });
    })
    .catch((err) => {
      console.log(err);
      return next(new Errorhandler("error sending email", 500));
    });
});

exports.changePassword = errorCatch(async (req, res, next) => {
  const { email, otp, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (!user) {
    return next(new Errorhandler("User not Exist", 404));
  }
  if (user.otp !== otp || user.otpExpire < Date.now()) {
    user.otpAttempts += 1;
    await user.save();
    return next(new Errorhandler("Invalid OTP", 400));
  }
  if (user.otpAttempts >= 3) {
    return next(new Errorhandler("Maximum OTP attempts exceeded", 400));
  }

  user.password = password;
  user.otp = null;
  user.otpAttempts = 0;
  user.otpExpire = null;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});


