export default function ScreenHeader({ title, subtitle, onBack }) {
  return (
    <div className="screen-header h-(--header-height) flex items-center gap-3 bg-emerald-800 p-3 text-white">
      {onBack && (
        <button
          className="mr-2 text-xl leading-none text-white"
          onClick={onBack}
          aria-label="Back"
        >
          Voltar
        </button>
      )}
      <div>
        <h1 className="text-xl">{title}</h1>
        <p className="text-sm">{subtitle}</p>
      </div>
    </div>
  );
}
