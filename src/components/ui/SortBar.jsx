import React, { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import "./SortBar.css";

function SortBar(props) {
  const [sortItem, setSortItem] = useState(1);
  const [filter, showFilter] = useState(false);

  return (
    <div className="sort-bar">
      <h5>
        <SortIcon /> Sort by :
      </h5>
      <div className="sort-items">
        {props.sortValues.map((value, index) => {
          return (
            <button
              key={index}
              onClick={() => setSortItem(index)}
              className={sortItem === index ? "sort-item active" : "sort-item"}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SortBar;
