import { Header } from "antd/es/layout/layout";
import { AppHeaderDesktop } from "./AppHeaderDesktop";
import { AppHeaderMobile } from "./AppHeaderMobile";


const AppHeader = () => {
  return (
    <Header className="header">
      <div className="container">
        <div className="header__desktop-container">
          <AppHeaderDesktop />
        </div>
        <div className="header__mobile-container">
          <AppHeaderMobile />
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
