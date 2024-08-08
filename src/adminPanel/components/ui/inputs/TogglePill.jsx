export default function TogglePill({
  checked,
  onChange,
  name = '',
  disabled = false,
}) {
  return (
    <label
      className={
        'relative inline-flex items-center ' +
        (disabled ? 'pointer-events-none' : 'cursor-pointer')
      }
    >
      <input
        type="checkbox"
        disabled={disabled}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-checked:peer-focus:ring-green-500/40 peer-focus:ring-gray-100 dark:peer-focus:ring-green-500 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
    </label>
  );
}
