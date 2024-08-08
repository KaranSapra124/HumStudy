import React, { useEffect, useState } from "react";
import "./PlanKnowMore.css";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Checkbox, Divider } from "antd";
import { Button } from "react-bootstrap";
import PlanPriceCard from "./PlanPriceCard";
import { Modal } from "antd";

function PlanKnowMore(props) {

 

  const handleCancel = () => {
    props.setPrice(false);
  };



  return (
    <div className="loadKnowMore-div">
      <h5>{props.planDetails?.title}</h5>
      <Divider />
      {props.planDetails?.content.map((detail, index) => {
        return (
          <div key={index} className="mt-3">
            <h6>{detail?.title}</h6>
            <p>{detail?.description}</p>
          </div>
        );
      })}

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
        {props.planDetails?.notes.map((note, index) => {
          return (
            <div key={index} className="d-flex mt-1">
              <PushPinIcon
                style={{ color: "#D23706", marginTop: "3px", fontSize: "17px" }}
              />
              <p>{note}</p>
            </div>
          );
        })}
      </div>
     

      {/* <Modal
              onCancel={handleCancel}
              centered
        footer={[
          <div className="mt-3 w-100 d-flex justify-content-between">
            <Button
              className="me-auto"
              variant="outlined"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            ,
            <Button
              className="nextBtn"
              variant="primary"
              type="submit"
              //   disabled={!termsAccepted}
            >
              Pay
            </Button>
            ,
          </div>,
              ]}
              // open={false}
        open={props.price===props.planDetails?.title}
      >
        <PlanPriceCard />
      </Modal> */}
    </div>
  );
}

export default PlanKnowMore;
