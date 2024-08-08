import { useState } from 'react';
import Modal from '../../components/modals/Modal';
// import Modal from '..';

export default function ConfirmModal({ setIsModal, func, heading }) {
  const [modal, setModal] = useState(true);

  return (
    <>
      <Modal
        setIsModal={setIsModal}
        modal={modal}
        modalStyles={{
          width: '400px',
          minWidth: 'auto',
          top: '20%',
          zIndex: 2000,
        }}
        overlayStyles={{ zIndex: 1999 }}
      >
        <h2>Confirm Deletion</h2>
        <div className="flex flex-col justify-between p-4 text-gray-500 sm:text-base text-[.7rem]">
          <p className='text-ellipsis overflow-hidden'>{heading}</p>
          <div className="flex gap-4 justify-end flex-grow mt-6">
            <button
              type="button"
              className="p-2 bg-gray-200 text-gray-400 font-bold rounded-md hover:bg-gray-400 hover:text-gray-200 transition-all duration-300"
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="p-2 bg-red-100 text-red-400 hover:text-white font-bold rounded-md hover:bg-red-400 transiton-all duration-300"
              onClick={() => {
                func();
                setModal(false);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
