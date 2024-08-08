const express = require("express");
const errorCatch = require("../../middlewares/errorCatchWrapper");
const multer = require("../../config/multer");
const router = express.Router();
const support = require("../../models/support");
const {
  getAllItems,
  addItem,
  editItem,
  deleteItem,
  getItem,
} = require("../../methods/commonMethods");

// router.post(
//   "/add-blog-admin",
//   multer.upload.single("img"),
//   errorCatch(async (req, res, next) => {
//     const item = {
//       ...req.body,
//       ...(req.file.filename && {
//         blogImg: req.file.filename,
//       }),
//     };
//     addItem("Blog", Blog, req, res, next, item);
//   })
// );

router.post(
  "/add-support",
  errorCatch(async (req, res, next) => {
    addItem("Support", support, req, res, next);
  })
);

router.get(
  "/get-support",
  errorCatch(async (req, res, next) => {
    getAllItems("Support", support, res, next);
  })
);

router.post(
  "/edit-support/:id",
  errorCatch((req, res, next) => editItem("Support", support, req, res, next))
);
router.post(
  "/delete-support/:id",
  errorCatch((req, res, next) => {
    deleteItem("Support", support, req, res, next);
  })
);
// router.post(
//   "/get-blog/:id",
//   errorCatch((req, res, next) => getItem("Blog", Blog, req, res, next))
// );
module.exports = router;
