import { Button, Form, Input, Modal, Popconfirm, Select, Table, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import uploadFile from "../../../utils/file";
import { Option } from "antd/es/mentions";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);  // Dữ liệu người dùng sau khi lọc
  const [openModal, setOpenModal] = useState(false);
  const [form] = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // Trạng thái để kiểm tra cập nhật hay tạo mới
  const [currentUserId, setCurrentUserId] = useState(null); // ID của người dùng hiện tại

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const api = "https://670027404da5bd237553603f.mockapi.io/User";

  const fetchUser = async () => {
    const response = await axios.get(api);
    setUsers(response.data);
    setFilteredUsers(response.data);  // Khởi tạo dữ liệu lọc
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Xử lý tìm kiếm theo từ khóa
  const handleSearch = (searchTerm) => {
    const filteredData = users.filter((user) => {
      return (
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    });
    setFilteredUsers(filteredData);
  };


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <Image src={image} alt="" width={50} />;
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, users) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setIsUpdate(true);
              setCurrentUserId(id);
              form.setFieldsValue(users);
              setOpenModal(true);
            }}
          >
            <EditOutlined />
          </Button>

          <Popconfirm
            title="Delete"
            description="Do you want to delete this user?"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
            <DeleteOutlined />
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

  const handleSubmit = async (userData) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      const url = await uploadFile(file.originFileObj);
      userData.image = url; // Cập nhật đường dẫn ảnh
    }

    try {
      setSubmitting(true);
      if (isUpdate) {
        // Cập nhật người dùng
        await axios.put(`${api}/${currentUserId}`, userData);
        toast.success('Successfully updated user!');
      } else {
        // Tạo người dùng mới
        await axios.post(api, userData);
        toast.success('Successfully created a new user!');
      }
      setOpenModal(false);
      form.resetFields();
      fetchUser(); // Lấy lại danh sách người dùng
    } catch (err) {
      toast.error('Failed to save user.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (userID) => {
    try {
      await axios.delete(`${api}/${userID}`);
      toast.success("Delete Successfully!");
      fetchUser();
    } catch (ex) {
      toast.error("Failed to delete user!");
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'white',
        color: 'black',
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8, color: 'black' }}>Upload</div>
    </button>
  );

  return (
    <div>
      <Typography.Title level={4}>Users</Typography.Title>

      {/* Input Search */}
      <Input.Search
        placeholder="Search by Fullname, Role, Status or Phone"
        allowClear
        enterButton={<SearchOutlined />}
        onSearch={handleSearch}
        style={{ width: 400, marginBottom: 20 }}
      />

      <Button onClick={handleOpenModal} style={{ marginBottom: 16 }}>
        <PlusOutlined /> Create new user
      </Button>
      <Table columns={columns} dataSource={filteredUsers} rowKey="id" />

      <Modal
        confirmLoading={submitting}
        onOk={() => form.submit()}
        title={isUpdate ? "Update User" : "Create New User"}
        open={openModal}
        onCancel={handleCloseModal}
      >
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input username!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input password!" }]}>
            <Input type="password" />
          </Form.Item>

          <Form.Item label="Fullname" name="fullName" rules={[{ required: true, message: "Please input fullname!" }]}>
            <Input/>
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input email!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Phone" name="phone" rules={[
            { required: true, message: "Please input phone!" },
            { pattern: /^\d{10}$/, message: "Invalid Format!" }
          ]}>
            <Input />
          </Form.Item>

          <Form.Item label="Role" name="role">
          <Select placeholder="Chọn role">
            <Option value="member">Member</Option>
            <Option value="stylist">Stylist</Option>
            <Option value="staff">Staff</Option>
            <Option value="manager">Manager</Option>
            <Option value="admin">Admin</Option>
          </Select>
          </Form.Item>

          <Form.Item label="Status" name="status">
          <Select placeholder="Chọn trạng thái">
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

          <Form.Item label="Image" name="image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default Users;
