import { useEffect, useRef, useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';

export default function MultiSelect({
  options,
  buttonStyles,
  selectStyles,
  optionStyles,
  title,
  onTagsChange,
  selectedTags = null,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState([]);
  const containerRef = useRef(null);

  const handleSelectOptions = (item) => {
    setShowOptions(true);
    if (selected.includes(item))
      setSelected(selected.filter((sel) => sel !== item));
    else setSelected([...selected, item]);
  };

  useEffect(() => {
    if (selected.join(',') !== selectedTags.join(','))
      onTagsChange((prev) => ({ ...prev, [title]: selected }));
  }, [selected]);

  useEffect(() => {
    if(selectedTags.length > 0) return;
    setSelected(selectedTags);
  }, [selectedTags]);

  const handleClickInside = () => {
    setShowOptions(true);
  };

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="flex flex-col relative w-full flex-1"
        onClick={handleClickInside}
        ref={containerRef}
      >
        <button
          type="button"
          style={{ ...buttonStyles }}
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions((prev) => !prev);
          }}
          className="flex w-full sm:p-2 p-1 sm:rounded-md rounded-sm bg-primary/90 text-white items-center justify-between sm:gap-3 gap-1 min-w-[100px] max-w-[200px]"
        >
          {title}{' '}
          <AiOutlineCaretDown
            className={`transition-all duration-300 ${
              showOptions ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
        {options.length > 0 && (
          <div
            className={`border-gray_3 rounded-md outline-none w-[100%] break-words transition-all duration-300 absolute bg-white top-full overflow-y-auto min-w-[100px] left-2/4 -translate-x-2/4 h-fit ${
              showOptions ? 'max-h-[300px] border' : 'max-h-0'
            }`}
            style={{ ...selectStyles }}
          >
            {options.map((item, i) => (
              <p
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectOptions(item);
                }}
                onBlur={() => setShowOptions(false)}
                style={{ ...optionStyles }}
                className={`${
                  selected.includes(item) ? 'bg-primary text-white' : ''
                } p-1 break-words w-full border-b border-b-primary cursor-pointer  sm:text-[12px] text-[9px]`}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
