import React, { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import TextField from "@mui/material/TextField";
import { Checkbox } from "antd";

const lastExams = [
  {
    label: "UG",
    key: "ug",
    minMarks: 0,
    maxMarks: 100,
  },
  {
    label: "PG",
    key: "pg",
    minMarks: 0,
    maxMarks: 100,
  },
  {
    label: "Not Applied",
    key: "na",
  },
];

function LastScore({ nextStep, handleFormData, prevStep, values }) {
  const [error, setError] = useState(false);
  const [selectedEnglishExam, setSelectedEnglishExam] = useState("");
  const [score, setScore] = useState(0);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step

    nextStep();
  };

  useEffect(() => {
    if (values.lastExamScore === "") {
      setError(true);
    } else {
      setError(false);
    }
  }, [values]);

  return (
    <Form onSubmit={submitFormData} className="w-100 ">
      <div className="step-2-div mt-2 m-auto">
        <h4>What was your last score ?</h4>

        <div className="degree-div row d-flex justify-content-center">
          {lastExams.map((exam, index) => {
            return (
              <div key={index} className="mt-2 col-12 col-sm-6 col-lg-3">
                <label
                  htmlFor={exam.key}
                  className={
                    values.lastExam === exam.key
                      ? "exam-card card active"
                      : "exam-card card"
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
                    value={exam.key}
                    checked={values.lastExam === exam.key}
                    onChange={handleFormData("lastExam")}
                    id={exam.key}
                  ></Checkbox>

                  {/* <> */}
                  <p>{exam.label}</p>
                </label>
                {/* </div> */}
              </div>
            );
          })}
          {values.lastExam && values.lastExam !== "na" && (
            <div className="score-div ">
              <h5>Enter your Score</h5>

              <input
                className="number-input"
                required
                // max={
                //   lastExams.find((exam) => exam.key === values.lastExam).maxMarks
                // }
                // min={
                //   lastExams.find((exam) => exam.key === values.lastExam).minMarks
                              // }
                              min={0}
                            //   max={100}
                value={values.lastExamScore}
                onChange={handleFormData("lastExamScore")}
                placeholder="Enter Score"
                type="number"
              />
            </div>
          )}
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

          {!error && (
            <Button className="nextBtn" variant="primary" type="submit">
              Next
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
}

export default LastScore;
