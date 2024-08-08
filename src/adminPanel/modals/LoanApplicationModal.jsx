import { useState, useEffect } from "react";
import Modal from "../../components/modals/Modal";
import { fetchAllData } from "../methods/commonMethod";
import {
  DateInput,
  NormalInput,
  NormalSelect,
  ToggleInput,
} from "../components/ui/inputs/ModalInputs";
import { toast } from "react-toastify";

export default function LoanApplicationModal({
  saveFunc,
  setIsModal,
  view = "add",
  editItem,
}) {
  const [modal, setModal] = useState(true);
  const [formData, setFormData] = useState({
    countries: "",
    statusOfAdmission: "",
    plannedUniversity: "",
    startDate: "",
    loanAmount: { min: "", max: "" },
    loanType: "",
    paymentDeadline: "",
    loanBefore: "",
    isLoanActive: false,
    cibilOf: "",
    cibilScore: "",
    jobType: "",
    lastExam: "",
    lastExamScore: "",
    englishExam: "",
    englishExamScore: "",
    academicExam: "",
    academicExamScore: "",
    touchWithFinancialInstitution: "no",
    // status: "",
    // loanAppliedId: editItem?.loan?._id,
  });
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetValue = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (parseInt(formData.loanAmount.min) > parseInt(formData.loanAmount.max)) {
      return toast.error("Minimum loan amount cannot be greater than maximum");
    }
    setFormData((prevForm) => {
      const updatedForm = {
        ...prevForm,
        loanAmount: `Rs ${prevForm.loanAmount.min}Lacs - Rs ${prevForm.loanAmount.max}Lacs`,
      };
      // Call saveFunc with the updated form data
      saveFunc(updatedForm);
      // Close the modal
      setModal(false);
      return updatedForm; // Return the updated form data
    });
  };

  useEffect(() => {
    fetchAllData("users/get", setUsers, setIsLoading);
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const putValues = () => {
    console.log(editItem?.loanDetails?.countries, "COUNTRIES");
    const updatedData = {
      ...editItem.user?.loanDetails,
      user: `${editItem?.user?.fName} ${editItem?.user?.lName} | ${editItem?.user?.email}`,
      countries: editItem?.user?.loanDetails?.countries[0],
      statusOfAdmission: editItem?.user?.loanDetails?.statusOfAdmission,
      plannedUniversity: editItem.user?.loanDetails.plannedUniversity,
      loanAmount: {
        min: editItem?.user?.loanDetails?.loanAmount.match(/(\d+)/g)[0] || "",
        max: editItem?.user?.loanDetails?.loanAmount.match(/(\d+)/g)[1] || "",
      },
      loanBefore: editItem?.user?.loanDetails?.loanBefore,
      englishExam: editItem?.user?.englishTest?.englishExam,
      englishExamScore: editItem?.user?.englishTest?.englishExamScore,
      academicExam: editItem?.user?.aptitudeExams?.aptitudeExam,
      academicExamScore: editItem?.user?.aptitudeExams?.aptitudeExamScore,
    };
    setFormData(updatedData);
  };

  useEffect(() => {
    if (view === "edit" && editItem) {
      console.log(editItem, "EDITTTT");
      putValues();
    }
  }, [view, editItem]);

  useEffect(() => {
    fetchAllData("university/get", setUniversities, setIsLoading);
  }, []);

  useEffect(() => console.log(formData), [formData]);

  return (
    <Modal
      setIsModal={setIsModal}
      modal={modal}
      modalStyles={{ width: "1000px" }}
    >
      <h2>{view === "edit" ? "Edit" : "Add"} Loan Application Details</h2>
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-6 p-4 sm:p-8 text-[14px] text-gray-600"
      >
        {/* {console.log(formData.user, "USER")} */}
        <NormalSelect
          label="UserName"
          name="user"
          value={formData.user}
          onChange={handleInputChange}
          options={users?.map((elem) => {
            return {
              value: `${elem._id}`,
              name: `${elem.fName} ${elem.lName} | ${elem.email}`,
            };
          })}
          optionType="object"
          optionValue="value"
          placeholder
        />
        <NormalSelect
          label="Country"
          name="countries"
          value={formData.countries}
          onChange={handleInputChange}
          options={options.countries}
          optionType="object"
          optionValue="value"
          placeholder
        />
        <NormalSelect
          label="State of Admission"
          name="statusOfAdmission"
          value={formData?.statusOfAdmission}
          onChange={handleInputChange}
          options={options.stateOfAdmission}
          optionType="object"
          optionValue="value"
          placeholder
        />
        <NormalSelect
          label="Planned University"
          name="plannedUniversity"
          value={formData.plannedUniversity}
          onChange={handleInputChange}
          options={universities?.map((elem) => {
            return { value: elem.universityName, name: elem.universityName };
          })}
          optionType="object"
          optionValue="value"
          placeholder
        />
        <DateInput
          label="Start Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleSetValue}
        />
        <RangeInput
          label="Loan Amount"
          name="loanAmount"
          value={formData.loanAmount}
          setFormData={setFormData}
        />
        <NormalSelect
          label="Loan Type"
          name="loanType"
          value={formData.loanType}
          onChange={handleInputChange}
          options={options.loanType}
          optionType="object"
          optionValue="value"
          placeholder
        />
        <DateInput
          label="Payment Deadline"
          name="paymentDeadline"
          value={formData.paymentDeadline}
          onChange={handleSetValue}
        />
        <NormalSelect
          label="Loan Before"
          name="loanBefore"
          value={formData.loanBefore}
          onChange={handleInputChange}
          options={options.loanBefore}
          optionType="object"
          optionValue="value"
          placeholder
        />
        {formData.loanBefore && formData.loanBefore !== "na" && (
          <ToggleInput
            label="Loan still active"
            name="isLoanActive"
            checked={formData.isLoanActive}
            onChange={handleSetValue}
          />
        )}
        <NormalSelect
          label="Cibil of"
          name="cibilOf"
          value={formData.cibilOf}
          onChange={handleInputChange}
          options={options.cibilOf}
          optionType="object"
          optionValue="value"
          placeholder
        />
        <NormalInput
          type="number"
          label="Cibil Score"
          name="cibilScore"
          value={formData.cibilScore}
          onChange={handleInputChange}
        />
        <NormalSelect
          label="Job Type"
          name="jobType"
          value={formData.jobType}
          onChange={handleInputChange}
          options={options.jobType}
          optionType="object"
          optionValue="value"
          placeholder
        />
        <NormalSelect
          label="Last Exam"
          name="lastExam"
          value={formData.lastExam}
          onChange={handleInputChange}
          options={options.lastExam}
          optionType="object"
          optionValue="value"
          placeholder
        />
        <NormalInput
          type="number"
          label="Last Exam Score"
          name="lastExamScore"
          value={formData.lastExamScore}
          onChange={handleInputChange}
        />
        <NormalSelect
          label="English Exam"
          name="englishExam"
          value={formData.englishExam}
          onChange={handleInputChange}
          options={options.englishExam}
          optionType="object"
          optionValue="value"
          placeholder
        />
        <NormalInput
          type="number"
          label="English Exam Score"
          name="englishExamScore"
          value={formData.englishExamScore}
          onChange={handleInputChange}
        />
        <NormalSelect
          label="Academic Exam"
          name="academicExam"
          value={formData.academicExam}
          onChange={handleInputChange}
          options={options.academicExam}
          optionType="object"
          optionValue="value"
          placeholder
        />
        <NormalInput
          type="number"
          label="Academic Exam Score"
          name="academicExamScore"
          value={formData.academicExamScore}
          onChange={handleInputChange}
        />
        <NormalSelect
          label="Touch with financial institution"
          name="touchWithFinancialInstitution"
          value={formData.touchWithFinancialInstitution}
          onChange={handleInputChange}
          options={options.is}
          optionType="object"
          optionValue="value"
        />
        {/* {console.log(editItem?.loan?.loanStatus,"STATUS")} */}
        {/* <NormalSelect
          label="Loan Status"
          name="status"
          value={editItem?.loan?.loanStatus}
          onChange={handleInputChange}
          options={options.status}
          optionType="object"
          optionValue="value"
        /> */}

        <button
          type="submit"
          className="p-2 bg-tl_primary text border border-green_1 text-white font-bold hover:scale-105 rounded-md transition-all duration-300 flex-grow"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}

const RangeInput = ({ label = "", name = "", value = {}, setFormData }) => {
  const handleInputChange = (e) => {
    const { name: inputName, value: inputValue } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: { ...prev[name], [inputName]: inputValue },
    }));
  };

  return (
    <div>
      <label className="font-[600] text-gray-400">{label}</label>
      <div className="flex items-center gap-3 md:flex-row flex-col">
        <NormalInput
          type="number"
          label="Min"
          name="min"
          value={value.min}
          min={0}
          onChange={handleInputChange}
          labelStyles={{ fontWeight: 400 }}
        />
        <NormalInput
          type="number"
          label="Max"
          name="max"
          value={value.max}
          min={0}
          onChange={handleInputChange}
          labelStyles={{ fontWeight: 400 }}
        />
      </div>
    </div>
  );
};

const options = {
  countries: [
    { value: "UK", name: "UK" },
    { value: "USA", name: "USA" },
    { value: "australia", name: "Australia" },
    { value: "canada", name: "canada" },
    { value: "ireland", name: "ireland" },
  ],
  stateOfAdmission: [
    { value: "confirmed", name: "Confirmed" },
    { value: "applied", name: "Applied" },
    { value: "na", name: "Not Applied" },
  ],
  plannedUnis: [
    { value: "hochschule Bremen", name: "Hochschule Bremen" },
    {
      value: "goethe Universitaet Frankfurt",
      name: "Goethe Universitaet Frankfurt",
    },
  ],
  loanType: [
    { value: "secured", name: "Secured" },
    { value: "unsecured", name: "Unsecured" },
  ],
  loanBefore: [
    { value: "na", name: "Not Taken" },
    { value: "Yes I have Taken", name: "Yes I have Taken" },
    { value: "My Mother Taken", name: "My Mother Taken" },
    { value: "My Father Taken", name: "My Father Taken" },
    { value: "My Sister Taken", name: "My Sister Taken" },
    { value: "My Brother Taken", name: "My Brother Taken" },
  ],
  cibilOf: [
    { value: "mother/father", name: "Mother/Father" },
    { value: "student", name: "Student" },
  ],
  jobType: [
    { value: "government", name: "Government" },
    { value: "private", name: "Private" },
    { value: "na", name: "Not Applied" },
  ],
  lastExam: [
    { value: "ug", name: "Ug" },
    { value: "pg", name: "Pg" },
    { value: "na", name: "Not Applied" },
  ],
  englishExam: [
    { value: "toefl", name: "Toefl" },
    { value: "ielts", name: "Ielts" },
    { value: "pte", name: "Pte" },
    { value: "na", name: "Not Applied" },
  ],
  academicExam: [
    { value: "sat", name: "Sat" },
    { value: "act", name: "Act" },
    { value: "na", name: "Not Applied" },
  ],
  is: [
    { value: "yes", name: "Yes" },
    { value: "no", name: "No" },
  ],
  status: [
    { value: "pending", name: "Pending" },
    { value: "rejected", name: "Rejected" },
    { value: "accepted", name: "Accepted" },
  ],
};
