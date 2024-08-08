import React, { useEffect } from "react";
import { Checkbox } from "antd";
import "./PlanKnowMore.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddOnServiceCard from "./AddOnServiceCard";

function PlanPriceCard(props) {
  return (
    <div className="loadKnowMore-div">
      <h4>Cart</h4>
      <h6>Add Free in Your Cart and and joy free assistance </h6>
      <div className="card mb-2">
        <AddOnServiceCard
          heading="Add Loan Assistance"
          description="Interest rate starts from 8.5%"
          name="loanAssistance"
          services={props.services}
          setServices={props.setServices}
          img="assets/icons/loan.png"
        />
      </div>
      <div className="card mb-2">
        <AddOnServiceCard
          heading="Avail Safe and Secure Flights"
          description="International Flight Starting from 30,000 only"
          name="flight"
          services={props.services}
          setServices={props.setServices}
          img="assets/icons/airplane.png"
        />
      </div>
      <div className="card mb-2">
        <AddOnServiceCard
          heading="Get Safe & Verified Property"
          description="For you & your love ones"
          name="accommodation"
          services={props.services}
          setServices={props.setServices}
          img="assets/icons/bed.png"
        />
      </div>

      <div className="card mb-2">
        <AddOnServiceCard
          heading="Best Forex Card "
          description="Add high discounted rate"
          name="forexCard"
          services={props.services}
          setServices={props.setServices}
          img="assets/icons/forex.png"
        />
      </div>

      <div className="mt-2 d-flex">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Item</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ border: "1px solid #ddd" }}>
              <td style={{ borderRight: "1px solid #ddd", padding: "8px" }}>
                {props.planDetails.title} Plan Price
              </td>
              <td
                className="d-flex align-items-center"
                style={{ padding: "8px" }}
              >
                {props.planDetails.price}{" "}
                <span
                  className="ps-2"
                  style={{ textDecoration: "line-through", fontSize: "11px" }}
                >
                  {props.planDetails.originalPrice}
                </span>
              </td>{" "}
              {/* Replace plan.price with the actual price */}
            </tr>
            <tr style={{ border: "1px solid #ddd" }}>
              <td style={{ borderRight: "1px solid #ddd", padding: "8px" }}>
                GST
              </td>
              <td style={{ padding: "8px" }}>
                {Math.round((props.planDetails.price * 18) / 100)}(18%)
              </td>{" "}
              {/* Replace calculateGST with your GST calculation logic */}
            </tr>
            <tr style={{ border: "1px solid #ddd" }}>
              <td style={{ borderRight: "1px solid #ddd", padding: "8px" }}>
                Total
              </td>
              <td style={{ padding: "8px" }}>{props.planDetails.price+Math.round((props.planDetails.price * 18) / 100)}</td>{" "}
              {/* Replace calculateTotal with your total calculation logic */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlanPriceCard;
