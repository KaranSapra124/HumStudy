const express =require("express")
const { userSignUp, userLogin, ValidateUser, userLogout, sendForgotPasswordEmail, changePassword } = require("../methods/authMethods")
const router=express.Router()

router.post("/user/signup",userSignUp)
router.post("/user/login",userLogin)

router.post("/validateUserToken",ValidateUser)

router.post("/user/forgot-password",sendForgotPasswordEmail)
router.post("/user/change-password",changePassword)


module.exports =router