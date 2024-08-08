import React from "react";
import "./carousel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  mobile: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

function ImageCarousel(props) {
  return (
    // <Carousel responsive={responsive}>
    //   {props?.images?.map((img, index) => {
    //     return (
    //       <div key={index} className="university-slider ">
    //         <img
    //           className="slider-img"
    //           src={require("../../assets/images/university.jpg")}
    //           alt="university"
    //         />
    //       </div>
    //     );
    //   })}
    // </Carousel>
    <>No Image</>
  );
}
//     <Carousel responsive={responsive}>
//     <div className="university-slider">
//       <img
//         className="university-slider-img"
//         src={require("../../assets/images/university.jpg")}
//         alt="university"
//       />
//     </div>
//     <div className="university-slider">
//       <img
//         className="university-slider-img"
//         src={require("../../assets/images/university.jpg")}
//         alt="university"
//       />
//     </div>
//   </Carousel>

export default ImageCarousel;
