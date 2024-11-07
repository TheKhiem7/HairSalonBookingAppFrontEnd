import { Button, Form, Input, Modal, Popconfirm, Table, Typography, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import uploadFile from "../../../utils/file";

function Services() {
  const [datas, setDatas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form] = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // Trạng thái để kiểm tra cập nhật hay tạo mới


  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const api = "http://14.225.192.118:8080/api/services/getall"; // Cập nhật URL API mới

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
      title: "Service Name", // Cập nhật tên cột
      dataIndex: "serviceName", // Cập nhật dataIndex
      key: "serviceName", // Cập nhật key
    },
    {
      title: "Service Description", // Cập nhật tên cột
      dataIndex: "serviceDescription", // Cập nhật dataIndex
      key: "serviceDescription", // Cập nhật key
    },
    {
      title: "Service Price", // Cập nhật tên cột
      dataIndex: "servicePrice", // Cập nhật dataIndex
      key: "servicePrice", // Cập nhật key
    },
    {
      title: "Service Type", // Cập nhật tên cột
      dataIndex: "serviceType", // Cập nhật dataIndex
      key: "serviceType", // Cập nhật key
    },
    {
      title: "Status",
      dataIndex: "delete",
      key: "delete",
      render: (deleteStatus) => (deleteStatus ? "Inactive" : "Active"),
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
      render: (id, services) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setIsUpdate(true);
              setOpenModal(true);
              form.setFieldsValue(services);
            }}
          >
            <EditOutlined />
          </Button>

          <Popconfirm
            title="Delete"
            description="Do you want to block this service?"
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
    if (fileList.length > 0) {
      const file = fileList[0];
      const url = await uploadFile(file.originFileObj);
      values.image = url; // Cập nhật đường dẫn ảnh
    }

    try {
      setSubmitting(true);
      if (values.id) {
        // Cập nhật dịch vụ
        await axios.put(`http://14.225.192.118:8080/api/services/udate/${values.id}`, values); // Cập nhật URL API
        toast.success('Successfully updated service!');
      } else {
        // Tạo dịch vụ mới
        await axios.post("http://14.225.192.118:8080/api/services/create", values);
        toast.success('Successfully created a new service!');
      }
      setOpenModal(false);
      form.resetFields();
      fetchData(); // Lấy lại danh sách người dùng
    } catch (err) {
      toast.error('Failed to save service.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://14.225.192.118:8080/api/services/delete/${id}`);
      toast.success("Delete Successfully!");
      fetchData();
    } catch (ex) {
      toast.error("Failed to delete service!");
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

  const handleSearch = async (id) => {
    try {
      if (!id) {
        // Khi không có ID, gọi API để lấy tất cả dịch vụ
        const response = await axios.get('http://14.225.192.118:8080/api/services/getall'); // Lấy tất cả dịch vụ
        setDatas(response.data); // Cập nhật danh sách dữ liệu với tất cả dịch vụ
      } else {
        const response = await axios.get(`http://14.225.192.118:8080/api/services/get/${id}`); // Sử dụng API mới
        setDatas([response.data]); // Cập nhật danh sách dữ liệu với kết quả tìm kiếm
      }
    } catch (error) {
      toast.error('Failed to fetch service by ID.');
    }
  };

  return (
    <div>
      <Typography.Title level={4}>Services</Typography.Title>
      
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Active" key="1">
          <Button onClick={handleOpenModal}>Create new service</Button>
          <Input.Search
            placeholder="Search by ID"
            onSearch={value => handleSearch(value)}
            style={{ width: 200, marginLeft: 10 }}
          />
          <Table columns={columns} dataSource={datas.filter(service => !service.delete)} pagination={{pageSize: 5}} /> {/* Hiển thị dịch vụ Active */}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Inactive" key="2">
          <Button onClick={handleOpenModal}>Create new service</Button>
          <Input.Search
            placeholder="Search by ID"
            onSearch={value => handleSearch(value)}
            style={{ width: 200, marginLeft: 10 }}
          />
          <Table columns={columns} dataSource={datas.filter(service => service.delete)} pagination={{pageSize: 5}} /> {/* Hiển thị dịch vụ Inactive */}
        </Tabs.TabPane>
      </Tabs>

      <Modal
        confirmLoading={submitting}
        onOk={() => form.submit()}
        title={isUpdate ? "Update Service" : "Create New Service"}
        open={openModal}
        onCancel={handleCloseModal}
      >
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item name="id" hidden>
            <Input/>
          </Form.Item>
          <Form.Item label="ServiceName" name="serviceName" rules={[{ required: true, message: "Please input serviceName!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="serviceDescription" rules={[{ required: true, message: "Please input description!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Type" name="serviceType" rules={[{ required: true, message: "Please input type!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="servicePrice" rules={[{ required: true, message: "Please input price!" }]}>
            <Input />
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

export default Services;
