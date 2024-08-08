import { Switch } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UniversitySearch.css";
import { ClearIcon } from "@mui/x-date-pickers";
import { Search, SearchOutlined } from "@mui/icons-material";
import { userMethod } from "../../userMethods/userMethod";
import {
  MAIN_SITE_ACTIONS,
  MainSiteContext,
} from "../../context/MainSiteContext";

const UniversitySearchBox = ({ Login }) => {
  const [filter, showFilter] = useState(false);
  const [isUniversity, setIsUniversity] = useState(true);
  const [searchInp, setSearchInp] = useState("");
  const [isText, setIsText] = useState(false);
  const { state, dispatch } = useContext(MainSiteContext);

  // console.log(state, "UNIVERSITY");

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch({
      type: MAIN_SITE_ACTIONS.GET_CONTENT_BY_SEARCH,
      payload: {
        data: searchInp,
        isUniversity: isUniversity ? "university" : "course",
        category: "",
        isActive: true,
      },
    });
    setIsText(!isText);
    // userMethod(
    //   `/get-uni-by-search?page=${1}&&pageEnd=${10}`,
    //   {
    //     searchData: searchInp,
    //     filter: isUniversity ? "university" : "course",
    //   },
    //   null,
    //   null
    // );
  };

  useEffect(() => {
    setSearchInp("");
  }, [isText]);

  return (
    <form className="container mt-4 mb-2" onSubmit={handleSearch}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className={Login?.isLogin ? "hidden" : "hide-filter-bar"}>
          <ClearIcon onClick={() => showFilter(false)} className="closeIcon" />
          <div>
            <img
              width={"100px"}
              src="assets/images/filter-lock.png"
              alt="lock"
            />
            <h5>Login to use Filters</h5>
            <button
              // onClick={() => props.setLogin(true)}
              className="filter-login-btn"
            >
              Login
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <h5>Search By University</h5>
          <Switch
            style={{ left: "0.5rem" }}
            checkedChildren="University"
            unCheckedChildren="Course"
            className="font-weight-bold"
            defaultChecked
            onChange={() => setIsUniversity(!isUniversity)}
          />
        </div>
      </div>
      <div className="d-flex">
        <input
          required
          onChange={(e) => {
            setSearchInp(e.target.value);
          }}
          value={searchInp}
          type="text"
          placeholder={
            isUniversity ? "Enter the university..." : "Enter the course..."
          }
          className="form-control"
        />
        <button type="submit" className="mx-2 searchCss">
          {/* <span className="input-group-text"> */}
          <SearchOutlined />
          {/* </span> */}
        </button>
      </div>
    </form>
  );
};

export default UniversitySearchBox;
