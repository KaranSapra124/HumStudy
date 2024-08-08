import { useState, useEffect } from "react";
import Modal from "../../components/modals/Modal";
import { ArrayInput, NormalInput } from "../components/ui/inputs/ModalInputs";
import { toast } from "react-toastify";
import { validate } from "../../utils/validateForm";

export default function UniModal({
  saveFunc,
  setIsModal,
  view = "add",
  editItem,
}) {
  const [modal, setModal] = useState(true);
  const [formData, setFormData] = useState({
    universityName: "",
    city: "",
    country: "",
    applicationFeesCurrency: "",
    applicationFees: 0,
    securityPercentage: 0,
    livingExpensesCurrency: "",
    livingExpenses: 0,
    collegeRank: "",
    qsWorldRanking: "",
    timeHigherRanking: "",
    usNewsRanking: "",
    ukRanking: "",
    scholarships: [""],
    aboutUni: [""],
    aboutLocation: [""],
  });

  const handleInputChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSetValue = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSave = (e) => {
    e.preventDefault();
    const verify = validate(formData, requiredFields);
    if (!verify.success) return toast.error(verify.message);
    const item = {
      ...editItem,
      ...formData,
    };
    saveFunc(item);
    setModal(false);
  };
  const putValues = () => {
    setFormData(editItem);
  };

  useEffect(() => {
    if (view === "edit") putValues();
  }, []);

  return (
    <>
      <Modal
        setIsModal={setIsModal}
        modal={modal}
        modalStyles={{ width: "1000px" }}
      >
        <h2>{view === "edit" ? "Edit" : "Add"} University Details</h2>
        <form
          onSubmit={handleSave}
          className="flex flex-col gap-6 p-4 sm:p-8 text-[14px] text-gray-600"
        >
          <NormalInput
            label="University Name"
            name="universityName"
            value={formData.universityName}
            onChange={handleInputChange}
          />
          <div className="flex items-center gap-3 md:flex-row flex-col">
            <NormalInput
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            <NormalInput
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center gap-3 md:flex-row flex-col">
            <NormalInput
              label="Application Fee Currency"
              name="applicationFeesCurrency"
              value={formData.applicationFeesCurrency}
              onChange={handleInputChange}
            />
            <NormalInput
              type="number"
              label="Application Fee"
              name="applicationFees"
              value={
                formData?.applicationFees == "No Fee"
                  ? 0
                  : formData?.applicationFees
              }
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center gap-3 md:flex-row flex-col">
            <NormalInput
              label="Living Expenses Currency"
              name="livingExpensesCurrency"
              value={formData?.livingExpensesCurrency}
              onChange={handleInputChange}
            />

            <NormalInput
              type="number"
              label="Living Expenses"
              name="livingExpenses"
              value={
                formData.livingExpenses !== 0 &&
                Number(
                  formData?.livingExpenses
                    ?.replace("$", "")
                    .replace(",", "")
                    .split(" per")[0]
                )
              }
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center gap-3 md:flex-row flex-col">
            <NormalInput
              type="number"
              label="Security Percentage"
              name="securityPercentage"
              value={formData.securityPercentage}
              onChange={handleInputChange}
            />
            <NormalInput
              label="College Rank"
              name="collegeRank"
              value={formData.collegeRank}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center gap-3 md:flex-row flex-col">
            <NormalInput
              label="QS World Ranking"
              name="qsWorldRanking"
              value={formData.qsWorldRanking}
              onChange={handleInputChange}
            />
            <NormalInput
              label="Time Higher Ranking"
              name="timeHigherRanking"
              value={formData.timeHigherRanking}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center gap-3 md:flex-row flex-col">
            <NormalInput
              label="US News Ranking"
              name="usNewsRanking"
              value={formData.usNewsRanking}
              onChange={handleInputChange}
            />
            <NormalInput
              label="UK Ranking"
              name="ukRanking"
              value={formData.ukRanking}
              onChange={handleInputChange}
            />
          </div>
          <ArrayInput
            label="Scholarships"
            name="scholarships"
            data={formData.scholarships}
            setFormData={setFormData}
          />
          <ArrayInput
            label="About University"
            name="aboutUni"
            data={formData.aboutUni}
            setFormData={setFormData}
          />
          <ArrayInput
            label="About Location"
            name="aboutLocation"
            data={formData.aboutLocation}
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
    </>
  );
}

const requiredFields = [
  {
    key: "universityName",
    name: "University Name",
  },
];
