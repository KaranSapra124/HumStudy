export const NormalInput = ({
  type,
  label,
  inputState,
  setInputState,
  inputId = null,
  classNames,
  isFullWidth = false,
  placeholder,
}) => {
  return (
    <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
      <label htmlFor={inputId}>{label}:</label>
      <input
        type={type}
        name={inputId}
        id={inputId}
        value={inputState}
        placeholder={placeholder}
        onChange={(e) => setInputState(e.target.value)}
        className={`border border-gray-200 p-2 rounded-md outline-none flex-grow ${
          isFullWidth ? 'w-full' : 'md:max-w-[70%]'
        } ${classNames}`}
      />
    </div>
  );
};

export const FileInput = ({
  label,
  setInputState,
  accept = '*',
  inputId = null,
}) => {
  return (
    <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
      <label htmlFor={inputId}>{label}:</label>
      <input
        type="file"
        accept={accept}
        name={inputId}
        id={inputId}
        onChange={(e) => setInputState(e.target.files[0])}
        className="border border-gray-200 p-2 rounded-md outline-none flex-grow md:max-w-[70%]"
      />
    </div>
  );
};

export const ImageInput = ({
  label,
  inputState,
  setInputState,
  inputId = null,
  multiple = false,
}) => {
  const handleFileChange = (e) => {
    if (multiple) {
      setInputState(e.target.files);
    } else setInputState(e.target.files[0]);
  };

  return (
    <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
      <label htmlFor={inputId}>{label}:</label>
      <div className="flex flex-1 md:max-w-[70%] items-center gap-3">
        <input
          type="file"
          name={inputId}
          id={inputId}
          multiple={multiple}
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-200 p-2 rounded-md outline-none flex-1"
        />
        {inputState && (
          <div className="w-[50px] h-[50px]">
            <img
              src={inputState}
              alt={inputId}
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const TextareaInput = ({
  label,
  rows = 3,
  inputState,
  setInputState,
  inputId = null,
  placeholder = '',
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId}>{label}:</label>
      <textarea
        name={inputId}
        id={inputId}
        value={inputState}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => setInputState(e.target.value)}
        className="border border-gray-200 p-2 rounded-md outline-none flex-grow"
      ></textarea>
    </div>
  );
};

export const AddressInput = ({
  type,
  label,
  inputState,
  setInputState,
  inputId = null,
  classNames,
  placeholder = '',
}) => {
  return (
    <div className="flex flex-col col-span-12 md:col-span-6">
      <label htmlFor={inputId}>{label}:</label>
      <input
        type={type}
        name={inputId}
        id={inputId}
        value={inputState}
        onChange={setInputState}
        placeholder={placeholder}
        className={`border border-gray-200 p-2 rounded-md outline-none flex-grow ${classNames}`}
      />
    </div>
  );
};

