import React from "react";
import { Checkbox } from "antd";
import "./PlanKnowMore.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function AddOnServiceCard(props) {
  return (
    <label htmlFor="loan" className="ms-2 planPrice mt-2">
      {!props.inDashboard && (
        <Checkbox
          style={{
            position: "absolute",
            top: "-5px",
            left: "-5px",
            border: "none",
          }}
          type="checkbox"
          // checked
          value="loan"
          checked={props?.services[props?.name]}
          // onChange={props.setServices("loanAssistance")}
          id="loan"
        ></Checkbox>
      )}
      <div className="d-flex align-items-center  planPrice-card ">
        <img
         className="addOnImg"
          src={props.img}
          alt="town"
        />
        <div className="ps-4 planPriceCard-content">
          <h5 className="m-0">{props?.heading}</h5>
          <p>{props?.description}</p>
          {!props.inDashboard && (
            <button
              className="add-btn"
              onClick={() => props?.setServices(props?.name)}
            >
              {!props?.services[props.name] ? "Add" : "Remove"}{" "}
              {!props?.services[props.name] ? (
                <AddIcon style={{ fontSize: "16px" }} />
              ) : (
                <RemoveIcon style={{ fontSize: "16px" }} />
              )}
            </button>
          )}
        </div>
      </div>
    </label>
  );
}

export default AddOnServiceCard;
