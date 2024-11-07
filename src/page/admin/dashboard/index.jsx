import { Card, Space, Statistic, Table, Typography } from 'antd'
import './index.css';
import { CustomerServiceOutlined, DollarCircleOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getInventory, getOrders, getRevenue, getUsers } from '../../../components/api';

import{
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0)
  const [inventory, setInventory] = useState(0)
  const [users, setUsers] = useState(0)
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getUsers().then((res) => {
      setUsers(res.total);
    });
  
  }, []);
  
  return (
    <div className='dashboard'>
    <Space size={20} direction='vertical'>
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction='horizontal'>
          <DashboardCard
           icon={<CustomerServiceOutlined
            style={{
              color:"green", 
              backgroundColor: "rgba(0,255,0,0.25)", 
              borderRadius: 12, 
              fontWeight: 24,
              padding: 8,
              }}
            />
          }
            title={"Services"}
            value={12345}
          />
          <DashboardCard
           icon={<ShopOutlined
            style={{
              color:"blue", 
              backgroundColor: "rgba(0,0,255,0.25)", 
              borderRadius: 12, 
              fontWeight: 24,
              padding: 8,
              }}
           />
          } 
           title={"Inventory"} 
           value={inventory}
          />
          <DashboardCard
           icon={<ShoppingCartOutlined
            style={{
              color:"gray", 
              backgroundColor: "rgba(128,128,128,0.25)", 
              borderRadius: 12, 
              fontWeight: 24,
              padding: 8,
              }}
           />
          } 
           title={"Orders"} 
           value={orders}
          />
          <DashboardCard
           icon={<UserOutlined
            style={{
              color:"purple", 
              backgroundColor: "rgba(0,255,255,0.25)", 
              borderRadius: 12, 
              fontWeight: 24,
              padding: 8,
              }}
           />
          } 
           title={"Users"} 
           value={users}
          />
          <DashboardCard
           icon={<DollarCircleOutlined
            style={{
              color:"red", 
              backgroundColor: "rgba(255,0,0,0.25)", 
              borderRadius: 12, 
              fontWeight: 24,
              padding: 8,
              }}
           />
          } 
           title={"Revenue"} 
           value={revenue}
          />
          </Space>
          <Space>
            <RecentBooking/>
            <DashboardChart/>
          </Space>
          </Space>
    </div>
  );
}

function DashboardCard({title, value, icon}){
  return(
    <Card className='card'>
          <Space direction='horizontal'>
             {icon}
            <Statistic title={title} value={value}/>
            </Space>
          </Card>
  );
}

function RecentBooking() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://14.225.192.118:8080/api/booking/getall')
      .then((response) => response.json())
      .then((res) => {
        setDataSource(res); // Cập nhật dữ liệu từ API
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Xử lý lỗi nếu có
  }, []);

  return (
    <>
      <Typography.Text>Recent Booking</Typography.Text>
      <Table
        pagination={{pageSize: 5}}
        columns={[
          {
            title: "Service Name",
            dataIndex: "serviceName", // Cập nhật trường dữ liệu
          },
          {
            title: "Stylist Name",
            dataIndex: "stylistName", // Cập nhật trường dữ liệu
          },
          {
            title: "Booking Time",
            dataIndex: "bookingTime", // Cập nhật trường dữ liệu
          },
        ]}
        loading={loading}
        dataSource={dataSource}
      />
    </>
  );
}

function DashboardChart() {

  const [revenuedata, setRevenueData] = useState({
    labels:[],
    datasets:[]
  })

  useEffect(() => {
    getRevenue().then(res=>{
      const labels = res.carts.map(cart=>{
        return `User-${cart.userId}`
      });
      const data = res.carts.map(cart=>{
        return cart.discountedTotal
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data: data,
            backgroundColor: 'rgba(255, 0, 0, 1)',
          },
    
        ],
      };

      setRevenueData(dataSource)

    })
  
    }, [])
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: "Booking Revenue",
      },
    },
  };

 
  return (
    <Card style={{ width: 600, height: 350}}>
   <Bar options={options} data={revenuedata}/>
   </Card>
  );
}


export default Dashboard
