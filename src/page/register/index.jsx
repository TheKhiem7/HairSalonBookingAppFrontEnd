import { Button, Form, Input, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../config/axios'; 
import Header from '../../components/header';
import './index.css';
import { Row, Col } from 'antd'; // Thêm import Row và Col
import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ggProvider } from '../../config/firebase';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useUser } from '../../Context/UserContext';

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const { setUser } = useUser();

  const handleRegisterGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, ggProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token);
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    console.log(errorCode);
    const errorMessage = error.message;
    console.log(errorMessage);
    // The email of the user's account used.
    const email = error.customData.email;
    console.log(email);
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(credential);
    // ...
  });
  }

  const handleRegister = async (values) => {
    setLoading(true); // Hiển thị spin loading khi bắt đầu đăng ký

    try {
      const response = await axios.post('register', values);
      const { token, fullName } = response.data;
      localStorage.setItem("token", token);

      // Giả lập thời gian chờ 1 giây
      setTimeout(() => {
        setLoading(false); // Tắt spin loading sau 1 giây

        if (response.status === 200) {
          toast.success('Register Successfully!');
          setUser(fullName);
          navigate('/member');
        }
      }, 1000); // Thời gian loading là 1 giây
    } catch (err) {
      setLoading(false); // Tắt spin loading nếu gặp lỗi
      toast.error('Register Failed! Please check information again.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <div className="register-title">REGISTER</div>
        <Spin spinning={loading} tip="Loading...">
          <Form
            form={form}
            name="register"
            onFinish={handleRegister}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            className="register-form wide-form" // Thêm lớp wide-form
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                  label="FullName"
                  name="fullName"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input placeholder="FullName" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
              </Col>
              
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { 
                      required: true, message: 'Please input your email!' 
                    },
                    {
                      type: 'email', // Kiểm tra định dạng email
                      message: 'Please enter a valid email!',
                    },
                    {
                      required: true, // Bắt buộc nhập
                      message: 'Email is required!',
                    },
                    ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>

            

            {/* <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone_number"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: 'Please input your address!' }]}
                >
                  <Input placeholder="Address" />
                </Form.Item>
              </Col>
            </Row> */}
            
            <Link to="/login">Already have account? Login account</Link>

            <Button
             onClick={handleRegisterGoogle}
             variant="outlined"
             startIcon={<FcGoogle style={{ fontSize: "24px" }} />}
             style={{
                width: "230px",
                textTransform: "none",
                borderColor: "#4285F4",
                color: "#4285F4",
                padding: "6px 12px",
                fontSize: "16px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "20px",
                marginTop: "10px",
      }}
             >
             <FcGoogle style={{ fontSize: "24px" }} />
             Register with Google
             </Button>

            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                type="default"
                htmlType="button"
                onClick={() => form.resetFields()}
                style={{ width: '20%' }}
                disabled={loading}
              >
                Reset
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: '20%', marginLeft: '5%' }} disabled={loading}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </>
  );
}

export default Register;
