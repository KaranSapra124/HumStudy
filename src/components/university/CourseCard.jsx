import React, { useEffect, useState } from "react";
import "./CourseCard.css";
import { Divider, Modal } from "antd";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";

function CourseCard(props) {
  const [courseOpen, setCourseOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(true);

  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  const handleCancel = () => {
    setCourseOpen(false);
  };
  // console.log(props.course.universityName,"COURSE Names");
  // console.log(props.course);
  return (
    <div
      className={
        props?.inDiv ? "col-12 col-md-4 " : "col-12 col-sm-6 col-md-4 col-lg-3"
      }
    >
      <div className="card courseCard mt-3">
        {/* {props?.course?.map((course, index) => {
          if (course.label === "Course Name") {
            return <h6>{course?.value}</h6>;
          }
        })} */}

        <div className="courseFeatures ">
          {/* <h1 className="text-black text-2xl"> {props.course}</h1> */}
          {/* {props.course.map((course, index) => {
            // Check if the label is 'Intake'

            if (course.label === "Duration") {
              return (
                <div className="courseFeature">
                  <p>{course.label}</p>
                  <p>{course?.value}</p>
                </div>
              );
            }
            if (course.label === "Intake") {
              return (
                <div className="courseFeature">
                  <p>{course.label}</p>
                  <p>{course?.value}</p>
                </div>
              );
            }
            if (course.label === "Schorlorship") {
              return (
                <div className="courseFeature">
                  <p>{course.label}</p>
                  <p>{course?.value}</p>
                </div>
              );
            }
          })} */}
          {props?.course?.courseName?.length <= 30
            ? props.course.courseName
            : props?.course?.courseName?.substring(0, 20) + "...."}

          {props?.inDiv && (
            <Checkbox
              style={{
                position: "absolute",
                top: "-5px",
                left: "-5px",
                border: "none",
              }}
              type="checkbox"
              checked={props.isSelected}
              onChange={props.onSelect}
              id={`loan${props.course.courseName}`}
            ></Checkbox>
          )}
        </div>
        {props?.inDiv ? (
          <label htmlFor={`loan${props?.course[0]?.value}`}>
            <button
              onClick={() => {
                props?.onSelect(props?.index)
              }}
              className="brochure-btn mt-1"
            >
              Select
            </button>
          </label>
        ) : (
          <button
            onClick={() => {
              setCourseOpen(true);
            }}
            className="brochure-btn mt-1"
          >
            Know More
          </button>
        )}
        <Modal
          centered
          className="courseModel"
          style={{ zIndex: 100000, top: 20 }}
          onOk={handleCancel}
          open={courseOpen}
          cancelButtonProps={{
            disabled: true,
            hidden: true,
          }}
        >
          <div className="ant-modal-body">
            <h5>Course Details </h5>
            <div
              className="ant-divider css-zcfrx9 ant-divider-horizontal"
              role="separator"
            ></div>
            <div className="mt-2">
              <h6>Course Name</h6>
              <p>{props.course.courseName}</p>
            </div>
            <div className="mt-2">
              <h6>Duration</h6>
              <p>{props.course.duration}</p>
            </div>
            <div className="mt-2">
              <h6>Intake</h6>
              <p>{props.course.intakes}</p>
            </div>
            <div className="mt-2">
              <h6>University Name</h6>
              <p>{props.course.universityName}</p>
            </div>
            {/* <div className="mt-2">
              <h6>Campus</h6>
              <p>Oslava</p>
            </div> */}
            <div className="mt-2">
              <h6>Study Level</h6>
              <p>{props.course.level}</p>
            </div>
            <div className="mt-2">
              <h6>Entry Requirement</h6>
              <p>
                Grade 12 with minimum {props.course.twelvethScore}% or higher.
                Also, required Grade 12 English.
              </p>
            </div>
            <div className="mt-2">
              <h6>Application Deadline</h6>
              <p>ASAP</p>
            </div>
            <div className="mt-2">
              <h6>Yearly Tuition Fee</h6>
              <p>{Math.round(props.course.tuitionFeeOverall)}</p>
            </div>
            <div className="mt-2">
              <h6>Website Url</h6>
              <p>{props.course.courseLink}</p>
            </div>
            <div className="mt-2">
              <h6>Scholarship</h6>
              <p>{props.course.scholarships}</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default CourseCard;
