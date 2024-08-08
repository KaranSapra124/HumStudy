import {
  createDummyAccomodations,
  createDummyUsers,
} from '../../utils/createDummyData';
import styles from './bookings.module.css';

export default function Accomodations({ accomodations }) {
  return (
    <div>
      <h4 className="mb-3">Accomodation Booking</h4>
      {accomodations?.map((item, i) => (
        <AccomodationCard data={item} key={i} />
      ))}
    </div>
  );
}

const AccomodationCard = ({ data }) => {
  const acco = createDummyAccomodations(1)[0];
  const user = createDummyUsers(1)[0];
  return (
    <div className={styles.accoCard}>
      <div className={styles.accoInfo}>
        <div className={styles.accoImgContainer}>
          <img src={acco.img} alt="Accomodation image" />
          <p className='text-white'>
            {Number(
              acco.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
                acco.reviews.length
            ).toFixed(1) || 4.2}{' '}
            ⭐
          </p>
        </div>
        <div className={styles.accoName}>
          <p className="fw-semibold fs-5">{acco.name}</p>
          <p>{acco.address}</p>
        </div>
      </div>
      <div className={styles.bookingInfo}>
        <div className="d-flex gap-5">
          <div className={`d-flex flex-column gap-3 ${styles.flexContainer}`}>
            <div>
              <span>Primary Guest</span>
              <p>
                {user.fName} {user.lName}
              </p>
            </div>
            <div>
              <span>Mobile Number</span>
              <p>{user.phoneNumber}</p>
            </div>
            <div>
              <span>Email Address</span>
              <p>{user.email}</p>
            </div>
          </div>
          <div
            className={`d-flex flex-wrap gap-3 justify-content-between flex-fill ${styles.flexContainer}`}
          >
            <div>
              <span>Check In</span>
              <p>{data.checkinDate}</p>
            </div>
            <div>
              <span>Check In Time</span>
              <p>{data.checkinTime}</p>
            </div>
            <div className="fw-semibold">
              <p>{data.numOfGuests} Guests</p>
              <p>{data.numOfRooms} Rooms</p>
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column align-items-center gap-2 mt-2"
          style={{ width: 'fit-content' }}
        >
          <span>Total Cost</span>
          <p>Rs. {acco.price}</p>
        </div>
      </div>
    </div>
  );
};
