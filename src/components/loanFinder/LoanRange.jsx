import React from "react";
import "./LoanMultiStepForm.css";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import { FormControlLabel } from "@mui/material";
import { Checkbox, DatePicker } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Radio, Select, Space } from "antd";
import { useState } from "react";
import { useEffect } from "react";

const loanRange = [
  {
    label: "Rs 8Lacs - Rs 20Lacs",
    key: {
      min: 800000,
      max: 2000000,
    },
  },
  {
    label: "Rs 20Lacs+",
    key: {
      min: 2000001,
      max: 10000000,
    },
  },
];

const loanTypes = [
  {
    label: "Secured",
    key: "secured",
  },
  {
    label: "Unsecured",
    key: "unsecured",
  },
];

function LoanRange({ nextStep, handleFormData, prevStep, values }) {
  const [error, setError] = useState(true);

  const submitFormData = (e) => {
    e.preventDefault();

    nextStep();
  };

  useEffect(() => {
    if (values.loanAmount.min === 0 || values.loanAmount.max === 0 || values.loanType==="" || values.paymentDeadline==="") {
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
      <h4>Almost there! Select your Loan Range, Type & Payment Schedule?</h4>
      <h5 className="mt-3">Select Loan Range</h5>
      <div className="row mt-1 d-flex justify-content-center w-100">
        {loanRange.map((loan, index) => {
          return (
            <div key={index} className="mt-2 col-12 col-sm-6 col-lg-3">
              <div
                className={
                  JSON.stringify(values.loanAmount) === JSON.stringify(loan.key)
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
                  }}
                  type="checkbox"
                  // checked
                  value={loan.key}
                  checked={
                    JSON.stringify(values.loanAmount) ===
                    JSON.stringify(loan.key)
                  }
                  onChange={handleFormData("loanAmount")}
                  id={loan.label}
                ></Checkbox>
                <label htmlFor={loan.label}>
                  <h5>{loan.label}</h5>
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <h5 className="mt-5">Select Loan Type</h5>
      <div className="row mt-1 d-flex justify-content-center w-100">
        {loanTypes.map((ltype, index) => {
          return (
            <div key={index} className="mt-2 col-12 col-sm-6 col-lg-3">
              <div
                className={
                  values.loanType === ltype.key
                    ? "plannedUniversity-card card active h-100"
                    : "plannedUniversity-card card  h-100"
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
                  value={ltype.key}
                  checked={values.loanType === ltype.key}
                  onChange={handleFormData("loanType")}
                  id={ltype.key}
                ></Checkbox>
                <label htmlFor={ltype.key}>
                  <h5>{ltype.label}</h5>
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <h5 className="mt-5">Select your university Payment Deadline</h5>
      <div className="row mt-1 d-flex justify-content-center w-100">
        <div className="mt-2 col-12 col-sm-6 col-lg-2 datepicker-card card">
              <DatePicker
                className="datepicker"
                id="paymentDeadline"
                onChange={(date, dateString) =>
                  handleFormData("paymentDeadline")(dateString)
                }
                onOk={() => setError(false)}
              />
              {/* <input type="date" onChange={handleFormData("startDate")}/> */}
        </div>
      </div>
      {/* <p className='prev'><ArrowBackIosIcon fontSize='small'/> prev </p> */}
      <div
        className="mt-4"
        style={{
          display: "flex",
          gap: "0 15px",
            justifyContent: "center",
          zIndex:999
        }}
      >
        <Button variant="outlined" onClick={()=>prevStep(0)}>
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

export default LoanRange;
