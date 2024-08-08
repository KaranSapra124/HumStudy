const admin = require("../models/admin");
const Universities = require("../models/university");
const courses = require("../models/course");
const uniApplications = require("../models/user");
const flightApplications = require("../models/flight");
const visaApps = require("../models/visa");
const errorCatch = require("../middlewares/errorCatchWrapper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.adminSignIn = errorCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const adminData = await admin.create({
    username,
    password,
  });
  if (!adminData) {
    return next(new Errorhandler("User Not Created"));
  }
  const token = await admin.generateAuthToken();
  res.cookie("tokenA", token, {
    withCredentials: true,
    httpOnly: false,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), // Convert days to milliseconds
  });
  res.status(201).json({
    success: true,
    data: adminData,
  });
});

exports.adminLogin = errorCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const adminData = await admin
    .findOne({ username: username })
    .select("+password");
  const isPasswordMatched = bcrypt.compare(password, adminData?.password);
  if (!isPasswordMatched) {
    return res.status(400).send({ message: "Invalid Password" });
  }
  const token = jwt.sign({ id: adminData._id }, process.env.JWT_ADMIN_SECRET, {
    expiresIn: process.env.JWT_EXPIRE, //expires in 30 days
  });
  res.cookie("tokenA", token, {
    withCredentials: true,
    httpOnly: false,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    domain: process.env.COOKIE_DOMAIN,

    // Convert days to milliseconds
  });
  return res.status(201).send({ message: "Logged In Successfully!" });
});

exports.adminLogout = errorCatch(async (req, res, next) => {
  res.clearCookie("tokenA");
});

exports.adminCard = errorCatch(async (req, res) => {
  const uniCount = await Universities.countDocuments();
  const courseCount = await courses.countDocuments();
  const flightCount = await flightApplications.countDocuments();
  const visaCounts = await visaApps.countDocuments();
  const uniAppCount = await uniApplications.countDocuments({
    universitiesApplied: { $exists: true, $ne: [] },
  });
  const loanAppCount = await uniApplications.countDocuments({
    loansApplied: { $exists: true, $ne: [] },
  });

  return res.status(201).send({
    message: "Data Fetched Successfully!",
    data: [
      { uni: uniCount },
      { course: courseCount },
      { flight: flightCount },
      { visa: visaCounts },
      { uniAppsCount: uniAppCount },
      { loanAppsCount: loanAppCount },
    ],
  });
});
