import React, { useContext, useEffect, useState } from "react";
import "./LoanMultiStepForm.css";
import MainBanner from "./MainBanner";
import StepOne from "../universityFinder/StepOne";
import LoadingBar from "react-top-loading-bar";
import StatusOfAd from "./StatusOfAd";
import PlannedUniversity from "./PlannedUniversity";
import ProgramStartDate from "./ProgramStartDate";
import LoanRange from "./LoanRange";
import FinancialInstitute from "./FinancialInstitute";
import LoanBefore from "./LoanBefore";
import LoanActive from "./LoanActive";
import TypeOfLoan from "./TypeOfLoan";
import CibilScore from "./CibilScore";
import LastScore from "./LastScore";
import StepFour from "../universityFinder/StepFour";
import StepFive from "../universityFinder/StepFive";
import UserInfo from "./UserInfo";
import { MainSiteContext } from "../../context/MainSiteContext";
import Loans from "../loans/Loans";

function LoanMultiStepForm() {
  const [step, setstep] = useState(1);
  const [progress, setProgress] = useState(0);
  const { state } = useContext(MainSiteContext);
  const { user, profile } = state;

  //state for form data
  const [formData, setFormData] = useState({
    countries: "",
    statusOfAdmission: "",
    plannedUniversity: "",
    startDate: "",
    loanAmount: {
      min: 0,
      max: 0,
    },
    loanType: "",
    paymentDeadline: "",
    touchWithFinancialInstitution: "",
    loanBefore: "",
    loanActive: "",
    previousLoanType: "",
    cibilOf: "",
    cibilScore: 0,
    jobType: "",
    lastExam: "",
    lastExamScore: 0,
    englishExam: "",
    englishExamScore: "",
    academicExam: "",
    academicExamScore: "",
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
    setFormData((prevFormData) => {
      const updatedMajors = isChecked
        ? [...prevFormData.majors, major]
        : prevFormData.majors.filter((m) => m !== major);

      return {
        ...prevFormData,
        majors: updatedMajors,
      };
    });
  };

  // function for going to next step by increasing step state by 1
  const nextStep = (skip) => {
    console.log(skip);
    if (skip) {
      setstep(step + 1 + skip);
    } else {
      setstep(step + 1);
    }
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
    //   console.log(e?.target?.value);
    console.log(e?.target?.type);
    if (e?.target?.type === "number") {
      const { value } = e.target;

      setFormData((prevState) => ({
        ...prevState,
        [input]: value,
      }));
    } else if (e?.target?.type !== "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [input]: e,
      }));
    } else {
      const { value } = e.target;
      //         if (input === "loanAmount") {
      //             const selectedLoanRange = e.target.value;
      // console.log(selectedLoanRange)

      //             if (!selectedLoanRange) {
      //                 console.error("Selected loan range not found");
      //                 return;
      //             }

      //             const { min, max } = selectedLoanRange.key;
      //             const updatedLoanAmount = checked ? { min, max } : { min: 0, max: 0 };

      //             setFormData((prevState) => ({
      //                 ...prevState,
      //                 [input]: updatedLoanAmount,
      //             }));
      //         } else {
      //updating for data state taking previous state and then adding new value to create new object
      setFormData((prevState) => ({
        ...prevState,
        [input]: value,
      }));
      // }
    }
  };
  
  switch (step) {
    case 1:
      return <MainBanner nextStep={nextStep} />;

    // case 1:
    //   return (
    //     <div className="universityFinder-index-section">
    //       <div className="universityFinder-index mt-5 container-xl">
    //         <UserInfo />
    //       </div>
    //     </div>
    //     )
    case 2:
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
              loan={true}
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
              progress={20}
              onLoaderFinished={() => setProgress(0)}
            />
            <StatusOfAd
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
              progress={30}
              onLoaderFinished={() => setProgress(0)}
            />
            <PlannedUniversity
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
              progress={40}
              onLoaderFinished={() => setProgress(0)}
            />
            <ProgramStartDate
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
              progress={50}
              onLoaderFinished={() => setProgress(0)}
            />
            <LoanRange
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
              progress={60}
              onLoaderFinished={() => setProgress(0)}
            />
            <LoanBefore
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
              progress={65}
              onLoaderFinished={() => setProgress(0)}
            />
            <LoanActive
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
    case 9:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={70}
              onLoaderFinished={() => setProgress(0)}
            />
            <TypeOfLoan
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
    case 10:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={75}
              onLoaderFinished={() => setProgress(0)}
            />
            <CibilScore
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
    case 11:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={80}
              onLoaderFinished={() => setProgress(0)}
            />
            <LastScore
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
    case 12:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={85}
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
    case 13:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={90}
              onLoaderFinished={() => setProgress(0)}
            />
            <StepFive
              nextStep={nextStep}
              prevStep={prevStep}
              handleFormData={handleInputData}
              values={formData}
              loan={true}
            />
          </div>
          <img
            className="contries-bottom"
            src="assets/graphic/bottomcontries.svg"
          />
        </div>
      );
    case 14:
      return (
        <div className="universityFinder-index-section">
          <div className="universityFinder-index mt-5 container-xl">
            <LoadingBar
              color="#5d0cfd"
              progress={95}
              onLoaderFinished={() => setProgress(0)}
            />
            <FinancialInstitute
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
    //   case 7:
    //     return <Final values={formData} />;
    // default case to show nothing
    default:
      return (
        <div>
          <h1>Wrong route</h1>
        </div>
      );
  }
}

export default LoanMultiStepForm;
