import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import TogglePill from './TogglePill';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { FaPlus } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

export const NormalInput = ({
  label,
  type = 'text',
  name = '',
  disabled = false,
  readOnly = false,
  value = '',
  onChange,
  labelStyles = {},
  inputStyles = {},
  min = 0,
  max = '',
}) => {
  return (
    <label
      style={labelStyles}
      className="flex flex-col gap-1 flex-1 w-full font-[600] text-gray-400"
    >
      {label}
      <input
        type={type}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="flex-1 w-full p-2 rounded-md outline-none border disabled:bg-gray-100 text-gray-500 read-only:bg-gray-50"
        style={inputStyles}
      />
    </label>
  );
};
export const DateInput = ({
  label,
  name = '',
  disabled = false,
  value = '',
  onChange,
  format = 'dd/MM/yyyy',
}) => {
  return (
    <label className="flex flex-col gap-1 flex-1 font-[600] text-gray-400">
      {label}
      <DatePicker
        selected={value}
        onChange={(date) => onChange(name, date)}
        disabled={disabled}
        dateFormat={format}
        className="flex-1 w-full p-2 rounded-md outline-none border disabled:bg-gray-100 text-gray-500"
      />
    </label>
  );
};

export const PasswordInput = ({
  label = 'Password',
  show = false,
  name = 'password',
  disabled = false,
  readOnly = false,
  value = '',
  onChange,
  placeholder = '',
}) => {
  const [showPass, setShowPass] = useState(show);
  return (
    <label className="flex flex-col gap-1 flex-1 font-[600] text-gray-400">
      {label}
      <p className="flex items-center gap-2 flex-1 relative">
        <input
          type={showPass ? 'text' : 'password'}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          className="flex-1 w-full p-[8px] pr-8 rounded-md outline-none border disabled:bg-gray-100 text-gray-500"
        />
        <button
          type="button"
          onClick={() => setShowPass((prev) => !prev)}
          className="absolute top-1/2 right-2 -translate-y-1/2"
        >
          {showPass ? <IoEye /> : <IoEyeOff />}
        </button>
      </p>
    </label>
  );
};

export const TextArea = ({
  label,
  rows = 3,
  name = '',
  disabled = false,
  value = '',
  onChange,
}) => {
  return (
    <label className="flex flex-col flex-1 gap-1 font-[500] text-gray-400">
      {label}
      <textarea
        rows={rows}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className="flex-1 w-full p-2 rounded-md outline-none border disabled:bg-gray-100 text-gray-500"
      ></textarea>
    </label>
  );
};

export const ToggleInput = ({
  label,
  name,
  disabled = false,
  checked,
  onChange,
  labelStyles,
}) => {
  return (
    <label
      className="flex items-center justify-between gap-5 font-[600] text-gray-400 flex-1"
      style={{ ...labelStyles }}
    >
      {label}
      <TogglePill
        disabled={disabled}
        checked={checked}
        onChange={(checked) => onChange(name, checked)}
      />
    </label>
  );
};

export const NormalSelect = ({
  label = '',
  name = '',
  disabled = false,
  value = '',
  onChange,
  options = [],
  optionType = 'string',
  optionLabel = 'name',
  optionValue = '_id',
  labelStyles = {},
  inputStyles = {},
  placeholder = false,
  placeholderLabel = '-- Select --',
  placeholderValue = '',
}) => {
  return (
    <label
      className="flex flex-col gap-1 flex-1 w-full font-[600] text-gray-400"
      style={labelStyles}
    >
      {label}
      <select
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className="flex-1 w-full p-2 rounded-md outline-none border disabled:bg-gray-100 text-gray-500"
        style={inputStyles}
      >
        {placeholder && (
          <option value={placeholderValue}>{placeholderLabel}</option>
        )}
        {options.map((item, i) => (
          <option
            key={i}
            value={optionType === 'string' ? item : item[optionValue]}
          >
            {optionType === 'string' ? item : item[optionLabel]}
          </option>
        ))}
      </select>
    </label>
  );
};

export const CkEditorInput = ({
  label,
  name = '',
  disabled = false,
  value = '',
  onChange,
}) => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    onChange(name, data);
  };

  return (
    <div className="flex flex-col font-[600] text-gray-400">
      <label>{label}</label>
      {!disabled && (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={handleEditorChange}
        />
      )}
    </div>
  );
};

export const ReactSelectInput = ({
  label,
  name,
  options = [],
  value = '',
  disabled = false,
  onChange,
  customStyles = {},
  customSize = false,
}) => {
  return (
    <label className="flex flex-col gap-1 font-[600] text-gray-400">
      {label}
      <Select
        options={options}
        value={value}
        onChange={(val) => onChange(name, val.value)}
        placeholder="Select..."
        className="flex-1 w-full text-gray-500"
        isDisabled={disabled}
        styles={customSize ? customStyles : {}}
        menuPortalTarget={customSize ? document.body : ''}
      />
    </label>
  );
};

export const MultiCheck = ({
  label,
  options,
  selected,
  name,
  onCheck,
  optionType = 'string',
  optionLabel = 'name',
  optionValue = '_id',
}) => {
  const handleCheck = (item) => {
    if (optionType === 'string') {
      if (selected.includes(item))
        onCheck(
          name,
          selected.filter((slt) => slt !== item)
        );
      else onCheck(name, [...selected, item]);
    } else {
      if (selected.includes(item[optionValue]))
        onCheck(
          name,
          selected.filter((slc) => slc !== item[optionValue])
        );
      else onCheck(name, [...selected, item[optionValue]]);
    }
  };
  return (
    <div className="font-[600] text-gray-400">
      {label}
      <div className="flex items-center gap-2 flex-wrap mt-1">
        {options.map((item, i) => (
          <label
            key={i}
            className={
              'whitespace-nowrap flex items-center gap-2 p-2 rounded-md cursor-pointer font-[600] ' +
              (optionType === 'string'
                ? selected.includes(item)
                  ? 'border-tl_primary text-tl_primary bg-tl_primary/10'
                  : '!border-gray-400 text-gray-400'
                : selected.includes(item[optionValue])
                ? 'border-tl_primary text-tl_primary bg-tl_primary/10'
                : '!border-gray-400 text-gray-400')
            }
            style={{ border: '2px solid' }}
          >
            <input
              type="checkbox"
              onChange={() => handleCheck(item)}
              checked={selected.includes(
                optionType === 'string' ? item : item[optionValue]
              )}
              className="hidden"
            />
            <span
              className={
                'flex items-center justify-center ' +
                (selected.includes(
                  optionType === 'string' ? item : item[optionValue]
                )
                  ? 'text-tl_primary'
                  : 'text-gray-400')
              }
            >
              {selected.includes(
                optionType === 'string' ? item : item[optionValue]
              ) ? (
                <ImCheckboxChecked />
              ) : (
                <ImCheckboxUnchecked />
              )}
            </span>
            {optionType === 'string' ? item : item[optionLabel]}
          </label>
        ))}
      </div>
    </div>
  );
};

export const ArrayInput = ({
  label,
  name,
  data,
  setFormData,
  type = 'textarea',
}) => {
  const handleChangeArrayInput = (value, i) =>
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name]?.map((item, j) => (i !== j ? item : value)),
    }));

  return (
    <div className="flex flex-col gap-3 p-3 border border-gray-200 rounded-md">
      <div className="flex items-center gap-2 justify-between">
        <h4 className="font-[500] text-gray-400">{label}</h4>
        <button
          type="button"
          title="Add"
          onClick={() =>
            setFormData((prev) => ({ ...prev, [name]: [...prev[name], ''] }))
          }
          className="transition-all ease-in-out duration-300 p-2 rounded-md hover:bg-tl_primary bg-tl_primary/20 text-primary hover:text-white"
        >
          <FaPlus />
        </button>
      </div>
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span>{i + 1}.</span>
          {type === 'textarea' ? (
            <TextArea
              label=""
              value={item}
              rows={2}
              onChange={(e) => handleChangeArrayInput(e.target.value, i)}
            />
          ) : (
            <NormalInput
              label=""
              value={item}
              onChange={(e) => handleChangeArrayInput(e.target.value, i)}
            />
          )}
          <button
            type="button"
            title="Delete"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                [name]: prev[name].filter((_, j) => i !== j),
              }))
            }
            className="transition-all ease-in-out duration-300 p-2 rounded-md hover:bg-red-400 bg-red-100 text-red-400 hover:text-white"
          >
            <AiFillDelete />
          </button>
        </div>
      ))}
    </div>
  );
};
