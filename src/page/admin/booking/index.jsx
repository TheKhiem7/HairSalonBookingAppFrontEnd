import { Button, Form, Input, Modal, Popconfirm, Table, Tabs, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditOutlined, StopOutlined } from '@ant-design/icons';

function Booking() {
  const [datas, setDatas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form] = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // Trạng thái để kiểm tra cập nhật hay tạo mới


  const api = "http://14.225.192.118:8080/api/booking/getall"; // Cập nhật URL API mới

  const fetchData = async () => {
    const response = await axios.get(api);
    setDatas(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Booking Time", // Cập nhật tên cột
      dataIndex: "bookingTime", // Cập nhật dataIndex
      key: "bookingTime", // Cập nhật key
    },
    {
      title: "Service Name", // Cập nhật tên cột
      dataIndex: "serviceName", // Cập nhật dataIndex
      key: "serviceName", // Cập nhật key
    },
    {
      title: "Stylist Name", // Cập nhật tên cột
      dataIndex: "stylistName", // Cập nhật dataIndex
      key: "stylistName", // Cập nhật key
    },
    {
      title: "UserId", // Cập nhật tên cột
      dataIndex: "userId", // Cập nhật dataIndex
      key: "userId", // Cập nhật key
    },
    {
      title: "Status",
      dataIndex: "delete",
      key: "delete",
      render: (deleteStatus) => (deleteStatus ? "Inactive" : "Active"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, booking) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setIsUpdate(true);
              setOpenModal(true);
              form.setFieldsValue(booking);
            }}
          >
            <EditOutlined />
          </Button>

          <Popconfirm
            title="Delete"
            description="Do you want to block this booking?"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
            <StopOutlined />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleOpenModal = () => {
    setIsUpdate(false);
    form.resetFields();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (values) => {

    try {
      setSubmitting(true);
      if (values.id) {
        // Cập nhật dịch vụ
        await axios.put(`http://14.225.192.118:8080/booking/udate/${values.id}`, values); // Cập nhật URL API
        toast.success('Successfully updated booking!');
      } else {
        // Tạo dịch vụ mới
        await axios.post("http://14.225.192.118:8080/api/booking/create", values);
        toast.success('Successfully created a new service!');
      }
      setOpenModal(false);
      form.resetFields();
      fetchData(); // Lấy lại danh sách người dùng
    } catch (err) {
      toast.error('Failed to save booking.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://14.225.192.118:8080/api/booking/delete/${id}`);
      toast.success("Delete Successfully!");
      fetchData();
    } catch (ex) {
      toast.error("Failed to delete booking!");
    }
  };
  const handleSearch = async (id) => {
    try {
      if (!id) {
        // Khi không có ID, gọi API để lấy tất cả dịch vụ
        const response = await axios.get('http://14.225.192.118:8080/api/booking/getall'); // Lấy tất cả dịch vụ
        setDatas(response.data); // Cập nhật danh sách dữ liệu với tất cả dịch vụ
      } else {
        const response = await axios.get(`http://14.225.192.118:8080/api/booking/get/${id}`); // Sử dụng API mới
        setDatas([response.data]); // Cập nhật danh sách dữ liệu với kết quả tìm kiếm
      }
    } catch (error) {
      toast.error('Failed to fetch service by ID.');
    }
  };

  return (
    <div>
      <Typography.Title level={4}>Booking</Typography.Title>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Active" key="1">
          <Button onClick={handleOpenModal}>Create new booking</Button>
          <Input.Search
            placeholder="Search by ID"
            onSearch={value => handleSearch(value)}
            style={{ width: 200, marginLeft: 10 }}
          />
          <Table columns={columns} dataSource={datas.filter(booking => !booking.delete)} pagination={{pageSize: 5}} /> {/* Hiển thị dịch vụ Active */}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Inactive" key="2">
          <Button onClick={handleOpenModal}>Create new booking</Button>
          <Input.Search
            placeholder="Search by ID"
            onSearch={value => handleSearch(value)}
            style={{ width: 200, marginLeft: 10 }}
          />
          <Table columns={columns} dataSource={datas.filter(booking => booking.delete)} pagination={{pageSize: 5}} /> {/* Hiển thị dịch vụ Inactive */}
        </Tabs.TabPane>
      </Tabs>
      <Modal
        confirmLoading={submitting}
        onOk={() => form.submit()}
        title={isUpdate ? "Update Booking" : "Create New Booking"}
        open={openModal}
        onCancel={handleCloseModal}
      >
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item name="id" hidden>
            <Input/>
          </Form.Item>
          <Form.Item label="Booking Time" name="bookingTime" rules={[{ required: true, message: "Please input bookingTime!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Service Name" name="serviceName" rules={[{ required: true, message: "Please input serviceName!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Stylist Name" name="stylistName" rules={[{ required: true, message: "Please input stylistName!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="UserId" name="userId" rules={[{ required: true, message: "Please input userId!" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Booking;
