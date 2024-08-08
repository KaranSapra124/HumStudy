const errorCatch = require("../middlewares/errorCatchWrapper");
const flight = require("../models/flight");
// const University = require("../models/university");
const ErrorHandler = require("../utils/errorHandler");

exports.addFlight = async (req, res, next) => {
    const newFlight = await flight.create(req.body);
    return res
      .status(200)
      .send({ message: "Successfully Posted The Query!", flight: newFlight });
//   console.log(req.body);
};

exports.getVisa = async (req, res, next) => {
  const allVisa = await visa.find();
  if (!visa) {
    throw new ErrorHandler("No Visa Found!");
  }
  return res.status(200).send({ message: "Success!", visa: allVisa });
};
