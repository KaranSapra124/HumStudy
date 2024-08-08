const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const englishTestSchema = mongoose.Schema({
  englishExam: {
    type: String,
    enum: ["toefl", "ielts", "pte", "other", "na"],
    default: null,
  },
  englishExamScore: {
    type: Number,
    default: null,
  },
  otherEnglishExam: {
    type: String,
    default: null,
  },
});
const aptitudeExams = mongoose.Schema({
  aptitudeExam: {
    type: String,
    enum: ["sat", "act", "gmat", "gre", "other", "na"],
    required: true,
  },
  aptitudeExamScore: {
    type: Number,
    required: true,
  },
  otherAptitudeExam: {
    type: String,
    default: null,
  },
});
const Education = mongoose.Schema({
  level: {
    type: String,
    enum: ["ug", "pg", "diploma", "na", "10th", "12th"],
    default: null,
  },

  status: {
    type: String,
    enum: ["persuing", "completed"],
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  marks: {
    type: Number,
    default: null,
  },
  institutionName: {
    type: String,
    default: null,
  },

  startDate: {
    type: Date,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
});
const EmergencySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const ExperienceSchema = mongoose.Schema({
  organizationName: {
    type: String,
    default: null,
  },
  designation: {
    type: String,
    default: null,
  },

  country: {
    type: String,
    default: null,
  },
  startDate: {
    type: Date,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
  modeOfPayment: {
    type: String,
    enum: ["cash", "cheque", "bankTransfer"],
    default: null,
  },
  currentlyWorking: {
    type: Boolean,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
});
const academicsDocSchema = mongoose.Schema({
  englishScoreCard: {
    type: String,
    default: null,
  },
  marksheet10th: {
    type: String,
    default: null,
  },
  marksheet12th: {
    type: String,
    default: null,
  },
  passport: {
    type: String,
    default: null,
  },
  marksheetUg: {
    type: String,
    default: null,
  },
  marksheetPg: {
    type: String,
    default: null,
  },
  statementOfPurpose: {
    type: String,
    default: null,
  },
  lor: {
    type: String,
    default: null,
  },
  resume: {
    type: String,
    default: null,
  },
  backlogCertificate: {
    type: String,
    default: null,
  },
  additional: {
    type: String,
    default: null,
  },
});
const experienceDocSchema = mongoose.Schema({
  offerletter: {
    type: String,
    default: null,
  },
  salary: {
    type: String,
    default: null,
  },
});
const loanDocSchema = mongoose.Schema({
  IdentityProof: {
    type: String,
    default: null,
  },
});
const financialDocSchema = mongoose.Schema({
  bankStatement: {
    type: String,
    default: null,
  },
  bankBalanceStatement: {
    type: String,
    default: null,
  },
  educationLoanSectorLetter: {
    type: String,
    default: null,
  },
  sponsorshipLetter: {
    type: String,
    default: null,
  },
  tuitionFeePaidProof: {
    type: String,
    default: null,
  },
  additionalDocuments: {
    type: String,
    default: null,
  },
});
const documentSchema = mongoose.Schema({
  academicsDocuments: {
    type: academicsDocSchema,
    default: null,
  },

  experienceDocuments: {
    type: experienceDocSchema,
    default: null,
    // required: true,
  },
  loanDocuments: {
    type: loanDocSchema,
  },
  financialDocuments: {
    type: financialDocSchema,
    // required: true,
  },
});

const loanDetSchema = mongoose.Schema({
  countries: {
    type: [String],
    default: null,
  },
  statusOfAdmission: {
    type: String,
    enum: ["confirmed", "applied", "na"],
    default: null,
  },
  plannedUniversity: {
    type: String,
    default: null,
  },
  startDate: {
    type: Date,
    default: null,
  },
  loanAmount: {
    type: String,
    default: null,
  },
  loanType: {
    type: String,
    enum: ["secured", "unsecured"],
    default: null,
  },
  paymentDeadline: {
    type: Date,
    default: null,
  },
  loanBefore: {
    type: String,
    default: null,
  },
  loanActive: {
    type: Boolean,
    default: false,
  },
  previousLoanType: {
    type: String,
    enum: [
      "home loan",
      "Business loan",
      "Personal loan",
      "Bike or Car loan",
      "",
    ],
    default: null,
  },
  cibilOf: {
    type: String,
    enum: ["student", "mother/father"],
    default: null,
  },
  cibilScore: {
    type: Number,
    default: null,
  },
  jobType: {
    type: String,
    enum: ["government", "private", "na"],
    default: null,
  },
  lastExam: {
    type: String,
  },
  lastExamScore: {
    type: String,
  },
  englishExam: {
    type: String,
  },
  englishExamScore: {
    type: String,
  },
  academicExam: {
    type: String,
  },
  academicExamScore: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
  },
});

const updateSchema = mongoose.Schema({
  message: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
});

const schema = mongoose.Schema({
  fName: {
    type: String,
    default: null,
  },
  lName: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  occupation: {
    type: String,
    enum: ["student"],
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    default: null,
  },
  countryForApplying: {
    type: [String],
    default: null,
  },
  uniFilters: {
    fees: {
      min: {
        type: Number,
        // required: true,
        min: 0,
      },
      max: {
        type: Number,
        // required: true,
        min: 0,
      },
    },
    countries: {
      type: [String],
      default: [],
    },
    degree: {
      type: String,
      default: undefined,
    },
    majors: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: undefined,
    },
    course: {
      type: String,
      default: undefined,
    },
    duration: {
      type: String,
      default: undefined,
    },
    city: {
      type: String,
      default: undefined,
    },
    englishExam: {
      type: String,
      default: undefined,
    },
    englishExamScore: {
      type: Number,
      default: undefined,
    },
    academicExam: {
      type: String,
      default: undefined,
    },
    academicExamScore: {
      type: Number,
      default: undefined,
    },
    scholarship: {
      type: String,
      default: undefined,
    },
  },
  password: {
    type: String,
    select: false,
  },
  otp: {
    type: Number,
    default: null,
  },
  otpExpire: {
    type: Date,
    default: null,
  },
  otpAttempts: {
    type: Number,
    default: 0,
  },
  englishTest: {
    type: englishTestSchema,
    default: null,
  },
  aptitudeExams: {
    type: aptitudeExams,
    default: null,
  },
  education: {
    type: [Education],
    default: null,
  },
  experience: {
    type: [ExperienceSchema],
    default: null,
  },
  emergencyContact: {
    type: EmergencySchema,
    default: null,
  },
  documents: {
    type: documentSchema,
    
  },
  updates: {
    type: [updateSchema],
    default: [],
  },

  loanDetails: {
    type: loanDetSchema,
    default: null,
  },
  loansApplied: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loan",
      },
    ],
    default: [],
  },
  planDetails: {
    type: Object,
    default: null,
  },
  applicationCountries: {
    type: {
      countries: {
        type: [String],
        default: [],
      },
      countryCount: {
        type: Number,
        default: 0,
      },
      applications: {
        type: Number,
        default: 0,
      },
      applicationCount: {
        type: Number,
        default: 0,
      },
    },
    default: null,
  },
  universitiesApplied: {
    type: [
      {
        universityId: {
          type: mongoose.Schema.Types.ObjectId,
          default: null,
          ref: "University",
        },
        courseDetail: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "course",
          default: null,
        },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
        applicationDate: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    ref: "Universities",
    default: [],
  },
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
schema.methods.generateOtp = function () {
  this.otpExpire = new Date(
    Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME)
  ); // Set OTP expiration time
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};
schema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id, fName: this.fName, lName: this.lName },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

const User = mongoose.model("User", schema);
module.exports = User;
