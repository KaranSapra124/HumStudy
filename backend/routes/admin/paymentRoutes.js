const express = require("express");
const errorCatch = require("../../middlewares/errorCatchWrapper");
const { getItem, editItem, deleteItem, addItem, getAllItems } = require("../../methods/commonMethods");
const Payment = require("../../models/payment");

const router = express.Router();

router.get(
  "/get",
  errorCatch(async (req, res, next) => getAllItems("Payments", Payment, res, next))
);
router.post(
  "/create",
  errorCatch(async (req, res, next) => addItem('Payment', Payment, req, res, next))
);
router.post(
  "/update/:id",
  errorCatch(async (req, res, next) => editItem('Payment', Payment, req, res, next))
);

router.post(
  "/delete/:id",
  errorCatch(async (req, res, next) => deleteItem('Payment', Payment, req, res, next))
);

module.exports = router;
