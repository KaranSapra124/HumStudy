import { useEffect, useRef, useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';

export default function FilterInput({
  options,
  buttonStyles,
  selectStyles,
  optionStyles,
  title,
  onTagsChange,
  selectedTags = null,
  inputStyles,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selected, setSelected] = useState([]);
  const containerRef = useRef(null);
  const [search, setSearch] = useState('');

  const handleSelectOptions = (item) => {
    setShowOptions(true);
    if (selected.includes(item))
      setSelected(selected.filter((sel) => sel !== item));
    else setSelected([...selected, item]);
    // setSearch('');
  };

  useEffect(() => {
    if (selected.join(',') !== selectedTags.join(','))
      onTagsChange((prev) => ({ ...prev, [title]: selected }));
  }, [selected]);

  useEffect(() => {
    setSearch('');
    if (selectedTags.length > 0) return;
    setSelected(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    if (search.trim()) {
      setFilteredOptions(
        options.filter((opt) =>
          opt.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else setFilteredOptions(options);
  }, [search]);

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
        <div className="min-w-[100px] max-w-[200px] relative">
          <input
            type="text"
            autoComplete="off"
            placeholder={title}
            style={{ ...inputStyles }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={(e) => {
              e.stopPropagation();
              setShowOptions(true);
            }}
            className="w-full sm:p-2 p-1 sm:rounded-md rounded-sm bg-white border border-primary outline-none sm:pr-6 pr-6"
          />
          <span className="absolute right-1 top-1/2 -translate-y-1/2 px-1 bg-primary text-white rounded-full text-[11px]">
            {selected.length}
          </span>
        </div>

        <div
          className={`border-gray_3 rounded-md outline-none w-[100%] break-words transition-all duration-300 absolute bg-white top-full overflow-y-auto min-w-[100px] left-2/4 -translate-x-2/4 h-fit ${
            showOptions ? 'max-h-[300px] border' : 'max-h-0'
          }`}
          style={{ ...selectStyles }}
        >
          {filteredOptions.length > 0 ? (
            sortSelected(filteredOptions, selected).map((item, i) => (
              <p
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectOptions(item);
                }}
                style={{ ...optionStyles }}
                className={`${
                  selected.includes(item) ? 'bg-primary text-white' : ''
                } p-1 break-words w-full border-b border-b-primary cursor-pointer  sm:text-[12px] text-[9px]`}
              >
                {item}
              </p>
            ))
          ) : (
            <p className="p-1 break-words w-full border-b border-b-primary cursor-pointer  sm:text-[12px] text-[9px]">No {title} found with "{search}"</p>
          )}
        </div>
      </div>
    </>
  );
}

const sortSelected = (arr, selected) => {
  return [...selected, ...arr.filter((item) => !selected.includes(item))];
};
