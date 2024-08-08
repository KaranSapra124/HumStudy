const errorCatch = require("../middlewares/errorCatchWrapper");
const User = require("../models/user");
const Course = require("../models/course");

exports.getApplications = errorCatch(async (req, res, next) => {
  const userData = await User.find().populate({
    path: "universitiesApplied.courseDetail",
    model: "course",
  });

  console.log(userData);

  const appliedData = userData.filter(
    (elem) => elem.universitiesApplied.length !== 0
  );
  let applicationData = [];

  appliedData.forEach((elem) => {
    applicationData = elem.universitiesApplied.map((uni) => {
      console.log(uni._id);
      return {
        userId: elem._id,
        userName: elem.fName + " " + elem.lName,
        universityAppliedFor: uni,
        documents: elem.documents !== null && elem.documents,
        oldCourseId: uni._id,
      };
    });
  });
  if (!applicationData) {
    return res.status(401).send({ message: "No Applications Found!" });
  }

  return res
    .status(200)
    .send({ message: "Fetched Applications", applications: applicationData });
});

exports.addApplications = errorCatch(async (req, res, next) => {
  const { userId, applicationId, date, status, uniId, courseId } = req.body;
  const userData = await User.findById(userId);

  const courseData = await Course.findById(courseId);
  if (!userData) {
    return res.status(401).send({ message: "No User Found!" });
  }
  if (!userData.planDetails) {
    return res.status(401).send({ message: "No Plans Found!" });
  } else {
    if (
      userData?.universitiesApplied?.length !==
      userData?.applicationCountries?.applicationCount
    ) {
      userData?.universitiesApplied?.push({
        universityId: uniId,
        courseDetail: courseId,
        status: status || "Pending",
        applicationDate: date,
      });
      if (
        userData?.applicationCountries?.countries?.every(
          (item) => item === courseData.country
        )
      ) {
        console.log("HERE")
        await userData.save();
      } else if (
        // userData?.applicationCountries?.countries?.every(
        //   (item) => item !== courseData.country
        // ) &&
        userData?.applicationCountries?.countryCount !==
        userData?.applicationCountries?.countries?.length
      ) {
        userData?.applicationCountries?.countries?.push(courseData?.country);
      } else {
        return res.status(401).send({
          message:
            "Your country count is exhausted , kindly purchase a new plan to continue!",
        });
      }
    }
   

    const populatedUser = await User.findById(userId).populate({
      path: "universitiesApplied.courseDetail",
      model: "course",
    });
    const user = await User.find().populate({
      path: "universitiesApplied.courseDetail",
      model: "course",
    });

    const appliedData = user.filter(
      (elem) => elem.universitiesApplied.length !== 0
    );
    let applicationData = [];

    appliedData.forEach((elem) => {
      applicationData = elem.universitiesApplied.map((uni) => {
        // console.log(uni._id);
        return {
          userId: elem._id,
          userName: elem.fName + " " + elem.lName,
          universityAppliedFor: uni,
          documents: elem.documents !== null && elem.documents,
          oldCourseId: uni._id,
        };
      });
    });
    if (!applicationData) {
      return res.status(401).send({ message: "No Applications Found!" });
    }
    return res
      .status(200)
      .send({ message: "Success", addedUser: applicationData });
  }
});

exports.updateApplications = errorCatch(async (req, res, next) => {
  const {
    courseId,
    uniId,
    status,
    date,
    userName,
    userId,
    oldCourseId,
    universityAppliedFor,
  } = req.body;

  const user = await User.findById(userId);

  if (uniId && oldCourseId && status) {
    const application = user?.universitiesApplied?.find((elem) => {
      return elem._id == oldCourseId;
    });

    application.universityId = uniId;
    application.courseDetail = courseId;
    application.status = status;
    const filtredArr = user?.universitiesApplied?.filter((elem) => {
      console.log(elem._id, oldCourseId);
      return elem._id != oldCourseId;
    });
    console.log(filtredArr, "FILTER");
    filtredArr.push(application);
    user.universitiesApplied = filtredArr;
    await user.save();
    const userData = await User.find().populate({
      path: "universitiesApplied.courseDetail",
      model: "course",
    });

    const appliedData = userData.filter(
      (elem) => elem.universitiesApplied.length !== 0
    );
    let applicationData = [];

    appliedData.forEach((elem) => {
      applicationData = elem.universitiesApplied.map((uni) => {
        console.log(uni._id);
        return {
          userId: elem._id,
          userName: elem.fName + " " + elem.lName,
          universityAppliedFor: uni,
          documents: elem.documents !== null && elem.documents,
          oldCourseId: uni._id,
        };
      });
    });
    if (!applicationData) {
      return res.status(401).send({ message: "No Applications Found!" });
    }

    return res.status(200).send({
      message: "Updated Application Successfully!",
      updatedUsers: applicationData,
    });
  } else if (
    oldCourseId !== null &&
    oldCourseId !== undefined &&
    status &&
    courseId
  ) {
    const application = user?.universitiesApplied?.find((elem) => {
      return elem._id == oldCourseId;
    });
    application.courseDetail = courseId;
    application.status = status;

    const filtredArr = user?.universitiesApplied?.filter((elem) => {
      return elem._id != oldCourseId;
    });
    // console.log(filtredArr, "FILTERCourse");
    filtredArr.push(application);
    user.universitiesApplied = filtredArr;
    await user.save();
    const userData = await User.find().populate({
      path: "universitiesApplied.courseDetail",
      model: "course",
    });

    const appliedData = userData.filter(
      (elem) => elem.universitiesApplied.length !== 0
    );
    let applicationData = [];

    appliedData.forEach((elem) => {
      applicationData = elem.universitiesApplied.map((uni) => {
        console.log(uni._id);
        return {
          userId: elem._id,
          userName: elem.fName + " " + elem.lName,
          universityAppliedFor: uni,
          documents: elem.documents !== null && elem.documents,
          oldCourseId: uni._id,
        };
      });
    });
    if (!applicationData) {
      return res.status(401).send({ message: "No Applications Found!" });
    }

    return res.status(200).send({
      message: "Updated Application Successfully!",
      updatedUsers: applicationData,
    });
  } else if (status) {
    const application = user?.universitiesApplied?.find((elem) => {
      return elem._id == oldCourseId;
    });

    application.status = status;

    const filtredArr = user?.universitiesApplied?.filter((elem) => {
      return elem._id != oldCourseId;
    });
    // console.log(filtredArr, "FILTERCourse");
    filtredArr.push(application);
    user.universitiesApplied = filtredArr;
    await user.save();
    const userData = await User.find().populate({
      path: "universitiesApplied.courseDetail",
      model: "course",
    });

    const appliedData = userData.filter(
      (elem) => elem.universitiesApplied.length !== 0
    );
    let applicationData = [];

    appliedData.forEach((elem) => {
      applicationData = elem.universitiesApplied.map((uni) => {
        console.log(uni._id);
        return {
          userId: elem._id,
          userName: elem.fName + " " + elem.lName,
          universityAppliedFor: uni,
          documents: elem.documents !== null && elem.documents,
          oldCourseId: uni._id,
        };
      });
    });
    if (!applicationData) {
      return res.status(401).send({ message: "No Applications Found!" });
    }

    return res.status(200).send({
      message: "Updated Application Successfully!",
      updatedUsers: applicationData,
    });
  }
});
exports.deleteApplications = errorCatch(async (req, res, next) => {
  const { userId, oldCourseId } = req.body;
  const userData = await User.findById(userId);
  if (!userData) {
    return res.status(401).send({ message: "User Not Found!" });
  }
  const filterArr = userData?.universitiesApplied?.filter((elem) => {
    console.log(elem.courseDetail, oldCourseId);
    return elem._id != oldCourseId;
  });
  // console.log(filterArr, "FILTER");
  userData.universitiesApplied = filterArr;

  if (userData?.applicationCountries?.applications !== 0) {
    userData.applicationCountries.applications =
      userData.applicationCountries.applications - 1;
  }
  await userData.save();
  const user = await User?.find().populate({
    path: "universitiesApplied.courseDetail",
    model: "course",
  });

  const appliedData = user?.filter(
    (elem) => elem.universitiesApplied.length !== 0
  );
  let applicationData = [];

  appliedData?.forEach((elem) => {
    applicationData = elem.universitiesApplied.map((uni) => {
      // console.log(uni._id);
      return {
        userId: elem._id,
        userName: elem.fName + " " + elem.lName,
        universityAppliedFor: uni,
        documents: elem.documents !== null && elem.documents,
        oldCourseId: uni._id,
      };
    });
  });
  if (!applicationData) {
    return res.status(401).send({ message: "No Applications Found!" });
  }

  return res
    .status(200)
    .send({ message: "Deleted Successfully!", deletedUser: applicationData });
});
