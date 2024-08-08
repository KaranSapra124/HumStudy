import React from 'react'
import "./AmenitiesBar.css"


function AmenitiesBar(props) {
  return (
      <div className='amenitiesBar-section' >
           <div className='amenitiesBar container-xl'>
          <h5>Amenities</h5>
          <div className='amenities '>
          {props.amenities.map((amenity, index) => {
              return  <div key={index} className='amenity '>
                  {amenity.icon}
                  <p>{amenity.content}</p>
              </div>
          })}
          </div>    
      </div>
     </div>
  )
}

export default AmenitiesBar
