import React, { useState } from "react";
import "./News.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function News() {
    const [active, setActive] = useState(1);

  return (
    <div className="news-section">
      <div className="news container-xl">
        <h4>Humstudy in News</h4>
        <div className="row mt-4">
          <div className="col-12 col-md-4">
                      <div className="news-tabs">
                      <div onClick={()=>setActive(1)} className={active===1?"news-tab active":"news-tab"}>
              <img className="ht-logo" src="../../assets/images/hindustantimes-removebg-preview.png" alt="ht"/>
              <KeyboardArrowRightIcon />
                          </div>
                      <div onClick={()=>setActive(2)} className={active===2?"news-tab active":"news-tab"}>
              <img className="ht-logo" src="../../assets/images/indian-exp.png" alt="indian express"/>
              <KeyboardArrowRightIcon />
                          </div>
                      <div onClick={()=>setActive(3)} className={active===3?"news-tab active":"news-tab"}>
              <img className="ht-logo" src="../../assets/images/hindustantimes-removebg-preview.png" alt="ht"/>
              <KeyboardArrowRightIcon />
                          </div>
                    
                          
            </div>
          </div>
                  <div className="col-12 col-md-8 news-right">
                      {active === 1 &&
                        <div className="news-content">
                          <h5> Humstudy featured on THE HINDUSTAN TIMES lorem ipsum lorem THE 
                              HINDU lorem ipsum lorem ..</h5>
                          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
aliquip ex ea commodo consequat. Duis aute irure dolor in 
                              reprehenderit in voluptate velit esse cillu...</p>
                          <p>Read more</p>
                        </div>}
                      {active === 2 &&
                        <div className="news-content">
                          <h5> Humstudy featured on INDIAN EXPRESS lorem ipsum lorem THE 
                              HINDU lorem ipsum lorem ..</h5>
                          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
aliquip ex ea commodo consequat. Duis aute irure dolor in 
                              reprehenderit in voluptate velit esse cillu...</p>
                          <p>Read more</p>
                        </div>}
                      {active === 3 &&
                        <div className="news-content">
                          <h5> Humstudy featured on THE HINDU lorem ipsum lorem THE 
                              HINDU lorem ipsum lorem ..</h5>
                          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
aliquip ex ea commodo consequat. Duis aute irure dolor in 
                              reprehenderit in voluptate velit esse cillu...</p>
                          <p>Read more</p>
                        </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
