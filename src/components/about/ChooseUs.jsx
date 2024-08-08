import React from "react";
import "./ChooseUs.css";

function ChooseUs() {
  return (
    <div className="chooseUs-section container-fluid">
      <div className="chooseUs container-xl">
        <h2>Why Choose Us</h2>
        <div className="row mt-2">
          <div className="col-12 col-lg-5 mt-3">
            <div className="choose-contents">
              <div className="choose-content">
                <button>1</button>
                <h4>
                  We provide the best choice of accommodation for you to stay.
                </h4>
                <p>
                  We always prioritize customer comfort and satisfaction. That’s
                  why we only accept the best hotels
                </p>
              </div>

              <div className="choose-content">
                <button>2</button>
                <h4>
                  We provide the best choice of accommodation for you to stay.
                </h4>
                <p>
                  We always prioritize customer comfort and satisfaction. That’s
                  why we only accept the best hotels
                </p>
              </div>

              <div className="choose-content">
                <button>3</button>
                <h4>
                  We provide the best choice of accommodation for you to stay.
                </h4>
                <p>
                  We always prioritize customer comfort and satisfaction. That’s
                  why we only accept the best hotels
                </p>
              </div>
            </div>
          </div>
                  <div className="col-12 col-sm-8 col-md-6 mt-3 col-lg-7 choose-right d-flex justify-content-end">
                      <img className="choose-img" src={require("../../assets/images/choosebg.jpg")} alt="choose" />
                      <img className="choose-sm-img" src={require("../../assets/images/choosesmall.jpg")} alt="choose"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
