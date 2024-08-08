import React, { useState, useEffect } from "react";
import "./LoanMultiStepForm.css";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const loanActive = [
  {
    label: "Yes",
    key: "yes",
  },
  {
    label: "No",
    key: "no",
  },
];

function LoanActive({ nextStep, handleFormData, prevStep, values }) {
  const [error, setError] = useState(true);

  const submitFormData = (e) => {
    e.preventDefault();

    nextStep();
    if (values.loanActive === "no") {
      nextStep(1);
    } else {
      nextStep();
    }
  };

  useEffect(() => {
    if (values.loanActive === "") {
      setError(true);
    } else {
      setError(false);
    }
  }, [values]);

  return (
    <form
      onSubmit={submitFormData}
      className="p-1 w-100 d-flex flex-column align-items-center"
    >
      <h4>
        Is this <span>Loan Active</span>
      </h4>
      <div className="row mt-1 d-flex justify-content-center w-100 ">
        {loanActive.map((la, index) => {
          return (
            <div key={index} className="mt-2 col-12 col-sm-6 col-lg-3">
              <div
                className={
                  values.loanActive === la.key
                    ? "plannedUniversity-card card active h-100"
                    : "plannedUniversity-card card  h-100 "
                }
              >
                <Checkbox
                  style={{
                    position: "absolute",
                    top: "-5px",
                    left: "-5px",
                    border: "none",
                  }}
                  type="checkbox"
                  // checked
                  value={la.key}
                  checked={values.loanActive === la.key}
                  onChange={handleFormData("loanActive")}
                  id={la.key}
                ></Checkbox>
                <label htmlFor={la.key}>
                  <h5>{la.label}</h5>
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

export default LoanActive;
