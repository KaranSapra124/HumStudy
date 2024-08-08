import { useState, useEffect } from 'react';
import Modal from '../../components/modals/Modal';
import {
  AddressInput,
  ImageInput,
  NormalInput,
} from '../../components/inputs/ModalInputs';

export default function CourseModal({
  saveFunc,
  setIsModal,
  view = 'add',
  editItem,
}) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [score, setScore] = useState('');
  const [fee, setFee] = useState('');
  const [modal, setModal] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    const item = {
      ...editItem,
      name,
      duration,
      score,
      fee,
    };
    saveFunc(item);
    setModal(false);
  };
  const putValues = () => {
    setName(editItem.name);
    setScore(editItem.score);
    setDuration(editItem.duration);
    setFee(editItem.fee);
  };

  useEffect(() => {
    if (view === 'edit') putValues();
  }, []);

  return (
    <Modal setIsModal={setIsModal} modal={modal}>
      <h2>{view === 'edit' ? 'Edit' : 'Add'} Course Details</h2>
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-6 p-4 sm:p-8 text-[14px] text-gray-600"
      >
        <NormalInput
          type={'text'}
          label={'Course Name'}
          inputId={'courseName'}
          inputState={name}
          setInputState={setName}
        />
        <NormalInput
          type={'number'}
          label={'Duration'}
          inputId={'duration'}
          inputState={duration}
          setInputState={setDuration}
        />
        <NormalInput
          type={'number'}
          label={'Exam Score'}
          inputId={'examScore'}
          inputState={score}
          setInputState={setScore}
        />
        <NormalInput
          type={'number'}
          label={'Tution Fee'}
          inputId={'tutionFee'}
          inputState={fee}
          setInputState={setFee}
        />
        <button
          type="submit"
          className="p-2 bg-tl_primary text border border-green_1 text-white font-bold hover:scale-105 rounded-md transition-all duration-300 flex-grow"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}
