import { useState, useEffect } from "react";
import Modal from "../../components/modals/Modal";
import {
  AddressInput,
  ImageInput,
  NormalInput,
  TextareaInput,
} from "../../components/inputs/ModalInputs";
// import { ImCross } from "react-icons/im";
// import { FaTrash } from "react-icons/fa";
// import { MdAdd } from "react-icons/md";
// import { format } from "date-fns";
// import { roomAmenities } from "../../utils/createDummyData";
// import SelectCardsModal from "./SelectCardsModal";

export default function VisaModal({
  saveFunc,
  setIsModal,
  view = "add",
  editItem,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    nationality: "",
    country: "",
    purpose: "",
    contactNumber: "",
    emailAddress: "",
    counsellingDate: "",
  });
  const [modal, setModal] = useState(true);

  // const handleChangeReview = (name, value, index) => {
  //   setReviews((prev) =>
  //     prev.map((item, j) => (index !== j ? item : { ...item, [name]: value }))
  //   );
  //   console.log(name, value);
  // };

  const handleSave = (e) => {
    e.preventDefault();
    const item = {
    
      fullName: formData.fullName,
      contactNumber: formData.contactNumber,
      emailAddress: formData.emailAddress,
      purpose: formData.purpose,
      nationality: formData.nationality,
      counsellingSlot: formData.counsellingDate,
      country: formData.country,
      status: formData.status,
     
    };
    saveFunc(item);
    setModal(false);
  };
  const putValues = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fullName: editItem?.fullName,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      userId: editItem?.userId,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      contactNumber: editItem?.contactNumber,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: editItem?.country,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      emailAddress: editItem?.emailAddress,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      nationality: editItem?.nationality,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      purpose: editItem?.purpose,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      counsellingDate: editItem?.counsellingSlot,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: editItem?.status,
    }));
  };

  useEffect(() => console.log(formData), [formData]);

  useEffect(() => {
    if (view === "edit") putValues();
  }, []);

  return (
    <>
      {/* {isSelectAmenitiesModal && (
        <SelectCardsModal
          setIsModal={setIsSelectAmenitiesModal}
          selectedCardsIds={amenityIds}
          setSelectedCardsIds={setAmenityIds}
          cardsData={roomAmenities}
          title={"Amenities"}
          renderCard={(i, item, handleCardClick, selectedCardsIds) => (
            <AmenityCard
              key={i}
              item={item}
              handleCardClick={handleCardClick}
              selectedIds={selectedCardsIds}
            />
          )}
        />
      )} */}
      <Modal
        setIsModal={setIsModal}
        modal={modal}
        modalStyles={{ width: "800px" }}
      >
        <h2>{view === "edit" ? "Edit" : "Add"} Visa Details</h2>
        <form
          onSubmit={handleSave}
          className="flex flex-col gap-6 p-4 sm:p-8 text-[14px] text-gray-600"
        >
          <NormalInput
            type={"text"}
            label={"Name"}
            inputId={"name"}
            inputState={formData.fullName}
            setInputState={(value) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                fullName: value,
              }))
            }
          />
          {/* <div
            className={`transition-all duration-500 overflow-hidden ${
              img ? "max-h-[200px] min-h-[200px]" : "max-h-0 min-h-0"
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
            label={"Image"}
            inputId={"img"}
            setInputState={(file) => setImg(URL.createObjectURL(file))}
          /> */}
          <NormalInput
            type={"number"}
            label={"Contact Number"}
            inputId={"contactNumber"}
            inputState={formData.contactNumber}
            setInputState={(value) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                contactNumber: value,
              }))
            }
          />
          <TextareaInput
            label={"Address"}
            inputId={"emailAddress"}
            // rows={2}
            inputState={formData.emailAddress}
            setInputState={(value) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                emailAddress: value,
              }))
            }
          />
          <NormalInput
            label={"Nationality"}
            inputId={"nationality"}
            rows={5}
            inputState={formData.nationality}
            setInputState={(value) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                nationality: value,
              }))
            }
          />
          <NormalInput
            label={"Country"}
            inputId={"country"}
            rows={5}
            inputState={formData.country}
            setInputState={(value) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                country: value,
              }))
            }
          />
          <NormalInput
            label={"Purpose"}
            inputId={"purpose"}
            inputState={formData.purpose}
            setInputState={(value) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                purpose: value,
              }))
            }
          />
          <NormalInput
            label={"Date"}
            type={"date"}
            inputId={"counsellingDate"}
            inputState={formData.counsellingDate}
            setInputState={(value) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                counsellingDate: value,
              }))
            }
          />
          <select
            value={formData?.status}
            name="status"
            id=""
            className="form-select"
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                status: e.target.value,
              }));
            }}
          >
            {visaStatus.map((elem) => {
              return <option value={elem.value}>{elem.name}</option>;
            })}
          </select>

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

const visaStatus = [
  { value: "Pending", name: "Pending" },
  { value: "Approved", name: "Approved" },
  { value: "Rejected", name: "Rejected" },
];
// const AmenityCard = ({ item, handleCardClick, selectedIds = [] }) => {
//   return (
//     <div
//       onClick={() => handleCardClick(item._id)}
//       className={`flex items-center sm:gap-4 gap-2 p-4 col-span-1 rounded-[10px] text-gray-700 relative cursor-pointer hover:scale-105 transition-all duration-300 ${
//         selectedIds.includes(item._id)
//           ? "bg-purple-100 border border-purple-400"
//           : "bg-gray-100"
//       }`}
//     >
//       <span className="sm:text-[30px] text-[24px]">{item.icon}</span>
//       <h3 className="font-[500] text-center sm:text-base sm:text-[14px] text-[12px]">
//         {item.text}
//       </h3>
//     </div>
//   );
// };
