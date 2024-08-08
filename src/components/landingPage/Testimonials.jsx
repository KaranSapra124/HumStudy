import React from "react";
import "./Testimonials.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

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

const testimonialArr = [
  "./Testimonials/Blue Bright Youtube Thumbnail - 10.png",
  "./Testimonials/Blue Bright Youtube Thumbnail - 11.png",
  "./Testimonials/Blue Bright Youtube Thumbnail - 12.png",
  "./Testimonials/Blue Bright Youtube Thumbnail.png",

];

function Testimonials() {
  return (
    <div className="testimonials-section">
      <div className="testimonials container-xl">
        <h4>
          Our <span>Testimonials</span>
        </h4>

        <Carousel
          infinite={true}
          autoPlay={true}
          minimumTouchDrag={20}
          showDots={false}
          autoPlaySpeed={3000}
          removeArrowOnDeviceType={["mobile"]}
          className="mt-3"
          responsive={responsive}
        >
          {testimonialArr.map((testimonial, index) => {
            return (
              <div className="testimonial " id={`testimonial-${index + 1}`}>
                <img
                  src={testimonial}
                  alt="testimonial"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Testimonials;
