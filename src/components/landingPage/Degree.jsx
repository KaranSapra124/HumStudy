import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Degree.css";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PlaceIcon from "@mui/icons-material/Place";
import { userMethod } from "../../userMethods/userMethod";
import { MainSiteContext } from "../../context/MainSiteContext";
import UniversitySearchResultCard from "../universitySearch/UniversitySearchResultCard";
import { FILE_PATH } from "../../utils/apiConfig";
import { GppGood, School } from "@mui/icons-material";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1601 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1115 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1114, min: 751 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

function Degree() {
  const {
    state: { unisFilter },
  } = useContext(MainSiteContext);
  const [active, setActive] = useState(1);
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendToUniverity = (item) => {
    navigate("/university", {
      state: item,
    });
  };

  useEffect(() => {
    userMethod(
      `/get-courses?page=1&pageSize=10`,
      unisFilter,
      setCourse,
      setIsLoading
    );
  }, []);

  // useEffect(() => console.log(course,'courseseses'), [course]);

  const AvgFee = useCallback(
    (item) => {
      const duration = item.duration.split(" ")[0];
      const avg =
        parseFloat(item.tuitionFeeOverall / (duration / 12)) ||
        0 / (parseFloat(duration >= 10 ? duration / 12 : duration) || 1);
      return Math.round(avg);
    },
    [course]
  );

  const sendTosearchUniversity = () => {
    navigate("/search-university");
  };
  return (
    <div className="degree-section">
      <div className="degree container-xl">
        <h4>Study your Dream Degree</h4>
        {/* <div className="btn-row mt-4">
          <button
            onClick={() => setActive(1)}
            className={active === 1 ? "degree-btn active" : "degree-btn"}
          >
            Bachelor
          </button>
          <button
            onClick={() => setActive(2)}
            className={active === 2 ? "degree-btn active" : "degree-btn"}
          >
            Master
          </button>
          <button
            onClick={() => setActive(3)}
            className={active === 3 ? "degree-btn active" : "degree-btn"}
          >
            PhD
          </button>
        </div> */}
        <div className="row mt-3">
          {course.length !== 0 && (
            <Carousel
              partialVisible={true}
              infinite={true}
              removeArrowOnDeviceType={["mobile"]}
              responsive={responsive}
            >
              {course?.courses?.map((elem) => (
                <div className="universitySearchResultCard mt-3   shadow " style={{width:"95%" , height:"28rem",margin:"1rem"}}>
                  <div
                    className="universitySearchResultCard-content d-flex"
                    style={{ margin: "10px" }}
                  >
                    <div className="categoryBtn">
                      <GppGood /> <span>{elem?.category}</span>
                    </div>
                    <div className="d-flex ">
                      <img
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "100%",
                        }}
                        src={FILE_PATH + elem?.university?.universityLogo}
                        alt="university"
                      />
                      <div className="ml-2">
                        <h5
                          style={{
                            textTransform: "uppercase",
                            marginBottom: "0.5rem",
                            color: "#074173",
                          }}
                          className="courseHead"
                        >
                          {elem?.courseName}
                        </h5>
                        <div className="uniNameAndCity">
                          <p>
                            <School />{" "}
                            <span
                              className="text-gray-200  mt-2 mb-2 "
                              style={{ textTransform: "uppercase" }}
                            >
                              {elem?.universityName}
                            </span>
                          </p>
                          <p>
                            <PlaceIcon style={{ color: "gray" }} />{" "}
                            {elem?.country} | {elem?.city}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="content-features">
                      <div className="content-feature">
                        <p>Courses Offered</p>
                        <h6>50+</h6>
                      </div>
                      <div className="content-feature">
                        <p>Fee Starts From</p>
                        <h6>
                          {AvgFee(elem) === 0
                            ? "N/A"
                            : AvgFee(elem).toString().substring(0, 3)}
                          K
                        </h6>
                      </div>
                      <div className="content-feature">
                        <p>University Ranking</p>
                        <h6>{elem?.collegeRank}</h6>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        sendToUniverity(elem);
                      }}
                      className="universityKnowMoreBtn"
                      style={{ paddingLeft: "10px" }}
                    >
                      READ MORE{" "}
                      <span style={{ marginLeft: "5px" }}>
                        <KeyboardArrowRightIcon
                          className="border-2 border-white "
                          style={{
                            borderRadius: "100px",
                            heigh: "50px",
                            marginBottom: "1px",
                          }}
                        />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </div>

        <div className="view-more-bar mt-4">
          <button onClick={sendTosearchUniversity} className="view-more-btn">
            View More <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Degree;
