import React, {useState, useEffect} from "react";
import { Form, Card, Button } from "react-bootstrap";
import { Checkbox } from "antd";
import { useNavigate } from "react-router";

const status = [
    {
      label: "Study",
      key: "study",
    },
    {
      label: "Tourist",
      key: "tourist",
    },
];


function VisaType({ nextStep, handleFormData, prevStep, values }) {
    const [error, setError] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (values.visaRejected === "") {
          setError(true);
        }
        else {
          setError(false);
        }
    }, [values])
    
    const submitFormData = (e) => {
        e.preventDefault();
        navigate("/profile")
       
    };

  return (
    <Form onSubmit={submitFormData}  className="w-100 ">
    <div className="step-2-div mt-2 m-auto">
        <h4>Which visa you want to apply ?</h4>
        
        <div className="degree-div row d-flex justify-content-center">
    {status.map((st, index) => {
      return (
        <div key={index} className="mt-2 col-12 col-lg-3">
          <label style={{cursor:"pointer"}}
            htmlFor={st.key}
            className={
              values.visaRejected === st.key
                ? "plannedUniversity-card card active"
                : "plannedUniversity-card card "
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
              checked={values.visaRejected === st.key}
              onChange={handleFormData("visaRejected")}
              id={st.key}
            ></Checkbox>

            <p>{st.label}</p>
          </label>
        </div>
      );
    })}
    
        </div>
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
            Submit
        </Button>
        }
</div>
</div>
</Form>
  )
}

export default VisaType
