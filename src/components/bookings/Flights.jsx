import { format } from 'date-fns';
import { createDummyFlights } from '../../utils/createDummyData';

export default function Flights({ flights }) {
  return (
    <div className="mt-4">
      <h4 className="mb-3">Flight Booking</h4>
      {flights?.map((item, i) => (
        <FlightCard data={item} key={i} />
      ))}
    </div>
  );
}

const FlightCard = ({ data }) => {
  const flight = createDummyFlights(1)[0];
  return (
    <div>
      <div className="flight-detail-topBar">
        <img
          src={require('../../assets/icons/akasa-removebg-preview.png')}
          alt="airline"
        />
        <h6>{flight.name}</h6>
        <p>{flight.flightId}</p>
      </div>
      <div className="row px-1">
        <div className="col-12 col-md-3 col-sm-4 flight-detail-from mt-2">
          <p>{format(flight.departure.dateTime, 'hh:mm a')}</p>
          <p>{format(flight.departure.dateTime, 'E, dd MMM yyyy')}</p>
          <p>Terminal {flight.departure.terminal}</p>
          <p>
            {flight.departure.airport}, {flight.departure.city}
          </p>
        </div>
        <div className="col-12 col-md-2 col-sm-4 flight-detail-duration mt-2">
          <p>
            Duration :{' '}
            {flight.duration.hours === 0 ? '' : flight.duration.hours + 'h'}{' '}
            {flight.duration.minutes === 0
              ? ''
              : flight.duration.minutes + 'min'}
          </p>
          <div
            style={{
              width: '60%',
              margin: '10px auto',
              height: '2px',
              background:
                'linear-gradient(to right, purple, rgba(128, 0, 128, 0.1))',
            }}
          ></div>
          {flight.layovers.length > 0 ? (
            flight.layovers.map((item, i) => (
              <div key={i} className="d-flex flex-column align-items-center">
                <p className="fw-semibold">{item.airport}</p>
                <p>
                  {item.duration.hours === 0 ? '' : item.duration.hours + 'h'}{' '}
                  {item.duration.minutes === 0
                    ? ''
                    : item.duration.minutes + 'min'}
                </p>
              </div>
            ))
          ) : (
            <p>Direct</p>
          )}
        </div>
        <div className="col-12 col-md-3 col-sm-4 flight-detail-to mt-2">
          <p>{format(flight.arrival.dateTime, 'hh:mm a')}</p>
          <p>{format(flight.arrival.dateTime, 'E, dd MMM yyyy')}</p>
          <p>Terminal {flight.arrival.terminal}</p>
          <p>
            {flight.arrival.airport}, {flight.arrival.city}
          </p>
        </div>
        <div className="col-6 col-md-2 mt-4  flight-extra-detail">
          <h6>Checkin</h6>
          <p>{flight.checkInCapacity} Kg (1 Piece only)</p>
        </div>
        <div className="col-6 col-md-2 mt-4  flight-extra-detail">
          <h6>Cabin</h6>
          <p>{flight.cabinCapacity} Kg (1 piece only)</p>
        </div>
      </div>
      <h4 className="mt-4">Traveller Information</h4>
      {data?.travellerInfo?.map((item, i, arr) => (
        <>
          <div key={i} className="row gap-1 mt-3">
            <div className="col-6 col-sm-3 d-flex flex-column gap-1">
              <h6>Name</h6>
              <p>{item.name}</p>
            </div>
            <div className="col-5 col-sm-3 d-flex flex-column gap-1">
              <h6>Government ID</h6>
              <p>{item.govId}</p>
            </div>
            <div className="col-6 col-sm-3 d-flex flex-column gap-1">
              <h6>Type</h6>
              <p>{item.type}</p>
            </div>
          </div>
          <div
            key={arr.length + i}
            style={{
              width: '60%',
              margin: '10px auto 20px',
              borderBottom: '1px solid lightgray',
            }}
          ></div>
        </>
      ))}
    </div>
  );
};
