import React, { useState } from 'react'
import "./FlightSearchResultCard.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function FlightSearchResultCard() {
    const [flightDetail, setFlightDetail] = useState(false);
    const [flightBtn, setFlightBtn] = useState(1)

  return (
      <div className='flightSearchResultCard mt-3'>
          <div className='row w-100'>
              <div className='col-12  col-lg-2 airline-logo-div'>
                  <img className='airline-logo' src={require("../../assets/icons/akasa-removebg-preview.png")} alt='airline' />
                  <h6>Akasa Air</h6>
              </div>
              <div className='col-12 col-md-12 col-lg-7' style={{paddingRight:"0"}}>
                  <div className='flight-overview row w-100'>
                      <div className='flightFrom col-4 col-sm-3 col-lg-2'>
                            <p>Friday</p>
                          <p className='flight-time'>07:00 PM</p>
                          <h6>DEL</h6>
                      </div>
                      <div className='flightDuration col-4 col-sm-5  '>
                          <p>Duration : <span>2hr 30 min</span></p>
                          <hr />
                          <p>Direct</p>
                      </div>
                      <div className='flightTo col-4 col-sm-4 col-xl-5 d-flex justify-content-center'>
                          <div>
                          <p>Saturday</p>
                          <p className='flight-time'>08:00 PM</p>
                          <h6>BGL</h6>
                          </div>
                      </div>

                  </div>
              </div>
              <div className='col-12 col-md-12 col-lg-3'>
              <div className='flightPrice  d-flex align-items-start'>
                          <h6>Rs 4700 /-</h6>
                          <p>Per Adult</p>
                          <button onClick={() => setFlightDetail(!flightDetail)} className='flight-detail-btn'>More Details {flightDetail ?<KeyboardArrowUpIcon style={{ color: "#fff" }}/>:<KeyboardArrowDownIcon style={{ color: "#fff" }} />}</button>
                      </div>
              </div>
          </div>
          
          {flightDetail &&
             <> <hr/>
              <div className='flight-detail-btns'>
                  <p onClick={()=>setFlightBtn(1)} className={flightBtn===1?'active' :""}>Flight Detail</p>
                  <p onClick={()=>setFlightBtn(2)} className={flightBtn===2?'active' :""}>Date Change</p>
                  <p onClick={()=>setFlightBtn(3)} className={flightBtn===3?'active' :""}>Upgrade</p>
              </div>

              <div className='flight-detail-topBar'>
                  <img src={require("../../assets/icons/akasa-removebg-preview.png")} alt='airline' />
                  <h6>Akasa Air</h6>
                  <p>QP | 350</p>
              </div>
              <div className='row px-1'>
                  <div className='col-4 col-sm-2 flight-detail-from mt-2'>
                      <p>07:40 PM</p>
                      <p>Thu, 16 Nov 2023</p>
                      <p>Terminal 2</p>
                      <p>Bangalore Airport</p>
                  </div>
                  <div className='col-4 col-sm-2 flight-detail-duration mt-2'>
                      <p>Duration : 7 hr </p>
                      <hr />
                      <p>Direct</p>
                  </div>
                  <div className='col-4 col-sm-2 flight-detail-to mt-2'>
                      <p>07:40 PM</p>
                      <p>Thu, 16 Nov 2023</p>
                      <p>Terminal 2</p>
                      <p>IGI Delhi, India</p>
                  </div>
                  <div className='col-4 col-sm-2 mt-2 flight-extra-detail'>
                      <h6>Baggage</h6>
                      <p>07:40 PM</p>
                  </div>
                  <div className='col-4 col-sm-2 mt-2  flight-extra-detail'>
                      <h6>Checkin</h6>
                      <p>32 Kg (1 Piece only)</p>
                  </div>
                  <div className='col-4 col-sm-2 mt-2  flight-extra-detail'>
                      <h6>Cabin</h6>
                      <p>7 Kg (1 piece only)</p>
                  </div>
              </div>
              <div className='bookTicketBtnBar'>
                  <button className='bookTicketBtn'>Book Ticket</button>
              </div>
          </>
          }

    </div>
  )
}

export default FlightSearchResultCard
