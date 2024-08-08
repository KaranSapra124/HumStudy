import React from 'react'
import "./Gallary.css"
import { Gallery } from "react-grid-gallery";

 


function Gallary(props) {
  return (
    <div className='gallary-section'>
          <div className='gallary container-xl'>
              <h5>Gallary</h5>
              <Gallery images={props.images} enableImageSelection={false} />
        </div>
    </div>
  )
}

export default Gallary
