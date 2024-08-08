const errorCatch = require("../middlewares/errorCatchWrapper");
const { findByIdAndUpdate } = require("../models/university");
const User = require("../models/user");
const Loans = require("../models/loan");
const LoanApplied = require("../models/loanApplied");
const ErrorHandler = require("../utils/errorHandler");
const Errorhandler = require("../utils/errorHandler");
const course = require("../models/course");

exports.purchasePlan = errorCatch(async (req, res, next) => {
  try {
    const { plan } = req.body;

    // Extract application count
    const applicationsData = plan.featuresIncluded.find((elem) =>
      elem.includes("Applications")
    );
    const appMatch = applicationsData.match(/(\d+)\sApplications/);
    const appCount = appMatch ? parseInt(appMatch[1]) : 0;

    // Extract country count
    let regex = applicationsData.includes("Countries")
      ? /(\d+)\s+Countries/g
      : /(\d+)\s+Country/g;
    let matches = regex.exec(applicationsData);
    const countryCount = matches ? parseInt(matches[1]) : 0;

    // Find and update user data
    let userData = await User.findById(req.user.id);

    if (!userData) {
      throw new Error("No User Found!");
    }
    if (!userData.applicationCountries) {
      userData.applicationCountries = {};
    }

    userData.planDetails = plan;
    userData.applicationCountries.countryCount = countryCount;
    userData.applicationCountries.applicationCount = appCount;

    await userData.save();

    return res.status(200).send({ message: "Success", userData });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
});
exports.applyUniversity = errorCatch(async (req, res, next) => {
  const { course } = req.body;
  console.log(course);

  if (!course || !course.university || !course._id || !course.country) {
    return res.status(400).send({ message: "Invalid course data" });
  }

  const userData = await User.findById(req.user.id);

  if (!userData) {
    return res.status(401).send({ message: "No User Found!" });
  }

  if (!userData.planDetails) {
    return res.status(401).send({
      message: "No Plan Found! Please purchase a plan to continue!",
    });
  }

  // Check if the user has already applied to this course
  const alreadyApplied = userData.universitiesApplied.some(
    (application) =>
      application.courseDetail.toString() === course._id.toString()
  );

  if (alreadyApplied) {
    return res.status(400).send({
      message: "You have already applied to this course",
    });
  }

  const isExist = userData.applicationCountries.countries.includes(
    course.country
  );

  if (
    !isExist &&
    userData.applicationCountries.countries.length !==
      userData.applicationCountries.countryCount
  ) {
    userData.applicationCountries.countries.push(course.country);
  } else if (
    (!isExist &&
      userData.applicationCountries.countries.length ===
        userData.applicationCountries.countryCount) ||
    userData.applicationCountries.countries.length >
      userData.applicationCountries.countryCount
  ) {
    return res.status(403).send({
      message:
        "You have already exhausted the country count, purchase a new plan to continue!",
    });
  }

  if (
    userData.applicationCountries.countries.length - 1 <
      userData.applicationCountries.countryCount &&
    userData.applicationCountries.applications <
      userData.applicationCountries.applicationCount
  ) {
    userData.universitiesApplied.push({
      universityId: course.university,
      courseDetail: course._id,
      status: "Pending",
    });

    userData.applicationCountries.applications += 1;
  } else {
    return res.status(403).send({
      message: "Applications exhausted, upgrade plan to continue!",
    });
  }

  await userData.save();
  res.status(200).send({ message: "Successfully Applied!", user: userData });
});
exports.getAppliedUniversities = errorCatch(async (req, res, next) => {
  const userData = await User.findById(req.user.id).populate({
    path: "universitiesApplied.courseDetail",
    model: "course",
  });

  if (!userData) {
    return res.status(401).send({ message: "No user found!" });
  }

  return res.status(200).send({ applications: userData?.universitiesApplied });
});
exports.applyFilters = errorCatch(async (req, res, next) => {
  const {
    loanAmount,
    loanType,
    cibilScore,
    lastExam,
    lastExamScore,
    englishExam,
    englishExamScore,
    academixExam,
    academicExamScore,
  } = req.body;
  // console.log(academicExamScore)
  // const pages = req.query.pages;
  // const pageSize = req.query.pageSize;
  // const skip = pageSize - pages;
  // console.log(req.body);
  const loans = await Loans.find();
  // console.log(loans, "LOANS");
  const filterLoans = loans.filter((elem) => {
    // console.log(elem.academicScore,'ELEM');
    return (
      elem?.cibilScore?.to >= cibilScore && elem?.cibilScore?.from <= cibilScore
    );
  });

  // console.log(filterLoans);
  return res
    .status(201)
    .send({ message: "Loans filtered!", loansData: filterLoans });
});
exports.getLoansByPagination = errorCatch(async (req, res, next) => {
  const pages = req.query.pages;
  const pageSize = req.query.pageSize;
  const skip = pageSize - pages;
  const loanData = await Loans.find().skip(skip).limit(pageSize);
  const total = await Loans.countDocuments();
  return res
    .status(201)
    .send({ message: "Loans Fetched!", total: total, loansData: loanData });
});
exports.uploadLoanImages = errorCatch(async (req, res, next) => {
  const { imageData } = req.body;
  const files = req.files;
  const userData = await User.findById(req.user.id);

  if (!userData) {
    return res.status(401).send({ message: "User Not Found!" });
  }

  if (!userData.documents) {
    userData.documents = {};
  }

  if (!userData.documents.experienceDocuments) {
    userData.documents.experienceDocuments = {};
  }

  if (!userData.documents.academicsDocuments) {
    userData.documents.academicsDocuments = {};
  }

  if (imageData.length > 0) {
    imageData.forEach((elem) => {
      files.forEach((img) => {
        if (elem === "offerletter") {
          userData.documents.experienceDocuments[elem] = img.filename;
        } else if (elem === "marksheet10th" || elem === "marksheet12th") {
          if (!userData.documents.academicsDocuments[elem]) {
            userData.documents.academicsDocuments[elem] = img.filename;
          }
        } else {
          if (!userData.documents.academicsDocuments[elem]) {
            userData.documents.academicsDocuments[elem] = img.filename;
          }
        }
      });
    });
  }

  await userData.save();
  return res
    .status(201)
    .send({ message: "Documents submitted successfully!", user: userData });
});
exports.evaluateLoan = errorCatch(async (req, res, next) => {
  const { userId, loanApplied } = req.body;
  // console.log(req.user.id,'IDDDDD')
  const userData = await User.findById(req.user.id);
  if (!userData) {
    return res.status(401).send({ message: "No User Found!" });
  }

  // let loanAppliedData = [];

  const newLoan = await LoanApplied.create({
    userId: req.user.id,
    loanId: loanApplied?.loanData?._id,
    status: "pending",
  });

  userData?.loansApplied?.push(loanApplied?.loanData?._id);
  await userData.save();
  return res.status(200).send({
    message: "Successfully applied for loan!",
    loanData: newLoan,
    userData: userData,
  });
});
exports.addUniversityFilters = errorCatch(async (req, res, next) => {
  // console.log(req.body)
  const userData = await User.findByIdAndUpdate(req.user.id, {
    uniFilters: req.body,
  });
  if (!userData) {
    return res.status(401).send({ message: "Error Updating Item!" });
  }
  return res
    .status(201)
    .send({ message: "Filters added!", userData: userData });
});
exports.getUniversityBySearch = errorCatch(async (req, res) => {
  const { searchData, filter } = req.body;
  const { page, pageSize = 10, category } = req.query;
  // console.log(searchData, filter);
  console.log(category, "CATEGORY");

  // Determine the matching field and criteria
  const matchCriteria =
    filter === "university"
      ? { universityName: searchData }
      : { courseName: searchData };

  // Calculate the number of documents to skip
  const skip =
    page != 0
      ? parseInt(page - 1) * parseInt(pageSize)
      : parseInt(page) * parseInt(pageSize);
  console.log({ ...matchCriteria, category: category }, "CRITERIA");

  // Aggregation pipeline with lookup
  const pipeline = [
    {
      $match:
        category == undefined
          ? matchCriteria
          : { ...matchCriteria, category: category },
    },
    {
      $lookup: {
        from: "universities", // The collection to join
        localField: "university", // Field from the input documents
        foreignField: "_id", // Field from the "from" collection
        as: "university", // Output array field
      },
    },
    {
      $unwind: "$university", // Unwind the array to include the joined document in the result
    },
    {
      $skip: skip, // Skip documents for pagination
    },
    {
      $limit: parseInt(pageSize), // Limit the number of documents returned
    },
  ];

  // Perform the aggregation
  const universityData = await course.aggregate(pipeline);
  const total =
    filter == "university"
      ? (await course.find({ universityName: searchData })).length
      : (await course.find({ courseName: searchData })).length;
  if (universityData.length === 0) {
    console.warn("No courses found for the given filter");
  }
  console.log(total, "DATA");

  return res.status(200).send({
    // message: "Courses Found!",
    total: total,
    courses: universityData,
    page: parseInt(page),
    pageSize: parseInt(pageSize),
  });

  // res.json(universityData); // Send the result to the client
});
