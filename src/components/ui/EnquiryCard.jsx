import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Divider, Modal, message } from "antd";
import LoginDiv from "./LoginDiv";
import Plans from "../landingPage/Plans";
import CourseCard from "../university/CourseCard";
import "./EnquiryCard.css";
import { MainSiteContext } from "../../context/MainSiteContext";
import { toast } from "react-toastify";
import { userMethod } from "../../userMethods/userMethod";

function EnquiryCard(props) {
  // console.log(props, "ENQUIRY");
  const [appplyDiv, setApplyDiv] = useState(false);
  const [isLogin, setisLogin] = useState(true);
  const [upgrade, setUpgrade] = useState(false);
  const [selectedCards, setSelectedCards] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const { state } = useContext(MainSiteContext);
  const { user, profile } = state;
  // const { documents } = profile;
  // console.log(props)
  // useEffect(() => {
  //   console.log(selectedCards);
  // }, [selectedCards]);

  const handleCardSelect = (index) => {
    setSelectedCards(index);
  };

  const handleCancel = () => {
    setSelectedCards("");
    setApplyDiv(false);
  };
  const success = () => {
    handleCancel();
  };

  const handleApply = () => {
    const requiredFields = ["fName", "email", "lName"];
    const requiredDocs = [
      "marksheet10th",
      "marksheet12th",
      "passport",
      "resume",
    ];
    if (requiredFields.every((elem) => profile[elem])) {
      if (
        requiredDocs.every(
          (elem) => profile?.documents?.academicsDocuments[elem]
        )
      ) {
        userMethod("/apply-university", { course: props?.courses }, null);
      }
    } else {
      toast.error("Complete Your Profile , To Apply!");
    }
  };

  return (
    <div className="counselling-card">
      {contextHolder}

      <div>
        <img
          className="university-sideImg"
          style={{ width: "100%" }}
          src="assets/images/univerity-sideimg.jpg"
          alt="university"
        />
      </div>
      <div className="counselling-input mt-1">
        <Button
          variant="contained"
          className="input counselling-btn"
          color="success"
          onClick={() => {
            if (!user?.isLogin) {
              toast.error("Login to apply!");
            } else {
              handleApply()
            }
          }}
        >
          Apply
        </Button>
        {/* /(\d)\s+Applications+\s+&+(\d)+\s+Country/g */}
      </div>
      {/* <Modal
        centered
        className="courseModel"
        width={isLogin && 1000}
        style={{
          zIndex: 100000,
          top: 20,
          position: "relative",
          height: "80vh",
          maxHeight: "80vh",
          overflowY: "auto",
          borderRadius: "5px",
        }}
        onCancel={handleCancel}
        open={appplyDiv}
      > */}
      {/* Importantttttttttttttttt */}

      {/* {!isLogin && <LoginDiv />} */}

      {/* if not login and need to buy plan then render this */}

      {/* {isLogin && <div>
          <Plans inDiv={true}  upgrade={false} />
        </div>} */}

      {/* if not login and need to upgrade plan then render this */}

      {/* {(isLogin && !upgrade) && <div>
          <Plans inDiv={true} selectedPlan={0} upgrade={true} />
        </div>} */}

      {/* if all okkk */}

      {/* <div className="row sticky top-20">
          <div className="flex justify-between ">
            {<h5>Select Course</h5>}
            {selectedCards && (
              <Button
                className="nextBtn w-fit"
                variant="primary"
                type="submit"
                onClick={handleApply}
                style={{ color: "#fff" }}
              >
                Apply
              </Button>
            )}
          </div>
          <Divider />
          </div> */}
      {/* {props.courses.map((course, index) => {
            return (
              <CourseCard
                inDiv={true}
                key={index + 1}
                index={index}
                course={course}
                isSelected={selectedCards === course.courseName}
                onSelect={() => handleCardSelect(course)}
                footer={<></>}
              />
            );
          })} */}

      {/* </Modal> */}
    </div>
  );
}

export default EnquiryCard;
