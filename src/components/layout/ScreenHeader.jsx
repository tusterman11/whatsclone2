function ScreenHeader({ title, subtitle }) {
  return (
    <div className="screen-header h-(--header-height) bg-emerald-800 p-3 text-white">
      <h1 className="text-xl">{title}</h1>
      <p className="text-sm">{subtitle}</p>
    </div>
  );
}

export default ScreenHeader;
