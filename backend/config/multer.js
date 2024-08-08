const multer = require("multer");
const errorCatch = require("../middlewares/errorCatchWrapper");
const University = require("../models/university");

// multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // specify the folder where files will be stored
  },
  filename: function (req, file, cb) {
    console.log(req, file,'FILE');
    const uniqueIdentifier =
      Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 5);
    cb(null, uniqueIdentifier + "-" + file.originalname); // define the file name
  },
});

let unis = [];
exports.fetchUnis = errorCatch(async (req, res, next) => {
  if (unis.length < 1) unis = await University.find({}, { universityName: 1 });
  console.log(req.files, "<><><>");
  next();
});

let totalUnis = 0;
let addedUnis = 0;
let unisMatched = [];

exports.clearUnis = errorCatch(async (req, res, next) => {
  req.added = addedUnis;
  req.total = totalUnis;
  req.unisMatched = unisMatched;

  next();
});

const customIconValidation = errorCatch(async (req, file, cb) => {
  if (req.route.path === "/upload-icons") {
    if (unis.length > 0) {
      totalUnis++;
      const [name, ext] = file.originalname.split(".");
      const separatorsRegex = /[ ,_-]+/;
      const validName = name.split(separatorsRegex).join(" ");
      const uniFound = unis.filter(
        (uni) =>
          validName.trim().toLowerCase() ===
          uni.universityName.trim().toLowerCase()
      );
      if (uniFound.length > 0) {
        addedUnis++;
        file.originalname = validName + "." + ext;
        cb(null, true);
      } else cb(null, false);
    } else cb(new Error("University not found"));
  } else cb(null, true);
});

exports.upload = multer({ storage: storage, fileFilter: customIconValidation });
