import React, { useEffect, useState } from "react";
import "./LoanMultiStepForm.css";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Radio, Select, Space } from "antd";
import { fetchAllData } from "../../adminPanel/methods/commonMethod";

// const options = [
//   {
//     value: "harvard",
//     label: "Harvard University",
//   },
//   {
//     value: "stanford",
//     label: "Stanford University",
//   },
//   {
//     value: "mit",
//     label: "Massachusetts Institute of Technology (MIT)",
//   },
//   {
//     value: "oxford",
//     label: "University of Oxford",
//   },
//   {
//     value: "cambridge",
//     label: "University of Cambridge",
//   },
//   {
//     value: "tokyo",
//     label: "University of Tokyo",
//   },
//   {
//     value: "sydney",
//     label: "University of Sydney",
//   },
//   {
//     value: "toronto",
//     label: "University of Toronto",
//   },
//   {
//     value: "paris",
//     label: "Sorbonne University, Paris",
//   },
//   // Add more options as needed
// ];

// const plannedUniversities = [
//   {
//     label: "Hochschule Bremen",
//     key: "hochschule Bremen",
//   },
//   {
//     label: "Goethe Universitaet Frankfurt",
//     key: "goethe Universitaet Frankfurt",
//   },
//   {
//     label: "Berlin School Of Business And Innovation",
//     key: "Berlin School Of Business And Innovation",
//   },
//   {
//     label: "Hertie School Of Governance Berlin",
//     key: "Hertie School Of Governance Berlin",
//   },
//   {
//     label: "Technische Universitaet Berlin",
//     key: "Technische Universitaet Berlin",
//   },
//   {
//     label: "Universitaet Erlangen Nuernberg",
//     key: "Universitaet Erlangen Nuernberg",
//   },
// ];

function PlannedUniversity({ nextStep, handleFormData, prevStep, values }) {
 const [error, setError] = useState(true);
  const [plannedUniversities, setPlannedUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const submitFormData = (e) => {
    e.preventDefault();

    nextStep();
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    console.log(value, "VALUEEE");
    handleFormData("plannedUniversity");
  };

  useEffect(() => {
    fetchAllData(
      `university/get-by-country?country=${values.countries}`,
      setPlannedUniversities,
      setIsLoading
    );
  }, []);

  useEffect(() => console.log(values), [values]);

  useEffect(() => {
    if (values.plannedUniversity === "") {
      setError(true);
      console.log("VALUE");
    } else {
      setError(false);
    }
  }, [values]);

  useEffect(() => console.log(plannedUniversities), [plannedUniversities]);

  return (
    <form
      onSubmit={submitFormData}
      className="p-1 w-100 d-flex flex-column align-items-center"
    >
      <h4>Which University are you Planning to attend ?</h4>
      <Select
        size="large"
        //   value={options.values}
        placeholder="Find University"
        //   onChange={handleFormData("plannedUniversity")}
        style={{
          minWidth: "300px",
        }}
        options={plannedUniversities.map((uni) => ({
          label: uni.universityName,
          value: uni.universityName,
        }))}
        onChange={(value) => handleFormData("plannedUniversity")(value)}
      />
      <div
        className="row mt-1 d-flex"
        style={{ height: "20rem", overflowY: "scroll" }}
      >
        {plannedUniversities.length !== 0 &&
          plannedUniversities.map((uni, index) => {
            return (
              <div key={index} className="mt-2 col-12 col-sm-6 col-lg-3">
                <div
                  className={
                    values.plannedUniversity === uni.universityName
                      ? "plannedUniversity-card card active h-100"
                      : " plannedUniversity-card card  h-100 "
                  }
                >
                  <Checkbox
                    style={{
                      position: "absolute",
                      top: "-5px",
                      left: "-5px",
                      border: "none",
                      textAlign: "center",
                    }}
                    type="checkbox"
                    // checked
                    value={uni.universityName}
                    checked={values.plannedUniversity == uni.universityName}
                    onChange={(value) =>
                      handleFormData("plannedUniversity")(value)
                    }
                  ></Checkbox>
                  <label htmlFor={uni.key}>
                    <h5>{uni.universityName}</h5>
                  </label>
                </div>
              </div>
            );
          })}
      </div>
      {/* <p className='prev'><ArrowBackIosIcon fontSize='small'/> prev </p> */}
      <div
        className="mt-3"
        style={{
          display: "flex",
          gap: "0 15px",
          justifyContent: "center",
        }}
      >
        <Button variant="outlined" onClick={() => prevStep(0)}>
          Previous
        </Button>

        {!error && (
          <Button className="nextBtn" variant="primary" type="submit">
            Next
          </Button>
        )}
      </div>
    </form>
  );
}

export default PlannedUniversity;
