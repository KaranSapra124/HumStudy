import React from 'react'
import "./Services.css"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Lottie from "lottie-react";
import { useNavigate } from 'react-router';


function Services(props) {
  const navigate = useNavigate();
  console.log(props,'SERVICES')

  return (
    <div className='services-section'>
          <div className='services container-xl'>
              <h4>Find Our Best Services</h4>
              <div className='row mt-2 services-cards'>
            
                  {props.services.map((service, index) => {
                      return <div key={index} className='col-12 col-sm-6 mt-3 ps-2'>
                      <div className='service' id={`ser${index+1}`}>
                          <div className='service-top'>
                                  <h5>{service.heading}</h5>
                                  <p>{service.content}</p>
                          </div>
                          <div className='service-bottom'>
                              <div className='service-btn' onClick={()=>navigate(service.link)}>
                                      <h6>{service.btnText}</h6>
                                  <div className='goto-icon'> <KeyboardArrowRightIcon /></div>
                              </div>
                              <div className='service-graphic'>
                              <Lottie animationData={service.animation} loop={true} />
                              </div>
                          </div>

                      </div>
                  </div>
                  })}
              </div>
        </div>
    </div>
  )
}

export default Services
