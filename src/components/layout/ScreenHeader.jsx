function ScreenHeader({ title, subtitle, onBack }) {
  return (
    <div className="screen-header h-(--header-height) flex items-center gap-3 bg-emerald-800 p-3 text-white">
      {onBack && (
        <button
          onClick={onBack}
          className="text-xl leading-none"
          aria-label="Back"
        >
          ←
        </button>
      )}
      <div>
        <h1 className="text-xl">{title}</h1>
        <p className="text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

export default ScreenHeader;
