import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { BasePage } from "../../components/BasePage";

function Staff() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
     // Giả sử bạn có một hàm để kiểm tra trạng thái đăng nhập
  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập dựa trên token
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null; // Kiểm tra nếu token tồn tại
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);
    return (
        <BasePage>
            {isLoggedIn ? <Navbar /> : <Header />}
            <h1>Staff</h1>
        </BasePage>
    )
}

export default Staff;