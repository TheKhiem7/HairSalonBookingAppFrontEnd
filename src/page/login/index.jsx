import { Button, Form, Input, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import Header from '../../components/header';
import './index.css';
import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ggProvider } from '../../config/firebase';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useUser } from '../../Context/UserContext';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/counterSlice';

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const { setUser } = useUser();

  //lưu vào redux: useDispatch()
  //lấy dữ liệu: useSlector()
  const dispatch = useDispatch();

  const handleLoginGoogle = () => {
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

  const handleLogin = async (values) => {
    setLoading(true); // Bắt đầu spin loading

    try {
      const response = await axios.post('login', values);
      dispatch(login(response.data));
      const { token, fullName } = response.data;
      localStorage.setItem("token", token);

      // Giả lập thời gian chờ 1 giây
      setTimeout(() => {
        setLoading(false); // Kết thúc spin loading

        if (response.status === 200) {
          toast.success('Login Successfully!');
          setUser(fullName);
          navigate('/member');
        }
      }, 1000);
    } catch (error) {
      setLoading(false); // Tắt loading khi có lỗi
      toast.error('Login Failed! Please check information again.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-title">LOGIN</div>
        <Spin spinning={loading} tip="Loading...">
          <Form
            form={form}
            name="login"
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            className="login-form"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            
            <Link to="/register">Don't have account? Register new account</Link>
            
            <Button
             onClick={handleLoginGoogle}
             variant="outlined"
             startIcon={<FcGoogle style={{ fontSize: "24px" }} />}
             style={{
                width: "200px",
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
             Login with Google
             </Button>

            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                type="default"
                htmlType="button"
                onClick={() => form.resetFields()}
                style={{ width: '30%' }}
                disabled={loading}
              >
                Reset
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: '30%', marginLeft: '5%' }} disabled={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </>
  );
}

export default Login;
