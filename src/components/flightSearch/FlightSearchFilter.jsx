import React, { useEffect, useState } from "react";
import "./FlightSearch.css";
import { Slider } from "antd";
import Select from "react-select";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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

function FlightSearchFilter(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [filter, showFilter] = useState(false);

  useEffect(() => {
    showFilter(props.filter);
  }, [props.filter]);

  return (
    <div className={filter ? "filter-bar active" : "filter-bar"}>
      <div className="filter-top-bar">
        <h5>Filters</h5>
        <p>Clear All</p>
      </div>
      <p>Fare</p>
      <Slider
        min={1000}
        max={10000}
        range={{
          draggableTrack: true,
        }}
        defaultValue={[2000, 8000]}
      />
      <div className="filter-price-bar">
        <p>2000</p>
        <p>8000</p>
      </div>
      <div className="filter-item">
        <p>Stop</p>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Non Stop"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="1 Stop"
          />
        </FormGroup>
      </div>
      <div className="filter-item">
        <p>Airline</p>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Air India"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Akasa Air"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Indigo"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="SpiceJet"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Vistara"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Emirates"
          />
        </FormGroup>
      </div>
      
      
     
      <div className="filter-btn-bar">
        <Button onClick={() => showFilter(false)} variant="outlined">
          Cancel
        </Button>
        <Button variant="contained" color="success">
          Apply
        </Button>
      </div>
    </div>
  );
}

export default FlightSearchFilter;
