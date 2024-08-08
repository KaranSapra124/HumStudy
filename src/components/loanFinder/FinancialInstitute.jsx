import React, { useState, useEffect } from "react";
import "./LoanMultiStepForm.css";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router";
import { userMethod } from "../../userMethods/userMethod";

const FinancialInstitutions = [
  {
    label: "Yes",
    key: "yes",
  },
  {
    label: "No",
    key: "no",
  },
];

function FinancialInstitute({ nextStep, handleFormData, prevStep, values }) {
  const [error, setError] = useState(true);
  const navigate = useNavigate();

  const submitFormData = (e) => {
    e.preventDefault();

    userMethod("/add-loan-info", { loanData: values }, null, null);
    navigate("/loans");
  };

  useEffect(() => {
    if (values.statusOfAdmission === "") {
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
        Are you already in touch with any <span>financial institutions</span>
      </h4>
      <div className="row mt-1 d-flex justify-content-center w-100 ">
        {FinancialInstitutions.map((fi, index) => {
          return (
            <div key={index} className="mt-2 col-12 col-sm-6 col-lg-3">
              <div
                className={
                  values.touchWithFinancialInstitution === fi.key
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
                  value={fi.key}
                  checked={values.touchWithFinancialInstitution === fi.key}
                  onChange={handleFormData("touchWithFinancialInstitution")}
                  id={fi.key}
                ></Checkbox>
                <label htmlFor={fi.key}>
                  <h5>{fi.label}</h5>
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
            Submit
          </Button>
        )}
      </div>
    </form>
  );
}

export default FinancialInstitute;
