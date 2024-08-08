import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

export default function Modal({
  children,
  setIsModal,
  modalStyles,
  overlayStyles,
  modal,
}) {
  const modalRef = useRef();
  const overlayRef = useRef();

  const handleClose = () => {
    modalRef.current.style.transform = 'translate(-50%, -100%)';
    modalRef.current.style.opacity = '0';
    overlayRef.current.style.opacity = '0';
    setTimeout(() => {
      setIsModal(false);
    }, 300);
  };

  useEffect(() => {
    if (modal === undefined) return;
    if (!modal) handleClose();
  }, [modal]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      modalRef.current.style.transform = 'translate(-50%, -50%)';
      modalRef.current.style.opacity = '1';
      overlayRef.current.style.opacity = '1';
    }, 100);

    return () => clearTimeout(timeoutID);
  }, []);
  return (
    <>
      <div
        ref={overlayRef}
        className={styles.overlay}
        onClick={handleClose}
        style={{ ...overlayStyles }}
      ></div>
      <div
        ref={modalRef}
        className={styles.modal}
        style={{
          ...modalStyles,
        }}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          <div></div>
          <div></div>
        </button>
        {children}
      </div>
    </>
  );
}
