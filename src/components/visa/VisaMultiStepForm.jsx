import React, { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import StepZero from "../universityFinder/StepZero";
import StepOne from "../universityFinder/StepOne";
import StepTwo from "../universityFinder/StepTwo";
import StepThree from "../universityFinder/StepThree";
import StepFour from "../universityFinder/StepFour";
import StepFive from "../universityFinder/StepFive";
import OfferFromUniversity from "./OfferFromUniversity";
import VisaRejected from "./VisaRejected";
import VisaType from "./VisaType";

function VisaMultiStepForm() {
  const [step, setstep] = useState(1);
  const [progress, setProgress] = useState(30);
  //state for form data
  const [formData, setFormData] = useState({
    countries: [],
    degree: "",
    majors: [],
    englishExam: "",
    englishExamScore: "",
    academicExam: "",
    academicExamScore: "",
    offerFromUniversity: "",
    visaRejected: "",
  });

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
    if (type === "select") {
      setFormData((prevState) => ({
        majors: major.flat(),
      }));
    } else {
      setFormData((prevFormData) => {
        const updatedMajors = isChecked
          ? [...prevFormData.majors, major]
          : prevFormData.majors.filter((m) => m !== major);

        return {
          ...prevFormData,
          majors: updatedMajors,
        };
      });
    }
  };
  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = (input) => (e) => {
    // input value from the form

    console.log(e);

    const { value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
    };
    useEffect(() => {
        console.log(formData);
    },[formData])

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
    console.log("Next clicked");
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = (skip) => {
    if (skip) {
      setstep(step - skip - 1);
    } else {
      setstep(step - 1);
    }
  };

  switch (step) {
    case 1:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={10}
              onLoaderFinished={() => setProgress(0)}
            />
            <StepOne
              onCountryChange={handleCountryChange}
              nextStep={nextStep}
              prevStep={prevStep}
              handleFormData={handleInputData}
                      values={formData}
                      visa={true}
            />
          </div>
          <img
            className="contries-bottom"
            src="assets/graphic/bottomcontries.svg"
          />
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={20}
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
    case 3:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={35}
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
    case 4:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={45}
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
    case 5:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={55}
              onLoaderFinished={() => setProgress(0)}
            />
            <StepFive
              nextStep={nextStep}
              prevStep={prevStep}
              handleFormData={handleInputData}
              values={formData}
              visa={true}
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
              progress={65}
              onLoaderFinished={() => setProgress(0)}
            />
            <OfferFromUniversity
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
    case 7:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={80}
              onLoaderFinished={() => setProgress(0)}
            />
            <VisaRejected
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
    case 8:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={95}
              onLoaderFinished={() => setProgress(0)}
            />
            <VisaType
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
    // Only formData is passed as prop to show the final value at form submit

    default:
      return (
        <div>
          <h1>Wrong route</h1>
        </div>
      );
  }
}

export default VisaMultiStepForm;
