import React, { useState, useEffect, useContext } from "react";
import { Slider } from "antd";
import { Select, Space } from "antd";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "antd";
import { InputNumber } from "antd";
import ClearIcon from "@mui/icons-material/Clear";
import { MainSiteContext } from "../../context/MainSiteContext";
import moment from "moment";
import { userMethod } from "../../userMethods/userMethod";
import { FetchProfile } from "../../methods/MainMethods";
const DATE_FORMAT = "YYYY-MM-DD";

const optionList = [
  { value: "united kingodm", label: "UK" },
  { value: "germany", label: "Germany" },
  { value: "usa", label: "USA" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
];
const statusOfAdmission = [
  { value: "confirmed", label: "Confirmed" },
  { value: "applied", label: "Applied" },
  { value: "na", label: "Not Applied Yet" },
];
const universities = [
  {
    value: "harvard",
    label: "Harvard University",
  },
  {
    value: "stanford",
    label: "Stanford University",
  },
  {
    value: "mit",
    label: "Massachusetts Institute of Technology (MIT)",
  },
  {
    value: "oxford",
    label: "University of Oxford",
  },
  {
    value: "cambridge",
    label: "University of Cambridge",
  },
  {
    value: "tokyo",
    label: "University of Tokyo",
  },
  {
    value: "sydney",
    label: "University of Sydney",
  },
  {
    value: "toronto",
    label: "University of Toronto",
  },
  {
    value: "paris",
    label: "Sorbonne University, Paris",
  },
];

const loanRange = [
  {
    label: "Rs 8Lacs - Rs 20Lacs",
    value: 2000000,
  },
  {
    label: "Rs 20Lacs+",
    value: 10000000,
    //
  },
];

const loanTypes = [
  {
    label: "Secured",
    value: "secured",
  },
  {
    label: "Unsecured",
    value: "unsecured",
  },
];

const loanBefore = [
  {
    label: "Yes I have Taken",
    value: "Yes I have Taken",
  },
  {
    label: "Not Taken",
    value: "na",
  },
  {
    label: "My Mother Taken",
    value: "My Mother Taken",
  },
  {
    label: "My Father Taken",
    value: "My Father Taken",
  },
  {
    label: "My Sister Taken",
    value: "My Sister Taken",
  },
  {
    label: "My Brother Taken",
    value: "My Brother Taken",
  },
];

const loanActive = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];

const typeOfLoan = [
  {
    label: "Home Loan",
    value: "home loan",
  },
  {
    label: "Business Loan",
    value: "Business loan",
  },
  {
    label: "Personal Loan",
    value: "Personal loan",
  },
  {
    label: "Bike or Car Loan",
    value: "Bike or Car loan",
  },
];

const persons = [
  {
    label: "Mother/Father",
    value: "mother/father",
  },
  {
    label: "My/Student",
    value: "student",
  },
];
const cibilScores = [
  {
    label: "Below 700",
    value: 699,
  },
  {
    label: "Above 700+",
    value: 749,
  },
  {
    label: "Above 750",
    value: 799,
  },
  {
    label: "Above 800",
    value: 900,
  },
];

const jobTypes = [
  {
    label: "Government",
    value: "government",
  },
  {
    label: "Private",
    value: "private",
  },
  {
    label: "Not Employed",
    value: "na",
  },
];

const lastExams = [
  {
    label: "UG",
    value: "ug",
    minMarks: 0,
    maxMarks: 100,
  },
  {
    label: "PG",
    value: "pg",
    minMarks: 0,
    maxMarks: 100,
  },
  {
    label: "Not Applied",
    value: "na",
  },
];

const englishExams = [
  {
    label: "TOEFL",
    value: "toefl",
    minMarks: 0,
    maxMarks: 120,
  },
  {
    label: "IELTS",
    value: "ielts",
    minMarks: 0,
    maxMarks: 9,
  },
  {
    label: "PTE",
    value: "pte",
    minMarks: 0,
    maxMarks: 90,
  },
  {
    label: "Not Applied",
    value: "na",
  },
];

const academicExams = [
  {
    label: "SAT",
    value: "sat",
    minMarks: 400,
    maxMarks: 1600,
  },
  {
    label: "ACT",
    value: "act",
    minMarks: 1,
    maxMarks: 70,
  },
  {
    label: "Not Applied",
    value: "na",
  },
];

const FinancialInstitutions = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];

function LoansFilter(props) {
  const { state, dispatch } = useContext(MainSiteContext);
  const { user, profile } = state;
  const [selectedOption, setSelectedOption] = useState(null);
  const [filter, showFilter] = useState(false);
  const [formData, setFormData] = useState({
    countries: undefined,
    statusOfAdmission: undefined,
    plannedUniversity: undefined,
    startDate: undefined,
    loanAmount: undefined,
    loanType: undefined,
    paymentDeadline: undefined,
    touchWithFinancialInstitution: undefined,
    loanBefore: undefined,
    loanActive: undefined,
    previousLoanType: undefined,
    cibilOf: undefined,
    cibilScore: undefined,
    jobType: undefined,
    lastExam: undefined,
    lastExamScore: 0,
    englishExam: undefined,
    englishExamScore: 0,
    academicExam: undefined,
    academicExamScore: 0,
  });

  const handleApplyFilters = (item) => {
    props.handleChangeFilters(item);
  };

  useEffect(() => {
    if (profile.loanDetails) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...Object.entries(profile.loanDetails).reduce((acc, [key, value]) => {
          if (prevFormData.hasOwnProperty(key)) {
            acc[key] = value;
          }
          return acc;
        }, {}),
      }));
    }
  }, [profile.loanDetails]);

  useEffect(() => {
    showFilter(props.filter);
  }, [props.filter]);

  useEffect(() => {
    const fetchProfile = async () => {
      await FetchProfile("user/profile/get", dispatch, () => {});
    };
    fetchProfile()
  }, []);

  const handleChange = (input) => (value) => {
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const clearFilters = () => {
    setFormData({
      countries: undefined,
      statusOfAdmission: undefined,
      plannedUniversity: undefined,
      startDate: undefined,
      loanAmount: undefined,
      loanType: undefined,
      paymentDeadline: undefined,
      touchWithFinancialInstitution: undefined,
      loanBefore: undefined,
      loanActive: undefined,
      previousLoanType: undefined,
      cibilOf: undefined,
      cibilScore: undefined,
      jobType: undefined,
      lastExam: undefined,
      lastExamScore: 0,
      englishExam: undefined,
      englishExamScore: 0,
      academicExam: undefined,
      academicExamScore: 0,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={filter ? "filter-bar active" : "filter-bar"}>
      <div className={`${user?.isLogin ? "hidden" : "hide-filter-bar"}`}>
        <ClearIcon onClick={() => showFilter(false)} className="closeIcon" />
        <div>
          <img width={"100px"} src="assets/images/filter-lock.png" alt="lock" />
          <h5>Login to use Filters</h5>
          <button
            onClick={() => props.setLogin(true)}
            className="filter-login-btn"
          >
            Login
          </button>
        </div>
      </div>
      <div className="filter-top-bar">
        <h5>Filters</h5>
        <p onClick={clearFilters}>Clear All</p>
      </div>

      {/* <div className="filter-item">
        <p>Country</p>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("countries")}
          className="searchBar-input"
          showSearch
          placeholder="Select Country"
          options={optionList}
          value={formData.countries}
        />
      </div> */}
      {/* <div className="filter-item">
        <p>Status of Admission</p>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("statusOfAdmission")}
          className="searchBar-input"
          placeholder="Select Status"
          //   onChange={handleChange}
          options={statusOfAdmission}
          value={formData.statusOfAdmission}
        />
      </div> */}
      {/* <div className="filter-item">
        <p>University planning to attend</p>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("plannedUniversity")}
          className="searchBar-input"
          showSearch
          placeholder="Select University"
          //   onChange={handleChange}
          options={universities}
          value={formData.plannedUniversity}
        />
      </div> */}
      {/* <div className="filter-item">
        <p>Program start Date</p>
        <DatePicker  id="startDate"
                    //    onChange={(date, dateString) => handleFormData("startDate")(dateString)}
                      />
      </div> */}
      {/* <div className="filter-item">
        <p>Program start Date</p>
        <DatePicker
          format={DATE_FORMAT}
          style={{ height: "39px" }}
          size="small"
          picker="month"
          value={formData?.startDate ? moment(formData?.startDate) : undefined}
          id="startDate"
          onChange={(date, dateString) => {
            {
              console.log(date, "DATE");
              handleChange("startDate")(dateString);
            }
          }}
        />
      </div> */}
      <div className="filter-item">
        <p>Loan Range</p>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("loanAmount")}
          className="searchBar-input"
          placeholder="Select loan range"
          //   onChange={handleChange}
          options={loanRange}
          value={formData.loanAmount}
        />
      </div>
      <div className="filter-item">
        <p>Loan Type</p>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("loanType")}
          className="searchBar-input"
          placeholder="Select loan type"
          //   onChange={handleChange}
          options={loanTypes}
          value={formData.loanType}
        />
      </div>

      {/* <div className="filter-item">
        <p>Loan payment Deadline</p>
        <DatePicker
          format={DATE_FORMAT}
          style={{ height: "39px" }}
          size="small"
          picker="month"
          value={
            formData?.paymentDeadline
              ? moment(formData?.paymentDeadline)
              : undefined
          }
          id="startDate"
          onChange={(date, dateString) => {
            // console.log(dateString, "DATE");
            handleChange("paymentDeadline")(dateString);
          }}
        />
      </div> */}
      {/* <div className="filter-item">
        <p>Have you taken loan before</p>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("loanBefore")}
          className="searchBar-input"
          placeholder="Select options"
          //   onChange={handleChange}
          options={loanBefore}
          value={formData.loanBefore}
        />
      </div> */}
      {/* {console.log(formData?.loanActive, "<><><><>")} */}
      {/* {formData.loanBefore !== "na" && formData.loanBefore !== "" && (
        <div className="filter-item">
          <p>Is this loan Active</p>
          <Select
            style={{ width: "100%" }}
            onChange={handleChange("loanActive")}
            className="searchBar-input"
            placeholder="select loan status"
            //   onChange={handleChange}
            options={loanActive}
            value={formData.loanActive ? "Yes" : "No"}
          />
        </div>
      )} */}
      {/* {formData.loanBefore !== "na" &&
        formData.loanBefore !== "" &&
        formData.loanActive === "yes" && (
          <div className="filter-item">
            <p>What type of loan is this ?</p>
            <Select
              style={{ width: "100%" }}
              onChange={handleChange("previousLoanType")}
              className="searchBar-input"
              placeholder="Type of loan taken"
              //   onChange={handleChange}
              options={typeOfLoan}
              value={formData.loanType}
            />
          </div>
        )} */}
      {/* <div className="filter-item">
        <p>CIBIL score of ?</p>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("cibilOf")}
          className="searchBar-input"
          placeholder="CIBIL score of"
          //   onChange={handleChange}
          options={persons}
          value={formData.cibilOf}
        />
      </div> */}
      {formData.cibilOf !== undefined && (
        <div className="filter-item">
          <p>CIBIL score ?</p>
          <Select
            style={{ width: "100%" }}
            onChange={handleChange("cibilScore")}
            className="searchBar-input"
            placeholder="Select CIBIL Score"
            //   onChange={handleChange}
            options={cibilScores}
            value={formData.cibilScore}
          />
        </div>
      )}
      {/* <div className="filter-item">
        <p>Job Type</p>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("jobType")}
          className="searchBar-input"
          placeholder="Select STatus"
          //   onChange={handleChange}
          options={jobTypes}
          value={formData.jobType}
        />
      </div> */}
      <div className="filter-item">
        <p>Last Exam</p>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("lastExam")}
          className="searchBar-input"
          placeholder="Select Last Exam"
          //   onChange={handleChange}
          options={lastExams}
          value={formData.lastExam ? formData.lastExam : "Not Applied"}
        />
      </div>
      {formData.lastExam !== "na" && formData.lastExam !== undefined && (
        <div className="filter-item">
          <p>Last Exam Score</p>
          <InputNumber
            onChange={handleChange("lastExamScore")}
            style={{ width: "100%" }}
            min={1}
            max={100}
            value={
              formData.lastExamScore ? formData.lastExamScore : "Not Applied"
            }
          />
        </div>
      )}

      <div className="filter-item">
        <p>English Exam</p>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("englishExam")}
          className="searchBar-input"
          placeholder="Select English Exam"
          //   onChange={handleChange}
          options={englishExams}
          value={formData.englishExam ? formData.englishExam : "Not Applied"}
        />
      </div>
      {formData.englishExam !== "na" && formData.englishExam !== undefined && (
        <div className="filter-item">
          <p>English Exam Score</p>
          <InputNumber
            onChange={handleChange("englishExamScore")}
            style={{ width: "100%" }}
            max={
              englishExams.find((exam) => exam.value === formData.englishExam)
                ?.maxMarks
            }
            min={
              englishExams.find((exam) => exam.value === formData.englishExam)
                ?.minMarks
            }
            value={
              formData.englishExamScore
                ? formData.englishExamScore
                : "Not Applied"
            }
          />
        </div>
      )}

      <div className="filter-item">
        <p>Academic Exam</p>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("academicExam")}
          className="searchBar-input"
          placeholder="Select academic exam"
          //   onChange={handleChange}
          options={academicExams}
          value={formData.academicExam ? formData.academicExam : "Not Applied"}
        />
      </div>
      {formData.academicExam !== "na" &&
        formData.academicExam !== undefined && (
          <div className="filter-item">
            <p>Academic Exam Score</p>
            <InputNumber
              onChange={handleChange("academicExamScore")}
              style={{ width: "100%" }}
              max={
                academicExams.find(
                  (exam) => exam.value === formData.academicExam
                )?.maxMarks
              }
              min={
                academicExams.find(
                  (exam) => exam.value === formData.academicExam
                )?.minMarks
              }
              value={
                formData.academicExamScore
                  ? formData.academicExamScore
                  : "Not Applied"
              }
            />
          </div>
        )}
      <div className="filter-item">
        <p>Touch with financial institutions</p>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange("touchWithFinancialInstitution")}
          className="searchBar-input"
          placeholder="Are you in touch"
          //   onChange={handleChange}
          options={FinancialInstitutions}
          value={formData.touchWithFinancialInstitution ? "Yes" : "No"}
        />
      </div>

      <div className="filter-btn-bar">
        <Button onClick={() => showFilter(false)} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => handleApplyFilters(formData)}
          variant="contained"
          color="success"
        >
          Apply
        </Button>
      </div>
    </div>
  );
}

export default LoansFilter;
