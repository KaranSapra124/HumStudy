import React, { useState } from 'react'
import "./FlightSearchBar.css"
import "./UniversitySearchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from 'antd';
import { Select, Space } from "antd";

const optionList = [
  { value: "Delhi", label: "Delhi" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Chennai", label: "Chennai" },
  { value: "Bangalore", label: "Bangalore" },
  { value: "Kolkata", label: "Kolkata" },
];




function FlightSearchBar() {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
      <div className="universitySearchBar">
        <h5>Search Flight</h5>
        <p>Search for Flights to persue your Academic Dream.</p>
        <div className="searchBar-items mt-3">
                <div className="row">
                <div className="searchBar-item col-12 col-sm-6 col-md-3 col-lg-4 mt-2">
                <Select
              style={{width:"100%"}}
              onChange={setSelectedOption}
              className="searchBar-input"
              showSearch
              placeholder="Select Departure City"
              //   onChange={handleChange}
              options={optionList}
              />
            </div>
          <div className="searchBar-item col-12 col-sm-6 col-md-3 mt-2">
          <Select
              style={{width:"100%"}}
              onChange={setSelectedOption}
              className="searchBar-input"
              showSearch
              placeholder="Select Arrival City"
              //   onChange={handleChange}
              options={optionList}
              />
            </div>
          <div className="searchBar-item col-12 col-sm-12 col-md-3  mt-2">
          <DatePicker  placement='bottomLeft'/>
          </div>
          <div className="searchBar-item col-12 col-md-3 col-lg-2 mt-2">
            <button className="universitySearch-btn"><SearchIcon /> Search</button>
          </div>
          </div>
            </div>
      </div>
  )
}

export default FlightSearchBar
