import React, { useEffect, useState } from 'react'
import { Slider } from "antd";
import { Select, Space } from "antd";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ClearIcon from '@mui/icons-material/Clear';


const optionList = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "blue", label: "Blue" },
  { value: "white", label: "White" },
];



function AccommodationSearchFilter(props) {
    const [selectedOption, setSelectedOption] = useState(null);
  const [filter, showFilter] = useState(false);
  
    
    useEffect(() => {
        showFilter(props.filter);
    },[props.filter])

  return (
    <div className={filter ? "filter-bar active" : "filter-bar"} >
        <div className="hide-filter-bar">
          <ClearIcon onClick={() => showFilter(false)} className="closeIcon" />
        <div>
          <img width={'100px'} src="assets/images/filter-lock.png" alt="lock"/>
          <h5>Login to use Filters</h5>
          <button onClick={()=>props.setLogin(true)} className="filter-login-btn">Login</button>
        </div>
      </div>
          <div className="filter-top-bar">
              <h5>Filters</h5>
              <p>Clear All</p>
      </div>
      <h6>Price</h6>
      <Slider
        min={100000}
        max={1000000}
        range={{
          draggableTrack: true,
        }}
        defaultValue={[200000, 800000]}
          />
          <div className="filter-price-bar">
              <p>500000</p>
              <p>800000</p>
          </div>
      <div className="filter-item">
        <p>City</p>
        <Select
              style={{width:"100%"}}
              onChange={setSelectedOption}
              className="searchBar-input"
              showSearch
              placeholder="Select City"
              //   onChange={handleChange}
              options={optionList}
              />
      </div>
      <div className="filter-item">
        <p>Room type</p>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Single"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Double"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Shared"
          />
        </FormGroup>
      </div>
      <div className="filter-item">
        <p>Property Rating</p>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="1 or above"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="2 or above"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="3 or above"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="4 or above"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="5"
          />
        </FormGroup>
      </div>
      
          <div className="filter-btn-bar">
          <Button onClick={()=>showFilter(false)} variant="outlined" >
        Cancel
      </Button>
      <Button variant="contained" color="success">
        Apply
      </Button>
      </div>
    </div>
  )
}

export default AccommodationSearchFilter
