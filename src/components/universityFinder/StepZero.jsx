import React, { useContext, useEffect } from "react";
import "./UniversityFinder.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MainSiteContext } from "../../context/MainSiteContext";
import { useNavigate } from "react-router";

function StepZero({ nextStep }) {
  const { state } = useContext(MainSiteContext);
  const navigate = useNavigate();
  const { user, profile } = state;
  const gotoNext = () => {
    if (user?.isLogin) {
      nextStep();
    } else {
      navigate("/login");
    }
  };
  // console.log(profile?.unisFilter,'PROFILE')
  useEffect(() => {
    // console.log(
    //   Object.values(profile?.uniFilters).every(
    //     (elem) => elem !== undefined && elem !== null && elem?.length !== 0
    //   )
    // );
    if (
      user?.isLogin &&
      Object.values(profile?.uniFilters).every(
        (elem) => elem !== undefined && elem !== null && elem?.length !== 0
      )
    ) {
      navigate("/search-university");
    }
  }, []);

  return (
    <div className="row">
      <div className="col-12  col-md-6 d-flex align-items-center ">
        <div className="find-university-left">
          <h3>Find your Dream University</h3>
          <p>
            Thinking of studying abroad? But don't know which universities &
            courses are best-fit for you! Try our AI powered University Course
            Finder. Feed in your preferences, let the AI match them against
            millions of data points & voila! you get what you are looking for,
            saving you hours of research.
          </p>
          <button
            onClick={gotoNext}
            className="start-btn col-6 col-md-4 col-lg-3 mt-3"
          >
            {" "}
            Start <ChevronRightIcon style={{ color: "#fff" }} />
          </button>
        </div>
      </div>
      <div className="col-12 col-sm-10 col-md-6 d-flex justify-content-center align-items-center">
        <img
          className="find-university-img"
          src="assets/graphic/finduniversity.png"
          alt="find university"
        />
      </div>
      {/* <img className="contries-bottom" src="assets/graphic/bottomcontries.svg"/> */}
    </div>
  );
}

export default StepZero;
