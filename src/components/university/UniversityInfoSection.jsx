import React, { useEffect, useRef, useState } from "react";
import UniversityInfoBar from "./UniversityInfoBar";
import "./UniversityInfoSection.css";
import CourseCard from "./CourseCard";
import Gallary from "./Gallary";
import Reviews from "../ui/Reviews";
import TrendingSearches from "../ui/TrendingSearches";
import Footer from "../ui/Footer";
import { FaGraduationCap } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";
import {
  fetchAllData,
  fetchUniData,
} from "../../adminPanel/methods/commonMethod";
import {
  AccountBalance,
  AccountBalanceWallet,
  Book,
  CalendarMonth,
  CurrencyExchange,
  HistoryOutlined,
  OpenInNew,
  PersonPin,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import RelatedCourseCard from "./relatedCourseCard";
import { useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";

function UniversityInfoSection(props) {
  // console.log(props.universityDetails, "UNIVERSITY");
  const navigate = useNavigate();
  const [course, setCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(5);

  const [isLoading, setIsLoading] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const accordionRef = useRef(null);
  const handleToggle = (key) => {
    if (activeKey === key) {
      setActiveKey(null);
    } else {
      setActiveKey(key);
    }
  };

  const loadCourses = () => {
    setVisibleCourses((prevCount) => {
      const newCount = prevCount + 5;
      return newCount <= course.length ? newCount : course.length;
    });
  };

  const handleScroll = () => {
    const container = accordionRef.current;
    if (
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 50
    ) {
      if (visibleCourses < course.length) {
        loadCourses();
      }
    }
  };

  const sendToUniverity = (item) => {
    navigate("/university", {
      state: item,
    });
  };

  useEffect(() => {
    const container = accordionRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [visibleCourses, course]);

  useEffect(() => {
    fetchAllData(
      `course/get-by-uni/${props?.universityDetails?.university?._id}`,
      setCourses,
      setIsLoading
    );
  }, []);

  // useEffect(() => console.log(course, "COURSES"), [course]);

  return (
    <div>
      {/* <div id="overview">
        <UniversityInfoBar details={props.universityDetails} />
      </div> */}
      <div className="coursesBar-section ">
        <div className="courseBar container-xl mb-2 d-flex">
          <div>
            <div className="d-flex align-items-start mb-2">
              <AccountBalanceWallet className="infoIcon" />
              <div className="d-flex flex-column ">
                <p className="fw-bold">
                  {Math.round(
                    props.universityDetails.tuitionFeeOverall /
                      (props.universityDetails.duration / 12)
                  ).toLocaleString()}
                </p>
                <p>AVERAGE FEE</p>
              </div>
            </div>
            <div className="d-flex align-items-start mb-2">
              <Book className="infoIcon" />
              <div className="d-flex flex-column ">
                <p className="fw-bold">{props?.universityDetails?.ielts}</p>
                <p>ENGLISH</p>
              </div>
            </div>
            <Link
              to={`${props?.universityDetails?.courseLink}`}
              className="d-flex align-items-start mb-2 text-black text-decoration-none"
            >
              <OpenInNew className="infoIcon" />
              <div className="d-flex flex-column ">
                <p className="fw-bold linkPara">Click the Link</p>

                <p>CONFIRM ELIGIBILITY</p>
              </div>
            </Link>
          </div>
          <div className="ms-5">
            <div className="d-flex align-items-start mb-2">
              <HistoryOutlined className="infoIcon" />
              <div className="d-flex flex-column ">
                <p className="fw-bold">
                  {props?.universityDetails?.duration}
                  <span className="ml-2">Months</span>
                </p>
                <p>DURATION</p>
              </div>
            </div>
            <div className="d-flex align-items-start mb-2">
              <FaGraduationCap className="graduationIcon" />
              <div className="d-flex flex-column ">
                <p className="fw-bold">{props?.universityDetails?.level}</p>
                <p>LEVEL</p>
              </div>
            </div>
            <div className="d-flex align-items-start mb-2">
              <CalendarMonth className="infoIcon" />
              <div className="d-flex flex-column ">
                <p className="fw-bold">
                  {props?.universityDetails?.university?.intakes}
                </p>
                <p>INTAKES</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div> */}
        <Accordion
          id="courses"
          className="row mt-2 m-auto container"
          activeKey={activeKey}
          onSelect={(e) => setActiveKey(e)}
        >
          <Accordion.Item
            eventKey="0"
            className="courseBar px-2 py-2 pt-2 pb-2"
            style={{ background: "#A7E6FF", borderRadius: "20px" }}
          >
            <Accordion.Header
              onClick={() => setActiveKey(activeKey === "0" ? null : "0")}
            >
              <MdMenuBook style={{ fontSize: "1.5rem" }} />
              <span className="ml-2 ">Courses Offered</span>
            </Accordion.Header>
            <Accordion.Body
              ref={accordionRef}
              style={{
                overflowX: "scroll",
                padding: "2rem",
                display: "flex",
              }}
              id="accordionItem"
            >
              {course.length !== 0 &&
                course
                  .slice(0, visibleCourses) // use slice instead of splice to avoid mutating the original array
                  .map((elem, index) => (
                    <RelatedCourseCard
                      category={elem.category}
                      city={elem.city}
                      collegeRank={elem.collegeRank}
                      country={elem.country}
                      courseName={elem.courseName}
                      onClick={() => sendToUniverity(elem)}
                      universityLogo={elem.university?.universityLogo}
                      universityName={elem.universityName}
                      key={elem._id}
                    />
                  ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Scholarships */}
        <Accordion className="container mt-2" id="scholarship">
          <Accordion.Item
            className="courseBar px-2 py-2 pt-2 pb-2"
            style={{ background: "#A7E6FF", borderRadius: "20px" }}
          >
            <Accordion.Header
              style={{
                backgroundColor: "#A7E6FF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                // padding: "0.5rem 1rem",
              }}
            >
              <CurrencyExchange style={{ marginRight: "0.5rem" }} />
              Scholarships
            </Accordion.Header>
            <Accordion.Body style={{ padding: "2rem" }}>
              <ul style={{ color: "#fff", paddingLeft: "0", margin: "auto" }}>
                {props?.universityDetails?.university?.scholarships[0]
                  ?.split("- ")
                  .map((elem) => {
                    if (elem) {
                      return <li style={{fontSize:"1.2rem",color:"gray"}} key={elem}>👉 {elem}</li>;
                    }
                  })}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* SAFETY METER */}
        <div id="location" className="container mt-2">
          <div
            style={{
              paddingLeft: "2.5rem",
              background: "#A7E6FF",
              borderRadius: "20px",
              paddingTop: "1rem",
            }}
          >
            <div style={{fontSize:"1.2rem"}}>
              <PersonPin />
              Location Safety
            </div>
            <div
              style={{
                color: "gray",
                // fontWeight: "bold",
                fontSize: "1rem",
                paddingLeft: "1rem",
                paddingBottom: "1rem", // This applies padding at the bottom of the entire content
              }}
            >
              <span style={{ marginRight: "0.5rem" }}>Safety Meter</span>
              <span>
                {props?.universityDetails?.university?.securityPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Ranking */}
        <div
          id="ranking"
          className="d-flex flex-column container courseBar"
          style={{ marginTop: "1rem" }}
        >
          <div
            className="d-flex aling-items-center mb-2"
            style={{ fontSize: "1.2rem" }}
          >
            <FaRankingStar style={{ fontSize: "2rem" }} />
            <span className="ms-2"> Ranking Ranking</span>
          </div>
          <div className="d-flex  align-items-center mb-2">
            <img
              src="usNews.jpeg"
              style={{ width: "5rem", marginRight: "0.5rem" }}
              alt=""
            />
            <div
              style={{
                background: "#2A629A",
                height: "0.5rem",
                width: `${
                  (props?.universityDetails?.university?.usNewsRanking * 2) /
                  100
                }rem`,
                borderRadius: "10px",
                marginRight: "0.5rem",
              }}
            ></div>
            #{props?.universityDetails?.university?.usNewsRanking}
          </div>
          <div className="d-flex  align-items-center">
            <img
              src="qsWorld.png"
              style={{ width: "5rem", marginRight: "0.5rem" }}
              alt=""
            />
            <div
              style={{
                background: "#FFA62F",
                height: "0.5rem",
                width: `${
                  (props?.universityDetails?.university?.qsWorldRanking * 2) /
                  100
                }rem`,
                borderRadius: "10px",
                marginRight: "0.5rem",
              }}
            ></div>
            #{props?.universityDetails?.university?.qsWorldRanking}
          </div>
        </div>
      </div>
      {/* <TrendingSearches /> */}
      <Footer />
    </div>
  );
}

export default UniversityInfoSection;
