import "./index.css";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import hairSalonLogo from "../../assets/images/HairSalon.png";


function Header() {
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className="logo">
                <Link to={"/"}>
                    <img
                        src={hairSalonLogo}
                        alt="Hair Salon Logo"
                        width={100}
                    />
                </Link>
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/service">Services</Link>
                <Link to="/stylist">Stylists</Link>
                <Link to="/booking">Booking</Link>
                <Link to="/contact">Contact</Link>
            </div>

            <div className="opening-hour">
                <div className="opening-hour-icon">
                    <img src="https://cdn4.iconfinder.com/data/icons/essentials-71/24/023_-_Clock-256.png" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                </div>
                <div className="opening-hour-text">
                    <div className="opening-hour-title" style={{ fontWeight: 'bold', fontSize: '14px' }}>Opening Hour</div>
                    <div className="opening-hour-time" style={{ fontSize: '12px', color: '#666' }}>Mon - Sun, 8:00 - 22:00</div>
                </div>
            </div>

            <div className="call-us">
                <div className="call-us-icon">
                    <img src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-01-256.png" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                </div>
                <div className="call-us-text">
                    <div className="call-us-title" style={{ fontWeight: 'bold', fontSize: '14px' }}>Call Us</div>
                    <div className="call-us-phone" style={{ fontSize: '12px', color: '#666' }}>(+84) 1234 5678</div>
                </div>
            </div>

            <div className="mail-us">
                <div className="mail-us-icon">
                    <img src="https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/439/aiga_mail-256.png" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                </div>
                <div className="mail-us-text">
                    <div className="mail-us-title" style={{ fontWeight: 'bold', fontSize: '14px' }}>Mail Us</div>
                    <div className="mail-us-phone" style={{ fontSize: '12px', color: '#666' }}>hairhamony@gmail.com</div>
                </div>
            </div>

            <div className="header-buttons">
                <Button
                    type="primary"
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Login
                </Button>
                <Button
                    type="default"
                    onClick={() => {
                        navigate("/register");
                    }}
                >
                    Register
                </Button>
            </div>
        </div>
    );
}

export default Header;
