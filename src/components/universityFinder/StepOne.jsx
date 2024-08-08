import { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Checkbox } from "antd";
import { useNavigate } from "react-router";
import { MainSiteContext } from "../../context/MainSiteContext";

const flags = [
  {
    label: "UK",
    key: "UK",
    icon: "unitedkingdom.png",
  },
  {
    label: "USA",
    icon: "unitedtstate.png",
    key: "USA",
  },
  // {
  //   label:"Europe",
  //   icon: "europe.png",
  //   key:"europe"
  // },
  {
    label: "Australia",
    icon: "australia.png",
    key: "Australia",
  },
  {
    label: "Canada",
    icon: "canada.png",
    key: "Canada",
  },
  // {
  //   label:"Other",
  //   icon: "airplane.png",
  //   key:"other"
  // },
  {
    label: "Ireland",
    icon: "ireland.png",
    key: "Ireland",
  },
];

// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({
  nextStep,
  loan,
  visa,
  onCountryChange,
  handleFormData,
  prevStep,
  values,
}) => {
  //creating error state for validation
  const navigate = useNavigate();
  const [error, setError] = useState(true);
  
  const submitFormData = (e) => {
    e.preventDefault();

    nextStep();
  };

  const sendToLoan = () => {
    prevStep();
  };
  const handleCountryChange = (e) => {
    const { value, checked } = e.target;
    onCountryChange(value, checked);
  };

  useEffect(()=>{

  })

  useEffect(() => {
    if (values?.countries?.length !== 0) {
      setError(false);
    } else {
      setError(true);
    }
  }, [values?.countries]);

  useEffect(() => {
    if (values?.countries === "" && loan) {
      setError(true);
    } else if (values?.countries?.length === 0 && !loan) {
      setError(true);
    } else {
      setError(false);
    }
  }, []);

  return (
    <Form onSubmit={submitFormData} className="w-100 ">
      <div className="step-1-div mt-2 m-auto">
        {!loan ? (
          <h4>Which country do you wish to pursue your education in? </h4>
        ) : (
          <h4>
            In which Country you are going to persue your Dream Education ?
          </h4>
        )}
        <div className="countries-div row">
          {flags.map((flag, index) => {
            return (
              <div key={index} className="mt-2 col-6 col-sm-4  col-lg-2">
                <div
                  className={
                    values?.countries?.includes(flag.key)
                      ? "selection-country-div card active"
                      : " card selection-country-div "
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
                    value={flag.key}
                    checked={values?.countries?.includes(flag.key)}
                    onChange={
                      loan || visa
                        ? handleFormData("countries")
                        : handleCountryChange
                    }
                    id={flag.key}
                  ></Checkbox>
                  <label htmlFor={flag.key}>
                    <img
                      className="selection-country-img"
                      src={`assets/icons/${flag.icon}`}
                    />
                    <p>{flag.label}</p>
                  </label>
                </div>
              </div>
            );
          })}

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
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default StepOne;
