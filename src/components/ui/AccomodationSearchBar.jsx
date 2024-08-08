import React from 'react'
import "./AccomodationSearchBar.css"
import { Select, Space } from "antd";
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from 'antd';
import { useState } from 'react';

const optionList = [
    { value: "Delhi", label: "Delhi" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Chennai", label: "Chennai" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Kolkata", label: "Kolkata" },
  ];
  

function AccomodationSearchBar() {
    const [selectedOption, setSelectedOption] = useState(null);

  return (
    
    <div className="universitySearchBar">
    <h5>Search Accommodation</h5>
    <p>Search for perfect stay newar your university.</p>
    <div className="searchBar-items mt-3">
            <div className="row">
            <div className="searchBar-item col-12  col-md-3 col-lg-4 mt-2">
            <Select
              style={{width:"100%"}}
              onChange={setSelectedOption}
              className="searchBar-input"
              showSearch
              placeholder="Search Accommodation"
              //   onChange={handleChange}
              options={optionList}
              />
      </div>
      <div className="searchBar-item col-12 col-sm-6 col-md-3 mt-2">
      <DatePicker placeholder='Check in'  placement='bottomLeft'/>
      </div>
      <div className="searchBar-item col-12 col-sm-6 col-md-3  mt-2">
      <Select
              style={{width:"100%"}}
              onChange={setSelectedOption}
              className="searchBar-input"
              placeholder="No. of Guest"
              //   onChange={handleChange}
              options={optionList}
              />
      </div>
      <div className="searchBar-item col-12 col-md-3 col-lg-2 mt-2">
        <button className="universitySearch-btn"><SearchIcon /> Search</button>
      </div>
      </div>
        </div>
  </div>
  )
}

export default AccomodationSearchBar
