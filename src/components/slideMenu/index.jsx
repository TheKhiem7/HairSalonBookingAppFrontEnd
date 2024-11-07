import { AppstoreOutlined, CustomerServiceOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function SlideMenu() {
    const navigate = useNavigate()
  return (
    <div className="slidemenu">
        <Menu
        className="slidemenuvertical"
        mode="vertical"
        onClick={(item)=>{
           navigate(item.key);
        }}
         items={[
        {
            label:"Dashboard",
            icon:<AppstoreOutlined/>,
            key:'/admin/dashboard'
        },
        {
            label:"Services",
            icon:<CustomerServiceOutlined />,
            key:'/admin/services'
        },
        {
            label:"Booking",
            icon:<ShopOutlined/>,
            key:'/admin/booking',
        },
        {
            label:"Users",
            icon:<UserOutlined/>,
            key:'/admin/users',
        },
        {
            label:"Stylists",
            icon:<UserOutlined/>,
            key:'/admin/stylists',
        }
        ]}>

        </Menu>
    </div>
  )
}

export default SlideMenu;