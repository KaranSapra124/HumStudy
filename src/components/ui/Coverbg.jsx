import React from "react";
import "./Coverbg.css";
import { Link } from "react-router-dom";

function Coverbg(props) {
  return (
    <div className="cover ">
      <h1>{props.heading}</h1>
      {props.searchBar}
      <img
        src={require("../../assets/images/plane-cover-bg.jpg")}
        alt="coverimg"
      />
      <span className="text-white font-bold">
        Or wanna enquire about flights,{" "}
        <Link
          to={"/flight-enquiry"}
          className="text-blue-400 no-underline hover:text-purple-300"
        >
          Click Here
        </Link>
      </span>
    </div>
  );
}

export default Coverbg;
