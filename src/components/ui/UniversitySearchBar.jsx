import React, { useState } from "react";
import "./UniversitySearchBar.css";
// import Select from "react-select";
import { Select, Space } from "antd";
import SearchIcon from "@mui/icons-material/Search";

const optionList = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "blue", label: "Blue" },
  { value: "white", label: "White" },
];

const degreeList = [
  { value: "bachelor", label: "Bachelor" },
  { value: "master", label: "Master" },
  { value: "phD", label: "PhD" },
];

function UniversitySearchBar() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="universitySearchBar">
      <h5>Search University</h5>
      <p>Search your Dream University by Degree Course University.</p>
      <div className="searchBar-items mt-3">
        <div className="row">
          <div className="searchBar-item col-12  col-md-3 col-lg-4 mt-2">
            
            <Select
              style={{width:"100%"}}
              onChange={setSelectedOption}
              className="searchBar-input"
              showSearch
              placeholder="Select University"
              //   onChange={handleChange}
              options={optionList}
            />
          </div>
          <div className="searchBar-item col-12 col-sm-6 col-md-3 mt-2">
            <Select
              style={{width:"100%"}}
              isSearchable={false}
              options={degreeList}
              placeholder="Select Degree"
              className="searchBar-input"
              onChange={setSelectedOption}
            />
          </div>
          <div className="searchBar-item col-12 col-sm-6 col-md-3  mt-2">
            <Select
              style={{width:"100%"}}
              mode="multiple"
              options={optionList}
              placeholder="Select Course"
              className="searchBar-input"
              onChange={setSelectedOption}
            />
          </div>
          <div className="searchBar-item col-12  col-md-3 col-lg-2 mt-2">
            <button className="universitySearch-btn">
              <SearchIcon /> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversitySearchBar;
