import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import { Checkbox } from "antd";
import { InputNumber } from "antd";
import { useEffect } from "react";

const exams = [
  {
    label: "SAT",
    key: "sat",
    minMarks: 400,
    maxMarks: 800,
  },
  {
    label: "ACT",
    key: "act",
    minMarks: 1,
    maxMarks: 36,
  },
  {
    label: "Not Applied",
    key: "na",
  },
];
const postExams = [
  {
    label: "GMAT",
    key: "gmat",
    minMarks: 200,
    maxMarks: 800,
  },
  {
    label: "GRE",
    key: "gre",
    minMarks: 130,
    maxMarks: 170,
  },
  {
    label: "Not Applied",
    key: "na",
  },
];

function StepFive({
  nextStep,
  loan,
  visa,
  handleFormData,
  prevStep,
  values,
  handleSubmit,
}) {
  const [error, setError] = useState(false);
  const [selectedExam, setSelectedExam] = useState("");
  const navigate = useNavigate();

  // after form submit validating the form data using validator

  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step

    nextStep();
  };
  useEffect(() => {
    if (values.academicExam === "") {
      setError(true);
    } else {
      setError(false);
    }
  }, [values]);
  // console.log(loan, "LOANSSSSS");

  return (
    <Form onSubmit={!loan ? handleSubmit : submitFormData} className="w-100 ">
      <div className="step-2-div mt-2 m-auto">
        <h4>Which Academic test have you taken ?</h4>

        <div className="degree-div row d-flex justify-content-center">
          {values.degree === "Undergraduate"
            ? exams.map((exam, index) => {
                return (
                  <div key={index} className="mt-2 col-12 col-lg-3">
                    <label
                      htmlFor={exam.key}
                      className={
                        values.academicExam === exam.key
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
                        checked={values.academicExam === exam.key}
                        onChange={handleFormData("academicExam")}
                        id={exam.key}
                      ></Checkbox>

                      <p>{exam.label}</p>
                    </label>
                  </div>
                );
              })
            : postExams.map((exam, index) => {
                return (
                  <div key={index} className="mt-2 col-12 col-lg-3">
                    <label
                      htmlFor={exam.key}
                      className={
                        values.academicExam === exam.key
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
                        checked={values.academicExam === exam.key}
                        onChange={handleFormData("academicExam")}
                        id={exam.key}
                      ></Checkbox>

                      <p>{exam.label}</p>
                    </label>
                  </div>
                );
              })}
          {values.academicExam && values.academicExam !== "na" && values.degree == "Undergraduate" && (
            <div className="score-div ">
              <h5>Enter your Score</h5>

              <input
                className="number-input"
                required
                max={
                  values.degree === "Undergraduate"
                    ? exams.find((exam) => exam.key === values.academicExam)
                        .maxMarks
                    : postExams.find((exam) => exam.key === values.academicExam)
                        .maxMarks
                }
                min={
                  values.degree === "Undergraduate"
                    ? exams.find((exam) => exam.key === values.academicExam)
                        .minMarks
                    : postExams.find((exam) => exam.key === values.academicExam)
                        .minMarks
                }
                value={values.academicExamScore}
                placeholder="Enter Score"
                onChange={handleFormData("academicExamScore")}
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
          <Button variant="outlined" onClick={() => prevStep(0)}>
            Previous
          </Button>

          {!error && loan && (
            <Button className="nextBtn" variant="primary" type="submit">
              {"Next"}
            </Button>
          )}
          {!error && visa && (
            <Button className="nextBtn" variant="primary" type="submit">
              {"Next"}
            </Button>
          )}
          {!error && !loan && !visa && (
            <Button className="nextBtn" variant="primary" type="submit">
              {"Submit"}
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
}

export default StepFive;
