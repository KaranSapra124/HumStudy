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
const Course = require("../../models/course");
const { addBulkCourses } = require("../../methods/addBulkData");
const {
  getCoursesByUni,
  addCourseInUni,
  getCourseLength,
  getCourseLengthByCountry,
  getCoursesByPagination,
  getCoursesByCategory,
} = require("../../methods/courseMethods");
const { adminAuth } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.get("/get-length", getCourseLength);
router.get("/get-length-by-country/:countryName", getCourseLengthByCountry);

router.get(
  "/get",
  adminAuth,
  errorCatch(async (req, res, next) => {
    getAllItems("Courses", Course, res, next);
  })
);

router.post("/get-courses", getCoursesByPagination);

router.get(
  "/get/:id",
  errorCatch(async (req, res, next) => {
    getItem("Course", Course, req, res, next);
  })
);

router.get("/get-by-uni/:id", getCoursesByUni);

router.post("/create", adminAuth, addCourseInUni);

router.post(
  "/update/:id",
  adminAuth,
  errorCatch(async (req, res, next) =>
    editItem("Course", Course, req, res, next)
  )
);

const courseFiles = {
  template: "course-template.xlsx",
  usa: "New Marged List/New Marged List/USA/Courses.xlsx",
  uk: "New Marged List/New Marged List/UK/Courses.xlsx",
  canada: "New Marged List/New Marged List/Canada/Courses.xlsx",
  ireland: "New Marged List/New Marged List/All Ireland/Courses.xlsx",
  aus: "New Marged List/New Marged List/All Aus University/Courses.xlsx",
};

router.post(
  "/create-bulk",
  // adminAuth,
  errorCatch(async (req, res, next) => {
    addBulkCourses(Course, courseFiles.canada, res);
  })
);

router.post("/get-course-by-category", getCoursesByCategory);

router.delete(
  "/delete-all",
  adminAuth,
  errorCatch(async (req, res, next) => {
    deleteAllItems("Course", Course, req, res, next);
  })
);
router.delete(
  "/delete/:id",
  adminAuth,
  errorCatch(async (req, res, next) => {
    deleteItem("Course", Course, req, res, next);
  })
);

module.exports = router;
