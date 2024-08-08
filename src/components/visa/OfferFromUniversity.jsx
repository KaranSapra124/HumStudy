import React, {useState, useEffect} from "react";
import { Form, Card, Button } from "react-bootstrap";
import { Checkbox } from "antd";


const status = [
    {
      label: "Yes",
      key: "yes",
    },
    {
      label: "No",
      key: "no",
    },
    {
      label: "Want to apply",
      key: "want to apply",
    },
  ];

function OfferFromUniversity({ nextStep, loan, visa, handleFormData, prevStep, values }) {
    const [error, setError] = useState(true);

    useEffect(() => {
        if (values.offerFromUniversity === "") {
          setError(true);
        }
        else {
          setError(false);
        }
    }, [values])
    
    const submitFormData = (e) => {
        e.preventDefault();
        nextStep();
       
    };
    
  return (
    <Form onSubmit={submitFormData}  className="w-100 ">
          <div className="step-2-div mt-2 m-auto">
              <h4>Have you got any offer from university or you want to apply ?</h4>
              
              <div className="degree-div row d-flex justify-content-center">
          {status.map((st, index) => {
            return (
              <div key={index} className="mt-2 col-12 col-lg-3">
                <label style={{cursor:"pointer"}}
                  htmlFor={st.key}
                  className={
                    values.offerFromUniversity === st.key
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
                    checked={values.offerFromUniversity === st.key}
                    onChange={handleFormData("offerFromUniversity")}
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
                  Next
              </Button>
              }
      </div>
      </div>
    </Form>
  );
}

export default OfferFromUniversity;
