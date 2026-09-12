import ScreenBody from "./ScreenBody";
import ScreenHeader from "./ScreenHeader";

function MainLayout({ title, subtitle, children }) {
  return (
    <>
      <ScreenHeader title={title} subtitle={subtitle} />
      <ScreenBody>{children}</ScreenBody>
    </>
  );
}

export default MainLayout;
