import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import './index.css'; // Import file CSS
import { BasePage } from '../../components/BasePage';
import axios from 'axios'; // Thêm import axios
import { toast } from 'react-toastify';

import { useState } from 'react';

const BookingForm = () => {
    const [formValues, setFormValues] = useState({});

    const onFinish = async (values) => {
        console.log('Received values:', values);
        try {
            const response = await axios.post('http://14.225.192.118:8080/api/booking/create', values);
            console.log('Booking created:', response.data);
            toast.success('Booking Successfully!'); // Thêm thông báo thành công
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error('Booking Failed!'); // Thêm thông báo thất bại
            setFormValues(values); // Preserve form values on error
        }
    };

    return (
        <BasePage>
        <div className="form-container">
            <Form
                name="booking"
                onFinish={onFinish}
                initialValues={formValues}
                layout="vertical"
                style={{ width: '500px', margin: 'auto', background: 'white', padding: '20px', borderRadius: '8px' }}
            >
                <h1>My Appointment</h1>
                <Form.Item
                    name="bookingTime"
                    label="Booking Time *"
                    rules={[{ required: true, message: 'Please select booking time!' }]}
                >
                    <DatePicker showTime/>
                </Form.Item>
                <Form.Item
                    name="serviceName"
                    label="Service Name *"
                    rules={[{ required: true, message: 'Please input service name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="stylistName"
                    label="Stylist Name *"
                    rules={[{ required: true, message: 'Please input stylist name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="userId"
                    label="User ID *"
                    rules={[{ required: true, message: 'Please input user ID!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </BasePage>
    );
};

export default BookingForm;
