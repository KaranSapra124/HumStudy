import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Checkbox, Select } from "antd";
import { userMethod } from "../../userMethods/userMethod";

const majors = [
  {
    label: "Data Science",
    key: "Data Science",
    icon: "analytic.png",
  },
  {
    label: "Cybersecurity",
    key: "Cybersecurity",
    icon: "monitor.png",
  },
  {
    label: "Engineering ",
    key: "Engineering ",
    icon: "engineers.png",
  },
  {
    label: "Human Resource Management",
    key: "Human Resource Management",
    icon: "management.png",
  },
  {
    label: "MBA",
    key: "MBA",
    icon: "graduated.png",
  },
  {
    label: "Business Analytics",
    key: "Business Analytics",
    icon: "analytics.png",
  },
  {
    label: "Artificial Intelligence (AI)",
    key: "Artificial Intelligence (AI)",
    icon: "ai-brain.png",
  },
  {
    label: "Biology",
    key: "Biology",
    icon: "doctor.png",
  },
];

const StepThree = ({
  nextStep,
  handleFormData,
  onMajorChange,
  prevStep,
  values,
}) => {
  const [error, setError] = useState(false);
  const [majorData, setMajorData] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState([]);
  const [majors, setSelectedMajors] = useState(values?.majors || []);

  const submitFormData = (e) => {
    // onMajorChange(...selectedMajor, true);

    e.preventDefault();
    nextStep();
  };

  const handleMajorChange = (value, checked, type) => {
    setSelectedMajor(value);
  };
  const handleMajorClick = (item) => {
    if (item !== undefined) {
      setSelectedMajors((prevMajors) => {
        const index = prevMajors.findIndex((elem) => elem === item?.label);
        if (index >= 0) {
          console.log(index, item.label);
          // Item is already in the array, remove it
          return prevMajors.filter((elem, elemIndex) => index !== elemIndex);
        } else {
          // Item is not in the array, add it
          return [...prevMajors, item.label];
        }
      });
    }
  };
  useEffect(() => {
    console.log("MAJOR FETCHED")
    userMethod("get-majors", { major: values.degree }, setMajorData, null);
    setError(values.majors.length === 0);
  }, [values.degree]);

  useEffect(() => {
    
    {
      selectedMajor.length !== 0 &&
        onMajorChange(selectedMajor[selectedMajor.length - 1], true, "select");
    }
  }, [selectedMajor]);

  useEffect(() => {
    if (majors) {
      console.log(majors, "MAJORS");
      majors.length !== 0 &&
        !majors.includes(undefined) &&
        onMajorChange(majors, true);
    }
  }, [majors]);

  return (
    <Form onSubmit={submitFormData} className="w-100">
      <div className="step-2-div mt-2 m-auto">
        <h4>Which major do you want to pursue?</h4>
        <Select
          labelInValue
          mode="multiple"
          size="large"
          placeholder="Please Select your Major"
          onChange={(value, option) => {
            console.log("Select change:", value, option);
            handleMajorChange(
              value.map((elem) => elem.value),
              true,
              "select"
            );
          }}
          style={{ minWidth: "300px" }}
          options={majorData
            .sort((a, b) => {
              // console.log(a, b, "sort");
              if (a.label < b.label) return -1;
              // if (a.label < b.label) return 1;
              return 0;
            })
            .map((major) => {
              return { label: major.label, value: major.label };
            })}
        />
        <div className="degree-div row">
          {majorData.map((major, index) => {
            if (index <= 10) {
              return (
                <div
                  onClick={() => handleMajorClick(major)}
                  key={index}
                  className="mt-2 col-6 col-sm-4 col-md-3 col-xl-2"
                >
                  <div
                    className={
                      majors?.find((elem) => elem?.label === major?.label) ||
                      majors?.find((elem) => elem === major.label)
                        ? "degree-card card active"
                        : "degree-card"
                    }
                  >
                    <Checkbox
                      style={{
                        position: "absolute",
                        top: "-5px",
                        left: "-5px",
                        border: "none",
                      }}
                      checked={
                        majors?.find((elem) => elem?.label === major.label) ||
                        majors?.find((elem) => elem === major.label)
                      } // Use major.checked directly
                      onChange={(e) => {
                        handleMajorChange(
                          major.label,
                          e.target.checked,
                          "checkbox"
                        ); // Invert the checked state
                      }}
                      id={major.key}
                    />
                    <label htmlFor={major.key}>
                      <p>{major.label}</p>
                    </label>
                  </div>
                </div>
              );
            }
            return null; // Ensure a value is returned from map function
          })}
        </div>

        <div
          className="mt-3"
          style={{
            display: "flex",
            gap: "0 15px",
            justifyContent: "center",
            zIndex: 99,
          }}
        >
          <Button variant="outlined" onClick={() => prevStep(0)}>
            Previous
          </Button>
          {/* {!error && ( */}
          <Button className="nextBtn" variant="primary" type="submit">
            Next
          </Button>
          {/* // )} */}
        </div>
      </div>
    </Form>
  );
};

export default StepThree;
