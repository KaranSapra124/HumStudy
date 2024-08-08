import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Checkbox } from "antd";
import { coursesLevel } from "../../utils/data";


const degrees = coursesLevel?.map((item)=>({label:item.label,icon:"graduated.png",key:item.value})) 


// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step
      nextStep();
  };

  useEffect(() => {
    if (values.degree === "") {
        setError(true)
    } else {
      setError(false);
    }
  }, [values])
  
  return (
    <Form onSubmit={submitFormData} className="w-100 ">
      <div className="step-2-div mt-2 m-auto">
        <h4> Which Degree do you wish to pursue ?</h4>
        <div className="degree-div row d-flex justify-content-center">
          {degrees.map((degree, index) => {
            return <div key={index}  className=" mt-2 col-6 col-sm-4  col-lg-2">
            <div  className={values.degree===degree.key?"degree-card card active":"degree-card"}>
            <Checkbox
              style={{
                position: "absolute",
                top: "-5px",
                left: "-5px",
                border: "none",
              }}
              type="checkbox"
              // checked
              value={degree.key}
              checked={values.degree===degree.key}
              onChange={handleFormData("degree")}
              id={degree.key}
            ></Checkbox>
            <label htmlFor={degree.key}>
              <img
                className="degreeImg"
                src={`assets/icons/${degree.icon}`}
              />
                  <p>{degree.label}</p>
            </label>
          </div>
            </div>;
          })}
        </div>

        <div className="mt-3"
            style={{
            display: "flex",
            gap: "0 15px",
              justifyContent: "center",
            zIndex:99
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
      </div>
    </Form>
  );
};

export default StepTwo;
