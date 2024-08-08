import React, { useEffect, useState } from "react";
import "./LoanMultiStepForm.css";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const status = [
  {
    label: "Confirmed",
    desc: "University Admission Confirmed",
    key: "confirmed",
  },
  {
    label: "Applied",
    desc: "Applied to University & awaiting response",
    key: "applied",
  },
  {
    label: "Not Applied yet",
    desc: "Planning o Apply soon",
    key: "Not Applied",
  },
];

function StatusOfAd({nextStep, handleFormData, prevStep, values}) {

    const [error, setError] = useState(true);

  const submitFormData = (e) => {
    e.preventDefault();

    nextStep();
    };
    
    useEffect(() => {
        if (values.statusOfAdmission === "" ) {
          setError(true);
        }
        else {
          setError(false);
        }
    },[values])
  

  return (
    <form
      onSubmit={submitFormData}
      className="p-1 w-100 d-flex flex-column align-items-center"
    >
      <h4>What's your current status of Admission ?</h4>
      <div className="row mt-1 ">
        {status.map((st, index) => {
          return (
            <div key={index} className="mt-2 col-12 col-sm-6 col-lg-4">
              <div
                className={
                  values.statusOfAdmission === st.key
                    ? "statusOfAd-card card active h-100"
                    : " statusOfAd-card card  h-100 "
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
                  checked={values.statusOfAdmission === st.key}
                  onChange={handleFormData("statusOfAdmission")}
                  id={st.key}
                ></Checkbox>
                <label htmlFor={st.key}>
                  <h5>{st.label}</h5>
                  <p>{st.desc}</p>
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
    // </div>
  );
}

export default StatusOfAd;
