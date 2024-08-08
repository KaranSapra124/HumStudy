import React, {useState, useEffect} from 'react'
import "./LoanMultiStepForm.css";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const loanBefore = [
    {
        label:"Yes I have Taken",
        key:"Yes I have Taken",
    },
    {
        label:"Not Taken",
        key:"na",
    },
    {
        label:"My Mother Taken",
        key:"My Mother Taken",
    },
    {
        label:"My Father Taken",
        key:"My Father Taken",
    },
    {
        label:"My Sister Taken",
        key:"My Sister Taken",
    },
    {
        label:"My Brother Taken",
        key:"My Brother Taken",
    },
]

function LoanBefore({nextStep, handleFormData, prevStep, values}) {
   
    const [error, setError] = useState(true);

  const submitFormData = (e) => {
      e.preventDefault();

      if (values.loanBefore === 'na') {
          nextStep(2);
      } else {
          nextStep();
    }
    };

    
    
    useEffect(() => {
        if (values.loanBefore === "" ) {
          setError(true);
        }
        else {
          setError(false);
        }
    }, [values])
    
  return (
    <form
    onSubmit={submitFormData}
    className="p-1 w-100 d-flex flex-column align-items-center"
  >
    <h4>Have you taken <span>Loan Before ?</span></h4>
    <div className="row mt-1 d-flex  w-100 ">
      {loanBefore.map((lb, index) => {
        return (
          <div key={index} className="mt-2 col-12 col-sm-6 col-lg-4">
            <div
              className={
                values.loanBefore === lb.key
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
                value={lb.key}
                checked={values.loanBefore === lb.key}
                onChange={handleFormData("loanBefore")}
                id={lb.key}
              ></Checkbox>
              <label htmlFor={lb.key}>
                <h5>{lb.label}</h5>
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
      <Button variant="outlined" onClick={()=>prevStep(0)}>
        Previous
      </Button>

            {!error && <Button className="nextBtn" variant="primary" type="submit">
                Next
            </Button>
            }
    </div>
  </form>
  )
}

export default LoanBefore
