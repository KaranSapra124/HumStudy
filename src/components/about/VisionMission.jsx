import React from "react";
import "./VisionMission.css";

function VisionMission() {
  return (
    <div className="visionMission-section">
      <div className="visionMission container-xl  mb-3">
              <div className="row vision-row">
                  <div className="col-12 col-lg-6 visionMission-left">
                      <img src={require("../../assets/images/team.jpg")} alt="vision"/>
                  </div>
                  <div className="col-12 col-lg-6 visionMission-right pt-3">
                      <h2>Our Vision</h2>
                      <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum 
Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum 
Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                          Lorem ipsum Lorem ipsum </p>
                      <br/>
                     
                  </div>
        </div>
      </div>
      <div className="visionMission container-xl mt-5 mt-sm-3">
              <div className="row d-flex justify-content-between">
                  <div className="col-12 col-lg-6 visionMission-right pt-3">
                      <h2>Our Mission</h2>
                      <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum Lorem ipsum 
Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum 
Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                          Lorem ipsum Lorem ipsum </p>
                      <br/>
                     
                  </div>
                  <div className="col-12 col-lg-6 d-flex justify-content-end visionMission-left">
                      <img src={require("../../assets/images/team.jpg")} alt="vision"/>
                  </div>
        </div>
      </div>
    </div>
  );
}

export default VisionMission;
