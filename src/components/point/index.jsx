import { EnvironmentOutlined } from '@ant-design/icons'; 
import './index.css'; 

function HairSalonPoints() {
  return (
    <div className="hair-salon-points">
      <div className="left-section">
        <h2>Washing Points</h2>
        <h1>Hair Hamony & Service Points</h1>
        <div className="points-grid">
          <div className="point">
            <div className="icon"><EnvironmentOutlined style={{ fontSize: '1em', color: 'red' }} /></div> 
            <div className="details">
              <h3>Location 1</h3>
              <p>FPT University, HCM, VN</p>
              <p>Call: (+84) 1234 5678</p>
            </div>
          </div>
          <div className="point">
            <div className="icon"><EnvironmentOutlined style={{ fontSize: '1em', color: 'red' }} /></div>
            <div className="details">
              <h3>Location 2</h3>
              <p>FPT University, HA NOI, VN</p>
              <p>Call: (+84) 5678 1234</p>
            </div>
          </div>
          <div className="point">
            <div className="icon"><EnvironmentOutlined style={{ fontSize: '1em', color: 'red' }} /></div>
            <div className="details">
              <h3>Location 3</h3>
              <p>FPT University, Can Tho, VN</p>
              <p>Call: (+84) 1357 2468</p>
            </div>
          </div>
          <div className="point">
            <div className="icon"><EnvironmentOutlined style={{ fontSize: '1em', color: 'red' }} /></div>
            <div className="details">
              <h3>Location 4</h3>
              <p>FPT University, Da Nang, VN</p>
              <p>Call: (+84) 2468 1357</p>
            </div>
          </div>
        </div>
      </div>
      <div className="right-section">
        <h2>Request for salon</h2>
        <form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Description"></textarea>
          <button type="submit">Send Request</button>
        </form>
      </div>
    </div>
  );
}

export default HairSalonPoints;
