import { useState, useEffect } from "react";
import Modal from "../../components/modals/Modal";
import {
  NormalInput,
  NormalSelect,
  ToggleInput,
} from "../components/ui/inputs/ModalInputs";
import { FILE_PATH } from "../../utils/apiConfig";

export default function LoanModal({
  saveFunc,
  setIsModal,
  view = "add",
  editItem,
}) {
  const [modal, setModal] = useState(true);
  const LoanData = new FormData();

  const [formData, setFormData] = useState({
    category: options.category[0],
    bankName: "",
    bankImage: "",
    expectedInterestRate: { from: "", to: "" },
    processingFee: {
      type: options.rangeType[0],
      from: "",
      to: "",
      withGST: false,
    },
    aptitudeExams: {
      gre: { from: "", to: "" },
      gmat: { from: "", to: "" },
      sat: { from: "", to: "" },
      na: true,
    },
    academicScore: {
      percentage: { from: "", to: "" },
      number: { from: "", to: "" },
    },
    englishProficiencyScore: {
      ielts: { from: "", to: "" },
      pte: { from: "", to: "" },
      toefl: { from: "", to: "" },
    },
    salary: { from: "", to: "" },
    cibilScore: { from: "", to: "" },
    universityWorldRank: { from: "", to: "" },
    withCollateral: { eligible: false, minAmount: "" },
    withoutCollateral: { eligible: false, minAmount: "" },
  });

  const handleInputChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSetValue = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleImageChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      bankImage: file,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (view === "edit") {
      if (formData.bankImage) {
        const flattenedData = flattenObject(formData);

        // Append flattened data to LoanData
        Object.keys(flattenedData).forEach((key) => {
          const value = flattenedData[key];
          LoanData.append(key, value);
        });
        console.log(formData, "<><><><><><>");
        LoanData.append("bankImage", formData.bankImage);

        saveFunc(LoanData);
        setModal(false);
      } else {
        saveFunc(formData);
        setModal(false);
      }
    } else {
      // Flatten nested objects in formData
      const flattenedData = flattenObject(formData);

      // Append flattened data to LoanData
      Object.keys(flattenedData).forEach((key) => {
        const value = flattenedData[key];
        LoanData.append(key, value);
      });
      console.log(formData, "<><><><><><>");
      LoanData.append("bankImage", formData.bankImage);

      saveFunc(LoanData);
      setModal(false);
    }
  };

  const flattenObject = (obj, parentKey = "") => {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      const value = obj[key];
      if (typeof value === "object" && value !== null) {
        const flattened = flattenObject(value, newKey);
        return { ...acc, ...flattened };
      } else {
        return { ...acc, [newKey]: value };
      }
    }, {});
  };
  const putValues = () => {
    // const item = editItem;
    setFormData(() => ({
      ...editItem,
      academicScore: {
        percentage: {
          from: editItem?.academicScore?.from.percent,
          to: editItem?.academicScore?.to.percent,
        },
        number: {
          from: editItem?.academicScore?.from.cgpa,
          to: editItem?.academicScore?.to.cgpa,
        },
      },
      aptitudeExams: {
        gre: {
          from: editItem?.aptitudeExams?.GRE?.min,
          to: editItem?.aptitudeExams?.GRE?.max,
        },
        gmat: {
          from: editItem?.aptitudeExams?.GMAT?.min,
          to: editItem?.aptitudeExams?.GMAT?.max,
        },
        sat: {
          from: editItem?.aptitudeExams?.SAT?.min,
          to: editItem?.aptitudeExams?.SAT?.max,
        },
        na: false,
      },
    }));
  };

  useEffect(() => {
    console.log(formData, "EditItem");
  }, [formData]);

  useEffect(() => {
    console.log(editItem, "EDIT");
    if (view === "edit") putValues();
  }, []);

  return (
    <Modal
      setIsModal={setIsModal}
      modal={modal}
      modalStyles={{ width: "1000px" }}
    >
      <h2>{view === "edit" ? "Edit" : "Add"} Loan Details</h2>
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-6 p-4 sm:p-8 text-[14px] text-gray-600"
      >
        <NormalSelect
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={options.category}
        />
        <NormalInput
          label="Bank Name"
          name="bankName"
          value={formData.bankName}
          onChange={handleInputChange}
        />

        <div className="flex flex-col">
          <label className="font-semibold mb-2 text-gray-400">
            Choose Bank Image
          </label>
          <input
            id="bankImageInput"
            accept="Image/*"
            type="file"
            name="bankImage"
            onChange={handleImageChange}
          />
        </div>
        {formData?.bankImage && (
          <div>
            <img
              src={
                view === "edit"
                  ? `${FILE_PATH}${formData?.bankImage}`
                  : URL.createObjectURL(formData?.bankImage)
              }
              alt="Review"
            />
          </div>
        )}
        <RangeInputs
          label="Expected Interest Rate"
          name="expectedInterestRate"
          value={formData.expectedInterestRate}
          setFormData={setFormData}
        />
        <RangeInputs
          label="Salary"
          name="salary"
          value={formData.salary}
          setFormData={setFormData}
        />
        <RangeInputs
          label="CIBILL Score"
          name="cibilScore"
          value={formData.cibilScore}
          setFormData={setFormData}
        />
        <RangeInputs
          label="University World Rank"
          name="universityWorldRank"
          value={formData.universityWorldRank}
          setFormData={setFormData}
        />
        <ProcessingFeeInput
          fee={formData.processingFee}
          setFormData={setFormData}
        />
        <div className="flex flex-col gap-2 border p-3 rounded-md border-gray-100">
          <label className="font-[600] text-gray-500">Academic Score</label>
          {console.log(formData.academicScore, "ACADEMIC")}
          <RangeInputs
            label="Percentage"
            name="academicScore.percentage"
            value={formData?.academicScore.percentage}
            setFormData={setFormData}
          />
          <RangeInputs
            label="CGP"
            name="academicScore.number"
            value={formData?.academicScore.number}
            setFormData={setFormData}
          />
        </div>
        <div className="flex flex-col gap-2 border p-3 rounded-md border-gray-100">
          <ToggleInput
            label="Aptitude Exam Scores"
            name="na"
            checked={!formData.aptitudeExams.na}
            onChange={(name, value) =>
              setFormData((prev) => ({
                ...prev,
                aptitudeExams: {
                  na: !value,
                  gre: { from: "", to: "" },
                  gmat: { from: "", to: "" },
                  sat: { from: "", to: "" },
                },
              }))
            }
            labelStyles={{ color: "rgb(107 114 128)" }}
          />
          {!formData.aptitudeExams.na && (
            <>
              {console.log(formData.aptitudeExams, "APTITUDE")}
              <RangeInputs
                label="GRE"
                name="aptitudeExams.gre"
                value={formData.aptitudeExams.gre}
                setFormData={setFormData}
              />
              <RangeInputs
                label="GMAT"
                name="aptitudeExams.gmat"
                value={formData.aptitudeExams.gmat}
                setFormData={setFormData}
              />
              <RangeInputs
                label="SAT"
                name="aptitudeExams.sat"
                value={formData.aptitudeExams.sat}
                setFormData={setFormData}
              />
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 border p-3 rounded-md border-gray-100">
          <label className="font-[600] text-gray-500">
            English Proficiency Scores
          </label>
          <RangeInputs
            label="IELTS"
            name="englishProficiencyScore.ielts"
            value={formData?.englishProficiencyScore?.ielts}
            setFormData={setFormData}
          />
          <RangeInputs
            label="PTE"
            name="englishProficiencyScore.pte"
            value={formData?.englishProficiencyScore?.pte}
            setFormData={setFormData}
          />
          <RangeInputs
            label="TOEFL"
            name="englishProficiencyScore.toefl"
            value={formData?.englishProficiencyScore?.toefl}
            setFormData={setFormData}
          />
        </div>
        <CollateralInput
          label="With Collateral"
          name="withCollateral"
          value={formData?.withCollateral}
          setFormData={setFormData}
        />
        <CollateralInput
          label="Without Collateral"
          name="withoutCollateral"
          value={formData?.withoutCollateral}
          setFormData={setFormData}
        />

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

const RangeInputs = ({
  label = "",
  name = "",
  value = {},
  setFormData,
  hasType = false,
}) => {
  const [type, setType] = useState(value?.hasType || "");
  const handleInputChange = (e) => {
    const [name1, name2] = name.split(".");
    if (name2)
      setFormData((prev) => ({
        ...prev,
        [name1]: {
          ...prev[name1],
          [name2]: { ...prev[name1][name2], [e.target.name]: e.target.value },
        },
      }));
    else
      setFormData((prev) => ({
        ...prev,
        [name1]: { ...prev[name1], [e.target.name]: e.target.value },
      }));
  };
  return (
    <div>
      <label className="font-[500] text-gray-400">{label}</label>
      <div className="flex items-center gap-3 md:flex-row flex-col">
        {hasType && (
          <NormalSelect
            label="Type"
            name="type"
            value={value?.type}
            onChange={(e) => {
              setType(e.target.value);
              setFormData((prev) => ({
                ...prev,
                [name]: {
                  ...prev[name],
                  type: e.target.value,
                  from: "",
                  to: "",
                },
              }));
            }}
            options={options.rangeType}
            labelStyles={{
              fontWeight: 400,
            }}
          />
        )}
        {console.log(value?.from, "VALUE")}
        <NormalInput
          type="number"
          label="From"
          name="from"
          value={value?.from}
          min={0}
          max={type === options.rangeType[0] ? 100 : ""}
          onChange={handleInputChange}
          labelStyles={{ fontWeight: 400 }}
        />
        <NormalInput
          type="number"
          label="To"
          name="to"
          value={value?.to}
          min={0}
          max={type === options.rangeType[0] ? 100 : ""}
          onChange={handleInputChange}
          labelStyles={{ fontWeight: 400 }}
        />
      </div>
    </div>
  );
};

const CollateralInput = ({
  label = "",
  name = "",
  value = {},
  setFormData,
}) => {
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [name]: { ...prev[name], [e.target.name]: e.target.value },
    }));
  };
  const handleChangeEligiblity = (inpName, inpValue) => {
    setFormData((prev) => ({
      ...prev,
      [name]: { ...prev[name], [inpName]: inpValue, minAmount: "" },
    }));
  };
  return (
    <div>
      <label className="font-[600] text-gray-400">{label}</label>
      <div className="flex items-center gap-3 md:flex-row flex-col">
        <ToggleInput
          label="Eligible"
          name="eligible"
          checked={value.eligible}
          onChange={handleChangeEligiblity}
          labelStyles={{
            fontWeight: 400,
            flexDirection: "column",
            alignItems: "unset",
            gap: "10px",
          }}
        />
        <NormalInput
          type="number"
          label="Min Loan Amount (in Lakhs)"
          name="minAmount"
          value={value.minAmount}
          min={0}
          onChange={handleInputChange}
          labelStyles={{ fontWeight: 400 }}
          disabled={!value.eligible}
        />
      </div>
    </div>
  );
};

const ProcessingFeeInput = ({ fee = {}, setFormData }) => {
  const handleInputChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      processingFee: { ...prev.processingFee, [e.target.name]: e.target.value },
    }));
  const handleSetValue = (name, value) =>
    setFormData((prev) => ({
      ...prev,
      processingFee: { ...prev.processingFee, [name]: value },
    }));
  return (
    <div className="flex flex-col gap-2 border p-3 rounded-md border-gray-100">
      <label className="font-[600] text-gray-500">Processing Fee</label>
      <div className="flex items-center gap-3 md:flex-row flex-col">
        <NormalSelect
          label="Type"
          name="type"
          value={fee.type}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              processingFee: {
                ...prev.processingFee,
                type: e.target.value,
                from: "",
                to: "",
                withGST: false,
              },
            }));
          }}
          options={options.rangeType}
          labelStyles={{
            fontWeight: 400,
          }}
        />
        <NormalInput
          type="number"
          label="From"
          name="from"
          value={fee.from}
          min={0}
          max={fee.type === options.rangeType[0] ? 100 : ""}
          onChange={handleInputChange}
          labelStyles={{ fontWeight: 400 }}
        />
        <NormalInput
          type="number"
          label="To"
          name="to"
          value={fee.to}
          min={0}
          max={fee.type === options.rangeType[0] ? 100 : ""}
          onChange={handleInputChange}
          labelStyles={{ fontWeight: 400 }}
        />
      </div>
      <ToggleInput
        label="With GST"
        name="withGST"
        checked={fee.GST}
        onChange={handleSetValue}
        labelStyles={{ marginTop: "10px", fontWeight: 400 }}
      />
    </div>
  );
};

const options = {
  category: ["below average", "average", "good", "mediocre", "not eligible"],
  rangeType: ["percentage", "number"],
  eligible: ["all", "collatral only"],
  education: ["PG", "UG"],
};
