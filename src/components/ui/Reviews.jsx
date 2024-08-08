import React from "react";
import "./Reviews.css";
import ReviewCard from "./ReviewCard";

function Reviews(props) {
  return (
    <div className="reviews-section">
      <div className="reviews container-xl">
        <h5>Reviews</h5>
        {/* {props.reviews.map((review, index) => {
          return (
            <>
              <ReviewCard
                image={review.img}
                name={review.name}
                rating={review.rating}
                review={review.review}
              />
              <hr />
            </>
          );
        })} */}
      </div>
    </div>
  );
}

export default Reviews;
