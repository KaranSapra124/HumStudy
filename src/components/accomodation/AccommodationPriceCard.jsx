import React from "react";
import "./AccommodationPriceCard.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Select, Space } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "antd";

const roomList = [
  { value: "1", label: "1 Room" },
  { value: "2", label: "2 Room" },
  { value: "3", label: "3 Room" },
];
const guestList = [
  { value: "1", label: "1 Guest" },
  { value: "2", label: "2 Guest" },
  { value: "3", label: "3 Guest" },
  { value: "4", label: "4 Guest" },
  { value: "5", label: "5 Guest" },
  { value: "6", label: "6 Guest" },
];

function AccommodationPriceCard(props) {
  return (
    <div className="acc-price-card">
      <div>
        <h5 style={{ margin: "0px" }}>{props.heading}</h5>
        <p>{props.subheading}</p>
      </div>
      <div className="acc-input mt-1">
        <DatePicker placement="bottomLeft" className="input" />
      </div>
      <div className="acc-input type-input">
        <Select
          defaultValue="1"
                  className="input"
                  placeholder="No. of Room"
          //   onChange={handleChange}
          options={roomList}
        />
        <Select
          defaultValue="2"
                  className="input"
                  placeholder="No. of Guest"
          //   onChange={handleChange}
          options={guestList}
        />
        
      </div>
      <div></div>
      <div className="acc-input mt-1">
        <hr />
        <div className="d-flex justify-content-between mb-2 price-bar">
          <p>Total Price</p>
          <h6>Rs. 3990</h6>
        </div>
        <Button variant="contained" className="input acc-btn" color="success">
          Success
        </Button>
      </div>
      <p>
        By submitting you agree to our <span>Terms & Condition</span>
      </p>
    </div>
  );
}

export default AccommodationPriceCard;
