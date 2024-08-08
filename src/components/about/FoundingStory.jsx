import React from "react";
import "./FoundingStory.css";

function FoundingStory() {
  return (
    <div className="about-section fluid-container">
      <div className="about container-xl">
        <h2>Our Founding Story</h2>
        <div className="row mt-2 about-row gy-3">
          <div className="col-12 col-md-7 about-left">
            <p>
              Apple was founded on April 1, 1976, by Steve Jobs, Steve Wozniak,
              and Ronald Wayne. The company was originally called Apple Computer
              Company and was founded in Jobs' garage in Cupertino, California.
              The three founders had a vision of creating a computer that was
              user-friendly and accessible to everyone. 
            </p>
            <p>
                Their first product was
              the Apple I, which was a kit computer that users had to assemble
              themselves. The Apple II, which was released in 1977, was a more
              complete computer that became a commercial success. Apple went
              public in 1980 and quickly became one of the leading computer
              companies in the world.
            </p>
          </div>
          <div className="col-11 col-sm-8 col-md-5 ">
            <img className="about-img w-100" src={require("../../assets/images/about.png")} alt="about" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoundingStory;
