import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';
import styles from '../components/bookings/bookings.module.css';
import { createDummyBookings } from '../utils/createDummyData';
import Accomodations from '../components/bookings/Accomodations';
import Flights from '../components/bookings/Flights';
import { useMemo } from 'react';

export default function Bookings() {
  const bookings = useMemo(
    () => ({
      accomodations: createDummyBookings(1, 'accomodation'),
      flights: createDummyBookings(1, 'flight'),
    }),
    []
  );

  return (
    <div className="page">
      <Navbar />
      <div className={styles.container}>
        <Accomodations accomodations={bookings.accomodations} />
        <Flights flights={bookings.flights} />
      </div>
      <Footer />
    </div>
  );
}
