import React from 'react'
import "./UniversityInfoBar.css"


function UniversityInfoBar(props) {
  // console.log(props,"DETAILS")
    return (
      <div className='universityInfoBar-section' >
         {props.details.GMAT}
    </div>
  )
}

export default UniversityInfoBar
