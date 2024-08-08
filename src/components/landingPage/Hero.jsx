import React, { useContext, useEffect, useState } from "react";
import "./Hero.css";
import Lottie from "lottie-react";
import humstudy from "../../assets/graphic/humstudy.json";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router";
import { FetchProfile } from "../../methods/MainMethods";
import { MainSiteContext } from "../../context/MainSiteContext";

function Hero() {
  const { state, dispatch } = useContext(MainSiteContext);
  const { user } = state;
  const navigate = useNavigate();
  const [searchUni, setSearchUni] = useState("");

  const sendToUniversityFind = () => {
    if (user?.isLogin) {
      navigate("/search-university", {
        state: searchUni,
      });
    }
    else{
      navigate("/find-university")
    }
  };
  // useEffect(() => FetchProfile("user/profile/get", dispatch, () => {}), []);

  return (
    <div className="hero-section ">
      <div className="hero  container-xl">
        <div className="row d-flex ">
          <div className="col-12 col-md-12 col-lg-7 col-xl-7 hero-left">
            <h1>Unlock Global Learning Adventures with Us</h1>
            <p>
              Your partner for admissions, flight insights, nearby
              accommodations, and all-encompassing support for studying abroad.
            </p>
            <div className="searchBar">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchUni(e.target.value)}
              />
              <div className="search-btn">
                <SearchIcon style={{ color: "#fff" }} />
              </div>
            </div>
            <button
              onClick={sendToUniversityFind}
              className="find-university-btn"
            >
              Find University <ChevronRightIcon style={{ color: "#fff" }} />
            </button>
            <div className="people-img-bar">
              <div>
                <img
                  className="personImg"
                  src="../../assets/images/person1.jpg"
                  alt="person"
                />
                <img
                  className="personImg"
                  src="../../assets/images/person2.jpg"
                  alt="person"
                />
                <img
                  className="personImg"
                  src="../../assets/images/person1.jpg"
                  alt="person"
                />
              </div>
              <p className="mt-5">10k+ Students Onboarded</p>
            </div>
          </div>
          <div className="col-4 col-md-4 col-lg-4 col-xl-5 hero-right d-flex justify-content-center align-items-center ">
            <div className="hero-graphic">
              <Lottie animationData={humstudy} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
