import { Divider } from "antd";
import React from "react";
import AddOnServiceCard from "../landingPage/AddOnServiceCard";

const style = {
  color: "#454545",
};

const addOnServices = [
  {
    heading: "Add Loan Assistance",
    description: "Interest rate starts from 8.5%",
    name: "loanAssistance",
    inDashboard: "true",
    img: "assets/icons/loan.png",
  },
  {
    heading: "Avail Safe and Secure Flights",
    description: "International Flight Starting from 30,000 only",
    name: "flight",
    inDashboard: "true",
    img: "assets/icons/airplane.png",
  },
  {
    heading: "Get Safe & Verified Property",
    description: "For you & your love ones",
    name: "accommodation",
    inDashboard: "true",
    img: "assets/icons/bed.png",
  },
  {
    heading: "Best Forex Card ",
    description: "Add high discounted rate",
    name: "forexCard",
    inDashboard: "true",
    img: "assets/icons/forex.png",
  },
];

function DashboadPackage({ plan }) {
  return (
    <div>
      <div className="mt-3 mb-3">
        <h6>Add on services available</h6>
        <div className="row pt-1 ">
          {addOnServices.map((service, index) => {
            return (
              <div className="col-12 col-md-4 col-lg-3 mb-2">
                <div className="card">
                  <AddOnServiceCard
                    heading={service.heading}
                    description={service.description}
                    name={service.loan}
                    inDashboard={service.inDashboard}
                    img={service.img}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <h6 style={style}>{plan?.name} Package</h6>
        <h6 style={style}>{plan?.price}</h6>
      </div>
      {/* <div className="d-flex justify-content-between">
        <h6 style={style}>GST (18%)</h6>
        <h6 style={style}>1800</h6>
      </div> */}
      <Divider />
      <div className="d-flex justify-content-between">
        <h6 style={style}>Total</h6>
        <h6 style={style}>{plan?.price}</h6>
      </div>
    </div>
  );
}

export default DashboadPackage;
