import React from "react";
import "./CustomerReview.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1115 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1114, min: 751 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 750, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

function CustomerReview() {
  return (
    <div className="customerReview-section container-fluid">
      <div className="customerReview container-xl">
        <div className="row pb-3">
          <div className="col-12 col-lg-6 customerReview-left">
            <h1>What Our Customer Say About Us ?</h1>
          </div>
          <div className="col-12 col-lg-6 customerReview-right">
            <h5>
              If you don’t trust us enough, take a look at the reviews from some
              of our users below. We hope it can help you in making your
              decision.
            </h5>
          </div>
        </div>

        <div className="row">
          <Carousel
            autoPlay={true}
            minimumTouchDrag={20}
            autoPlaySpeed={3000}
                      className="mt-4"
                      infinite={true}
            removeArrowOnDeviceType={["mobile"]}
                      responsive={responsive}
                      partialVisbile={true}
          >
           
           
                      {
                          Array(4).fill().map((item, index) => {
                              return  <div key={index} className="col-12 p-2">
              <div className="customerReview-card card">
                <p>
                  If you don’t trust us enough, take a look at the reviews from
                  some of our users below. We hope it can help you in making
                  your decision.If you don’t trust us enough, take a look at the
                  reviews
                </p>
                <hr style={{ borderColor: "#fff",margin:"10px 0" }} />
                <div className="customerReview-cardBottom">
                  <img
                    src={require("../../assets/images/person1.jpg")}
                    alt="customer"
                  />
                  <p>John Smith</p>
                </div>
              </div>
            </div>
                          })
           }
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default CustomerReview;
