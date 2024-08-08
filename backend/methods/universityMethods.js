const errorCatch = require("../middlewares/errorCatchWrapper");
const University = require("../models/university");

exports.getUniLength = errorCatch(async (req, res, next) => {
  const length = await University.countDocuments();
  res.json({ success: true, collection: "university", length });
});

exports.updateAllUniveristies = errorCatch(async (req, res, next) => {
  let uniArr = [];

  const data = req.data;
  // console.log(data);
  const updateUni = async (university, scholarship) => {
    return await University.updateOne(
      { universityName: university },
      {
        $set: {
          scholarships:scholarship,
          // city: city,
          // country: country,
          // applicationFees: appFee,
          // applicationFeesCurrency: appFeeCurr,
        },
      }
    );
  };
  data.forEach((elem) => {
    console.log(elem)
    uniArr = updateUni(elem.universityName, elem.scholarship);
  });
  res.status(200).send({ success: true, uniArr });
});

exports.getUniByCountry = errorCatch(async (req, res, next) => {
  const country = req.query.country;
  const uniData = await University.find({ country: country });
  if (!uniData) {
    return res.status(401).send({ message: "University Not Found!" });
  }
  return res
    .status(201)
    .send({ message: "Universities Fetched!", allItems: uniData });
});
