import { isMobile } from "react-device-detect";
import BrowserView from "./BrowserView";
import MobileView from "./MobileView";

function Layout() {
  if (isMobile) {
    return <MobileView />;
  }
  return <BrowserView />;
}

export default Layout;
