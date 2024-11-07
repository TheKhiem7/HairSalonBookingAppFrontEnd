import { Row, Col, Statistic } from 'antd';
import { EnvironmentOutlined, UserOutlined, SmileOutlined, CheckCircleOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import './index.css';

// Hàm formatter để tích hợp CountUp
const formatter = (value) => <CountUp end={value} separator="," />;

function Statistics() {
  return (
    <div className="statistics-container">
      <Row gutter={16} justify="center">
        <Col span={6}>
          <Statistic
            title={<span style={{ color: 'black', fontWeight: 'bold' }}>Service Points</span>} 
            value={4}
            prefix={<EnvironmentOutlined />}
            suffix="+" 
            valueStyle={{ color: 'red' }}
            formatter={formatter} // Sử dụng CountUp để định dạng giá trị
          />
        </Col>
        <Col span={6}>
          <Statistic
            title={<span style={{ color: 'black', fontWeight: 'bold' }}>Stylists and Staffs</span>} 
            value={160}
            prefix={<UserOutlined />}
            suffix="+" 
            valueStyle={{ color: 'red' }}
            formatter={formatter}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title={<span style={{ color: 'black', fontWeight: 'bold' }}>Happy Clients</span>} 
            value={1500}
            prefix={<SmileOutlined />}
            suffix="+" 
            valueStyle={{ color: 'red' }}
            formatter={formatter}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title={<span style={{ color: 'black', fontWeight: 'bold' }}>Service Done</span>} 
            value={2000}
            prefix={<CheckCircleOutlined />}
            suffix="+" 
            valueStyle={{ color: 'red' }}
            formatter={formatter}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Statistics;
