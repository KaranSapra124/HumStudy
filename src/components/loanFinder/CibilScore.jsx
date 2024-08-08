import React from 'react'
import "./LoanMultiStepForm.css";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import { FormControlLabel } from "@mui/material";
import { Checkbox, DatePicker } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Radio, Select, Space } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import LoanActive from './LoanActive';

const persons = [
    {
        label: "Mother/Father",
        key:"mother/father",
    },
    {
        label: "My/Student",
        key:"student",
    },
]
const cibilScores = [
    {
        label: "Below 700",
        key:699,
    },
    {
        label: "Above 700+",
        key:749,
    },
    {
        label: "Above 750",
        key:799,
    },
    {
        label: "Above 800",
        key:900,
    },
]

const jobTypes = [
    {
        label: "Government",
        key:"government",
    },
    {
        label: "Private",
        key:"private",
    },
    {
        label: "Not Employed",
        key:"na",
    },
]

function CibilScore({ nextStep, handleFormData, prevStep, values }) {

    const [error, setError] = useState(true);

    const submitFormData = (e) => {
      e.preventDefault();
  
      nextStep();
    };

    const sendToBack = () => {
        if (values.loanBefore === 'na') {
            prevStep(2);
        } else {
            if (values.loanActive === 'no') {
                prevStep(1);
            }
            else {
                prevStep(0);
            }
        }
    }
  
    useEffect(() => {
      if (values.cibilOf === "" ||  values.cibilScore===0 || values.jobType==="") {
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
      <h4>What is your or your parent's <span>CIBIL Score</span></h4>
      <div className="row mt-1 d-flex justify-content-center w-100">
        {persons.map((person, index) => {
          return (
            <div key={index} className="mt-2 col-12 col-sm-6 col-lg-3">
              <div
                className={
                  values.cibilOf === person.key
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
                  value={person.key}
                  checked={
                  values.cibilOf === person.key
                  }
                  onChange={handleFormData("cibilOf")}
                  id={person.label}
                ></Checkbox>
                <label htmlFor={person.label}>
                  <h5>{person.label}</h5>
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <h5 className="mt-5">Select Score</h5>
      <div className="row mt-1 d-flex justify-content-center w-100">
        {cibilScores.map((score, index) => {
          return (
            <div key={index} className="mt-2 col-12 col-sm-6 col-lg-3">
              <div
                className={
                  values.cibilScore === score.key
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
                  value={score.key}
                  checked={values.cibilScore === score.key}
                  onChange={handleFormData("cibilScore")}
                  id={score.key}
                ></Checkbox>
                <label htmlFor={score.key}>
                  <h5>{score.label}</h5>
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <h5 className="mt-5">Select Job Type</h5>
      <div className="row mt-1 d-flex justify-content-center w-100">
        {jobTypes.map((type, index) => {
          return (
            <div key={index} className="mt-2 col-12 col-sm-6 col-lg-3">
              <div style={{zIndex:999}}
                className={
                  values.jobType === type.key
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
                  value={type.key}
                  checked={values.jobType === type.key}
                  onChange={handleFormData("jobType")}
                  id={type.key}
                ></Checkbox>
                <label htmlFor={type.key}>
                  <h5>{type.label}</h5>
                </label>
              </div>
            </div>
          );
        })}
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
        <Button variant="outlined" onClick={sendToBack}>
          Previous
        </Button>

        {!error && (
          <Button className="nextBtn" variant="primary" type="submit">
            Next
          </Button>
        )}
      </div>
    </form>
  )
}

export default CibilScore
