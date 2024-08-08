import React from 'react'
import "./Reviews.css"
import { Rating } from 'react-simple-star-rating'


function ReviewCard(props) {
  return (
    <div className='review-card mt-3'>
                  <div className='review-card-top'>
                      <img src={props.image} alt='person' />
                      <div className='review-card-top-right'>
                  <h6>{props.name}</h6>
                          <Rating readonly={true} size={18} initialValue={props.rating}/>
                      </div>
                  </div>
          <p> {props.review}</p>
          <p>{props.date}</p>
              </div>
  )
}

export default ReviewCard
