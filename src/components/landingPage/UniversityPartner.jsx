import React from "react";
import "./UniversityPartner.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1201 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 1200, min: 0 },
    items: 1,
  },
};

function UniversityPartner() {
  return (
    <div className="universityPartner-section pb-5 ">
      <div className="universityPartner container-xl">
        <h4>Our <span>University Partner</span></h4>
        <Carousel infinite={true}  removeArrowOnDeviceType={["mobile"]}  responsive={responsive}>
          <div className="row mt-3">
            <div className="col-6 d-flex justify-content-center">
              <img
                className="university-partner-img"
                src="assets/images/university-partner1.png"
                alt="university-partner1"
              />
            </div>
            <div className="col-6 d-flex justify-content-center">
              <img
                className="university-partner-img"
                src="assets/images/university-partner2.png"
                alt="university-partner1"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6 d-flex justify-content-center">
              <img
                className="university-partner-img"
                src="assets/images/university-partner3.png"
                alt="university-partner1"
              />
            </div>
            <div className="col-6 d-flex justify-content-center">
              <img
                className="university-partner-img"
                src="assets/images/university-partner4.png"
                alt="university-partner1"
              />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default UniversityPartner;
