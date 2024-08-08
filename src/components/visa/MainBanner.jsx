import styles from './mainBanner.module.css';
import visa from '../../assets/graphic/visa.json';
import Lottie from 'lottie-react';
import { ChevronRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from "antd";
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../ui/ScrollToTop';
const { TextArea } = Input;

export default function MainBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const sendToFindVisa = () => {
    navigate("/find-visa")
  }

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2>Seamless Visa Solutions at Your Fingertips</h2>
        <p>
          Simplify the visa process with our user-friendly platform. Easily fill
          in your details for visa inquiries, and let us guide you through a
          hassle-free journey to your destination.
        </p>
        <Link to="/find-visa" type="button" >
          Visa Enquiry <ChevronRight />
        </Link>
      </div>
      <Modal
          zIndex={99999}
          centered={true}
          footer={null}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
<form>
        <h5>Send visa enquiry to us</h5>
        <div>
          <p >Subject</p>
          <Input className='mt-1' style={{backgroundColor:"transparent"}} size="large" placeholder="Please type here"  />
        </div>
        <div className='mt-3'>
          <p >Subject</p>
          <TextArea rows={4} className='mt-1' style={{backgroundColor:"transparent"}} size="large" placeholder="Please type here" />
        </div>
          <div className='d-flex justify-content-center mt-3'>
          <button style={{padding:"7px 25px"}} className='submit-btn'>Submit</button>
        </div>
    </form>
      </Modal>
      <div className={styles.graphics}>
        <Lottie animationData={visa} loop={false} />
      </div>
      <ScrollToTop/>
    </div>
  );
}
