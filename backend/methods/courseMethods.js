const errorCatch = require("../middlewares/errorCatchWrapper");
const Course = require("../models/course");
const University = require("../models/university");
const ErrorHandler = require("../utils/errorHandler");
const majors = require("../models/majors");

exports.getCoursesByUni = errorCatch(async (req, res, next) => {
  const allItems = await Course.find({ university: req.params.id }).populate(
    "university"
  );
  if (allItems.length < 1)
    return next(new ErrorHandler("Courses not found", 404));
  res.json({
    success: true,
    message: `Retrieved Courses successfully`,
    allItems,
  });
});

exports.addCourseInUni = errorCatch(async (req, res, next) => {
  let uni, newItem;
  if (!req.body.universityName) {
    uni = await University.findById(req.body.university, {
      universityName: 1,
    });
    if (!uni) return next(new ErrorHandler("University Id is invalid", 404));
    newItem = new Course({
      ...req.body,
      universityName: uni.universityName,
    });
  } else newItem = new Course(req.body);

  // Save the new item to the database
  await newItem.save();

  // Return a success response containing the added item object
  res.status(201).json({
    success: true,
    message: `Course added successfully`,
    newItem,
  });
});

exports.getCourseLength = errorCatch(async (req, res, next) => {
  const length = await Course.countDocuments();
  res.json({ success: true, collection: "course", length });
});

exports.getCourseLengthByCountry = errorCatch(async (req, res, next) => {
  const length = await Course.countDocuments({
    country: req.params.countryName,
  });
  res.json({
    success: true,
    collection: "course in country " + req.params.countryName,
    length,
  });
});

exports.getCoursesByCategory = errorCatch(async (req, res, next) => {
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  // const filters = req.query.filter;
  const category =
    req.query.category == "Compitative" ? "Compitative " : req.query.category;
  console.log(category);
  const {
    fees,
    countries,
    degree,
    majors,
    englishExam,
    englishExamScore,
    academicExam,
    academicExamScore,
    scholarship,
  } = req.body;

  // Initialize an empty object for the filter
  const filter = {};

  // Ensure countries array is not empty
  if (countries && countries.length > 0) {
    filter.country = { $in: countries };
  } else {
    console.warn("No countries provided or countries array is empty");
  }

  // Add additional filters conditionally
  if (category && category !== "") filter.category = category;
  if (degree) filter.level = degree;
  if (majors && majors.length > 0) filter.major = { $in: majors };

  // Construct $expr for English exam score
  const exprConditions = [];

  if (englishExam && englishExam !== "na" && englishExamScore) {
    exprConditions.push({
      $gte: [
        { $toDouble: englishExamScore }, // Convert englishExamScore to double
        { $toDouble: `$${englishExam}Score` }, // Convert englishExam field to double
      ],
    });
  }

  // Construct $expr for Academic exam score
  if (academicExam && academicExam !== "na" && academicExamScore) {
    exprConditions.push({
      $gte: [
        parseFloat(academicExamScore),
        { $toDouble: `$${academicExam}Score` },
      ],
    });
  }

  // If there are any expr conditions, add them to the filter
  if (exprConditions.length > 0) {
    filter.$expr = { $and: exprConditions };
  }

  // console.log("Filter:", filter);
  console.log(page, pageSize, "PAGES");
  const skip = parseInt(page - 1) * parseInt(pageSize);
  // console.log(skip, "SKIPPED");
  const limit = 10;

  // Get total count of documents matching the filter

  // Fetch courses for the current page
  const courses = await Course.find(filter)
    .skip(skip)
    .limit(limit)
    .populate("university");
  // console.log(courses, "COURSESESESES");
  const total = await Course.countDocuments(filter);
  console.log(total, "TOTAL");

  // console.log(courses, "COURSE");

  if (courses.length === 0) {
    console.warn("No courses found for the given filter");
  }

  // const total = await Course.countDocuments();
  return res
    .status(201)
    .send({ message: "Courses Found!", total: total, courses: courses });
});

exports.getCoursesByPagination = errorCatch(async (req, res, next) => {
  const { page = 0, pageSize = 10 } = req.query;
  console.log(req.body);

  const {
    Marks12th,
    ugMarks,
    fees,
    category,
    countries,
    degree,
    majors,
    englishExam,
    englishExamScore,
    academicExam,
    academicExamScore,
    scholarship,
  } = req.body;

  console.log(fees);

  // Initialize an empty object for the filter
  const filter = {};
  // const minFee = parseFloat(fees.min);
  // const maxFee = parseFloat(fees.max);

  if (fees) {
    filter.tuitionFeeFirstYear = {
      $lte: parseFloat(fees.max),
    };
  }

  if (Marks12th) {
    filter.twelvethScore = {
      $lte: Marks12th,
    };
  }
  if (ugMarks) {
    filter.UGScore = { $lte: ugMarks };
  }

  // Ensure countries array is not empty
  if (countries && countries.length > 0) {
    filter.country = { $in: countries };
    // console.log("Countries Filter Applied:", filter.country);
  } else {
    console.warn("No countries provided or countries array is empty");
  }

  // Add additional filters conditionally
  if (category) {
    filter.category = category;
    // console.log("Category Filter Applied:", filter.category);
  }
  if (degree) {
    filter.level = degree;
    console.log("Degree Filter Applied:", filter.level);
  }
  if (majors && majors.length > 0) {
    filter.major = { $in: majors };
    // console.log("Majors Filter Applied:", filter.major);
  }

  // Construct $expr for English exam score
  const exprConditions = [];

  if (englishExam && englishExam !== "na" && englishExamScore) {
    exprConditions.push({
      $gte: [
        { $toDouble: parseFloat(englishExamScore) }, // Convert englishExamScore to double
        { $toDouble: `$${parseFloat(englishExam)}Score` }, // Convert englishExam field to double
      ],
    });
    console.log("English Exam Filter Applied:", exprConditions);
  }

  // Construct $expr for Academic exam score
  // console.log(academicExam,'EXAM');
  if (academicExam && academicExam !== "na") {
    filter[academicExam] = { $eq: "Yes" };
    // console.log("Academic Exam Filter Applied:", exprConditions);
  }

  // If there are any expr conditions, add them to the filter
  if (exprConditions.length > 0) {
    filter.$expr = { $and: exprConditions };
    console.log("$expr Filter Applied:", filter.$expr);
  }

  // console.log("Final Filter:", JSON.stringify(filter, null, 2));
  console.log(filter);

  const skip = parseInt(page - 1) * parseInt(pageSize);
  // console.log(skip, "SKIPPED");
  const limit = 10;

  try {
    const courses = await Course.find(filter)
      .skip(skip)
      .limit(limit)
      .populate("university");
    // console.log(courses, "COURSE");
    // Get total count of documents matching the filter
    const total = await Course.countDocuments(filter);
    console.log(total, courses, "TOTAL");

    // Fetch courses for the current page
    // console.log(courses, "COURSE");

    if (courses.length === 0) {
      console.warn("No courses found for the given filter");
    }

    return res.status(200).send({
      message: "Courses Fetched Successfully",
      total: total,
      courses: courses,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).send({
      message: "Error fetching courses",
      error: error.message,
    });
  }
});

exports.getMajorsByLevel = errorCatch(async (req, res) => {
  const { major } = req.body;
  console.log(major);
  const majorsData = await majors.find({ level: { $in: [major] } });
  return res.status(201).send({ message: "Majors", major: majorsData });
});
