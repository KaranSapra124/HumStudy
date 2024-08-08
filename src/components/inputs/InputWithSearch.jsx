import { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

function InputWithSearch({
  options,
  placeholder,
  selectedOpt,
  selectedOptId,
  setSelectedOptId,
  setSelectedOpt,
  selectStyles,
  required = false,
  optionStyles,
  disabled
}) {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);

  // console.log("Filtered Options", filteredOptions);
  // console.log("Selected Opt", selectedOpt);
  // console.log("Selected Id", selectedOptId);
  // console.log("Options", options);

  function handleOptionSelect(optionSelected) {
    console.log(optionSelected);
    const selectedOption = options.find((opt) => opt._id === optionSelected);
    setSelectedOpt(selectedOption.name);
    console.log('Selected optionnnnnnn', selectedOption);
    setSelectedOptId(optionSelected);
    setShowOptions(false);
  }

  const handleSelectOption = (item) => {
    setSelectedOptId(item._id);
    setSelectedOpt(item.name);
    setShowOptions(false);
  };

  useEffect(() => {
    if (selectedOpt) {
      setFilteredOptions(
        options.filter((opt) =>
          opt.name.toLowerCase().includes(selectedOpt.toLowerCase())
        )
      );
    } else setFilteredOptions(options);
  }, [options, selectedOpt]);

  return (
    <>
      <div className="flex flex-col justify-between items-center relative w-[100%]">
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => setSelectedOpt(e.target.value)}
          value={selectedOpt}
          onFocus={() => setShowOptions(true)}
          required={required}
          disabled={disabled}
          className="outline-none border md:py-2 md:px-4 p-2 md:text-base text-[14px] pr-9 rounded-md w-full"
        />
        <button
          type="button"
          className="absolute text-primary right-2 top-2/4 -translate-y-2/4 text-[24px]"
          onClick={() => setShowOptions((prev) => !prev)}
        >
          {showOptions ? <AiOutlineClose /> : <AiOutlineSearch />}
        </button>

        {filteredOptions.length > 0 && (
          <div
            className={`border-gray_3 rounded-md outline-none w-[100%] break-words transition-all duration-300 absolute bg-white top-full overflow-y-auto min-w-[100px] left-2/4 -translate-x-2/4 h-fit ${
              showOptions ? 'max-h-[200px] border' : 'max-h-0'
            }`}
            style={{ ...selectStyles }}
          >
            {filteredOptions.map((item, i) => (
              <p
                key={i}
                onClick={() => handleSelectOption(item)}
                onBlur={() => setShowOptions(false)}
                style={{ ...optionStyles }}
                className={`p-1 break-words w-full border-b last:border-b-0 border-b-primary cursor-pointer  sm:text-[14px] text-[12px]`}
              >
                {item.name}
              </p>
            ))}
          </div>
          // <select
          //   multiple
          //   size={filteredOptions.length > 5 ? 5 : filteredOptions.length}
          //   onChange={(e) => handleOptionSelect(e.target.value)}
          //   className={`w-full bg-white shadow-gray-400 absolute top-full outline-none transition-all duration-300 z-40 ${
          //     showOptions ? "max-h-[400px] shadow-md" : "max-h-0"
          //   }`}
          //   style={{ ...selectStyles }}
          // >
          //   {filteredOptions.map((option, i) => (
          //     <option
          //       key={i}
          //       value={option._id}
          //       className="border-b border-primary p-2"
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

export default InputWithSearch;
