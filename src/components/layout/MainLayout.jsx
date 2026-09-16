import ScreenBody from "./ScreenBody";
import ScreenHeader from "./ScreenHeader";

export default function MainLayout({ title, subtitle, onBack, children }) {
  return (
    <>
      <ScreenHeader title={title} subtitle={subtitle} onBack={onBack} />
      <ScreenBody>{children}</ScreenBody>
    </>
  );
}
