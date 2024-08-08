const express = require("express");
const errorCatch = require("../../middlewares/errorCatchWrapper");
const { addVisa, getVisa } = require("../../methods/visaMethods");
const router = express.Router();
const Flight = require("../../models/flight");
const {
  getAllItems,
  addItem,
  editItem,
  deleteItem,
} = require("../../methods/commonMethods");
const { adminAuth } = require("../../middlewares/authMiddleware");

// console.log("I AM HERE");

// router.post(
//   "/add-visa-admin",
//   errorCatch(async (req, res, next) => {
//     // console.log(req.body,"REQUEST")
//     addItem("Visa", Visa, req, res, next);
//   })
// );
// router.post(
//   "/edit-visa-admin/:id",
//   errorCatch(async (req, res, next) => {
//     editItem("Visa", Visa, req, res, next);
//   })
// );

// router.delete(
//   "/delete-visa-admin/:id",
//   errorCatch(async (req, res, next) => {
//     deleteItem("Visa", Visa, req, res, next);
//   })
// );
router.get(
  "/get-flights",adminAuth,
  errorCatch(async (req, res, next) => {
    getAllItems("Flight", Flight, res, next);
  })
);

router.post(
  "/add-flight-query",
  errorCatch(async (req, res, next) => {
    addItem("Flight", Flight, req, res, next);
  })
);

router.post(
  "/update-flight-query/:id",adminAuth,
  errorCatch(async (req, res, next) => {
    editItem("Flight", Flight, req, res, next);
  })
);

router.post(
  "/delete-flight-query/:id",adminAuth,
  errorCatch(async (req, res, next) => {
    deleteItem("Flight", Flight, req, res, next);
  })
);

module.exports = router;
