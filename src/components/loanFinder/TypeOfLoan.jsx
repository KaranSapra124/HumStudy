import React, {useState, useEffect} from 'react'
import "./LoanMultiStepForm.css";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const typeOfLoan = [
    {
        label: "Home Loan",
        key:"home loan",
    },
    {
        label: "Business Loan",
        key:"Business loan",
    },
    {
        label: "Personal Loan",
        key:"Personal loan",
    },
    {
        label: "Bike or Car Loan",
        key:"Bike or Car loan",
    },

]

function TypeOfLoan({nextStep, handleFormData, prevStep, values}) {

    const [error, setError] = useState(true);

    const submitFormData = (e) => {
      e.preventDefault();
  
      nextStep();
      };
      
      useEffect(() => {
          if (values.previousLoanType === "" ) {
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
    <h4>What Type of <span>Loan</span></h4>
    <div className="row mt-1 d-flex  w-100 ">
      {typeOfLoan.map((item, index) => {
        return (
          <div key={index} className="mt-2 col-12 col-sm-6 col-lg-3">
            <div
              className={
                values.previousLoanType === item.key
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
                value={item.key}
                checked={values.previousLoanType === item.key}
                onChange={handleFormData("previousLoanType")}
                id={item.key}
              ></Checkbox>
              <label htmlFor={item.key}>
                <h5>{item.label}</h5>
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

export default TypeOfLoan
