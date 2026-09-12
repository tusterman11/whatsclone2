function ScreenBody({ children }) {
  return (
    <div className="screen-body h-[calc(100vh-var(--header-height))] bg-gray-200 p-2">
      {children}
    </div>
  );
}

export default ScreenBody;
