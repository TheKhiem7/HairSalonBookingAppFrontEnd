import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, message, Space } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import hairSalonLogo from "../../assets/images/HairSalon.png";
import { useUser } from "../../Context/UserContext";

function Navbar() {
    const { user, setUser } = useUser(); // Assuming you have a setUser function in your UserContext to clear user data
    const navigate = useNavigate();

    const handleMenuClick = (e) => {
        if (e.key === 'logout') {
            // Clear all user data including token
            localStorage.clear(); // Xóa tất cả dữ liệu trong localStorage
            setUser(null);
            
            // Display a message
            message.success('You have successfully logged out.');
            
            // Redirect to the home page
            navigate('/');
        } else {
            console.log('click', e);
        }
    };

    const items = [
        {
            label: <Link to="/profile">Profile</Link>,
            key: 'profile',
            icon: <UserOutlined />,
        },
        {
            label: 'Integrations',
            key: 'integrations',
            icon: <SettingOutlined />,
        },
        {
            label: 'Settings',
            key: 'settings',
            icon: <SettingOutlined />,
        },
        {
            label: 'Guide',
            key: 'guide',
            icon: <QuestionCircleOutlined />,
        },
        {
            label: 'Help Center',
            key: 'help',
            icon: <QuestionCircleOutlined />,
        },
        {
            label: 'Logout',
            key: 'logout',
            icon: <LogoutOutlined />,
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <div className="navbar">
            <div className="logo">
                <Link to={"/member"}>
                    <img
                        src={hairSalonLogo}
                        alt="Hair Salon Logo"
                        width={100}
                    />
                </Link>
            </div>

            <div className="nav-links1">
                <Link to="/member">Home</Link>
                <Link to="/service">Services</Link>
                <Link to="/stylist">Stylists</Link>
                <Link to="/booking">Booking</Link>
                <Link to="/contact">Contact</Link>
            </div>

            <div className="opening-hour1">
                <div className="opening-hour-icon1">
                    <img src="https://cdn4.iconfinder.com/data/icons/essentials-71/24/023_-_Clock-256.png" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                </div>
                <div className="opening-hour-text1">
                    <div className="opening-hour-title1" style={{ fontWeight: 'bold', fontSize: '14px' }}>Opening Hour</div>
                    <div className="opening-hour-time1" style={{ fontSize: '12px', color: '#666' }}>Mon - Sun, 8:00 - 22:00</div>
                </div>
            </div>

            <div className="call-us1">
                <div className="call-us-icon1">
                    <img src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-01-256.png" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                </div>
                <div className="call-us-text1">
                    <div className="call-us-title1" style={{ fontWeight: 'bold', fontSize: '14px' }}>Call Us</div>
                    <div className="call-us-phone1" style={{ fontSize: '12px', color: '#666' }}>(+84) 1234 5678</div>
                </div>
            </div>

            <div className="mail-us1">
                <div className="mail-us-icon1">
                    <img src="https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/439/aiga_mail-256.png" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                </div>
                <div className="mail-us-text1">
                    <div className="mail-us-title1" style={{ fontWeight: 'bold', fontSize: '14px' }}>Mail Us</div>
                    <div className="mail-us-phone1" style={{ fontSize: '12px', color: '#666' }}>hairhamony@gmail.com</div>
                </div>
            </div>

            <div className="user-avatar">
                <Space wrap>
                    <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
                    {user ? `Welcome, ${user}` : ''}
                    </Dropdown.Button>
                </Space>
            </div>
        </div>
    );
}

export default Navbar;
