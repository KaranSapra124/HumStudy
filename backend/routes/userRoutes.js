const express = require("express");
const app = require("../app");
const errorCatch = require("../middlewares/errorCatchWrapper");
const { getData, uploadUserDocs } = require("../methods/commonMethods");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const { userLogout, changePassword } = require("../methods/authMethods");
const router = express.Router();
const multer = require("../config/multer");
const { userAuth } = require("../middlewares/authMiddleware");
const { deleteFiles } = require("../utils/deleteFiles");
const {
  purchasePlan,
  applyUniversity,
  getAppliedUniversities,
  applyFilters,
  getLoansByPagination,
  uploadLoanImages,
  evaluateLoan,
  addUniversityFilters,
  getUniversityBySearch,
} = require("../methods/userMethod");
const addMajors = require("../middlewares/addMajors");
const { getMajorsByLevel } = require("../methods/courseMethods");

router.get(
  "/profile/get",
  userAuth,
  errorCatch(async (req, res, next) => {
    const item = await User.findById(req.user.id);
    console.log(item);
    if (!item) return next(new ErrorHandler("Profile" + " not found", 404));
    res.status(200).json({
      success: true,
      message: `Retrieved Profile successfully`,
      item,
    });
  })
);
router.post(
  "/profile/document/reupload/:name/:docId",
  userAuth,
  multer.upload.fields([
    { name: "englishScoreCard", maxCount: 1 },
    { name: "marksheet10th", maxCount: 1 },
    { name: "marksheet12th", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    { name: "marksheetUg", maxCount: 1 },
    { name: "marksheetPg", maxCount: 1 },
    { name: "statementOfPurpose", maxCount: 1 },
    { name: "lor", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "backlogCertificate", maxCount: 1 },
    { name: "additional", maxCount: 1 },

    { name: "offerletter", maxCount: 1 },

    { name: "salary", maxCount: 1 },
    { name: "IdentityProof", maxCount: 1 },

    { name: "bankStatement", maxCount: 1 },

    { name: "bankBalanceStatement", maxCount: 1 },

    { name: "educationLoanSectorLetter", maxCount: 1 },

    { name: "sponsorshipLetter", maxCount: 1 },
    {
      name: "tuitionFeePaidProof",
      maxCount: 1,
    },

    { name: "additionalDocuments", maxCount: 1 },
  ]),

  errorCatch(async (req, res, next) =>
    uploadUserDocs(req, res, next, req.user.id)
  )
);
router.post(
  "/profile/update",
  userAuth,
  errorCatch(async (req, res, next) => {
    const { password, NewPassword, ...rest } = req.body;

    if (password && NewPassword) {
      const oldUser = await User.findById(req.user.id).select("+password");

      const isMatched = await oldUser.comparePassword(password);

      if (!isMatched) return next(new ErrorHandler("Invalid Old Password"));

      oldUser.password = NewPassword;
      await oldUser.save();
    }

    console.log(rest);
    const user = await User.findByIdAndUpdate(req.user.id, rest, {
      new: true,
    });
    if (!user) return next(new ErrorHandler("Profile" + " not found", 404));

    res.status(200).json({
      success: true,
      message: "Profile Updated Succesfully",
      item: user,
    });
  })
);
router.post(
  "/profile/docs-upload/:name",
  userAuth,
  multer.upload.fields([
    { name: "englishScoreCard", maxCount: 1 },
    { name: "marksheet10th", maxCount: 1 },
    { name: "marksheet12th", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    { name: "marksheetUg", maxCount: 1 },
    { name: "marksheetPg", maxCount: 1 },
    { name: "statementOfPurpose", maxCount: 1 },
    { name: "lor", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "backlogCertificate", maxCount: 1 },
    { name: "additional", maxCount: 1 },

    { name: "offerletter", maxCount: 1 },

    { name: "salary", maxCount: 1 },
    { name: "IdentityProof", maxCount: 1 },

    { name: "bankStatement", maxCount: 1 },

    { name: "bankBalanceStatement", maxCount: 1 },

    { name: "educationLoanSectorLetter", maxCount: 1 },

    { name: "sponsorshipLetter", maxCount: 1 },
    {
      name: "tuitionFeePaidProof",
      maxCount: 1,
    },

    { name: "additionalDocuments", maxCount: 1 },
  ]),

  errorCatch(async (req, res, next) =>
    uploadUserDocs(req, res, next, req.user.id)
  )
);

router.get("/get-loans", userAuth, getLoansByPagination);

router.post("/purchase-plan", userAuth, purchasePlan);
router.post("/apply-university", userAuth, applyUniversity);
router.get("/get-universities", userAuth, getAppliedUniversities);
router.post("/filter-loan", applyFilters);
router.post("/logout", userLogout);
router.post(
  "/upload-loan-docs",
  userAuth,
  multer.upload.array("files"),
  uploadLoanImages
);
router.post("/eval-loan", userAuth, evaluateLoan);
router.post("/add-uni-filters", userAuth, addUniversityFilters);
router.post("/get-majors", getMajorsByLevel);

router.post("/get-uni-by-search",userAuth,getUniversityBySearch)

module.exports = router;
