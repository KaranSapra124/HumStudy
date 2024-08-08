import React from "react";
import GppGood from "@mui/icons-material/GppGood"; // Adjust import based on your icon library
import School from "@mui/icons-material/School";
import PlaceIcon from "@mui/icons-material/Place";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FILE_PATH } from "../../utils/apiConfig";
import "./UniversityInfoSection.css";

// Assuming AvgFee is a function defined elsewhere in your code
const AvgFee = (elem) => {
  // Your AvgFee calculation logic
  return 1000; // Replace this with actual logic
};

const RelatedCourseCard = ({
  universityLogo,
  category,
  courseName,
  universityName,
  country,
  city,
  collegeRank,
  onClick,
}) => {
  return (
    <div className="courseCard mt-3">
      {/* <img className="w-20" src={FILE_PATH + universityLogo} alt="university" /> */}
      <div className="universitySearchResultCard-content">
        <div className="categoryBtn">
          <GppGood /> <span>{category}</span>
        </div>
        <h5
          style={{
            textTransform: "uppercase",
            marginBottom: "0.2rem",
            color: "#074173",
          }}
        >
          {courseName.substring(0, 15) + "...."}
        </h5>
        <div className="uniNameAndCity">
          <p>
            <School />{" "}
            <span
              className="text-gray-200  mt-2 mb-2 "
              style={{ textTransform: "uppercase" }}
            >
              {universityName}
            </span>
          </p>
          <p>
            <PlaceIcon style={{ color: "gray" }} /> {country} | {city}
          </p>
        </div>
        <div className="content-features courseDiv">
          <div className="content-feature ">
            <p>Courses Offered</p>
            <h6>50+</h6>
          </div>
          <div className="content-feature">
            <p>Fee Starts From</p>
            <h6>
              {AvgFee() === 0 ? "N/A" : AvgFee().toString().substring(0, 3)}
            </h6>
          </div>
          <div className="content-feature">
            <p>University Ranking</p>
            <h6>{collegeRank}</h6>
          </div>
        </div>
        <button
          onClick={onClick}
          className="universityKnowMoreBtn"
          style={{ paddingLeft: "10px" }}
        >
          READ MORE{" "}
          <span style={{ marginLeft: "5px" }}>
            <KeyboardArrowRightIcon
              className="border-2 border-white "
              style={{
                borderRadius: "100px",
                // height: "50px",
                marginBottom: "1px",
              }}
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default RelatedCourseCard;
