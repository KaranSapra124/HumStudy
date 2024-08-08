const express = require("express");
const {
  adminSignIn,
  adminLogin,
  adminLogout,
} = require("../../methods/adminMethod");
const { adminAuth } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.post("/adminSignUp", adminSignIn);
router.post("/adminLogin", adminLogin);
router.post("/adminLogout", adminLogout);

// router.post("/validateUserToken", ValidateUser);

// router.post("/user/forgot-password", sendForgotPasswordEmail);
// router.post("/user/change-password", changePassword);

module.exports = router;
