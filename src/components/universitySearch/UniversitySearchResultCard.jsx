import { useCallback, useContext, useEffect, useState } from "react";
import "./UniversitySearch.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PlaceIcon from "@mui/icons-material/Place";
import { useNavigate } from "react-router";
import { Pagination } from "../Pagination/pagination";
import { GppGood, School } from "@mui/icons-material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { CircularProgress } from "@mui/material";
import { userMethod } from "../../userMethods/userMethod";
import { FILE_PATH } from "../../utils/apiConfig";
import { MdAllInclusive } from "react-icons/md";
import {
  MAIN_SITE_ACTIONS,
  MainSiteContext,
} from "../../context/MainSiteContext";

function UniversitySearchResultCard() {
  const {
    state: { unisFilter, contentBySearch },
    dispatch,
  } = useContext(MainSiteContext);
  const [universities, setUniversities] = useState([]);
  const [total, setTotal] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [loading, setIsLoading] = useState(false);
  const [filterPage, setFilterPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchPage, setSearchPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const uniDiv = document.getElementById("uniDiv");
  const nPages = Math.ceil(total / recordsPerPage);

  const navigate = useNavigate();

  const sendToUniversity = (item) => {
    navigate("/university", {
      state: item,
    });
  };

  const handleCategory = (category) => {
    if (contentBySearch?.isActive) {
      dispatch({
        type: MAIN_SITE_ACTIONS.GET_CONTENT_BY_SEARCH,
        payload: {
          ...contentBySearch,
          category: category,
        },
      });
      setSearchPage(1);
    } else if (selectedCategory === category) {
      setSelectedCategory("");
      setIsFilter(false);
    } else {
      setSelectedCategory(category);
      setIsFilter(true);
      setFilterPage(1);
    }
  };

  const categoryFilter = [
    {
      head: "All",
      icon: <MdAllInclusive />,
      color: "#009FBD",
      value: "",
    },
    {
      head: "Competitive",
      icon: <EmojiEventsIcon />,
      color: "#BC5A94",
      value: "Competitive",
    },
    {
      head: "Secure",
      icon: <GppGood />,
      color: "#F72798",
      value: "Secure",
    },
    {
      head: "Mediocre",
      icon: <GppGood />,
      color: "#00215E",
      value: "Moderate",
    },
  ];

  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, "");
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  useEffect(() => {
    if (!isFilter) {
      userMethod(
        `/get-courses?page=${currPage}&pageSize=${recordsPerPage}`,
        unisFilter,
        (data) => {
          setUniversities(data.courses);
          setTotal(data.total);
        },
        setIsLoading
      );
      window.scroll(0, 0);
    }
  }, [currPage, unisFilter, isFilter]);

  useEffect(() => {
    console.log(isSearch, selectedCategory, "I AM AHERE @");
    if (isFilter && selectedCategory && !contentBySearch?.isActive) {
      // console.log(filterPage, "FILTERPAGE");
      console.log("FILTER-PAGE");
      userMethod(
        `/get-course-by-category?page=${filterPage}&pageSize=${recordsPerPage}&category=${selectedCategory}`,
        unisFilter,
        (data) => {
          setUniversities(data.courses);
          setTotal(data.total);
        },
        setIsLoading
      );
      window.scroll(0, 0);
    } else if (
      isSearch &&
      contentBySearch?.category !== "" &&
      contentBySearch?.isActive
    ) {
      console.log(filterPage, "FILTERPAGE");
      userMethod(
        `/get-uni-by-search?page=${searchPage}&pageSize=${recordsPerPage}&category=${contentBySearch?.category}`,
        {
          searchData: contentBySearch?.data,
          filter: contentBySearch?.isUniversity,
        },
        (data) => {
          setUniversities(data?.data?.courses);
          setTotal(data?.data?.total);
        },
        setIsLoading
      );
      window.scroll(0, 0);
    }
  }, [
    filterPage,
    selectedCategory,
    contentBySearch,
    unisFilter,
    isFilter,
    searchPage,
  ]);

  useEffect(() => {
    if (uniDiv) {
      uniDiv.scroll(0, 0);
      uniDiv.addEventListener("scroll", () => {
        uniDiv.style.scrollBehavior = "smooth";
      });
    }
  }, [universities]);

  useEffect(() => {
    if (contentBySearch !== "" && contentBySearch?.category == "") {
      setIsSearch(true);
      // setSearchPage((prevPage) => prevPage + 1);
      userMethod(
        `/get-uni-by-search?page=${searchPage}&&pageSize=${recordsPerPage}`,
        {
          searchData: contentBySearch?.data,
          filter: contentBySearch?.isUniversity,
        },
        (data) => {
          setUniversities(data?.data?.courses);
          setTotal(data?.data?.total);
        },
        setIsLoading
      );
    } else {
      console.log("Working");
    }
  }, [contentBySearch, searchPage]);

  useEffect(() => {
    console.log(searchPage, "ISSEARCH");
  }, [searchPage]);

  const AvgFee = useCallback((item) => {
    const duration = item.duration.split(" ")[0];
    const avg = parseFloat(item.tuitionFeeOverall / (duration / 12)) || 0;
    return Math.round(avg);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-evenly categoryDiv">
        {categoryFilter.map((elem) => (
          <div
            key={elem.value}
            onClick={() => handleCategory(elem.value)}
            className={`${
              selectedCategory !== elem.value
                ? "d-flex p-2 m-2  align-items-center"
                : "d-flex btn btn-primary m-2  align-items-center"
            }`}
            style={{
              border: `2px solid ${elem.color}`,
              width: "fit-content",
              color: `${elem.color}`,
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor: `rgba(${hexToRgb(elem.color)}, 0.2)`,
            }}
          >
            {elem.icon}
            <p>{elem.head}</p>
          </div>
        ))}
      </div>
      {loading ? (
        <div className="d-flex justify-items-center items-center ">
          <CircularProgress />
        </div>
      ) : (
        <div
          style={{ height: "125vh", overflowY: "auto" }}
          id="uniDiv"
          className="py-4"
        >
          {universities?.length ? (
            universities?.map((elem) => (
              <div
                key={elem.id}
                className="universitySearchResultCard mt-3 ml-1 mr-1 shadow"
              >
                {/* {console.log(universities, "UNIVERSITY")} */}
                <div className="universitySearchResultCard-content">
                  <div className="categoryBtn">
                    <GppGood /> <span>{elem.category}</span>
                  </div>
                  <div className="d-flex">
                    <img
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "100%",
                      }}
                      src={FILE_PATH + elem.university.universityLogo}
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
                        {elem.courseName}
                      </h5>
                      <div className="uniNameAndCity">
                        <p>
                          <School />{" "}
                          <span
                            className="text-gray-200 mt-2 mb-2"
                            style={{ textTransform: "uppercase" }}
                          >
                            {elem.universityName}
                          </span>
                        </p>
                        <p>
                          <PlaceIcon style={{ color: "gray" }} /> {elem.country}{" "}
                          | {elem.city}
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
                          : `${AvgFee(elem)} ${
                              elem?.tuitionFeeOverallCurrency
                            }`}
                      </h6>
                    </div>
                    <div className="content-feature">
                      <p>University Ranking</p>
                      <h6>{elem.collegeRank}</h6>
                    </div>
                  </div>
                  <button
                    onClick={() => sendToUniversity(elem)}
                    className="universityKnowMoreBtn"
                    style={{ paddingLeft: "10px" }}
                  >
                    READ MORE{" "}
                    <span style={{ marginLeft: "5px" }}>
                      <KeyboardArrowRightIcon
                        className="border-2 border-white"
                        style={{
                          borderRadius: "100px",
                          height: "25px",
                          marginBottom: "1px",
                        }}
                      />
                    </span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center mt-5">
              No Courses Found! <br /> Please try different filters!
            </h1>
          )}
        </div>
      )}
      <div
        style={{ margin: "40px 0" }}
        className="w-full d-flex justify-items-center"
      >
        {isFilter ? (
          <Pagination
            currentPage={isFilter ? filterPage : currPage}
            setCurrentPage={isFilter ? setFilterPage : setCurrPage}
            nPages={nPages}
          />
        ) : (
          <Pagination
            currentPage={isSearch ? searchPage : currPage}
            setCurrentPage={isSearch ? setSearchPage : setCurrPage}
            nPages={nPages}
          />
        )}
      </div>
    </>
  );
}

export default UniversitySearchResultCard;
