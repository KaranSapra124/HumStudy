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

const starts = [
  {
    label: "Jan 2024",
    key: new Date("2024-01-01"),
  },
  {
    label: "Sept 2024",
    key: new Date("2024-09-01"),
  },
];

function ProgramStartDate({ nextStep, handleFormData, prevStep, values }) {
  const [error, setError] = useState(true);

  const submitFormData = (e) => {
    e.preventDefault();

    nextStep();
  };

  useEffect(() => {
    if (values.startDate === "") {
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
      <h4>What's your intended Program Start Date?</h4>
      <div className="row  w-100 mt-1 d-flex justify-content-center align-items-center">
        {starts.map((st, index) => {
          return (
            <div key={index} className="mt-2 col-12 col-sm-6 col-lg-4 col-xl-3">
              <div
                className={
                  values.startDate === st.key
                    ? "programStart-card card active h-100"
                    : "programStart-card card  h-100 "
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
                  value={st.key}
                  checked={values.startDate === st.key}
                  onChange={handleFormData("startDate")}
                  id={st.key}
                ></Checkbox>
                <label htmlFor={st.key}>
                  <h5>{st.label}</h5>
                </label>
              </div>
            </div>
          );
        })}
        <div className="mt-4" style={{ textAlign: "center" }}>
          <h4>Or</h4>
        </div>
        <div className="datepicker-card card col-12 col-sm-6 col-lg-4 col-xl-3" style={{ width: "fit-content" }}>
          <h6>Select Date</h6>
                  <DatePicker className="datepicker " id="startDate"
                       onChange={(date, dateString) => handleFormData("startDate")(dateString)}
                      onOk={() => setError(false)} />
        {/* <input type="date" onChange={handleFormData("startDate")}/> */}
              </div>
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

export default ProgramStartDate;
