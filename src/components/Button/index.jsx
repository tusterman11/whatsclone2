function Button({ onClick, children }) {
  return (
    <button
      className="bg-green-500 p-2 w-full rounded-lg text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
