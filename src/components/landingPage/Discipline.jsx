import React from "react";
import "./Discipline.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router";

const desciplines = [
  {
    label: "MBA",
    icon: "graduated.png",
    key: "mba",
  },
  {
    label: "Data Science",
    icon: "analytic.png",
    key: "datascience",
  },
  {
    label: "Computer Science",
    icon: "monitor.png",
    key: "computerscience",
  },
  {
    label: "Engineering",
    icon: "engineers.png",
    key: "engineering",
  },
  {
    label: "Management",
    icon: "management.png",
    key: "management",
  },
  {
    label: "Business Analytics",
    icon: "analytics.png",
    key: "businessanalytics",
  },
  {
    label: "AI & ML",
    icon: "ai-brain.png",
    key: "aiml",
  },
  {
    label: "MBBS",
    icon: "doctor.png",
    key: "mbbs",
  },
];

function Discipline() {
  const navigate = useNavigate();
   
  const sendToFindUniversity = () => {
    navigate("/find-university")
  }

  return (
    <div className="discipline-section">
      <div className="disciplines-container pt-4 pb-3 container-xl">
        <h4>Choose the Discipline of Study</h4>
        <div className="disciplines mt-4 ">
          {desciplines.map((descipline, index) => {
            return (
              <div key={index} className="discipline">
                <img
                  className="discipline-logo"
                  src={`assets/icons/${descipline.icon}`}
                  alt="descipline"
                />
                <h6>{descipline.label}</h6>
              </div>
            );
          })}
        </div>
        <div className="view-more-bar mt-4">
          <button onClick={sendToFindUniversity} className="view-more-btn">
            View More <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Discipline;
