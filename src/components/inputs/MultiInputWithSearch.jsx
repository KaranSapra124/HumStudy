import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';

function MultiInputWithSearch({
  options,
  placeholder = 'Start typing...',
  selectedOpt,
  setSelectedOpt,
  selectedOptId,
  setSelectedOptId,
  selectStyles,
  optionStyles,
}) {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  // const handleSelectOptions = (optionSelectedId) => {
  //   const selectedOption = options.find((opt) => opt._id === optionSelectedId);
  //   console.log("Selected optionnnnnnn", selectedOption);

  //   if (selectedOptId.includes(optionSelectedId)) {
  //     return;
  //   } else {
  //     setSelectedOptId([...selectedOptId, optionSelectedId]);
  //     setSelectedOpt([...selectedOpt, selectedOption.name]);
  //   }
  // };

  const handleSelectOptions = (item) => {
    if (selectedOptId.includes(item._id)) {
      setSelectedOptId((prev) => prev.filter((opt) => opt !== item._id));
      setSelectedOpt((prev) => prev.filter((opt) => opt !== item.name));
    } else {
      setSelectedOptId((prev) => [...prev, item._id]);
      setSelectedOpt((prev) => [...prev, item.name]);
    }
  };

  function handleRemoveOption(removeOption) {
    const selectedOption = options.find((opt) => opt.name === removeOption);
    setSelectedOpt((prev) => prev.filter((opt) => removeOption !== opt));
    setSelectedOptId((prev) =>
      prev.filter((optId) => selectedOption._id !== optId)
    );
  }

  useEffect(() => {
    if (inputValue) {
      setFilteredOptions(
        options.filter((opt) =>
          opt.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else setFilteredOptions(options);
  }, [inputValue, options]);

  return (
    <>
      <div className="flex flex-col w-full flex-grow relative">
        <div className="flex-grow flex flex-col rounded-md overflow-hidden border gap-2">
          {Array.isArray(selectedOpt) && selectedOpt.length > 0 && (
            <div className="flex gap-1 flex-wrap p-1">
              {selectedOpt.map((item, i) => (
                <p
                  key={i}
                  className="flex gap-2 bg-indigo_1 text-white items-center rounded-md p-1 text-[14px]"
                >
                  {item}{' '}
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(item)}
                    // onClick={() =>
                    //   setSelectedOpt((prev) =>
                    //     prev.filter((opt) => item !== opt)
                    //   )
                    // }
                    className="w-[20px] h-[20px] flex justify-center items-center text-white rounded-full"
                  >
                    <CancelIcon style={{ fontSize: '16px', margin: 'auto' }} />
                  </button>
                </p>
              ))}
            </div>
          )}
          <div className="flex flex-grow relative">
            <input
              type="text"
              name="tags"
              id="tags"
              autoComplete="off"
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setShowOptions(true)}
              className="border border-gray_3 p-2 outline-none flex-grow pr-8 relative z-10 bg-transparent"
            />
            {showOptions && (
              <button
                type="button"
                className="absolute right-0 top-0 z-50 p-2 text-indigo_1"
                onClick={() =>
                  showOptions ? setShowOptions(false) : setShowOptions(true)
                }
              >
                {showOptions ? <CloseIcon /> : <SearchIcon />}
              </button>
            )}
          </div>
        </div>

        {filteredOptions.length > 0 && (
          <div
            className={`border-gray_3 rounded-md outline-none w-[100%] break-words transition-all duration-300 absolute bg-white top-full overflow-y-auto min-w-[100px] left-2/4 -translate-x-2/4 h-fit ${
              showOptions ? 'max-h-[180px] border' : 'max-h-0'
            }`}
            style={{ ...selectStyles }}
          >
            {filteredOptions.map((item, i) => (
              <p
                key={i}
                onClick={() => handleSelectOptions(item)}
                onBlur={() => setShowOptions(false)}
                style={{ ...optionStyles }}
                className={`${
                  selectedOpt.includes(item.name) ? 'bg-primary text-white' : ''
                } p-1 break-words w-full border-b last:border-b-0 border-b-primary cursor-pointer  sm:text-[14px] text-[12px]`}
              >
                {item.name}
              </p>
            ))}
          </div>
          // <select
          //   name="tagSelect"
          //   id="tagSelect"
          //   multiple
          //   size={filteredOptions.length > 5 ? 5 : filteredOptions.length}
          //   onChange={(e) => handleSelectOptions(e.target.value)}
          //   className={`border-gray_3 p-2 rounded-md outline-none w-[100%] transition-all duration-300 absolute top-full left-0 ${
          //     showOptions ? "max-h-[400px] border" : "max-h-0"
          //   }`}
          //   style={{ ...selectStyles }}
          // >
          //   {filteredOptions.map((option, i) => (
          //     <option
          //       key={i}
          //       value={option._id}
          //       selected={selectedOpt.includes(option.name)}
          //       className={`${
          //         selectedOpt.includes(option.name)
          //           ? "bg-indigo_1 text-white"
          //           : ""
          //       } p-1`}
          //     >
          //       {option.name}
          //     </option>
          //   ))}
          // </select>
        )}
      </div>
    </>
  );
}

export default MultiInputWithSearch;
