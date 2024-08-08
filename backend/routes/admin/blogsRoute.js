const express = require("express");
const errorCatch = require("../../middlewares/errorCatchWrapper");
const multer = require("../../config/multer");
const router = express.Router();
const Blog = require("../../models/blog");
const {
  getAllItems,
  addItem,
  editItem,
  deleteItem,
  getItem,
} = require("../../methods/commonMethods");
const { adminAuth } = require("../../middlewares/authMiddleware");

router.post(
  "/add-blog-admin",
  adminAuth,
  multer.upload.single("img"),

  errorCatch(async (req, res, next) => {
    const item = {
      ...req.body,
      ...(req.file.filename && {
        blogImg: req.file.filename,
      }),
    };
    addItem("Blog", Blog, req, res, next, item);
  })
);

router.get(
  "/get-blogs",
  errorCatch(async (req, res, next) => {
    getAllItems("Blog", Blog, res, next);
  })
);

router.post(
  "/delete-blog/:id",
  adminAuth,
  errorCatch((req, res, next) => {
    deleteItem("Blog", Blog, req, res, next);
  })
);
router.post(
  "/edit-blog/:id",
  adminAuth,
  errorCatch((req, res, next) => editItem("Blog", Blog, req, res, next))
);
router.post(
  "/get-blog/:id",
  errorCatch((req, res, next) => getItem("Blog", Blog, req, res, next))
);
module.exports = router;
