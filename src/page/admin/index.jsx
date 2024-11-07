import { Space } from "antd";
import "./index.css";
import AdHeader from "../../components/adHeader";
import SlideMenu from "../../components/slideMenu";
import AdFooter from "../../components/adFooter";
import { Outlet } from "react-router-dom";

function Admin(){
  return (
     <div className="dashboard">
      <AdHeader/>
      <Space className="slidemenuandpagecontent">
        <SlideMenu></SlideMenu>
        <Outlet/>
      </Space>
      <AdFooter/>
     </div>
  );
}
export default Admin;