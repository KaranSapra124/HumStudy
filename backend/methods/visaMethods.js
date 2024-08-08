const errorCatch = require("../middlewares/errorCatchWrapper");
const visa = require("../models/visa");
// const University = require("../models/university");
const ErrorHandler = require("../utils/errorHandler");

exports.addVisa = async (req, res, next) => {
  const {
    userId,
    fullName,
    nationality,
    country,
    purpose,
    contactNumber,
    emailAddress,
    counsellingDate,
  } = req.body;

  try {
    const visas = await visa.find({ userId: userId });

    // Check if there are no existing visa applications for the user
    if (visas.length === 0) {
      const newVisa = await visa.create({
        userId,
        fullName,
        nationality,
        purpose,
        country,
        contactNumber,
        emailAddress,
        counsellingSlot: counsellingDate,
      });
      return res.status(200).send({ message: "Query Posted!", visa: newVisa });
    } else {
      return res
        .status(401)
        .send({ message: "You have already applied for visa!" });
    }
  } catch (error) {
    next(error); // Forward error to the error handling middleware
  }
};

exports.getVisa = async (req, res, next) => {
  const allVisa = await visa.find();
  if (!visa) {
    throw new ErrorHandler("No Visa Found!");
  }
  return res.status(200).send({ message: "Success!", visa: allVisa });
};
