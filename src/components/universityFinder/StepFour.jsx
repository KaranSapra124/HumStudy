import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Checkbox, Switch } from "antd";
import { useEffect } from "react";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { GoNumber } from "react-icons/go";
import { AiOutlinePercentage } from "react-icons/ai";

const exams = [
  {
    label: "TOEFL",
    key: "toefl",
    minMarks: 0,
    maxMarks: 120,
  },
  {
    label: "IELTS",
    key: "ielts",
    minMarks: 0,
    maxMarks: 9,
  },
  {
    label: "PTE",
    key: "PTE",
    minMarks: 0,
    maxMarks: 90,
  },
  {
    label: "Not Applied",
    key: "na",
  },
];

function StepFour({ nextStep, handleFormData, prevStep, values }) {
  const [error, setError] = useState(false);
  const [selectedEnglishExam, setSelectedEnglishExam] = useState("");
  const [score, setScore] = useState(0);
  const [bool, setBool] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step

    nextStep();
  };

  const handleExamSelection = (exam) => {
    setSelectedEnglishExam(exam);
  };

  useEffect(() => {
    if (values.englishExam === "") {
      setError(true);
    } else {
      setError(false);
    }
  }, [values]);

  useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <Form onSubmit={submitFormData} className="w-100 ">
      <div className="step-2-div mt-2 m-auto">
        <h4>Which english language test have you taken ?</h4>

        <div className="degree-div row d-flex justify-content-center">
          {exams.map((exam, index) => {
            return (
              <div key={index} className="mt-2 col-12 col-sm-6 col-lg-3">
                <label
                  htmlFor={exam.key}
                  className={
                    values.englishExam === exam.key
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
                    checked={values.englishExam === exam.key}
                    onChange={handleFormData("englishExam")}
                    id={exam.key}
                  ></Checkbox>

                  {/* <> */}
                  <p>{exam.label}</p>
                </label>
                {/* </div> */}
              </div>
            );
          })}
          {values.englishExam && values.englishExam !== "na" && (
            <div className="score-div ">
              <h5>Enter your Score</h5>
              <Switch
                checked={bool}
                checkedChildren={<GoNumber />}
                unCheckedChildren={<AiOutlinePercentage />}
                onClick={() => {
                  setBool(!bool);
                }}
              />

              {bool ? (
                <input
                  className="number-input"
                  required
                  max={
                    exams.find((exam) => exam.key === values.englishExam)
                      .maxMarks
                  }
                  min={
                    exams.find((exam) => exam.key === values.englishExam)
                      .minMarks
                  }
                  value={values.englishExamScore}
                  onChange={handleFormData("englishExamScore")}
                  placeholder="Enter Score"
                />
              ) : (
                <input
                  className="number-input"
                  required
                  max={
                    exams.find((exam) => exam.key === values.englishExam)
                      .maxMarks
                  }
                  min={
                    exams.find((exam) => exam.key === values.englishExam)
                      .minMarks
                  }
                  value={values.englishExamScore}
                  onChange={handleFormData("englishExamScore")}
                  placeholder="Enter Score In Percent"
                />
              )}
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

export default StepFour;
