const express = require("express");
const errorCatch = require("../../middlewares/errorCatchWrapper");
const { addVisa, getVisa } = require("../../methods/visaMethods");
const router = express.Router();
const Visa = require("../../models/visa");
const {
  getAllItems,
  addItem,
  editItem,
  deleteItem,
} = require("../../methods/commonMethods");
const { adminAuth } = require("../../middlewares/authMiddleware");

// console.log("I AM HERE");
router.post("/add-visa", addVisa);
router.post(
  "/add-visa-admin",adminAuth,
  errorCatch(async (req, res, next) => {
    // console.log(req.body,"REQUEST")
    addItem("Visa", Visa, req, res, next);
  })
);
router.post(
  "/edit-visa-admin/:id",
  adminAuth,
  errorCatch(async (req, res, next) => {
    editItem("Visa", Visa, req, res, next);
  })
);

router.post(
  "/delete-visa-admin/:id",
adminAuth,
  errorCatch(async (req, res, next) => {
    deleteItem("Visa", Visa, req, res, next);
  })
);
router.get(
  "/get",
  // adminAuth,
  errorCatch(async (req, res, next) => {
    getAllItems("Visa", Visa, res, next);
  })
);

module.exports = router;
