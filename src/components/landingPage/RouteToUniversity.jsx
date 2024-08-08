import React from "react";
import "./RouteToUniversity.css";

function RouteToUniversity() {
  return (
    <div className="routeToUniversity-section">
      <div className="routeToUniversity container-xl">
        <div className="row mt-3">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="routeToUniversity-left">
              <img className="m-auto"
                src={"assets/images/High-quality-your-route-image.png"}
                alt="rtu"
              />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 d-flex justify-content-center align-items-center">
            <div className="routeToUniversity-right pt-4 pt-md-0">
              <h3>
                Your Route to Admissions, Accommodation, Loans, and Flights for
                <span> Global Education</span>
              </h3>
              <p>
                Embark on a transformative journey with our expert career
                counseling services, guiding you seamlessly through the
                intricacies of university admissions. Our dedicated team ensures
                personalized support, empowering you to make informed decisions
                for a successful academic future
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteToUniversity;
