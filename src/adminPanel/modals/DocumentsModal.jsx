import { useState } from "react";
import Modal from "../../components/modals/Modal";
import UploadDocuments from "../components/UploadDocuments";

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

export default function DocumentsModal({
  saveDocs,
  saveFunc,
  setIsModal,
  editItem,
}) {

  const [modal, setModal] = useState(true);
 
  const handleDocsUpload = (item, fileName, url) => {
    saveDocs(item, fileName, url);
  };

  console.log(editItem);

  return (
    <>
    
      <Modal
        setIsModal={setIsModal}
        modal={modal}
        modalStyles={{ width: "80%" }}
      >
        <h2> User Details</h2>
        <div className="h-full w-full p-9">
          <div className="flex flex-col mb-4 gap-2 border p-3 rounded-md border-gray-100">
            <div className="">Academics Documents</div>

            <UploadDocuments
              handleDocs={handleDocsUpload}
              fileName="academicsDocuments"
              academics={true}
              data={editItem}
              formItems={formItems}
              
         
            />

            <div className=""></div>
          </div>
          <div className="flex flex-col mb-4 gap-2 border p-3 rounded-md border-gray-100">
            <div className="">Experience Documents</div>
            <UploadDocuments
              handleDocs={handleDocsUpload}
              fileName="experienceDocuments"
              formItems={ExperienceItems}
              data={editItem}
              
         
            />

            <div className=""></div>
          </div>

          <div className="flex flex-col mb-4 gap-2 border p-3 rounded-md border-gray-100">
            <div className="">Loan Documents</div>
            <UploadDocuments
              handleDocs={handleDocsUpload}
              fileName="loanDocuments"
              formItems={loanItems}
              data={editItem}
            />

            <div className=""></div>
          </div>

          <div className="flex flex-col  gap-2 border p-3 rounded-md border-gray-100">
            <div className="">Financial Documents</div>
            <UploadDocuments
              handleDocs={handleDocsUpload}
              fileName="financialDocuments"
              formItems={financialItems}
              data={editItem}
            />

            <div className=""></div>
          </div>
        </div>
      </Modal>
    </>
  );
}
