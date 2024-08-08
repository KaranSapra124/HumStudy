import { useContext, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepZero from "./StepZero";
import "./UniversityFinder.css";
import { useEffect } from "react";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import LoadingBar from "react-top-loading-bar";
import {
  MAIN_SITE_ACTIONS,
  MainSiteContext,
} from "../../context/MainSiteContext";
import { useNavigate } from "react-router";
import { userMethod } from "../../userMethods/userMethod";

function MultiStepForm() {
  const {
    // state: { unisFilter },
    dispatch,
  } = useContext(MainSiteContext);
  //state for steps
  const { state } = useContext(MainSiteContext);
  // console.log(state, "STATE");
  const { user, profile } = state;

  const navigate = useNavigate();
  const [step, setstep] = useState(1);
  const [progress, setProgress] = useState(30);
  //state for form data
  const [formData, setFormData] = useState(profile?.uniFilters);

  // console.log(formData);
  const handleCountryChange = (country, isChecked) => {
    setFormData((prevFormData) => {
      const updatedCountries = isChecked
        ? [...prevFormData.countries, country]
        : prevFormData.countries.filter((c) => c !== country);

      return {
        ...prevFormData,
        countries: updatedCountries,
      };
    });
  };
  const handleMajorChange = (major, isChecked, type) => {
    if (type == "select" && isChecked) {
      console.log(major, "SELECT");
      setFormData((prevState) => ({
        ...prevState,
        majors: [...prevState.majors,major],
      }));
    } else {
      setFormData((prevFormData) => {
        console.log(major, "MAJORSMAJOR");
        const updatedMajors = isChecked
          ? major
          : prevFormData.majors.filter((m) => m !== major);

        return {
          ...prevFormData,
          majors: updatedMajors,
        };
      });
    }
  };
  // const handleMajorSelectChange = (major, isChecked, type) => {
  //   if (type == "select" && isChecked) {
  //     console.log(major, "SELECT");
  //     setFormData((prevState) => ({
  //       majors: [...prevState, major],
  //     }));
  //   }
  // };

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
    // console.log("Next clicked");
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = (skip) => {
    if (skip) {
      setstep(step - skip - 1);
    } else {
      setstep(step - 1);
    }
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = (input) => (e) => {
    // input value from the form

    // console.log(e);

    const { value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const submitFormData = (e) => {
    e.preventDefault();

    dispatch({ type: MAIN_SITE_ACTIONS.SET_UNISFILTERS, payload: formData });
    // checking if value of first name and last name is empty show error else take to next step
    userMethod("/add-uni-filters", formData, null, null);
    navigate("/search-university");
  };
  // useEffect(() => {
  //   if (!user?.isLogin) {
  //     navigate("/login");
  //   }
  // }, []);

  switch (step) {
    case 1:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={0}
              onLoaderFinished={() => setProgress(0)}
            />
            <StepZero nextStep={nextStep} />
          </div>
          <img
            className="contries-bottom"
            src="assets/graphic/bottomcontries.svg"
          />
        </div>
      );
    case 2:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={20}
              onLoaderFinished={() => setProgress(0)}
            />
            <StepOne
              onCountryChange={handleCountryChange}
              nextStep={nextStep}
              prevStep={prevStep}
              handleFormData={handleInputData}
              values={formData}
            />
          </div>
          <img
            className="contries-bottom"
            src="assets/graphic/bottomcontries.svg"
          />
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 3:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={40}
              onLoaderFinished={() => setProgress(0)}
            />
            <StepTwo
              nextStep={nextStep}
              prevStep={prevStep}
              handleFormData={handleInputData}
              values={formData}
            />
          </div>
          <img
            className="contries-bottom"
            src="assets/graphic/bottomcontries.svg"
          />
        </div>
      );
    case 4:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={60}
              onLoaderFinished={() => setProgress(0)}
            />
            <StepThree
              onMajorChange={handleMajorChange}
              nextStep={nextStep}
              prevStep={prevStep}
              handleFormData={handleInputData}
              values={formData}
            />
          </div>
          <img
            className="contries-bottom"
            src="assets/graphic/bottomcontries.svg"
          />
        </div>
      );
    case 5:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={75}
              onLoaderFinished={() => setProgress(0)}
            />
            <StepFour
              nextStep={nextStep}
              prevStep={prevStep}
              handleFormData={handleInputData}
              values={formData}
            />
          </div>
          <img
            className="contries-bottom"
            src="assets/graphic/bottomcontries.svg"
          />
        </div>
      );
    case 6:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={95}
              onLoaderFinished={() => setProgress(0)}
            />
            <StepFive
              nextStep={nextStep}
              prevStep={prevStep}
              handleFormData={handleInputData}
              values={formData}
              handleSubmit={submitFormData}
            />
          </div>
          <img
            className="contries-bottom"
            src="assets/graphic/bottomcontries.svg"
          />
        </div>
      );
    // Only formData is passed as prop to show the final value at form submit

    default:
      return (
        <div>
          <h1>Wrong route</h1>
        </div>
      );
  }
}

export default MultiStepForm;
