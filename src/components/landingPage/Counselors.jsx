import React from "react";
import "./Counselors.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

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

const servicesArr = [
  {
    imgSrc: "./Services/Blue Bright Youtube Thumbnail.png",
    linkTo: "/find-university",
  },
  {
    imgSrc: "./Services/Blue Bright Youtube Thumbnail (1).png",
    linkTo: "/find-university",
  },
  {
    imgSrc: "./Services/Blue Bright Youtube Thumbnail (2).png",
    linkTo: "/flight-enquiry",
  },
  {
    imgSrc: "./Services/Blue Bright Youtube Thumbnail (3).png",
    linkTo: "/find-university",
  },
  {
    imgSrc: "./Services/Blue Bright Youtube Thumbnail (4).png",
    linkTo: "/find-university",
  },
  {
    imgSrc: "./Services/Blue Bright Youtube Thumbnail (5).png",
    linkTo: "/find-university",
  },
  {
    imgSrc: "./Services/Blue Bright Youtube Thumbnail (6).png",
    linkTo: "/find-university",
  },
];

function Counselors() {
  return (
    <div className="counselors-section">
      <div className="counselors container-xl">
        <h4>
          Our <span>Services</span>
        </h4>
        <Carousel
          autoPlay={true}
          minimumTouchDrag={20}
          showDots={false}
          autoPlaySpeed={3000}
          className="mt-4"
          removeArrowOnDeviceType={["mobile"]}
          responsive={responsive}
        >
          {servicesArr.map((elem, index) => {
            return (
              <>
                <div >
                  <Link to={elem.linkTo} >
                    <img className="serviceImg" src={elem.imgSrc} alt="Service Image" />
                  </Link>
                </div>
              </>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Counselors;
