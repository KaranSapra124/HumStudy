import { useState, useEffect } from 'react';
import Modal from '../../components/modals/Modal';
import {
  AddressInput,
  TextareaInput,
} from '../../components/inputs/ModalInputs';
import { ImCross } from 'react-icons/im';
import { FaTrash } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { format } from 'date-fns';
import SelectCardsModal from './SelectCardsModal';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { NormalInput } from '../components/ui/inputs/ModalInputs';

export default function UniModal({
  saveFunc,
  setIsModal,
  view = 'add',
  editItem,
}) {
  const {
    state: { courses },
  } = useContext(AppContext);
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [courseIds, setCourseIds] = useState([]);
  const [galleryImgs, setGalleryImgs] = useState([]);
  const [reviews, setReviews] = useState([
    {
      _id: 1,
      img: '',
      name: '',
      rating: '',
      review: '',
      date: '',
    },
  ]);
  const [modal, setModal] = useState(true);
  const [isSelectCoursesModal, setIsSelectCoursesModal] = useState(false);
  const [formData, setFormData] = useState({
    universityName: '',
    city: '',
    country: '',
    applicationFeesCurrency: '',
    applicationFees: 0,
    securityPercentage: 0,
    livingExpensesCurrency: '',
    livingExpenses: 0,
    collegeRank: '',
    qsWorldRanking: '',
    timeHigherRanking: '',
    usNewsRanking: '',
    ukRanking: '',
    scholarships: [],
    aboutUni: [],
    aboutLocation: [],
  });

  const handleInputChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSetValue = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleChangeReview = (name, value, index) => {
    setReviews((prev) =>
      prev.map((item, j) => (index !== j ? item : { ...item, [name]: value }))
    );
    console.log(name, value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const item = {
      ...editItem,
      name,
      img,
      address,
      description,
      location,
      courses: courseIds,
      galleryImgs,
      reviews,
    };
    saveFunc(item);
    setModal(false);
  };
  const putValues = () => {
    setName(editItem.name);
    setImg(editItem.img);
    setAddress(editItem.address);
    setDescription(editItem.description);
    setLocation(editItem.location);
    setCourseIds(editItem.courses);
    setGalleryImgs(editItem.galleryImgs);
    setReviews(
      editItem.reviews?.map((item) => ({
        ...item,
        date: format(new Date(item.date), 'yyyy-MM-dd'),
      }))
    );
  };

  useEffect(() => {
    if (view === 'edit') putValues();
  }, []);

  return (
    <>
      {isSelectCoursesModal && (
        <SelectCardsModal
          setIsModal={setIsSelectCoursesModal}
          selectedCardsIds={courseIds}
          setSelectedCardsIds={setCourseIds}
          cardsData={courses}
          title={'Courses'}
          renderCard={(i, item, handleCardClick, selectedCardsIds) => (
            <CourseCard
              key={i}
              item={item}
              handleCardClick={handleCardClick}
              selectedIds={selectedCardsIds}
            />
          )}
        />
      )}
      <Modal
        setIsModal={setIsModal}
        modal={modal}
        modalStyles={{ width: '800px' }}
      >
        <h2>{view === 'edit' ? 'Edit' : 'Add'} University Details</h2>
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
          {/* <div
            className={`transition-all duration-500 overflow-hidden ${
              img ? 'max-h-[200px] min-h-[200px]' : 'max-h-0 min-h-0'
            }`}
          >
            <div className="h-[200px] mx-auto">
              <img
                src={img}
                alt="Profile Photo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <ImageInput
            label={'Image'}
            inputId={'img'}
            setInputState={(file) => setImg(URL.createObjectURL(file))}
          />
          {galleryImgs.length > 0 && (
            <div className="flex items-center gap-4 flex-wrap md:max-w-[70%] flex-1 self-end mb-[-24px]">
              {galleryImgs?.map((item, i) => (
                <div key={i} className="h-[50px] w-[50px] relative">
                  <img
                    src={item}
                    alt="Profile Photo"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setGalleryImgs((prev) => prev.filter((_, j) => i !== j))
                    }
                    className="absolute top-0 right-0 p-1 rounded-full bg-red-400 text-white scale-60"
                  >
                    <ImCross />
                  </button>
                </div>
              ))}
            </div>
          )}
          <ImageInput
            label={'Gallery Images'}
            inputId={'galleryImgs'}
            multiple={true}
            setInputState={(files) =>
              setGalleryImgs(
                Array.from(files)?.map((item) => URL.createObjectURL(item))
              )
            }
          /> */}
          <TextareaInput
            label={'Address'}
            inputId={'address'}
            rows={2}
            inputState={address}
            setInputState={setAddress}
          />
          <TextareaInput
            label={'Description'}
            inputId={'description'}
            rows={5}
            inputState={description}
            setInputState={setDescription}
          />
          <TextareaInput
            label={'Location'}
            inputId={'location'}
            rows={3}
            inputState={location}
            setInputState={setLocation}
          />
          <div className="flex items-center justify-between gap-10">
            <p>
              Courses:{' '}
              <span className="px-2 py-1 rounded-md bg-purple-100">
                {courseIds.length || 0} selected
              </span>
            </p>
            <button
              type="button"
              onClick={() => setIsSelectCoursesModal(true)}
              className="p-2 rounded-md border border-primary text-primary bg-transparent hover:bg-tl_primary hover:text-white transition-all duration-300"
            >
              Select
            </button>
          </div>
          <hr />
          <div className="flex flex-col flex-grow items-center">
            <div className="flex items-center gap-10 justify-between w-full flex-1">
              <label>Reviews:</label>
              <button
                type="button"
                onClick={() =>
                  setReviews((prev) => [
                    ...prev,
                    {
                      _id: prev[prev.length - 1]?._id || 1,
                      img: '',
                      name: '',
                      rating: '',
                      review: '',
                      date: '',
                    },
                  ])
                }
                className="p-2 rounded-md border border-primary bg-transparent text-primary hover:bg-tl_primary hover:text-white transition-all duration-300"
              >
                <MdAdd />
              </button>
            </div>
            {reviews?.map((review, i) => (
              <div key={i} className="border p-2 rounded-md flex-1 mt-3 w-full">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      setReviews((prev) => prev.filter((_, j) => i !== j))
                    }
                    className="p-2 rounded-md border border-red-400 bg-transparent text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="grid grid-cols-12 gap-3">
                  <div className="flex flex-col col-span-12 sm:col-span-6">
                    <label htmlFor="reviewImg">Image:</label>
                    <div className="flex flex-grow items-center gap-2">
                      <input
                        type="file"
                        name="reviewImg"
                        id="reviewImg"
                        accept="images/*"
                        onChange={(e) =>
                          setReviews((prev) =>
                            prev.map((re, j) =>
                              i !== j
                                ? re
                                : {
                                    ...re,
                                    img: URL.createObjectURL(e.target.files[0]),
                                  }
                            )
                          )
                        }
                        className={`border border-gray-200 p-2 rounded-md outline-none flex-grow`}
                      />
                      {review.img && (
                        <div className="w-[50px] h-[50px]">
                          <img
                            src={review.img}
                            alt="Review img"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <AddressInput
                      type={'text'}
                      label={'Name'}
                      inputId={'reviewName'}
                      inputState={review.name}
                      setInputState={(e) =>
                        handleChangeReview('name', e.target.value, i)
                      }
                    />
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <AddressInput
                      type={'number'}
                      label={'Rating'}
                      inputId={'reviewRating'}
                      inputState={review.rating}
                      setInputState={(e) =>
                        handleChangeReview('rating', e.target.value, i)
                      }
                    />
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <AddressInput
                      type={'date'}
                      label={'Date'}
                      inputId={'reviewDate'}
                      inputState={review?.date}
                      setInputState={(e) =>
                        handleChangeReview('date', e.target.value, i)
                      }
                    />
                  </div>
                  <div className="col-span-12">
                    <TextareaInput
                      label={'Review'}
                      inputId={'reviewReview'}
                      rows={3}
                      inputState={review.review}
                      setInputState={(value) =>
                        handleChangeReview('review', value, i)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
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

const CourseCard = ({ item, handleCardClick, selectedIds = [] }) => {
  return (
    <div
      onClick={() => handleCardClick(item._id)}
      className={`px-2 col-span-1 py-4 rounded-[10px] text-gray-700 relative cursor-pointer hover:scale-105 transition-all duration-300 ${
        selectedIds.includes(item._id)
          ? 'bg-purple-100 border border-purple-400'
          : 'bg-gray-100'
      }`}
    >
      <h3 className="font-[500] text-center sm:text-base text-[14px]">
        {item.name}
      </h3>
      <div className="mt-2 flex sm:flex-row flex-col items-center md:gap-4 gap-2">
        <div className="flex sm:flex-col items-center gap-1">
          <p className="text-gray-500 md:text-[13px] text-[11px]">Duration</p>
          <p className="md:text-[14px] text-[12px]">{item.duration} Year</p>
        </div>
        <div className="flex sm:flex-col items-center gap-1">
          <p className="text-gray-500 md:text-[13px] text-[11px]">Exam Score</p>
          <p className="md:text-[14px] text-[12px]">IELTS: {item.score}</p>
        </div>
        <div className="flex sm:flex-col items-center gap-1">
          <p className="text-gray-500 md:text-[13px] text-[11px]">Tution Fee</p>
          <p className="md:text-[14px] text-[12px]">${item.fee}</p>
        </div>
      </div>
    </div>
  );
};
