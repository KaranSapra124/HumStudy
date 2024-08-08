const express = require("express");
const errorCatch = require("../../middlewares/errorCatchWrapper");
const {
  getAllItems,
  addItem,
  editItem,
  deleteItem,
  uploadUserDocs,
} = require("../../methods/commonMethods");
const User = require("../../models/user");
const { adminAuth } = require("../../middlewares/authMiddleware");
const router = express.Router();
const multer = require("../../config/multer");
const ErrorHandler = require("../../utils/errorHandler");

router.get(
  "/get",
  errorCatch(async (req, res, next) => {
    getAllItems("Users", User, res, next);
  })
);
router.post(
  "/create",
  errorCatch(async (req, res, next) => {
    addItem("User", User, req, res, next);
  })
);
router.post(
  "/update/:id",
  errorCatch(async (req, res, next) => {
    editItem("User", User, req, res, next);
  })
);
router.post(
  "/documents/raise-concern/:id",
  adminAuth,
  errorCatch(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    const alreadyIncluded =
    user.updates&&  user.updates.length > 0
        ? user.updates.find((update) => update.name === req.body.name)
        : false;

    if (alreadyIncluded) {
      return next(new ErrorHandler("Already Raised", 400));
    }
    user.updates.push(req.body);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Raised concern",
    });
  })
);
router.post(
  "/delete/:id",
  errorCatch(async (req, res, next) => {
    deleteItem("User", User, req, res, next);
  })
);
router.post(
  "/profile/docs-upload/:name/:userId",
  adminAuth,
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
    uploadUserDocs(req, res, next, req.params.userId)
  )
);

module.exports = router;