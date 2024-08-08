import { useContext, useEffect, useState } from "react";
import "./UniversitySearch.css";
import { Slider, Select, Space, InputNumber, Radio, Switch } from "antd";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import { RxCross2 } from "react-icons/rx";
import ClearIcon from "@mui/icons-material/Clear";
import { IoIosArrowDown } from "react-icons/io";
import { userMethod } from "../../userMethods/userMethod";
import {
  MAIN_SITE_ACTIONS,
  MainSiteContext,
} from "../../context/MainSiteContext";
import {
  coursesCategory,
  coursesCountry,
  coursesLevel,
  coursesMajor,
} from "../../utils/data";
import { FetchProfile } from "../../methods/MainMethods";
import UniversitySearchBox from "./UniversitySearchBox";

const AcademicExams = [
  {
    label: "SAT",
    key: "sat",
    minMarks: 400,
    maxMarks: 1600,
  },
  {
    label: "ACT",
    key: "act",
    minMarks: 1,
    maxMarks: 36,
  },
  {
    label: "Not Applied",
    key: "na",
  },
];

const PostAcademicExams = [
  {
    label: "GRE",
    key: "GRE",
    minMarks: 130,
    maxMarks: 170,
  },
  {
    label: "GMAT",
    key: "GMAT",
    minMarks: 200,
    maxMarks: 800,
  },
  {
    label: "Not Applied",
    key: "na",
  },
];

const englishExams = [
  {
    label: "TOEFL",
    key: "toefl",
    minMarks: 0,
    maxMarks: 120,
  },
  {
    label: "IELTS",
    key: "ielts",
    minMarks: 0,
    maxMarks: 9,
  },
  {
    label: "PTE",
    key: "PTE",
    minMarks: 0,
    maxMarks: 90,
  },
  {
    label: "Not Applied",
    key: "na",
  },
];

function UniversitySearchFilter(props) {
  const { state, dispatch } = useContext(MainSiteContext);
  const { profile, contentBySearch } = state;
  const [bool, setBool] = useState(false);
  const [country, setCountry] = useState(false);
  const [formData, setFormData] = useState(profile?.uniFilters || "");
  const [filter, showFilter] = useState(false);
  const [majorData, setMajorData] = useState([]);

  const handleInputData = (input) => (e) => {
    const value = e?.target?.value ?? e;
    if (input === "fees")
      setFormData((prevState) => ({
        ...prevState,
        [input]: {
          min: e[0],
          max: e[1],
        },
      }));
    else if (input == "majors")
      setFormData((prevFormData) => ({
        ...prevFormData,
        [input]: [...formData[input], e.target.value],
      }));
    else if (input == "countries")
      setFormData((prevFormData) => ({
        ...prevFormData,
        [input]: [...formData[input], e.target.value],
      }));
    else if (input == "Marks12th") {
      console.log("MARKS12TH");
      setFormData((prevFormData) => ({
        ...prevFormData,
        ugMarks: undefined,
      }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        [input]: e.target.value,
      }));
    } else if (input == "ugMarks") {
      console.log("ug");
      setFormData((prevFormData) => ({
        ...prevFormData,
        Marks12th: undefined,
      }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        [input]: e.target.value,
      }));
    } else if (
      input == "academicExam" ||
      input == "englishExamScore" ||
      input == "englishExam" ||
      input == "academicExamScore"
    )
      setFormData((prevFormData) => ({
        ...prevFormData,
        [input]: value,
      }));
    else {
      console.log(e.target.value);
      setFormData((prevState) => ({
        ...prevState,
        [input]: e.target.value,
      }));
    }
  };

  const clearFilters = () => {
    const data = {
      fees: {
        min: 200000,
        max: 2500000,
      },
      countries: [],
      degree: "Undergraduate",
      category: undefined,
      majors: [],
      course: undefined,
      duration: undefined,
      city: undefined,
      englishExam: undefined,
      englishExamScore: 0,
      academicExam: undefined,
      academicExamScore: 0,
      category: "",
      scholarship: [],
      Marks12th: undefined,
      ugMarks: undefined,
      marks: undefined,
    };
    setFormData(data);
    dispatch({ type: MAIN_SITE_ACTIONS.SET_UNISFILTERS, payload: data });
  };

  const handleDelete = (item) => {
    const filteredMajors = formData.majors.filter((elem) => elem !== item);
    setFormData((prevFormData) => ({
      ...prevFormData,
      majors: filteredMajors,
    }));
  };

  const handleDeleteCountry = (item) => {
    // console.log(formData.countries)
    const filteredCountries = formData.countries.filter(
      (elem) => elem !== item
    );
    // console.log(filteredCountries)
    setFormData((prevFormData) => ({
      ...prevFormData,
      countries: filteredCountries,
    }));
  };

  const handleSubmit = () => {
    // console.log("HELLO FILTERS");
    dispatch({
      type: MAIN_SITE_ACTIONS.GET_CONTENT_BY_SEARCH,
      payload: {
        ...state?.contentBySearch,
        isActive: false,
      },
    });
    showFilter(!filter);
    dispatch({ type: MAIN_SITE_ACTIONS.SET_UNISFILTERS, payload: formData });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      await FetchProfile("user/profile/get", dispatch, () => {});
    };
    fetchProfile();
  }, []);

  // useEffect(() => {
  //   if (contentBySearch !== "") {
  //     userMethod(
  //       `/get-uni-by-search?page=${1}&&pageEnd=${10}`,
  //       {
  //         searchData: contentBySearch?.data,
  //         filter: contentBySearch?.isUniversity,
  //       },
  //       null,
  //       null
  //     );
  //   } else {
  //     console.log("Working");
  //   }
  // }, [contentBySearch]);

  useEffect(() => {
    // console.log(formData.degree,"DEGREEEEE")
    userMethod(`get-majors`, { major: formData.degree }, setMajorData, null);
  }, [formData.degree]);

  useEffect(() => {
    dispatch({
      type: MAIN_SITE_ACTIONS.SET_UNISFILTERS,
      payload: { ...formData, fees: { min: 200000, max: 5673687 } },
    });
  }, []);

  useEffect(() => {
    showFilter(props.filter);
  }, [props.filter]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <div style={{ marginTop: "2rem" }}>
      <UniversitySearchBox Login={props} />
      <div className={filter ? "filter-bar active" : "filter-bar"}>
        <div className={props?.isLogin ? "hidden" : "hide-filter-bar"}>
          <ClearIcon onClick={() => showFilter(false)} className="closeIcon" />
          <div>
            <img
              width={"100px"}
              src="assets/images/filter-lock.png"
              alt="lock"
            />
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
          <p style={{ cursor: "pointer" }} onClick={clearFilters}>
            Clear All
          </p>
        </div>
        <h6>Fees</h6>
        <Slider
          min={100000}
          max={2500000}
          range={{
            draggableTrack: true,
          }}
          onChange={handleInputData("fees")}
          defaultValue={[200000, 2500000]}
        />
        <div className="filter-price-bar">
          <p>{formData?.fees?.min}</p>
          <p>{formData?.fees?.max}</p>
        </div>

        <div className="filter-item">
          <p>Degree</p>
          <select
            className="border w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData?.degree}
            onChange={handleInputData("degree")}
          >
            <option value="" disabled>
              Select Degree
            </option>
            {coursesLevel.map((elem) => {
              // {console.log(elem,'LEVELS')}
              return (
                <option key={elem.value} value={elem.value}>
                  {elem.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="filter-item">
          {/* {console.log(formData?.degree)} */}
          <p>
            {formData?.degree === "Undergraduate" ||
            formData.degree == undefined
              ? "12th Score"
              : formData?.degree === "Phd"
              ? "PG Score"
              : "UG Marks"}
          </p>

          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder={
              formData?.degree === "Undergraduate" ||
              (formData.degree == undefined && formData?.degree !== "Phd")
                ? "Enter 12th marks"
                : formData?.degree == "Phd"
                ? "Enter PG Score"
                : "Enter UG Score"
            }
            value={formData.marks}
            onChange={
              formData.degree == "Undergraduate"
                ? handleInputData("Marks12th")
                : handleInputData("ugMarks")
            }
          />
        </div>
        <div className="filter-item">
          <p>Category</p>
          <select
            className="border w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData?.category}
            onChange={handleInputData("category")}
          >
            <option value="" disabled>
              Select Category
            </option>
            {coursesCategory.map((elem) => {
              return (
                <option key={elem.value} value={elem.value}>
                  {elem.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="filter-item">
          <div className="d-flex justify-content-between">
            <p>Major</p>
            <IoIosArrowDown
              style={{ color: "black", float: "right" }}
              className="arrowDown"
              onClick={() => setBool(!bool)}
            />
          </div>
          <div>
            <div className="chip">
              {formData?.majors?.map((elem) => {
                return (
                  <div className="chipBox" onClick={() => handleDelete(elem)}>
                    {elem}{" "}
                    <RxCross2
                      style={{ fontSize: "1.1rem", marginLeft: "5px" }}
                    />
                  </div>
                );
              })}
            </div>
            {bool && (
              <select
                multiple
                className="mt-2 border w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                // onClick={() => setBool(!bool)}
                onChange={handleInputData("majors")}
              >
                {majorData?.map((elem) => {
                  return (
                    <option key={elem.label} value={elem.label}>
                      {elem.label}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
        </div>
        <div className="filter-item">
          <div className="d-flex justify-content-between">
            <p>Country</p>
            <IoIosArrowDown
              // style={{ color: "black" }}
              className="arrowDown"
              onClick={() => setCountry(!country)}
            />
          </div>
          <div>
            <div className="chip">
              {formData?.countries?.map((elem) => {
                return (
                  <div
                    className="chipBox"
                    onClick={() => handleDeleteCountry(elem)}
                  >
                    {elem}{" "}
                    <RxCross2
                      style={{ fontSize: "1.1rem", marginLeft: "5px" }}
                    />
                  </div>
                );
              })}
            </div>
            {country && (
              <select
                multiple
                className="mt-2 border w-full p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                // onClick={() => setBool(!bool)}
                onChange={handleInputData("countries")}
              >
                {coursesCountry?.map((elem) => {
                  return (
                    <option key={elem.value} value={elem.value}>
                      {elem.label}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
        </div>
        <div className="filter-item">
          <p>English Test</p>
          <Radio.Group
            onChange={(e) => handleInputData("englishExam")(e.target.value)}
            value={formData?.englishExam}
          >
            <Space direction="vertical">
              {englishExams.map((exam, index) => {
                return (
                  <Radio key={index} value={exam.key}>
                    {exam.label}
                  </Radio>
                );
              })}
            </Space>
          </Radio.Group>
        </div>
        {formData?.englishExam !== undefined &&
          formData?.englishExam !== "na" && (
            <div className="filter-item">
              <p>Marks</p>
              <FormGroup>
                <div className="d-flex gx-2">
                  <div className="col-6">
                    <p style={{ fontSize: "12px", color: "#454545" }}>
                      Marks Obtained
                    </p>
                    <InputNumber
                      className="col-11"
                      width="95%"
                      max={
                        englishExams.find(
                          (exam) => exam.key === formData?.englishExam
                        )?.maxMarks
                      }
                      min={
                        englishExams.find(
                          (exam) => exam.key === formData?.englishExam
                        )?.minMarks
                      }
                      onChange={handleInputData("englishExamScore")}
                      value={formData?.englishExamScore}
                    />
                  </div>

                  <div className="col-6">
                    <p style={{ fontSize: "13px", color: "#454545" }}>
                      Total Marks
                    </p>
                    <InputNumber
                      className="col-11"
                      width={"95%"}
                      disabled={true}
                      value={
                        englishExams.find(
                          (exam) => exam.key === formData?.englishExam
                        )?.maxMarks
                      }
                    />
                  </div>
                </div>
              </FormGroup>
            </div>
          )}

        {formData.degree === "Undergraduate" ? (
          <div className="filter-item">
            <p>Aptitude Test</p>
            <Radio.Group
              onChange={(e) => handleInputData("academicExam")(e.target.value)}
              value={formData?.academicExam}
            >
              <Space direction="vertical">
                {AcademicExams.map((exam, index) => {
                  return (
                    <Radio key={index} value={exam.key}>
                      {exam.label}
                    </Radio>
                  );
                })}
              </Space>
            </Radio.Group>
          </div>
        ) : (
          <div className="filter-item">
            <p>Aptitude Test</p>
            <Radio.Group
              onChange={(e) => handleInputData("academicExam")(e.target.value)}
              value={formData?.academicExam}
            >
              <Space direction="vertical">
                {PostAcademicExams.map((exam, index) => {
                  return (
                    <Radio key={index} value={exam.key}>
                      {exam.label}
                    </Radio>
                  );
                })}
              </Space>
            </Radio.Group>
          </div>
        )}
        {formData?.degree == "Undergraduate" && (
          <div className="filter-item">
            <p>Marks</p>
            <FormGroup>
              <div className="d-flex gx-2">
                <div className="col-6">
                  <p style={{ fontSize: "12px", color: "#454545" }}>
                    Marks Obtained
                  </p>
                  <InputNumber
                    className="col-11"
                    width="95%"
                    max={
                      AcademicExams.find(
                        (exam) => exam.key === formData?.academicExam
                      )?.maxMarks
                    }
                    min={
                      AcademicExams.find(
                        (exam) => exam.key === formData?.academicExam
                      )?.minMarks
                    }
                    onChange={handleInputData("academicExamScore")}
                    value={formData?.academicExamScore}
                  />
                </div>

                <div className="col-6">
                  <p style={{ fontSize: "13px", color: "#454545" }}>
                    Total Marks
                  </p>
                  <InputNumber
                    className="col-11"
                    width={"95%"}
                    disabled={true}
                    value={
                      AcademicExams.find(
                        (exam) => exam.key === formData?.academicExam
                      )?.maxMarks
                    }
                  />
                </div>
              </div>
            </FormGroup>
          </div>
        )}
        <div className="filter-btn-bar">
          <Button onClick={() => showFilter(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="success">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UniversitySearchFilter;
