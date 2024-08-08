const express = require("express");
const router = express.Router();
const multer = require("../../config/multer");
const {
  getAllItems,
  getItem,
  addItem,
  deleteItem,
  editItem,
  deleteAllItems,
} = require("../../methods/commonMethods");
const {
  getByCategory,
  addByCategory,
  addLoanInfo,
  updateBankImages,
  updateByCategory,
} = require("../../methods/loanMethods");
const errorCatch = require("../../middlewares/errorCatchWrapper");
const Loan = require("../../models/loan");
const readFile = require("../../middlewares/loanData");
const { userAuth, adminAuth } = require("../../middlewares/authMiddleware");
const updateLoanData = require("../../middlewares/updateLoanMiddleware");

router.get(
  "/get",
  adminAuth,
  errorCatch(async (req, res, next) => getAllItems("Loans", Loan, res, next))
);

router.get(
  "/get/:id",
  adminAuth,
  errorCatch(async (req, res, next) => getItem("Loans", Loan, req, res, next))
);

router.get("/get-by-category/:category", getByCategory);

router.post(
  "/create",
  multer.upload.single("bankImage"),
  errorCatch(async (req, res, next) => {
    console.log(req.file, "FILES");
    const item = {
      ...req.body,
      ...(req.file.filename && {
        bankImage: req.file.filename,
      }),
    };
    addItem("Loan", Loan, req, res, next, item);
  })
);

router.post("/add-by-category/:category", readFile, addByCategory);
router.post("/update-by-category/:category", updateLoanData, updateByCategory);
router.post(
  "/update/:id",
  multer.upload.single("bankImage"),
  adminAuth,
  errorCatch(async (req, res, next) => {
    console.log(req.body);
    const item = {
      ...req.body,
      ...(req.file.filename && {
        bankImage: req.file.filename,
      }),
    };
    editItem("Loan", Loan, req, res, next, item);
  })
);

router.post(
  "/delete/:id",
  adminAuth,
  errorCatch(async (req, res, next) => deleteItem("Loan", Loan, req, res, next))
);
router.delete(
  "/delete-all",
  adminAuth,
  errorCatch(async (req, res, next) =>
    deleteAllItems("Loan", Loan, req, res, next)
  )
);

router.post("/add-loan-info", userAuth, addLoanInfo);

router.post(
  "/add-bank-image",
  multer.upload.single("bankImage"),
  updateBankImages
);

module.exports = router;
