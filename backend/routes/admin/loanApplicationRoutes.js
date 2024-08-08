const {
  getAllItems,
  addItem,
  deleteAllItems,
  getItem,
  deleteItem,
  editItem,
} = require("../../methods/commonMethods");
const {
  getLoans,
  updateLoan,
  deleteLoan,
  addLoan,
  updateStatus,
} = require("../../methods/loanMethods");
const { adminAuth } = require("../../middlewares/authMiddleware");
const errorCatch = require("../../middlewares/errorCatchWrapper");
const LoanApplication = require("../../models/loanApplication");

const router = require("express").Router();

router.get("/get", getLoans);
router.get(
  "/get/:id",
  adminAuth,
  errorCatch(async (req, res, next) =>
    getItem("Loan applications", LoanApplication, req, res, next)
  )
);
router.post("/add-loan", adminAuth, addLoan);
router.post("/update-loan/:id", adminAuth, updateLoan);
router.post("/delete-loan-application/:id", adminAuth, deleteLoan);
router.post("/update-status", adminAuth, updateStatus);
router.delete(
  "/delete-all",
  adminAuth,
  errorCatch(async (req, res, next) =>
    deleteAllItems("Loan application", LoanApplication, req, res, next)
  )
);

module.exports = router;
