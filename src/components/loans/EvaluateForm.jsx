import React, { useContext, useEffect, useState } from "react";
import "./EvaluateForm.css";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Form, message } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { MainSiteContext } from "../../context/MainSiteContext";
import { userMethod } from "../../userMethods/userMethod";
import { FetchProfile } from "../../methods/MainMethods";

const uploadFields = [
  { key: "englishScoreCard", label: "ENGLISH PROFICIENCY SCORE CARD" },
  { key: "offerletter", label: "OFFER LETTER FROM UNIVERSITY OR COLLEGE" },
  { key: "passport", label: "PASSPORT FRONT & BACK" },
  { key: "marksheetUg", label: "UG FOR MASTERS STUDENT" },
  { key: "marksheetPg", label: "PG FOR MASTERS AND PHD STUDENT" },
  { key: "marksheet12th", label: "12th Marksheet" },
  { key: "marksheet10th", label: "10th Marksheet" },
];

message.config({
  style: {
    color: "#f5f5f7",
  },
});

function EvaluateForm(props) {
  const { state, dispatch } = useContext(MainSiteContext);
  const { profile } = state;
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loanData, setLoanData] = useState([]);
  const navigate = useNavigate();

  const { education } = profile;

  const onFinish = (values) => {
    console.log("Received values:", values);
    toast.success("Successfully Uploaded Documents");
    if (renderUploadFields() === null) {
      navigate("/loans");
    }
    props.closeModel();
    props.goToFirstStep(0);
  };

  const handleUpload = (item, label) => {
    setImages((prevData) => [...prevData, { img: item, imgLabel: label }]);
  };

  const handleImagesUpload = async () => {
    const formData = new FormData();
    images.forEach((elem) => {
      formData.append("files", elem.img);
      formData.append("imageData", elem.imgLabel);
    });

    await userMethod("/upload-loan-docs", formData, null, setIsLoading);

    await FetchProfile("user/profile/get", dispatch, () => {});
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const renderUploadFields = () => {
    const academicsDocuments = profile?.documents?.academicsDocuments || {};
    const experienceDocuments = profile?.documents?.experienceDocuments || {};

    const fieldsToRender = uploadFields.filter((field) => {
      console.log(academicsDocuments);
      const isAcademicsField = !academicsDocuments[field.key];

      const isOfferLetterField =
        field.key === "offerletter" && !experienceDocuments[field.key];

      if (
        (field.key === "marksheetUg" || field.key === "offerletter") &&
        education?.some((elem) => elem.level !== "ug")
      ) {
        return false;
      } else if (
        (field.key === "marksheet10th" && !academicsDocuments[field.key]) ||
        (field.key === "marksheet12th" && !academicsDocuments[field.key])
      ) {
        return true;
      } else if (
        (field.key === "marksheetUg" && !academicsDocuments[field.key] || field.key === "marksheetPg" && !academicsDocuments[field.key]) &&
        education?.some((elem) => elem.level === "ug")
      ) {
        return true;
      }

      if (isAcademicsField || isOfferLetterField) {
        if (field.key.includes("marksheet") || field.key === "offerletter") {
          return education?.some(
            (elem) =>
              (field.key === "marksheetUg" && elem.level !== "ug") ||
              (field.key === "marksheetPg" &&
                (elem.level === "pg" || elem.level === "phd")) ||
              field.key === "offerletter"
          );
        }
        return true;
      }
      return false;
    });
    console.log(fieldsToRender, "FIELDS");
    return fieldsToRender.length > 0
      ? fieldsToRender.map((field) => (
          <div className="evaluate mt-4" key={field.key}>
            <p>{field.label}</p>
            <Upload
              maxCount={1}
              accept="image/*"
              customRequest={({ file }) => handleUpload(file, field.key)}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
        ))
      : null;
  };

  const handleEvalLoan = async () => {
    setLoanData(() => ({
      userId: profile._id,
      loanApplied: props.loanDetail,
    }));
    await FetchProfile("user/profile/get", dispatch, () => {});
  };

  useEffect(() => {
    if (loanData.length !== 0) {
      userMethod("/eval-loan", loanData, null, setIsLoading);
    }
  }, [loanData]);

  return (
    <div className="evaluate-div">
      {renderUploadFields() ? (
        <Form
          name="upload-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="evaluate-div"
        >
          <h5>Please upload the following documents</h5>
          {renderUploadFields()}
          <div className="d-flex justify-content-center mt-2 mb-2">
            <button
              type="primary"
              className="mt-3 btn-primary submit-btn"
              htmlType="submit"
              onClick={() => handleImagesUpload()}
            >
              Submit
            </button>
          </div>
        </Form>
      ) : (
        <>
          <h4 className="text-light text-center pt-2">
            You are ready to avail the loan, click below to get yourself
            evaluated!
          </h4>
          <div className="d-flex justify-content-center mt-2 mb-2">
            <button
              type="primary"
              className="mt-3 btn-primary submit-btn"
              onClick={handleEvalLoan}
            >
              Evaluate
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EvaluateForm;
