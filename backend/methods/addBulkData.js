const xlsx = require("xlsx");
const path = require("path");
const University = require("../models/university");
const errorCatch = require("../middlewares/errorCatchWrapper");
const fs = require("fs");

exports.addBulkData = async (model, filename, res) => {
  try {
    // Read Excel file
    const workbook = xlsx.readFile(path.join(__dirname, "../data/" + filename));
    const sheetName = workbook.SheetNames[0];
    //   console.log(sheetName);
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Transform and insert data into MongoDB
    const items = await model.insertMany(data);
    return res.status(200).json({
      success: true,
      message: "Items added",
      length: items.length,
      items,
    });
  } catch (err) {
    res.status(402).json({ success: false, message: err.message });
  }
};

exports.addBulkCourses = async (model, filename, res) => {
  try {
    // Read Excel file
    const workbook = xlsx.readFile(path.join(__dirname, "../data/" + filename));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const unis = await University.find({}, { universityName: 1 });
    // console.log(unis);

    const stream = xlsx.stream.to_json(worksheet);
    let docAdded = 0;
    let totalDocs = 0;

    stream.on("data", async (chunkData) => {
      // console.log(chunkData);
      const newData = {
        ...chunkData,
        university: unis.find(
          (uni) =>
            uni.universityName &&
            chunkData.universityName &&
            uni.universityName.trim().toLowerCase() ===
              chunkData.universityName.trim().toLowerCase()
        )?._id,
      };
      totalDocs++;
      if (newData.university) {
        docAdded++;
        await model.insertMany(newData);
      }
    });

    stream.on("end", () => {
      console.log("All chunks processed");
      res.status(200).json({
        success: true,
        message: "All items added",
        docAdded,
        totalDocs,
      });
    });

    stream.on("error", (err) => {
      console.error("Error processing chunks:", err);
      res
        .status(500)
        .json({ success: false, message: "Error processing chunks" });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateInUni = errorCatch(async (req, res, next) => {
  // const uniOriginalNames = req.files.map((item) => ({
  //   oName: item.originalname.split('.')[0],
  //   fName: item.filename,
  // }));

  let updatedDocs = 0;
  let notFound = 0;

  await req.files.forEach(async (item) => {
    const updated = await University.findOneAndUpdate(
      { universityName: item.originalname.split(".")[0] },
      { $set: { universityLogo: item.filename } }
    );
    if (updated) ++updatedDocs;
    else ++notFound;
  });

  const unis = await University.find(
    {
      universityName: {
        $in: req.files.map((item) => item.originalname.split(".")[0]),
      },
    },
    { universityLogo: 1 }
  );

  console.log(updatedDocs, notFound, unis, req.files.length);

  // await University.updateMany(
  //   { universityName: { $in: uniOriginalNames.map((item) => item.oName) } },
  //   { $set: { universityLogo:  } }
  // );

  // const universityLogoMap = {};
  // uniOriginalNames.forEach((item) => {
  //   universityLogoMap[item.oName] = item.fName;
  // });

  // console.log(universityLogoMap);

  // await University.updateMany(
  //   { universityName: { $in: Object.keys(universityLogoMap) } },
  //   { $set: { universityLogo: universityLogoMap } }
  // );

  next();
});

exports.updateInUni = errorCatch(async (req, res, next) => {
  // const uniOriginalNames = req.files.map((item) => ({
  //   oName: item.originalname.split('.')[0],
  //   fName: item.filename,
  // }));

  let updatedDocs = 0;
  let notFound = 0;

  await req.files.forEach(async (item) => {
    const updated = await University.findOneAndUpdate(
      { universityName: item.originalname.split(".")[0] },
      { $set: { universityLogo: item.filename } }
    );
    if (updated) ++updatedDocs;
    else ++notFound;
  });

  const unis = await University.find(
    {
      universityName: {
        $in: req.files.map((item) => item.originalname.split(".")[0]),
      },
    },
    { universityLogo: 1 }
  );

  console.log(updatedDocs, notFound, unis, req.files.length);

  // await University.updateMany(
  //   { universityName: { $in: uniOriginalNames.map((item) => item.oName) } },
  //   { $set: { universityLogo:  } }
  // );

  // const universityLogoMap = {};
  // uniOriginalNames.forEach((item) => {
  //   universityLogoMap[item.oName] = item.fName;
  // });

  // console.log(universityLogoMap);

  // await University.updateMany(
  //   { universityName: { $in: Object.keys(universityLogoMap) } },
  //   { $set: { universityLogo: universityLogoMap } }
  // );

  next();
});

exports.updateUniIcons = errorCatch(async (req, res, next) => {
  const universities = await University.find({}, { universityName: 1 });

  const bulkOperations = universities.map((university) => ({
    updateOne: {
      filter: { _id: university._id },
      update: { $set: { universityLogo: university.universityName + ".png" } },
    },
  }));

  await University.bulkWrite(bulkOperations);

  res.status(200).json({
    success: true,
    message: "University icons updated",
  });

  next();
});
