import { useState } from 'react';
import Modal from '../../components/modals/Modal';

export default function SelectCardsModal({
  setIsModal,
  selectedCardsIds = [],
  setSelectedCardsIds = () => {},
  cardsData,
  title,
  renderCard,
}) {
  const [selectedCards, setSelectedCards] = useState(
    cardsData?.filter((item) => selectedCardsIds.includes(item._id))
  );

  const handleCardClick = (id) => {
    if (selectedCardsIds.includes(id)) {
      setSelectedCards((prev) => prev.filter((item) => item._id !== id));
      setSelectedCardsIds((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedCards((prev) => [
        ...prev,
        cardsData?.find((item) => item._id === id),
      ]);
      setSelectedCardsIds((prev) => [...prev, id]);
    }
  };

  const sortSelected = (ids) => [
    ...selectedCards,
    ...cardsData?.filter((item) => !ids.includes(item._id)),
  ];

  return (
    <Modal
      setIsModal={setIsModal}
      modalStyles={{
        width: '100dvw',
        height: '100dvh',
        maxWidth: '100dvw',
        maxHeight: '100dvh',
        zIndex: 1002,
      }}
      overlayStyles={{ zIndex: 1001 }}
    >
      <h2 className='flex items-center gap-2'>
        Select {title}: <span className='px-1 rounded-md bg-purple-100'>{selectedCardsIds?.length || 0} selected</span>
      </h2>
      <div className="!max-h-[calc(100dvh-58px)] sm:flex grid grid-cols-2 items-center justify-center md:gap-5 gap-2 flex-wrap md:p-8 sm:p-4 p-2">
        {sortSelected(selectedCardsIds)?.map((item, i) =>
          renderCard(i, item, handleCardClick, selectedCardsIds)
        )}
      </div>
    </Modal>
  );
}