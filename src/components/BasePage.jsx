import { useEffect, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import Header from "./header";

export function BasePage({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    <>
     {isLoggedIn ? <Navbar /> : <Header />}
    {children}
    <Footer/>
    </>
);
}