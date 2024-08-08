import { useState, useEffect } from "react";
import Modal from "../../components/modals/Modal";
import { NormalInput } from "../../components/inputs/ModalInputs";
import { message, DatePicker, Select } from "antd";
import moment from "moment";
import { MdAdd } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Radio } from "antd";

const loanRange = [
  {
    label: "Rs 8Lacs - Rs 20Lacs",
    value: "Rs 8Lacs - Rs 20Lacs",
  },
  {
    label: "Rs 20Lacs+",
    value: "Rs 20Lacs+",
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
    value: "Not Taken",
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

const status = [
  {
    label: "Confirmed",
    value: "confirmed",
  },
  {
    label: "Applied",
    value: "applied",
  },
  {
    label: "Not Applied yet",
    value: "na",
  },
];

const loanActive = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

const previousLoanType = [
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

const financialItems = [
  {
    name: "bankStatement",
    label: "3 or 6 Months Bank Statement",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD 3 or 6 months Bank Statement",
      },
    ],
  },

  {
    name: "bankBalanceStatement",
    label: "Bank Balance Certificate",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD Bank Balance Certificate",
      },
    ],
  },

  {
    name: "educationLoanSectorLetter",
    label: "Education Loan Sector letter (if taken}",
    rules: [{ message: "Please Enter Education Loan Sector letter" }],
  },

  {
    name: "sponsorshipLetter",
    label: "Sponsorship Letter",
    rules: [{ message: "Please Enter Sponsorship Letter " }],
  },

  {
    name: "tuitionFeePaidProof",
    label: "Tuition Fee paid proof",
    rules: [{ message: "Please Enter Tuition Fee paid proof" }],
  },

  {
    name: "additionalDocuments",
    label: "Additional Documents",

    rules: [{ message: "Please Enter Additional Documents" }],
  },
];
const ExperienceItems = [
  {
    name: "offerletter",
    className: "mt-2",
    label: "Offer Letter from Company",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD THE OFFER LETTER FROM COMPANY",
      },
    ],
  },

  {
    name: "salary",
    label: "Last 3 Months Salary Slip",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD the salary slip of last 3 months",
      },
    ],
  },
];
const loanItems = [
  {
    name: "IdentityProof",
    className: "mt-2",
    label: "Identity Proof",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD ANY IDENTITY PROOF YOU HAVE",
      },
    ],
  },
];

const formItems = [
  {
    name: "englishScoreCard",
    label: "ENGLISH PROFICIENCY SCORE CARD",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD THE ENGLISH PROFICIENCY SCORE CARD",
      },
    ],
    uploadAction: "https://calmvapidarchitects--ankur73tiwari.repl.co/upload",
  },
  {
    name: "marksheet10th",
    label: "10th Marksheet",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD the 10th marksheet",
      },
    ],
    uploadAction:
      "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  },
  {
    name: "marksheet12th",
    label: "12th Marksheet",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD the 12th marksheet",
      },
    ],
  },
  {
    name: "passport",
    label: "PASSPORT FRONT & BACK",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD PASSPORT FRONT & BACK",
      },
    ],
  },
  {
    name: "marksheetUg",
    label: "UG MARKSHEET Provisional or Degree",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD UG MARKSHEET",
      },
    ],
  },
  {
    name: "marksheetPg",
    label: "PG MARKSHEET",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD PG MARKSHEET",
      },
    ],
  },
  {
    name: "statementOfPurpose",
    label: "State of Purpose",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD PG MARKSHEET",
      },
    ],
  },
  {
    name: "lor",
    label: "Letter of Recommendation ",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD letter of recommendation",
      },
    ],
  },
  {
    name: "resume",
    label: "Resume/CV",
    rules: [
      {
        required: true,
        message: "PLEASE UPLOAD resume or CV",
      },
    ],
  },
  {
    name: "backlogCertificate",
    label: "No Backlog Certificate",
    rules: [
      {
        message: "PLEASE UPLOAD No Backlog Certificate",
      },
    ],
  },
  {
    name: "additional",
    label: "Additional Document",
    rules: [
      {
        message: "PLEASE UPLOAD Any addtional documents",
      },
    ],
  },
  // Add more objects for other Form.Item components
];
const DATE_FORMAT = "YYYY-MM-DD";
const currentlyWorkingList = [
  { value: false, label: "No" },
  { value: true, label: "Yes" },
];
const countryList = [
  { value: "united kingodm", label: "UK" },
  { value: "germany", label: "Germany" },
  { value: "usa", label: "USA" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
];
const paymentMethods = [
  {
    label: "Cash",
    value: "cash",
  },
  {
    label: "Cheque",
    value: "cheque",
  },
  {
    label: "Bank Transfer",
    value: "bankTransfer",
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
    label: "Other",
    value: "other",
    minMarks: 1,
    maxMarks: 1000,
  },
  {
    label: "Not Applied",
    value: "na",
  },
];
const aptitudeExams = [
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
    maxMarks: 36,
  },
  {
    label: "GMAT",
    value: "gmat",
    minMarks: 200,
    maxMarks: 800,
  },
  {
    label: "GRE",
    value: "gre",
    minMarks: 1,
    maxMarks: 36,
  },
  {
    label: "Other",
    value: "other",
    minMarks: 1,
    maxMarks: 1000,
  },
  {
    label: "Not Applied",
    value: "na",
  },
];
const lastExams = [
  {
    label: "10th",
    value: "10th",
    minMarks: 0,
    maxMarks: 100,
  },
  {
    label: "12th",
    value: "12th",
    minMarks: 0,
    maxMarks: 100,
  },
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
    label: "Diploma",
    value: "diploma",
    minMarks: 0,
    maxMarks: 100,
  },
  {
    label: "Not Applied",
    value: "na",
  },
];
const educationStatus = [
  {
    label: "Persuing",
    value: "persuing",
  },
  {
    label: "Completed",
    value: "completed",
  },
];

export default function UserModal({
  saveDocs,

  saveFunc,
  setIsModal,
  view = "add",
  editItem,
}) {
  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [activeSection, setActiveSection] = useState(1);

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phoneNumber: "",
 
    education: [],
    experience: [],
    emergencyContact: {
      phone: "",
      name: "",
      email: "",
      relation: "",
    },
    loanDetails: {
      countries: [],
      statusOfAdmission: "",
      plannedUniversity: "",
      startDate: "",
      loanAmount: "",
      loanType: "",
      paymentDeadline: "",
      loanBefore: "",
      loanActive: "",
      previousLoanType: "",
      cibilOf: "",
      cibilScore: "",
      jobType: "",
    },
  });

  const [modal, setModal] = useState(true);

  const handleChangeAddress = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };
  const handleChange = (name, index, val) => {
    console.log(name,index,val)
    if (!name) return;

    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => updateNestedData(prev, keys, val, index));
    } else {
      setFormData((prev) => ({ ...prev, [name]: val }));
    }
  };

  const updateNestedData = (data, keys, value, index) => {
    const [currentKey, ...remainingKeys] = keys;

    if (currentKey === "education" && index !== null) {
      const updatedEducation = data.education.map((item, i) =>
        i === index ? updateNestedData(item, remainingKeys, value, i) : item
      );
      return {
        ...data,
        education: updatedEducation,
      };
    } else if (currentKey === "experience" && index !== null) {
      const updatedExperience = data.experience.map((item, i) =>
        i === index ? updateNestedData(item, remainingKeys, value, i) : item
      );
      return {
        ...data,
        experience: updatedExperience,
      };
    }

    if (!remainingKeys.length) {
      return {
        ...data,
        [currentKey]: value,
      };
    }
    if (index) {
      return {
        ...data,
        [currentKey]: updateNestedData(
          data[currentKey][index],
          remainingKeys,
          value,
          index
        ),
      };
    } else {
      return {
        ...data,
        [currentKey]: updateNestedData(data[currentKey], remainingKeys, value),
      };
    }
  };
  const filterFormData = (data) => {
    const result = {};
  
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string' && data[key].trim() !== "") {
        result[key] = data[key];
      }
      else if (typeof data[key] === 'number' && data[key] !== "") {
        result[key] = data[key];}
       else if (Array.isArray(data[key]) && data[key].length > 0) {
        result[key] = data[key];
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        // Recursively filter nested objects
        const filteredNestedObject = filterFormData(data[key]);
        if (Object.keys(filteredNestedObject).length > 0) {
          result[key] = filteredNestedObject;
        }
      }
    });
  
    return result;
  };
  

  const handleSave = (e) => {
    e.preventDefault();
   

    const filteredData = filterFormData(formData);
   console.log(filteredData)
    saveFunc(filteredData);
    // setModal(false);
  };
  const putValues = () => {
    setFormData(editItem);
  };
  

  useEffect(() => {
    if (view === "edit") putValues();
  }, []);

  console.log(formData,editItem);
  return (
    <Modal setIsModal={setIsModal} modal={modal} modalStyles={{ width: "80%" }}>
      <h2>{view === "edit" ? "Edit" : "Add"} User Details</h2>
      <form
        onSubmit={handleSave}
        className="flex h-full flex-col gap-6 p-4 sm:p-8 text-[14px] text-gray-600"
      >
        <div className="flex flex-col gap-6 p-4 sm:p-8 md:text-[14px] text-[12px] text-gray-600 w-full">
          <div className="grid grid-cols-12 gap-y-4">
            <button
              type="button"
              onClick={() => setActiveSection(1)}
              className={
                "sm:col-span-3 col-span-6 bg-transparent border-0 font-[600] product-modal-section-btn " +
                (activeSection === 1
                  ? "text-tl_primary active-product-modal-section-btn"
                  : "text-gray-400")
              }
            >
              Personal Information
            </button>
           
            <button
              type="button"
              onClick={() => setActiveSection(2)}
              className={
                "sm:col-span-3 col-span-6 bg-transparent border-0 font-[600] product-modal-section-btn " +
                (activeSection === 2
                  ? "text-tl_primary active-product-modal-section-btn"
                  : "text-gray-400")
              }
            >
              Loan Details
            </button>
            {/* <button
              type="button"
              onClick={() => setActiveSection(3)}
              className={
                "sm:col-span-3 col-span-6 bg-transparent border-0 font-[600] product-modal-section-btn " +
                (activeSection === 3
                  ? "text-tl_primary active-product-modal-section-btn"
                  : "text-gray-400")
              }
            >
              Dashboard
            </button> */}
          </div>
          {activeSection === 1 && (
            <>
              <NormalInput
                type={"text"}
                label={"First Name"}
                inputId={"firstName"}
                inputState={formData?.fName}
                setInputState={(val) => handleChange("fName",null, val)}
              />

              <NormalInput
                type={"text"}
                label={"Last Name"}
                inputId={"lastName"}
                inputState={formData?.lName}
                setInputState={(val) => handleChange("lName", null,val)}
              />
                <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
                <label htmlFor="payer">Gender:</label>
                <div className="flex-grow md:max-w-[70%]">
                  <Select
                    size="large"
                    placeholder="Select Gender"
                    optionFilterProp="children"
                    value={formData?.gender}
                    style={{ width: "100%" }}
                    onChange={(val) => handleChange("gender", null,val)}
                    // onSearch={onSearch}
                    // filterOption={filterOption}
                    options={[
                      {
                        value: "male",
                        label: "Male",
                      },
                      {
                        value: "female",
                        label: "Female",
                      },
                      {
                        value: "others",
                        label: "Others",
                      },
                    
                    ]}
                  />
                </div>
              </div>
              {/* <NormalSelect
            label="Occupation"
            name="occupation"
            value={formData.occupation}
            onChange={(e) => handleChange("occupation", e.target.value)}
            options={["student", "female","other"]}
            modify={true}
          /> */}

              <NormalInput
                type={"email"}
                label={"Email"}
                inputId={"email"}
                inputState={formData.email}
                setInputState={(val) => handleChange("email", null,val)}
              />
              <NormalInput
                type={"number"}
                label={"Age"}
                inputId={"age"}
                inputState={formData.age}
                setInputState={(val) => handleChange("age", null,+val)}
              />
              <NormalInput
                type={"text"}
                label={"Phone Number"}
                inputId={"phoneNumber"}
                inputState={formData.phoneNumber}
                setInputState={(val) => handleChange("phoneNumber", null,+val)}
              />
              <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
                <label htmlFor="payer">Country For Applying:</label>
                <div className="flex-grow md:max-w-[70%]">
                  <Select
                    size="large"
                    placeholder="Select Featured"
                    optionFilterProp="children"
                    mode="multiple"
                    disabled={view === "view"}
                    value={formData?.countryForApplying}
                    style={{ width: "100%" }}
                    onChange={(val) => handleChange("countryForApplying", null,val)}
                    // onSearch={onSearch}
                    // filterOption={filterOption}
                    options={[
                      {
                        value: "Australia",
                        label: "Australia",
                      },
                      {
                        value: "USA",
                        label: "USA",
                      },
                      {
                        value: "UK",
                        label: "UK",
                      },
                      {
                        value: "Ireland",
                        label: "Ireland",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 border p-3 rounded-md border-gray-100">
                <label className="font-[600] text-gray-500">
                  English Exam Score
                </label>
                <Select
                  style={{ width: "100%" }}
                  onChange={(val) => handleChange("englishTest.englishExam", null,val)}
                  className=""
                  placeholder="Select English Exam"
                  options={englishExams}
                  value={formData?.englishTest?.englishExam}
                />

                {formData?.englishTest?.englishExam === "other" && (
                  <NormalInput
                    type={"text"}
                    label={"English Exam Name"}
                    inputId={"otherEnglishExam"}
                    inputState={formData?.englishTest?.otherEnglishExam}
                    setInputState={(val) =>
                      handleChange("englishTest.otherEnglishExam", null,val)
                    }
                  />
                )}
                {formData?.englishTest?.englishExam !== "na" &&
                  formData?.englishTest?.englishExam !== undefined && (
                    <NormalInput
                      type={"text"}
                      label={"English Exam Score"}
                      inputId={"englishExamScore"}
                      inputState={formData?.englishTest?.englishExamScore}
                      setInputState={(val) =>
                        handleChange("englishTest.englishExamScore", null,+val)
                      }
                    />
                  )}
              </div>
              <div className="flex flex-col gap-2 border p-3 rounded-md border-gray-100">
                <label className="font-[600] text-gray-500">
                  Academic Exam Score
                </label>
                <Select
                  style={{ width: "100%" }}
                  onChange={(val) => handleChange("aptitudeExams.aptitudeExam", null,val)}
                  className=""
                  placeholder="Select Aptitude Exam"
                  options={aptitudeExams}
                  value={formData?.aptitudeExams?.aptitudeExam}
                />

                {formData?.aptitudeExams?.aptitudeExam !== "na" &&
                  formData?.aptitudeExams?.aptitudeExam !== undefined && (
                    <NormalInput
                      type={"text"}
                      label={"Aptitude Test Score"}
                      inputId={"aptitudeExamScore"}
                      inputState={formData?.aptitudeExams?.aptitudeExamScore}
                      setInputState={(val) =>
                        handleChange("aptitudeExams.aptitudeExamScore", null,+val)
                      }
                    />
                  )}
              </div>

              <div className="border-2 px-3 py-3 rounded ">
                <div className="">
                  <div className="flex items-center gap-10 justify-between">
                    <label>Education</label>
                    <button
                      disabled={view === "view"}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,

                          education: [
                            ...prev?.education,
                            {
                              level: "",
                              status: "",
                              name: "",
                              marks: "",
                              institutionName: "",
                              startDate: "",
                              endDate: "",
                            },
                          ],
                        }))
                      }
                      className="p-2 rounded-md border border-primary bg-transparent text-primary hover:bg-tl_primary hover:text-white transition-all duration-300"
                    >
                      <MdAdd />
                    </button>
                  </div>
                  <ul className="flex flex-col w-full mx-auto">
                    {formData?.education?.map((education, i) => (
                      <li key={i} className="my-2   relative  gap-2 mt-2">
                        <div className="w-full flex ">
                          <button
                            disabled={view === "view"}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,

                                education: prev?.education?.filter(
                                  (_, j) => i !== j
                                ),
                              }))
                            }
                            className="p-2 ml-auto   rounded-md border border-red-400 bg-transparent text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <div className="" style={{ position: "relative" }}>
                          <div className="grid grid-cols-12 mb-2  sm:gap-6 gap-3">
                            <div className="col-span-12 md:col-span-6">
                              <label htmlFor="gender" className="form-label">
                                Level of Education {i}
                              </label>

                              <Select
                                size="large"
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={(value) =>
                                  handleChange("education.level", i, value)
                                }
                                style={{ width: "100%" }}
                                value={education?.level}
                                options={lastExams}
                              />
                            </div>
                            <div className="col-span-12 md:col-span-6">
                              <label htmlFor="gender" className="form-label">
                                Education Status
                              </label>
                              <br />
                              <Select
                                size="large"
                                placeholder="Select Education Status"
                                optionFilterProp="children"
                                onChange={(value) =>
                                  handleChange("education.status", i, value)
                                }
                                style={{ width: "100%" }}
                                value={education?.status}
                                options={educationStatus}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-12 mb-2  sm:gap-6 gap-3">
                            <div className="col-span-12 md:col-span-6">
                              <label className="form-label">
                                Education Name
                              </label>
                              <br />
                              <input
                                type="text"
                                name="name"
                                value={education.name}
                                placeholder="Education name"
                                onChange={(e) =>
                                  handleChange(
                                    "education.name",
                                    i,
                                    e.target.value
                                  )
                                }
                                className={`border w-full border-gray-200 p-2 rounded-md outline-none flex-grow
`}
                              />
                            </div>
                            <div className="col-span-12 md:col-span-6">
                              <label className="form-label">
                                Average Marks
                              </label>
                              <br />
                              <input
                                type="number"
                                name="name"
                                value={education.marks}
                                placeholder="Enter average marks in %"
                                onChange={(e) =>
                                  handleChange(
                                    "education.marks",
                                    i,
                                   + e.target.value
                                  )
                                }
                                className={`border w-full border-gray-200 p-2 rounded-md outline-none flex-grow
`}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-12 mb-2  sm:gap-6 gap-3">
                            <div className="col-span-12 md:col-span-6">
                              <label className="form-label">
                                {education?.level === "10th" ||
                                education?.level === "12th"
                                  ? "School"
                                  : "University"}{" "}
                                Name
                              </label>
                              <br />

                              <input
                                type="text"
                                name="name"
                                value={education.institutionName}
                                placeholder="Institution name"
                                onChange={(e) =>
                                  handleChange(
                                    "education.institutionName",
                                    i,
                                    e.target.value
                                  )
                                }
                                className={`border w-full border-gray-200 p-2 rounded-md outline-none flex-grow
`}
                              />
                            </div>
                            <div className="col-span-12 md:col-span-6">
                              <label className="form-label">
                                Education Start Date
                              </label>
                              <br />
                              <DatePicker
                                format={DATE_FORMAT}
                                style={{ height: "39px" }}
                                size="small"
                                picker="date"
                                className="border w-full border-gray-200 p-2 rounded-md outline-none flex-grow
                          "
                                value={
                                  education?.startDate
                                    ? moment(education.startDate)
                                    : undefined
                                }
                                onChange={(date, dateString) => {
                                  const formattedDate = dateString; // dateString should contain the formatted date
                                  handleChange(
                                    "education.startDate",
                                    i,
                                    formattedDate
                                  );
                                }}
                              />
                              {/* <RangePicker /> */}
                            </div>
                          </div>
                          <div className="grid grid-cols-12   sm:gap-6 gap-3">
                            {education?.status === "completed" && (
                              <div className="col-span-12 md:col-span-6">
                                <label className="form-label">
                                  Education End Date
                                </label>
                                <DatePicker
                                  format={DATE_FORMAT}
                                  style={{ height: "39px" }}
                                  size="small"
                                  picker="date"
                                  value={
                                    education?.endDate
                                      ? moment(education.endDate)
                                      : undefined
                                  }
                                  onChange={(date, dateString) => {
                                    const formattedDate = dateString; // dateString should contain the formatted date
                                    handleChange(
                                      "education.endDate",
                                      i,
                                      formattedDate
                                    );
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-2 px-3 py-3 rounded ">
                <div className="">
                  <div className="flex items-center gap-10 justify-between">
                    <label>Experience</label>
                    <button
                      disabled={view === "view"}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,

                          experience: [
                            ...prev?.experience,
                            {
                              organizationName: "",
                              designation: "",
                              country: "",
                              startData: "",
                              endDate: "",
                              startDate: "",
                              modeOfPayment: "",
                              currentlyWorking: "undefined",
                              city: "undefined",
                            },
                          ],
                        }))
                      }
                      className="p-2 rounded-md border border-primary bg-transparent text-primary hover:bg-tl_primary hover:text-white transition-all duration-300"
                    >
                      <MdAdd />
                    </button>
                  </div>
                  <ul className="flex flex-col w-full mx-auto">
                    {formData?.experience?.map((experience, i) => (
                      <li key={i} className="my-2   relative  gap-2 mt-2">
                        <div className="w-full flex ">
                          <button
                            disabled={view === "view"}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,

                                experience: prev?.experience?.filter(
                                  (_, j) => i !== j
                                ),
                              }))
                            }
                            className="p-2 ml-auto   rounded-md border border-red-400 bg-transparent text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <div className="" style={{ position: "relative" }}>
                          <div className="grid grid-cols-12 mb-2  sm:gap-6 gap-3">
                            <div className="col-span-12 md:col-span-6">
                              <label className="form-label">
                                Name of Organization
                              </label>

                              <input
                                type="text"
                                name="name"
                                value={experience?.organizationName}
                                placeholder="Organization name"
                                onChange={(e) =>
                                  handleChange(
                                    "experience.organizationName",
                                    i,
                                    e.target.value
                                  )
                                }
                                className={`border w-full border-gray-200 p-2 rounded-md outline-none flex-grow
`}
                              />
                            </div>
                            <div className="col-span-12 md:col-span-6">
                              <label className="form-label">Designation</label>
                              <br />

                              <input
                                type="text"
                                name="name"
                                value={experience?.designation}
                                onChange={(e) =>
                                  handleChange(
                                    "experience.designation",
                                    i,
                                    e.target.value
                                  )
                                }
                                placeholder="Enter designation"
                                className={`border w-full border-gray-200 p-2 rounded-md outline-none flex-grow
`}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-12 mb-2  sm:gap-6 gap-3">
                            <div className="col-span-12 md:col-span-6">
                              <label htmlFor="gender" className="form-label">
                                Mode Of Payment
                              </label>{" "}
                              <br />
                              <Select
                                size="large"
                                placeholder="Select a Payment"
                                optionFilterProp="children"
                                onChange={(value) =>
                                  handleChange(
                                    "experience.modeOfPayment",
                                    i,
                                    value
                                  )
                                }
                                style={{ width: "100%" }}
                                value={experience?.modeOfPayment}
                                options={paymentMethods}
                              />
                            </div>
                            <div className="col-span-12 md:col-span-6">
                              <label
                                htmlFor="occupation"
                                className="form-label"
                              >
                                Country
                              </label>
                              <br />
                              <Select
                                size="large"
                                value={experience.country}
                                placeholder="Please Select country"
                                // onChange={(value, option) => handleMajorChange(value,true, 'select')}
                                style={{
                                  width: "100%",
                                  minWidth: "300px",
                                }}
                                onChange={(value) =>
                                  handleChange("experience.country", i, value)
                                }
                                options={countryList}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-12 mb-2  sm:gap-6 gap-3">
                            <div className="col-span-12 md:col-span-6">
                              <label
                                htmlFor="occupation"
                                className="form-label"
                              >
                                Currently Working
                              </label>
                              <br />
                              <Select
                                size="large"
                                value={experience.currentlyWorking}
                                placeholder="Currently Working"
                                // onChange={(value, option) => handleMajorChange(value,true, 'select')}
                                style={{
                                  width: "100%",
                                  minWidth: "300px",
                                }}
                                onChange={(value) =>
                                  handleChange(
                                    "experience.currentlyWorking",
                                    i,
                                    value
                                  )
                                }
                                options={currentlyWorkingList}
                              />
                            </div>
                            <div className="col-span-12 md:col-span-6">
                              <label className="form-label">Start Date</label>
                              <br />
                              <DatePicker
                                format={DATE_FORMAT}
                                style={{ height: "39px" }}
                                size="small"
                                picker="date"
                                className="border w-full border-gray-200 p-2 rounded-md outline-none flex-grow
                          "
                                value={
                                  experience?.startDate
                                    ? moment(experience.startDate)
                                    : undefined
                                }
                                onChange={(date, dateString) => {
                                  const formattedDate = dateString; // dateString should contain the formatted date
                                  handleChange(
                                    "experience.startDate",
                                    i,
                                    formattedDate
                                  );
                                }}
                              />
                              {/* <RangePicker /> */}
                            </div>
                          </div>
                          <div className="grid grid-cols-12   sm:gap-6 gap-3">
                            {!experience?.currentlyWorking && (
                              <div className="col-span-12 md:col-span-6">
                                <label className="form-label">End Date</label>
                                <DatePicker
                                  format={DATE_FORMAT}
                                  style={{ height: "39px" }}
                                  size="small"
                                  picker="date"
                                  value={
                                    experience?.endDate
                                      ? moment(experience.endDate)
                                      : undefined
                                  }
                                  onChange={(date, dateString) => {
                                    const formattedDate = dateString; // dateString should contain the formatted date
                                    handleChange(
                                      "experience.endDate",
                                      i,
                                      formattedDate
                                    );
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-2 border p-3 rounded-md border-gray-100">
                <div>Emergency Contact</div>
                <div className="grid grid-cols-12 mb-2  sm:gap-6 gap-3">
                  <div className="col-span-12 md:col-span-6">
                    <label className="form-label">Full Name</label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      value={formData?.emergencyContact?.name}
                      placeholder="Full name"
                      onChange={(e) =>
                        handleChange(
                          "emergencyContact.name",
                          null,
                          e.target.value
                        )
                      }
                      className={`border w-full border-gray-200 p-2 rounded-md outline-none flex-grow
`}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label className="form-label">Relation</label>
                    <input
                      type="text"
                      name="name"
                      value={formData?.emergencyContact?.relation}
                      placeholder="Relation with person"
                      onChange={(e) =>
                        handleChange(
                          "emergencyContact.relation",
                          null,
                          e.target.value
                        )
                      }
                      className={`border w-full border-gray-200 p-2 rounded-md outline-none flex-grow
`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 mb-2  sm:gap-6 gap-3">
                  <div className="col-span-12 md:col-span-6">
                    <label className="form-label">Phone</label>
                    <br />
                    <input
                      type="number"
                      name="name"
                      value={formData?.emergencyContact?.phone}
                      placeholder="Phone Number"
                      onChange={(e) =>
                        handleChange(
                          "emergencyContact.phone",
                          null,
                         + e.target.value
                        )
                      }
                      className={`border w-full border-gray-200 p-2 rounded-md outline-none flex-grow
`}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="name"
                      value={formData?.emergencyContact?.email}
                      placeholder="Please enter email address"
                      onChange={(e) =>
                        handleChange(
                          "emergencyContact.email",
                          null,
                          e.target.value
                        )
                      }
                      className={`border w-full border-gray-200 p-2 rounded-md outline-none flex-grow
`}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 2 && (
               <>
               <div className="  mt-1">
                 <div className="grid grid-cols-12 gap-2 my-2">
                   <div className="col-span-12 md:col-span-6">
                     <label htmlFor="fName" className="form-label">
                       In which Country you are going to persue your Dream
                       Education ?
                     </label>
                     <Select
                       size="large"
                       placeholder="Select countries"
                       optionFilterProp="children"
                       mode="multiple"
                       value={formData?.loanDetails?.countries}
                       style={{ width: "100%" }}
                       onChange={(val) =>
                         handleChange("loanDetails.countries", null, val)
                       }
                       // onSearch={onSearch}
                       // filterOption={filterOption}
                       options={[
                         {
                           value: "Australia",
                           label: "Australia",
                         },
                         {
                           value: "USA",
                           label: "USA",
                         },
                         {
                           value: "UK",
                           label: "UK",
                         },
                         {
                           value: "Ireland",
                           label: "Ireland",
                         },
                       ]}
                     />
                   </div>
 
                   <div className="col-span-12 md:col-span-6 ">
                     <label htmlFor="lName" className="form-label">
                       Current status of Admission ?
                     </label>
 
                     <Select
                       size="large"
                       placeholder="Select status of admission"
                       optionFilterProp="children"
                       style={{ width: "100%" }}
                       showSearch="true"
                       value={formData?.loanDetails?.statusOfAdmission}
                       onChange={(val) =>
                         handleChange("loanDetails.statusOfAdmission", null, val)
                       }
                       // onSearch={onSearch}
                       // filterOption={filterOption}
                       options={status}
                     />
                   </div>
                 </div>
                 <div className="grid grid-cols-12 gap-2 my-2">
                   <div className="col-span-12 md:col-span-6">
                     <label htmlFor="gender" className="form-label">
                       Which University are you Planning to attend ?
                     </label>
                     <br />
                     <input
                       type="text"
                       name="plannedUniversity"
                       value={formData?.loanDetails?.plannedUniversity}
                       placeholder="Education name"
                       onChange={(e) =>
                         handleChange(
                           "loanDetails.plannedUniversity",
                           null,
                           e.target.value
                         )
                       }
                       className={`border w-full border-gray-200 p-2 rounded-md outline-none flex-grow
 `}
                     />
                   </div>
 
                   <div className="cols-span-12 md:col-span-6">
                     <label htmlFor="occupation" className="form-label">
                       What's your intended Program Start Date?
                     </label>
 
                     <DatePicker
                       format={DATE_FORMAT}
                       //    disabled={editable[index]}
                       style={{ height: "39px" }}
                       size="small"
                       picker="date"
                       value={
                         formData?.loanDetails?.startDate
                           ? moment(formData?.loanDetails?.startDate)
                           : undefined
                       }
                       onChange={(date, dateString) => {
                         const formattedDate = dateString; // dateString should contain the formatted date
                         handleChange(
                           "loanDetails.startDate",
                           null,
                           formattedDate
                         );
                       }}
                     />
                   </div>
                 </div>
                 <div className="grid grid-cols-12 gap-2 my-2 ">
                   <div className="col-span-12 md:col-span-6">
                     <label htmlFor="email" className="form-label">
                       Loan range
                     </label>
 
                     <Select
                       size="large"
                       placeholder="Select loan range you want"
                       optionFilterProp="children"
                       style={{ width: "100%" }}
                       value={formData?.loanDetails?.loanAmount}
                       onChange={(val) =>
                         handleChange("loanDetails.loanAmount", null, val)
                       }
                       options={loanRange}
                     />
                   </div>
                   <div className="col-span-12 md:col-span-6">
                     <label htmlFor="email" className="form-label">
                       Loan type
                     </label>
 
                     <Select
                       size="large"
                       placeholder="Select loan type you want"
                       optionFilterProp="children"
                       style={{ width: "100%" }}
                       value={formData?.loanDetails?.loanType}
                       onChange={(val) =>
                         handleChange("loanDetails.loanType", null, val)
                       }
                       // onSearch={onSearch}
                       // filterOption={filterOption}
                       options={loanTypes}
                     />
                   </div>
                 </div>
                 <div className="grid grid-cols-12 gap-2 my-2">
                   <div className="col-span-12 md:col-span-6">
                     <label htmlFor="email" className="form-label">
                       Payment Deadline
                     </label>
 
                     <DatePicker
                       format={DATE_FORMAT}
                       //    disabled={editable[index]}
                       style={{ height: "39px" }}
                       size="small"
                       picker="date"
                       value={
                         formData?.loanDetails?.paymentDeadline
                           ? moment(formData?.loanDetails?.paymentDeadline)
                           : undefined
                       }
                       onChange={(date, dateString) => {
                         const formattedDate = dateString; // dateString should contain the formatted date
                         handleChange(
                           "loanDetails.paymentDeadline",
                           null,
                           formattedDate
                         );
                       }}
                     />
                   </div>
                   <div className="col-span-12 md:col-span-6">
                     <label htmlFor="email" className="form-label">
                       Have you taken loan before?
                     </label>
 
                     <Select
                       size="large"
                       placeholder="Select a person"
                       optionFilterProp="children"
                       style={{ width: "100%" }}
                       value={formData?.loanDetails?.loanBefore}
                       onChange={(val) =>
                         handleChange("loanDetails.loanBefore", null, val)
                       }
                       // onSearch={onSearch}
                       // filterOption={filterOption}
                       options={loanBefore}
                     />
                   </div>
                 </div>
                 <div className="grid grid-cols-12 gap-2 my-2">
                   {!(
                     formData?.loanBefore === undefined ||
                     formData?.loanBefore === "Not Taken"
                   ) && (
                     <div className="col-span-12 md:col-span-6">
                       <label htmlFor="email" className="form-label">
                         Is this Loan Active?
                       </label>
 
                       <Select
                         size="large"
                         placeholder="Select a person"
                         optionFilterProp="children"
                         style={{ width: "100%" }}
                         value={formData?.loanDetails?.loanActive}
                         onChange={(val) =>
                           handleChange("loanDetails.loanActive", null, val)
                         }
                         // onSearch={onSearch}
                         // filterOption={filterOption}
                         options={loanActive}
                       />
                     </div>
                   )}
                   {formData?.loanActive === "yes" && (
                     <div className="col-span-12 md:col-span-6">
                       <label htmlFor="email" className="form-label">
                         What Type of Loan is this?
                       </label>
 
                       <Select
                         size="large"
                         placeholder="Select loan type"
                         optionFilterProp="children"
                         style={{ width: "100%" }}
                         value={formData?.loanDetails?.previousLoanType}
                         onChange={(val) =>
                           handleChange(
                             "loanDetails.previousLoanType",
                             null,
                             val
                           )
                         }
                         // onSearch={onSearch}
                         // filterOption={filterOption}
                         options={previousLoanType}
                       />
                     </div>
                   )}
                 </div>
                 <div className="grid grid-cols-12 gap-2 my-2">
                   <div className="col-span-12 md:col-span-6">
                     <label htmlFor="email" className="form-label">
                       What is your or your parent's CIBIL Score
                     </label>
                     <br />
                     <Radio.Group
                       onChange={(e) =>
                         handleChange(
                           "loanDetails.cibilOf",
                           null,
                           e.target.value
                         )
                       }
                       name="radiogroup"
                       value={formData?.loanDetails?.cibilOf}
                     >
                       <Radio value="student">My/Student</Radio>
                       <Radio value="parents">Mother/Father</Radio>
                     </Radio.Group>
                   </div>
 
                   <div className="col-span-12 md:col-span-6">
                     <label htmlFor="phoneNumber" className="form-label">
                       CIBIL Score
                     </label>
                     <br />
                     <Radio.Group
                       onChange={(e) =>
                         handleChange(
                           "loanDetails.cibilScore",
                           null,
                           e.target.value
                         )
                       }
                       name="cibilScore"
                       value={formData?.loanDetails?.cibilScore?.toString()}
                     >
                       <Radio value="699">Below 700</Radio>
                       <Radio value="749">700+</Radio>
                       <Radio value="799">750+</Radio>
                       <Radio value="899">Above 800</Radio>
                     </Radio.Group>
                   </div>
                 </div>
 
                 <div className="my-2">
                   <label htmlFor="phoneNumber" className="form-label">
                     Select Job type
                   </label>
                   <br />
                   <Radio.Group
                     onChange={(e) =>
                       handleChange("loanDetails.jobType", null, e.target.value)
                     }
                     name="jobType"
                     value={formData?.loanDetails?.jobType}
                   >
                     <Radio value="government">Government</Radio>
                     <Radio value="private">Private</Radio>
                     <Radio value="notEmployed">Not Employed</Radio>
                   </Radio.Group>
                 </div>
               </div>
             </>
          )}

          {/* {activeSection === 3 && (
            <>
            <div className="flex flex-col gap-2 border p-3 rounded-md border-gray-100">
              <div className="">Applied University</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[1, 2, 3].map((item, index) => (
                  <div
                    key={index}
                    className="border-zinc-100 p-2 border rounded"
                  >
                    <p>University of maccjsvkhvjhs</p>
                    <p>
                      <LocationOnIcon fontSize="small" className="pb-1" />{" "}
                      Berlin
                    </p>
                    <h5>Accepted</h5>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 border p-3 rounded-md border-gray-100">
              <div className="">Profile Updates</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[1, 2, 3].map((item, index) => (
                  <div
                    key={index}
                    className="border-zinc-100 p-2 border rounded"
                  >
                    <h6>
                      lorem ipsum loknln aklhs akljs ajhk akjdikhd ajoishid
                      jsihuigd sjihdiud akjiw sj sojoj sjdiho
                    </h6>
                    <div className="flex flex-col gap-2">
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button>
                      </Upload>
                      <button
                        type="button"
                        className="p-2 mt-2 bg-tl_primary text-white rounded "
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 border p-3 rounded-md border-gray-100">
              <div className="">Assigned Counsellor</div>
              <div className="grid  grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-4">
                  <div className="flex">
                    <h6>Name </h6>
                    <p className="pl-3">Imran Khan</p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <div className="flex">
                    <h6>Contact </h6>
                    <p className="pl-3">9988774455</p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <div className="flex">
                    <h6>Email </h6>
                    <p className="pl-3">khanImran@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 border p-3 rounded-md border-gray-100">
              <div className="">Package Details</div>

              <div className="grid  grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-4">
                  <div className="flex">
                    <h6 className="">Plan Name</h6>
                    <div className="pl-3">{formData?.planDetails?.name}</div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <div className="flex">
                    <h6 className="">Price</h6>
                    <div className="pl-3">{formData?.planDetails?.price}</div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <div className="flex">
                    <h6 className="">Expiry</h6>
                    <div className="pl-3">{formData?.planDetails?.expiry}</div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="">Add on Services</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 mt-2 md:grid-cols-3 gap-3">
                {addOnServices.map((service, index) => {
                  return (
                    <div className="border-zinc-100 border p-2 rounded flex ">
                      <img className="aspect-square w-[60px]" src={service.img} alt="town" />
                      <div className="ml-2 ">
                        <div className="m-0">{service?.heading}</div>
                        <p>{service?.description}</p>
                      </div>
                    </div>
                  );
                  
                })}
                </div>
              </div>
              <div className=""></div>
            </div>
          </>
          )} */}

    

          <div className="flex items-center gap-3 justify-end">
            {activeSection > 1 && (
              <button
                type="button"
                onClick={() =>
                  setActiveSection((prev) => (prev - 1 > 0 ? prev - 1 : 1))
                }
                className="p-2 mt-2 bg-gray-100 border-0 text-gray-400 hover:bg-gray-200 font-bold rounded-md transition-all duration-300 flex-1 w-[100%] max-w-[100px]"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={(e) =>
                activeSection >= 2
                  ? handleSave(e)
                  : setActiveSection((prev) => prev + 1)
              }
              className="p-2 mt-2 bg-tl_primary border-0 text-white hover:bg-tl_primary_shade font-bold rounded-md transition-all duration-300 flex-1 w-[100%] max-w-[100px]"
            >
              {activeSection >= 2 ? "Save" : "Next"}
            </button>
          </div>
        </div>

        {/* <div className="flex flex-col flex-grow items-center border border-gray-200 rounded-md p-1">
          <label className="me-auto">Address:</label>
          <div className="grid grid-cols-12 gap-1 w-full">
            <AddressInput
              type={"text"}
              label={"House Address"}
              inputId={"houseAddress"}
              inputState={formData.address?.houseAddress}
              setInputState={(val) => handleChangeAddress("houseAddress", val)}
            />
            <AddressInput
              type={"text"}
              label={"Apartment"}
              inputId={"apartment"}
              inputState={formData?.address?.apartment}
              setInputState={(val) => handleChangeAddress("apartment", val)}
            />
            <AddressInput
              type={"text"}
              label={"City"}
              inputId={"city"}
              inputState={formData?.address?.city}
              setInputState={(val) => handleChangeAddress("city", val)}
            />
            <AddressInput
              type={"text"}
              label={"District"}
              inputId={"district"}
              inputState={formData?.address?.district}
              setInputState={(val) => handleChangeAddress("district", val)}
            />
            <AddressInput
              type={"text"}
              label={"Country"}
              inputId={"country"}
              inputState={formData?.address?.country}
              setInputState={(val) => handleChangeAddress("country", val)}
            />
            <AddressInput
              type={"text"}
              label={"Zipcode"}
              inputId={"zipcode"}
              inputState={formData?.address?.zipcode}
              setInputState={(val) => handleChangeAddress("zipcode", val)}
            />
          </div>
        </div> */}

        {/* <button
          type="submit"
          className="p-2 bg-tl_primary text border border-green_1 text-white font-bold hover:scale-105 rounded-md transition-all duration-300 flex-grow"
        >
          Save
        </button> */}
      </form>
    </Modal>
  );
}
