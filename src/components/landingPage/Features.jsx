import React from "react";
import "./Features.css";

const features = [
  {
    image: "assets/icons/bed.png",
    heading: "10+ Beds",
    content: "Discover Over 10,000 Beds Await to Suit Your Every Stay",
  },
  {
    image: "assets/icons/school.png",
    heading: "100+ Universities",
    content: "Offering Diverse Selections for Your Dream course.",
  },
  {
    image: "assets/icons/graduated.png",
    heading: "25+ Students",
    content: "Join a Community of Students studying all over the world.",
  },
  {
    image: "assets/icons/star.png",
    heading: "4.9/5 Rating",
    content: "Reflecting Exceptional Experiences and Happy Guests.",
  },
];

function Features() {
  return (
    <div className="features-section">
      <div className="features container-xl">
        <div className="row">
          {features.map((feature, index) => {
            return (
              <div key={index} className="col-3 col-sm-6 col-lg-3">
                <div className="feature mt-3">
                  <img src={feature.image} alt="beds" />
                  <h4>{feature.heading}</h4>
                  <p>{feature.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Features;
