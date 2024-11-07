// src/page/service/service-detail/index.jsx
import React from 'react';
import { Card, Col, Row } from 'antd';

const ServiceDetail = () => {
    return (
        <Row justify="center">
            <Col span={8}>
                <Card
                    title="LẤY RÁY TAI"
                    bordered={false}
                    style={{ width: 300 }}
                >
                    <p>Kỹ thuật lấy ráy tai nhẹ nhàng & thư thái trong không gian yên tĩnh, sạch sẽ.</p>
                    <img src="image1.jpg" alt="Service" style={{ width: '100%' }} />
                    <p>30 Phút</p>
                    <p>70K</p>
                </Card>
            </Col>
        </Row>
    );
};

export default ServiceDetail;

