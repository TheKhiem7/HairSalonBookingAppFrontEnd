import { useState } from 'react';
import { useSelector } from "react-redux";
import { Card, Form, Input, Button, Row, Col, Tabs } from 'antd';
import { BasePage } from '../../components/BasePage';
import Navbar from '../../components/navbar';
import Header from '../../components/header';

const { TabPane } = Tabs;

function Profile() {
    const user = useSelector((store) => store.user);
    const [formData, setFormData] = useState({
        email: user?.email,
        fullName: user?.fullName,
        role: user?.role,
        username: user?.username,
        password: '', // Thêm trường password cho Change Password
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        console.log('Submitted profile data:', formData);
        // Xử lý lưu thông tin người dùng ở đây
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        console.log('Submitted password data:', formData.password);
        // Xử lý thay đổi mật khẩu ở đây
    };

    // Hàm kiểm tra token
    const isLoggedIn = !!localStorage.getItem("token");

    return (
    <BasePage>
        {isLoggedIn ? <Navbar /> : <Header />}
        <div style={{ padding: "24px" }}>
            <Row gutter={16}>
                <Col span={8}>
                    <Card
                    style={{ backgroundColor: 'lightgray' }}
                        cover={
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '150px',
                               
                            }}>
                                <img
                                    style={{
                                        borderRadius: '50%',
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        
                                    }}
                                    alt="Profile"
                                    src={user?.image || "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"}
                                />
                            </div>
                        }
                    >
                        <Card.Meta
                            style={{textAlign: "center"}}
                            title={`${formData.fullName}`}
                            description={formData.role}
                        />
                    </Card>
                </Col>
                <Col span={16}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Profile" key="1">
                            <Card title="Edit Profile" style={{ backgroundColor: 'lightgray' }}>
                                <Form layout="vertical" onSubmit={handleSubmitProfile}>
                                    <Form.Item label="Email address">
                                        <Input
                                            value={formData.email}
                                            onChange={handleChange}
                                            name="email"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Username">
                                        <Input
                                            value={formData.username}
                                            onChange={handleChange}
                                            name="username"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Fullname">
                                        <Input
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            name="fullName"
                                        />
                                    </Form.Item>
                        
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Update Profile
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </TabPane>
                        <TabPane tab="Change Password" key="2">
                            <Card title="Change Password" style={{ backgroundColor: 'lightgray' }}>
                                <Form layout="vertical" onSubmit={handleSubmitPassword}>
                                <Form.Item label="Your Password">
                                        <Input.Password
                                            onChange={handleChange}
                                            name="password"
                                        />
                                    </Form.Item>
                                    <Form.Item label="New Password">
                                        <Input.Password
                                            onChange={handleChange}
                                            name="password"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Confirm Password">
                                        <Input.Password
                                            onChange={handleChange}
                                            name="confirmPassword"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Change Password
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </div>
        </BasePage>
    );
}

export default Profile;
