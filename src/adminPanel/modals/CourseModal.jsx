import { useState, useEffect } from 'react';
import Modal from '../../components/modals/Modal';
import { validate } from '../../utils/validateForm';
import { NormalInput, NormalSelect } from '../components/ui/inputs/ModalInputs';
import { toast } from 'react-toastify';

export default function CourseModal({
  saveFunc,
  setIsModal,
  view = 'add',
  editItem,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [modal, setModal] = useState(true);

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
    if (view === 'edit') putValues();
  }, []);

  return (
    <Modal
      setIsModal={setIsModal}
      modal={modal}
      modalStyles={{ width: '1000px' }}
    >
      <h2>{view === 'edit' ? 'Edit' : 'Add'} Course Details</h2>
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-6 p-4 sm:p-8 text-[14px] text-gray-600"
      >
        <NormalInput
          label="Course Name"
          name="courseName"
          value={formData.courseName}
          onChange={handleInputChange}
        />
        <NormalInput
          type="url"
          label="Course Link"
          name="courseLink"
          value={formData.courseLink}
          onChange={handleInputChange}
        />
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
        <NormalInput
          label="Course Level"
          name="level"
          value={formData.level}
          onChange={handleInputChange}
        />
        <NormalInput
          label="Major"
          name="major"
          value={formData.major}
          onChange={handleInputChange}
        />
        <NormalInput
          label="Course Type"
          name="type"
          value={formData.category}
          onChange={handleInputChange}
        />
        <div className="flex items-center gap-3 md:flex-row flex-col">
          <NormalInput
            label="Overall Tuition Fee Currency"
            name="tuitionFeeOverallCurrency"
            value={formData.tuitionFeeOverallCurrency}
            onChange={handleInputChange}
          />
          <NormalInput
            type="number"
            label="Overall Tuition Fee"
            name="tuitionFeeOverall"
            value={formData.tuitionFeeOverall}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center gap-3 md:flex-row flex-col">
          {/* <NormalInput
            label="First Year Tuition Fee Currency"
            name="tuitionFeeFirstYearCurrency"
            value={formData.tuitionFeeFirstYearCurrency}
            onChange={handleInputChange}
          /> */}
          <NormalInput
            type="number"
            label="First Year Tuition Fee"
            name="tuitionFeeFirstYear"
            value={formData.tuitionFeeFirstYear}
            onChange={handleInputChange}
          />
        </div>
        <NormalInput
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
        />
        <NormalInput
          label="Intakes"
          name="intakes"
          value={formData?.university?.intakes}
          onChange={handleInputChange}
        />
        <NormalInput
          label="Application Fee"
          name="appFee"
          value={formData?.university?.applicationFees}
          onChange={handleInputChange}
        />
        <NormalSelect
          label="Scholarships"
          name="scholarShips"
          value={formData.scholarShips}
          onChange={handleInputChange}
          options={['Yes', 'No']}
        />
        <NormalInput
          label="IELTS"
          name="ielts"
          value={formData.ielts}
          onChange={handleInputChange}
        />
        <NormalInput
          label="TOEFL"
          name="toefl"
          value={formData.toefl}
          onChange={handleInputChange}
        />
        <NormalInput
          label="12th Score"
          name="twelvethScroe"
          value={formData.twelvethScroe}
          onChange={handleInputChange}
        />

        <NormalInput
          label="UG Score"
          name="UGScore"
          value={formData.UGScore}
          onChange={handleInputChange}
        />

        <NormalInput
          label="GRE"
          name="GRE"
          value={formData.GRE}
          onChange={handleInputChange}
        />

        <NormalInput
          label="SAT Score"
          name="satScore"
          value={formData.satScore}
          onChange={handleInputChange}
        />

        <NormalInput
          label="GMAT"
          name="GMAT"
          value={formData.GMAT}
          onChange={handleInputChange}
        />

        <NormalInput
          label="Duolingo"
          name="dualingo"
          value={formData.dualingo}
          onChange={handleInputChange}
        />

        <NormalInput
          label="PTE"
          name="PTE"
          value={formData.PTE}
          onChange={handleInputChange}
        />

        <NormalInput
          label="Scholarships"
          name="scholarships"
          value={formData.scholarships}
          onChange={handleInputChange}
        />

        <NormalInput
          label="Feb Deadline"
          name="febDeadline"
          value={formData.febDeadline}
          onChange={handleInputChange}
        />

        <NormalInput
          label="May Deadline"
          name="mayDeadline"
          value={formData.mayDeadline}
          onChange={handleInputChange}
        />

        <NormalInput
          label="Aug Deadline"
          name="augDeadline"
          value={formData.augDeadline}
          onChange={handleInputChange}
        />

        <NormalInput
          label="Jan Deadline"
          name="janDeadline"
          value={formData.janDeadline}
          onChange={handleInputChange}
        />

        <NormalInput
          label="June Deadline"
          name="juneDeadline"
          value={formData.juneDeadline}
          onChange={handleInputChange}
        />

        <NormalInput
          label="Sep Deadline"
          name="sepDeadline"
          value={formData.sepDeadline}
          onChange={handleInputChange}
        />

        <NormalInput
          label="Feb Opening"
          name="febOpening"
          value={formData.febOpening}
          onChange={handleInputChange}
        />

        <NormalInput
          label="May Opening"
          name="mayOpening"
          value={formData.mayOpening}
          onChange={handleInputChange}
        />

        <NormalInput
          label="Aug Opening"
          name="augOpening"
          value={formData.augOpening}
          onChange={handleInputChange}
        />

        <NormalInput
          label="Jan Opening"
          name="janOpening"
          value={formData.janOpening}
          onChange={handleInputChange}
        />

        <NormalInput
          label="June Opening"
          name="juneOpening"
          value={formData.juneOpening}
          onChange={handleInputChange}
        />

        <NormalInput
          label="Sep Opening"
          name="sepOpening"
          value={formData.sepOpening}
          onChange={handleInputChange}
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

const initialFormData = {
  universityName: '',
  courseName: '',
  courseLink: '',
  city: '',
  country: '',
  level: '',
  major: '',
  type: '',
  tuitionFeeOverallCurrency: 'INR',
  tuitionFeeOverall: '',
  tuitionFeeFirstYearCurrency: 'INR',
  tuitionFeeFirstYear: 0,
  duration: '',
  intakes: '',
  appFee: '',
  scholarShips: '',
  ielts: '',
  toefl: '',
  twelvethScroe: '',
  UGScore: '',
  GRE: '',
  satScore: '',
  GMAT: '',
  dualingo: 0,
  PTE: '',
  febDeadline: '',
  mayDeadline: '',
  augDeadline: '',
  janDeadline: '',
  juneDeadline: '',
  sepDeadline: '',
  febOpening: '',
  mayOpening: '',
  augOpening: '',
  janOpening: '',
  juneOpening: '',
  sepOpening: '',
};

const requiredFields = [
  {
    key: 'courseName',
    name: 'Course Name',
  },
];
