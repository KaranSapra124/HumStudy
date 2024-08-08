import React from "react";
import "./BestService.css";

function BestService() {
  return (
    <div className="bestService-section">
      <div className="bestService container-xl mt-3">
        <div className="row bestService-row">
          <div className="col-12 col-lg-6 bestService-left">
            <img src={require("../../assets/images/customer.jpg")} alt="vision" />
          </div>
          <div className="col-12 col-lg-6 bestService-right pt-3">
            <h2>We Take you to the Best Service</h2>
            <p>
              Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
              ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
              Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
              ipsum Lorem ipsum Lorem ipsum
                      </p>
                      <div className="best-services">
                          <div className="best-service">
                              <h1>150+</h1>
                              <p>Universities</p>
                          </div>
                          <div className="best-service">
                              <h1>2k+</h1>
                              <p>Hotels</p>
                          </div>
                          <div className="best-service">
                              <h1>15k+</h1>
                              <p>Students</p>
                          </div>
                </div>      
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestService;
