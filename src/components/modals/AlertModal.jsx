import { useState } from 'react';
import Modal from './Modal';

export default function AlertModal({
  setIsModal,
  positiveRes,
  heading,
  text,
  btns,
  styles
}) {
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
          ...styles
        }}
        overlayStyles={{ zIndex: 1999 }}
      >
        <h2>{heading}</h2>
        <div className="flex flex-col justify-between p-4 text-gray-500 sm:text-base text-[.7rem]">
          {Array.isArray(text) ? (
            text.map((txt, i) => (
              <p key={i} style={{ ...txt?.style }}>{txt?.text || txt}</p>
            ))
          ) : (
            <p style={{ ...text?.style }} className='text-[14px]'>{text?.text || text}</p>
          )}
          <div className="flex gap-4 justify-end flex-grow mt-6">
            {btns.map((btn, i) => (
              <button
                key={i}
                type="button"
                style={{ ...btn?.style }}
                className={`p-2 rounded-md text-[14px] transiton-all duration-300 ${
                  btn.type
                    ? btn.type === 'success'
                      ? 'bg-green-100 text-green-400 hover:bg-green-400 hover:text-white'
                      : btn.type === 'danger'
                      ? 'hover:bg-red-400 text-red-400 bg-red-100 hover:text-white'
                      : 'text-gray-400 hover:text-gray-200'
                    : ''
                }`}
                onClick={() => {
                  if (btn.type && btn.type !== 'cancel') positiveRes();
                  setModal(false);
                }}
              >
                {btn?.text || btn}
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
