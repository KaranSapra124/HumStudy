import React, { useEffect, useState } from "react";
import "./PlanKnowMore.css";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Checkbox } from "antd";
import { Button } from "react-bootstrap";
import PlanPriceCard from "./PlanPriceCard";
import { Modal } from "antd";



function SelectPlan(props) {
  console.log(props,"PROP")
    const initialCheckboxValues = Object.fromEntries(
        props.planDetails?.notes.map((_, index) => [`noteCheckbox${index}`, false])
        .concat([[`noteCheckbox${props.planDetails?.notes.length || 0}`, false]])
      );
    const [checkboxValues, setCheckboxValues] = useState(initialCheckboxValues);

    const handleCheckboxChange = (id) => {
      setCheckboxValues((prevValues) => ({
        ...prevValues,
        [id]: !prevValues[id],
      }));
    };
  
    const areAllCheckboxesChecked = () => {
      return Object.values(checkboxValues).every((value) => value);
    };
  
    useEffect(() => {
        console.log(areAllCheckboxesChecked());
      if (areAllCheckboxesChecked()) {
          props.setTermsAccepted(true);
        } else {
          props.setTermsAccepted(false);
      }
    }, [checkboxValues, props]);




  return (
    <form id="termsForm" >
      <div className="mt-3">
        <h6>Refund Condition</h6>
        <ol>
          {props.planDetails?.refundConditions.map((condition, index) => {
            return <li key={index}>{condition}</li>;
          })}
        </ol>
      </div>
      <div className="mt-3">
        <h6>Important Note</h6>
        {props.planDetails?.notes.map((note, index) => (
        <div key={index} className="d-flex align-items-start">
          <input
            className="mt-1"
            style={{ cursor: "pointer" }}
            type="checkbox"
            id={`noteCheckbox${index}`}
            onChange={() => handleCheckboxChange(`noteCheckbox${index}`)}
            checked={checkboxValues[`noteCheckbox${index}`]}
          />
          <label htmlFor={`noteCheckbox${index}`} className="ps-1">
            {note}
          </label>
        </div>
      ))}
      </div>
      <div className="mt-3">
        {/* <Checkbox >By selecting the premium package, you agree to these terms, ensuring a
          transparent and supportive experience during your application journey.</Checkbox> */}

        <div className="d-flex align-items-start">
          <input
            className="mt-1"
            type="checkbox"
            id={`noteCheckbox${props.planDetails?.notes.length}`}
                required
                style={{ cursor: "pointer" }}
                onChange={() => handleCheckboxChange(`noteCheckbox${props.planDetails?.notes.length}`)}
                checked={checkboxValues[`noteCheckbox${props.planDetails?.notes.length}`]}
          />
          <label htmlFor={`noteCheckbox${props.planDetails?.notes.length}`} className="ps-1">
            {" "}
            {props.planDetails.terms}
          </label>
        </div>
      </div>
    </form>
  );
}

export default SelectPlan;
