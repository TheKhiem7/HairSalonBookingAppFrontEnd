import { Badge, Drawer, Image, List, Space, Typography } from 'antd';
import './index.css';
import { BellFilled, MailOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getComments, getOrders } from '../api';
function AdHeader() {
  const [comments, setComments] = useState([])
  const [orders, setOrders] = useState([])
  const [commentopen, setCommentOpen] = useState(false)
  const [notification, setNotification] = useState(false)
  useEffect(() => {
    getComments().then(res=>{
       setComments(res.comments)
    });
    getOrders().then(res=>{
      setOrders(res.products)
   });
  
  }, [])
  
  return (
    <div className="adheader">
        <Image 
        width={40} 
        src="https://png.pngtree.com/png-vector/20191125/ourmid/pngtree-beautiful-admin-roles-line-vector-icon-png-image_2035379.jpg">

        </Image>
        <Typography.Title>Admin's Dashboard</Typography.Title>
        <Space>
            <Badge count={comments.length} dot>
                <MailOutlined style={{ fontSize: 24 }} onClick={()=>{
                   setCommentOpen(true)
                }}/>
            </Badge>
            <Badge count={orders.length}>
                <BellFilled style={{ fontSize: 24 }} onClick={()=>{
                   setNotification(true)
                }}/>
            </Badge>
        </Space>
        <Drawer title="Comments" open={commentopen} onClose={()=>{
          setCommentOpen(false)
        }} maskClosable>
           <List dataSource={comments} renderItem={(item)=>{
            return <List.Item>{item.body}</List.Item>
           }}></List>
        </Drawer>
        <Drawer title="Notification" open={notification} onClose={()=>{
          setNotification(false)
        }} maskClosable>
        <List dataSource={orders} renderItem={(item)=>{
            return <List.Item><Typography.Text strong>{item.title} has been ordered.</Typography.Text></List.Item>
           }}></List>
        </Drawer>
    </div>
  )
}

export default AdHeader;