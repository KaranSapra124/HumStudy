import { useState, useEffect } from "react";
import Modal from "../../components/modals/Modal";
import { NormalInput } from "../../components/inputs/ModalInputs";
import InputWithSearch from "../../components/inputs/InputWithSearch";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchAllData } from "../methods/commonMethod";
import { format } from "date-fns";
import { Select } from "antd";
import { FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

const handleFilter=(features,arr)=>{
  const silverArr=["6 Applications and 2 Countries","10 Applications and 4 Countries"];
  const  goldArr=["4 Applications & 1 Country","10 Applications and 4 Countries"]
  const  premium=["4 Applications & 1 Country","6 Applications and 2 Countries"]


  
}
const features = [
  {
    title: "Free Counselling",
    description:
      "Benefit from complimentary counseling services to guide you through the application process.",
  },
  {
    title: "All Update",
    description:
      "Receive regular updates on your application status and other pertinent information.",
  },
  {
    title: "SOP Editing",
    description:
      "Our team will assist in refining your Statement of Purpose (SOP) for optimal impact.",
  },
  {
    title: "Evaluation",
    description:
      "Undergo a thorough evaluation of your academic background and suitability for the chosen program.",
  },
  {
    title: "Priority Visa Assistance",
    description:
      "Benefit from priority assistance in the visa application process, ensuring a streamlined experience.",
  },
  {
    title: "Personalised Counsellor",
    description:
      "Benefit from Personalised Counsellor that assist you in application process, ensuring a streamlined experience.",
  },
  {
    title: "Special Discounts",
    description:
      "Benefit from Special Discounts",
  },
  {
    title: "Interview Assistance",
    description:
      "Benefit from Interview Assistance",
  },
  {
    title: "Partner University Only",
    description:
      "This package is tailored for applications to partner universities associated with humstudy.",
  },
  {
    title: "University Shortlist",
    description:
      "Get help in shortlisting universities based on your preferences and academic profile.",
  },
  {
    title: "4 Applications & 1 Country",
    description:
      "Submit applications to four universities in a single country, streamlining your choices.",
  },
  {
    title: "6 Applications and 2 Countries",
    description:
      "Submit applications to six universities in two different countries, broadening your options.",
  },
  {
    title: "10 Applications and 4 Countries",
    description:
      "Submit applications to ten universities in four different countries, broadening your options.",
  },
  {
    title: "Loan & Finance Assistance",
    description:
      "Our team will assist you in Loan & Finance Assitance",
  },
  {
    title: "100% Portal Access",
    description:
      "Enjoy full access to our application portal for comprehensive application management.",
  },
  // {
  //   title: "Pricing",
  //   description:
  //     "The Silver Package is priced at Rs. 3,500 + GST. Please note that the university application fee is not included in this cost.",
  // },
  {
    title: "Unsafe Profile",
    description:
      "Assistance provided for applicants with profiles that might be considered risky, ensuring fair consideration. For example, below 60% Academic and below 6 in IELTS, 60 in PTE, 80 in TOEFL, 90 in Duolingo.",
  },
];
export default function PlanModal({
  saveFunc,
  setIsModal,
  view = "add",
  editItem,
}) {
  const [modal, setModal] = useState(true);
  const [data, setData] = useState({
    knowMore:{
      terms:[],
      refundConditions:[],
      notes:[],

    }
  });

  const updateNestedData = (data, keys, value) => {
    const [currentKey, ...remainingKeys] = keys;

    if (!remainingKeys.length) {
      return {
        ...data,
        [currentKey]: value,
      };
    }
    return {
      ...data,
      [currentKey]: updateNestedData(data[currentKey], remainingKeys, value),
    };
  };

  const handleDataChange = (name = null, value) => {
    if (!name) return;
    if (name.includes(".")) {
      const keys = name.split(".");
      setData((prev) => updateNestedData(prev, keys, value));
    } else
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const handleSave = (e) => {
    e.preventDefault();
  
    const specificCombinations = [
      "6 Applications and 2 Countries",
      "10 Applications and 4 Countries",
      "4 Applications & 1 Country"
    ];
  
    console.log(data,'DATA')
    const includedSpecificCombinations = data?.featuresIncluded
    ?.filter((item) => specificCombinations.includes(item))
    .length > 0;
  
  
    const newData = {
      ...editItem,
      ...data,
      knowMore: {
        ...data.knowMore,
        title: data.name,
        content: includedSpecificCombinations
          ? features.filter((item) => specificCombinations.includes(item.title))
          : features.filter((item) => data.featuresIncluded.includes(item.title)),
      },
      featuresNotIncluded: includedSpecificCombinations
        ? features.filter((item) => !specificCombinations.includes(item.title)).map((item) => item.title)
        : features.filter((item) => !data.featuresIncluded.includes(item.title)).map((item) => item.title),
    };
    saveFunc(newData);
  setModal(false);
};

  
  const putValues = () => {
    setData(editItem);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (view !== "add") putValues();
  }, []);

  return (
    <Modal setIsModal={setIsModal} modal={modal}>
      <h2>
        {view === "edit" ? "Edit" : view === "view" ? "View" : "Add"} Plan
        Details
      </h2>
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-6 p-4 sm:p-8 text-[14px] text-gray-600"
      >
        <NormalInput
          type={"text"}
          label={"Plan Name"}
          inputId={"name"}
          disabled={view === "view"}
          inputState={data?.name}
          setInputState={(val) => handleDataChange("name", val)}
        />
        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="payer">Features Included:</label>
          <div className="flex-grow md:max-w-[70%]">
            <Select
              size="large"
              placeholder="Select Featured"
              optionFilterProp="children"
              mode="multiple"
              disabled={view === "view"}
              value={data?.featuresIncluded}
              style={{ width: "100%" }}
              onChange={(val) => handleDataChange("featuresIncluded", val)}
              // onSearch={onSearch}
              // filterOption={filterOption}
              options={features.map((item) => ({
                value: item.title,
                label: item.title,
              }))}
            />
          </div>
        </div>

        <NormalInput
          type={"number"}
          label={"Price"}
          inputId={"price"}
          disabled={view === "view"}
          inputState={data?.price}
          setInputState={(val) => handleDataChange("price", +val)}
        />
        <NormalInput
          type={"number"}
          label={"Original Price"}
          inputId={"originalPrice"}
          disabled={view === "view"}
          inputState={data?.originalPrice}
          setInputState={(val) => handleDataChange("originalPrice", +val)}
        />
        <div className="border-2 px-3 py-3 rounded ">
          <div className="">
            <div className="flex items-center gap-10 justify-between">
              <label>Refund Conditions</label>
              <button
                disabled={view === "view"}
                type="button"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    knowMore: {
                      ...prev?.knowMore,
                      refundConditions: [
                        ...prev?.knowMore?.refundConditions,
                        "",
                      ],
                    },
                  }))
                }
                className="p-2 rounded-md border border-primary bg-transparent text-primary hover:bg-tl_primary hover:text-white transition-all duration-300"
              >
                <MdAdd />
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {data?.knowMore?.refundConditions?.map((refund, i) => (
                <li key={i} className="flex items-center gap-2 mt-2">
                  <span>{i + 1}.</span>
                  <textarea
                    rows={2}
                    value={refund}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        knowMore: {
                          ...prev?.knowMore,
                          refundConditions:
                            prev?.knowMore?.refundConditions?.map((item, j) =>
                              i === j ? e.target.value : item
                            ),
                        },
                      }))
                    }
                    className="border border-gray-200 p-2 rounded-md outline-none w-full"
                  ></textarea>
                  <button
                    disabled={view === "view"}
                    type="button"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        knowMore: {
                          ...prev?.knowMore,
                          refundConditions:
                            prev?.knowMore?.refundConditions?.filter(
                              (_, j) => i !== j
                            ),
                        },
                      }))
                    }
                    className="p-2 rounded-md border border-red-400 bg-transparent text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <div className="flex items-center gap-10 justify-between">
              <label>Notes</label>
              <button
                disabled={view === "view"}
                type="button"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    knowMore: {
                      ...prev?.knowMore,
                      notes: [...prev?.knowMore?.notes, ""],
                    },
                  }))
                }
                className="p-2 rounded-md border border-primary bg-transparent text-primary hover:bg-tl_primary hover:text-white transition-all duration-300"
              >
                <MdAdd />
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {data?.knowMore?.notes?.map((note, i) => (
                <li key={i} className="flex items-center gap-2 mt-2">
                  <span>{i + 1}.</span>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        knowMore: {
                          ...prev?.knowMore,
                          notes: prev?.knowMore?.notes.map((item, j) =>
                            i === j ? e.target.value : item
                          ),
                        },
                      }))
                    }
                    className="border border-gray-200 p-2 rounded-md outline-none w-full"
                  ></textarea>
                  <button
                    disabled={view === "view"}
                    type="button"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        knowMore: {
                          ...prev?.knowMore,
                          notes: prev?.knowMore?.notes?.filter(
                            (_, j) => i !== j
                          ),
                        },
                      }))
                    }
                    className="p-2 rounded-md border border-red-400 bg-transparent text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <div className="flex items-center gap-10 justify-between">
              <label>Terms</label>
              <button
                disabled={view === "view"}
                type="button"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    knowMore: {
                      ...prev?.knowMore,
                      terms: [...prev?.knowMore?.terms, ""],
                    },
                  }))
                }
                className="p-2 rounded-md border border-primary bg-transparent text-primary hover:bg-tl_primary hover:text-white transition-all duration-300"
              >
                <MdAdd />
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {data?.knowMore?.terms?.map((term, i) => (
                <li key={i} className="flex items-center gap-2 mt-2">
                  <span>{i + 1}.</span>
                  <textarea
                    rows={2}
                    value={term}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        knowMore: {
                          ...prev?.knowMore,
                          terms: prev?.knowMore?.terms.map((item, j) =>
                            i === j ? e.target.value : item
                          ),
                        },
                      }))
                    }
                    className="border border-gray-200 p-2 rounded-md outline-none w-full"
                  ></textarea>
                  <button
                    disabled={view === "view"}
                    type="button"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        knowMore: {
                          ...prev?.knowMore,
                          terms: prev?.knowMore?.terms?.filter(
                            (_, j) => i !== j
                          ),
                        },
                      }))
                    }
                    className="p-2 rounded-md border border-red-400 bg-transparent text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {view !== "view" && (
          <button
            type="submit"
            className="p-2 bg-tl_primary text border border-green_1 text-white font-bold hover:scale-105 rounded-md transition-all duration-300 flex-grow"
          >
            Save
          </button>
        )}
      </form>
    </Modal>
  );
}
