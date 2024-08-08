const express = require("express");
const errorCatch = require("../../middlewares/errorCatchWrapper");
const {
  addItem,
  getAllItems,
  getItem,
  deleteAllItems,
  deleteItem,
  editItem,
} = require("../../methods/commonMethods");
const University = require("../../models/university");
const {
  addBulkData,
  updateInUni,
  filterIcons,
  updateUniIcons,
} = require("../../methods/addBulkData");

const {
  updateAllUniveristies,
  getUniByCountry,
} = require("../../methods/universityMethods");
const { getUniLength } = require("../../methods/universityMethods");
const router = express.Router();
const multer = require("../../config/multer");
const readUniFiles = require("../../middlewares/universityData");
const readUniversityFile = require("../../middlewares/universityData");
const { adminAuth } = require("../../middlewares/authMiddleware");

router.get("/get-length", getUniLength);

router.get(
  "/get",adminAuth,
  errorCatch(async (req, res, next) => {
    getAllItems("Universities", University, res, next);
  })
);

router.get("/get-by-country", getUniByCountry);

router.get(
  "/get/:id",adminAuth,
  errorCatch(async (req, res, next) => {
    getItem("University", University, req, res, next);
  })
);

router.post(
  "/create",adminAuth,
  errorCatch(async (req, res, next) => {
    addItem("University", University, req, res, next);
  })
);

router.post(
  "/update/:id",adminAuth,
  errorCatch(async (req, res, next) => {
    editItem("University", University, req, res, next);
  })
);

const uniFiles = {
  template: "uni-template.xlsx",
  usa: "Full University Data/Full University Data/content & About & Scholarship/USA/All USA DATA.xlsx",
  uk: "Full University Data/Full University Data/content & About & Scholarship/UK/UK-All data.xlsx",
  canada:
    "Full University Data/Full University Data/content & About & Scholarship/Canada/ALL DETAILS.xlsx",
  ireland:
    "Full University Data/Full University Data/content & About & Scholarship/ireland/ALL DATA.xlsx",
  aus: "Full University Data/Full University Data/content & About & Scholarship/Aus/Full Data/Full data ranking & SCHOLARSHIPS.xlsx",
};

router.post(
  "/create-bulk",adminAuth,
  errorCatch(async (req, res, next) => {
    addBulkData(University, uniFiles.aus, res);
  })
);

router.post(
  "/update-bulk-university",adminAuth,
  readUniversityFile,
  updateAllUniveristies
);

router.post("/update-icons",adminAuth, updateUniIcons);

router.post(
  "/upload-icons",adminAuth,
  multer.fetchUnis,
  multer.upload.array("icons"),
  multer.clearUnis,
  updateInUni,
  errorCatch(async (req, res, next) => {
    // console.log(req.body, typeof req.body.icons[0]);
    res.status(200).json({
      success: true,
      icons: req.files,
      // .map((item) => item.originalname),
      total: req.total,
      added: req.added,
    });
  })
);

router.delete(
  "/delete-all",adminAuth,
  errorCatch(async (req, res, next) => {
    deleteAllItems("University", University, req, res, next);
  })
);
router.delete(
  "/delete/:id",adminAuth,
  errorCatch(async (req, res, next) => {
    deleteItem("University", University, req, res, next);
  })
);

module.exports = router;
