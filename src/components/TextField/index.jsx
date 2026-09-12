function TextField({ label, id, error, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="py-2 block">
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="bg-white w-full rounded-lg border border-gray-300 outline-hidden focus:border-gray-400 p-2 text-gray-500"
        value={value}
        onChange={(event) => onChange && onChange(event.target.value)}
      />
      {error && <label className="text-red-500">{error}</label>}
    </div>
  );
}

export default TextField;
