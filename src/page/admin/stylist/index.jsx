import { Button, Form, Input, Modal, Popconfirm, Rate, Table, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import uploadFile from "../../../utils/file";

function Stylists() {
  const [datas, setDatas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form] = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // Trạng thái để kiểm tra cập nhật hay tạo mới


  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const api = "http://14.225.192.118:8080/api/stylist/getall"; // Cập nhật URL API mới

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
      title: "Stylist Name", // Cập nhật tên cột
      dataIndex: "stylistName", // Cập nhật dataIndex
      key: "stylistName", // Cập nhật key
    },
    {
      title: "Stylist Exp", // Cập nhật tên cột
      dataIndex: "stylistExp", // Cập nhật dataIndex
      key: "stylistExp", // Cập nhật key
    },
    {
      title: "Info", // Cập nhật tên cột
      dataIndex: "info", // Cập nhật dataIndex
      key: "info", // Cập nhật key
    },
    {
      title: "Location", // Cập nhật tên cột
      dataIndex: "location", // Cập nhật dataIndex
      key: "location", // Cập nhật key
    },
    {
        title: "Rating", // Cập nhật tên cột
        dataIndex: "rating", // Cập nhật dataIndex
        key: "rating", // Cập nhật key
        render: (rating)=>{
            return <Rate value={rating} allowHalf disabled/>
        }
    },
    {
        title: "Availability", // Cập nhật tên cột
        dataIndex: "availability", // Cập nhật dataIndex
        key: "availability", // Cập nhật key
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
      render: (id, stylists) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setIsUpdate(true);
              setOpenModal(true);
              form.setFieldsValue(stylists);
            }}
          >
            <EditOutlined />
          </Button>

          <Popconfirm
            title="Delete"
            description="Do you want to block this stylist?"
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
        await axios.put(`http://14.225.192.118:8080/api/stylist/udate/${values.id}`, values); // Cập nhật URL API
        toast.success('Successfully updated service!');
      } else {
        // Tạo dịch vụ mới
        await axios.post("http://14.225.192.118:8080/api/stylist/create", values);
        toast.success('Successfully created a new stylist!');
      }
      setOpenModal(false);
      form.resetFields();
      fetchData(); // Lấy lại danh sách người dùng
    } catch (err) {
      toast.error('Failed to save stylist.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://14.225.192.118:8080/api/stylist/delete/${id}`);
      toast.success("Delete Successfully!");
      fetchData();
    } catch (ex) {
      toast.error("Failed to delete stylist!");
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
        const response = await axios.get('http://14.225.192.118:8080/api/stylist/getall'); // Lấy tất cả dịch vụ
        setDatas(response.data); // Cập nhật danh sách dữ liệu với tất cả dịch vụ
      } else {
        const response = await axios.get(`http://14.225.192.118:8080/api/stylist/get/${id}`); // Sử dụng API mới
        setDatas([response.data]); // Cập nhật danh sách dữ liệu với kết quả tìm kiếm
      }
    } catch (error) {
      toast.error('Failed to fetch stylist by ID.');
    }
  };

  return (
    <div>
      <Typography.Title level={4}>Stylists</Typography.Title>
      <Button onClick={handleOpenModal}>Create new stylist</Button>
      <Input.Search
        placeholder="Search by ID"
        onSearch={value => handleSearch(value)} // Thêm hàm tìm kiếm
        style={{ width: 200, marginLeft: 10 }} // Thay đổi kích thước và khoảng cách
      />
      <Table columns={columns} dataSource={datas} pagination={{pageSize: 5}} />
      <Modal
        confirmLoading={submitting}
        onOk={() => form.submit()}
        title={isUpdate ? "Update Stylist" : "Create New Stylist"}
        open={openModal}
        onCancel={handleCloseModal}
      >
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item name="id" hidden>
            <Input/>
          </Form.Item>
          <Form.Item label="Stylist Name" name="stylistName" rules={[{ required: true, message: "Please input stylist name!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Stylist Exp" name="stylistExp" rules={[{ required: true, message: "Please input Stylist Exp!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Info" name="info" rules={[{ required: true, message: "Please input info!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Location" name="location" rules={[{ required: true, message: "Please input location!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Rating" name="rating" rules={[{ required: true, message: "Please input rating!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Availability" name="availability" rules={[{ required: true, message: "Please input availability!" }]}>
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

export default Stylists;
