const courses = require("../models/course");
const errorCatch = require("../middlewares/errorCatchWrapper");
const majors = require("../models/majors");
const addMajors = errorCatch(async (req, res, next) => {
  // console.log("MAJOR")
  const coursesData = await courses.find();
  const majorMap = new Map();

  const doesMajorExist = (map, major) => map.has(major);

  coursesData.forEach((elem) => {
    if (doesMajorExist(majorMap, elem.major)) {
      const existingEntry = majorMap.get(elem.major);
      if (!existingEntry.level.includes(elem.level)) {
        existingEntry.level.push(elem.level);
      }
    } else {
      majorMap.set(elem.major, { label: elem.major, level: [elem.level] });
    }
  });

  // Convert the map to an array if needed
  const majorOps = Array.from(majorMap.values()).map((elem) => ({
    updateOne: {
      filter: { label: elem.label },
      update: { $set: { label: elem.label, level: elem.level } },
      upsert: true,
    },
  }));

  await majors.bulkWrite(majorOps);

  return res
    .status(201)
    .send({ message: "Major collected!", majors: majorArray });
});

module.exports = addMajors;
