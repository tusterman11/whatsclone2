export default function MessageInput({ value, onChange, onSend }) {
  function handleKeyDown(event) {
    if (event.key === "Enter") onSend();
  }

  return (
    <div className="flex items-center gap-2 border-t border-gray-200 bg-white p-2">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite uma mensagem..."
        className="flex-1 rounded-full border border-gray-300 px-4 py-2 outline-none focus:border-emerald-600"
      />
      <button
        onClick={onSend}
        className="rounded-full bg-emerald-700 px-4 py-2 text-white disabled:opacity-50"
        disabled={!value.trim()}
      >
        Enviar
      </button>
    </div>
  );
}
