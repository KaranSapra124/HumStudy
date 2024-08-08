const errorCatch = require("../middlewares/errorCatchWrapper");
const Loan = require("../models/loan");
const loanApplied = require("../models/loanApplied");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/user");
// const loanApplied = require("../models/loanApplied");
// const loanApplied = require("../models/loanApplied");

exports.getByCategory = errorCatch(async (req, res, next) => {
  const loans = await Loan.find({ category: req.params.category });
  res.json({ success: true, message: "Retrieved loans successfully", loans });
});

exports.addByCategory = errorCatch(async (req, res, next) => {
  // console.log(req.body.items);
  const items = await Loan.insertMany(
    req.body.items.map((item) => ({ ...item, category: req.params.category }))
  );

  if (items.length > 0)
    return res.status(200).json({
      success: true,
      message: "Added loans in category " + req.params.category,
      newItems: items,
    });
  else return next(new ErrorHandler("Something went wrong", "405"));
});

exports.updateByCategory = errorCatch(async (req, res, next) => {
  const { items } = req.body;

  // Find all loans in the specified category
  const loansData = await Loan.find({ category: req.params.category });

  const savePromises = loansData.map((loan, index) => {
    if (items[index] !== undefined) {
      loan.processingFee = items[index].processingFee;
    } else {
      console.warn(`No processing fee for loan at index ${index}`);
    }
    return loan.save(); // Save each loan and return the promise
  });

  await Promise.all(savePromises);

  // Send the updated loans in the response without saving to the database
  return res.status(201).send({ loans: loansData });
});

exports.getLoans = errorCatch(async (req, res, next) => {
  const loans = await loanApplied.find().populate("userId").populate("loanId");
  return res.status(201).send({ message: "Success", allItems: loans });
});

exports.updateLoan = errorCatch(async (req, res, next) => {
  // const { status} = req.body;
  const user = await User.findById(req.params.id);
  // console.log(user);
  if (!user) {
    return res.status(401).send({ message: "User Not Found!" });
  }

  // if (status && loanAppliedId) {
  //   const loanAppliedData = await loanApplied.find();
  //   console.log(loanAppliedData, "DATAAAAAA");
  // }
  // console.log(status,'STATUS')
  user.loanDetails = req.body;
  console.log(user.loanDetails, "DETAILS");
  await user.save();
  const users = await User.find();
  const filterUsers = users.filter((elem) => {
    return elem.loanDetails !== null && elem.loanDetails !== undefined;
  });
  if (!filterUsers) {
    return res.status(201).send({ message: "No Loans Found!", allItems: [] });
  }
  // return res
  //   .status(200)
  //   .send({ message: "Loans Retrieved Successfully", allItems: filterUsers });
  return res.status(200).send({
    message: "User Loan Updated Successfully",
    filterUsers: filterUsers,
  });
});

exports.deleteLoan = errorCatch(async (req, res, next) => {
  console.log(req.params.id, "ID");
  const loanData = await loanApplied.findByIdAndDelete(req.params.id);
  if (!loanData) {
    return res.status(401).send({ message: "Loan Not Found!" });
  }
  const loans = await loanApplied.find();
  return res
    .status(201)
    .send({ message: "Loan Deleted Successfully!", allItems: loans });
});
exports.addLoan = errorCatch(async (req, res, next) => {
  const { user, ...otherLoanDetails } = req.body;
  const userData = await User.findById(user);
  if (!userData) {
    return res.status(401).send({ message: "User Not Found!" });
  }
  userData.loanDetails = otherLoanDetails;
  await userData.save();
  return res
    .status(201)
    .send({ message: "Loan Posted ✔", addedLoan: userData });
});
exports.addLoanInfo = errorCatch(async (req, res, next) => {
  const { loanData } = req.body;

  const { loanAmount, loanActive } = loanData;
  const loanAmt =
    (loanAmount?.min == 800000 &&
      loanAmount?.max == 2000000 &&
      `Rs ${loanAmount.min.toString().substring(0, 1)}Lacs - ${loanAmount.max
        .toString()
        .substring(0, 2)}Lacs`) ||
    (loanAmount?.min == 2000000 &&
      `Rs ${loanAmount.min.toString().substring(0, 1)}Lacs+`);
  const loanStatus = loanActive !== "" ? true : false;
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).send({ message: "User Not Found!" });
  }
  loanData.loanAmount = loanAmt;
  loanData.loanActive = loanStatus;
  user.loanDetails = loanData;
  await user.save();
  return res.status(201).send({ message: "Loan Updated", user: user });
});

exports.updateStatus = errorCatch(async (req, res, next) => {
  const { status, loanId } = req.body;
  const loanAppliedData = await loanApplied.findByIdAndUpdate(loanId, {
    loanStatus: status,
  });
  return res.status(201).send({ message: "Status Updated!", loanAppliedData });
});

exports.updateBankImages = errorCatch(async (req, res, next) => {
  const { bankName } = req.body;
  const LoanData = await Loan.updateMany(
    { bankName: bankName },
    { bankImage: req.file.filename }
  );
  // await LoanData.save();
  return res
    .status(201)
    .send({ message: "UPDATED SUCCESSFULLY!", loans: LoanData });
});
