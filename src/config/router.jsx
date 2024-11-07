import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/home";
import LoginPage from "../page/login";
import Register from "../page/register";
import Member from "../page/member";
import Dashboard from "../page/admin/dashboard";
import Services from "../page/admin/services";
import Users from "../page/admin/users";
import Admin from "../page/admin";
import Service from "../page/service";
import Stylist from "../page/stylist/index";
import StylistProfile from "../page/stylist-detail";
import Contact from "../page/contact";
import Staff from "../page/staff";
import Booking from "../page/admin/booking";
import Stylists from "../page/admin/stylist";
import Profile from "../page/profile";
import BookingForm from "../page/booking";
import Detail from "../page/service/service-detail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "login",
        element: <LoginPage />,
    },
    {
        path: "register",
        element: <Register />,
    },
    {
        path: "member",
        element: <Member />,
    },
    {
        path: "admin",
        element: <Admin />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />, // Component cho trang Dashboard
            },
            {
                path: "booking",
                element: <Booking />, // Component cho trang Dashboard
            },
            {
                path: "services",
                element: <Services />, // Component cho trang Dashboard
            },
            {
                path: "users",
                element: <Users />, // Component cho trang Users
            },
            {
                path: "stylists",
                element: <Stylists />, // Component cho trang Users
            },
        ],
    },
    {
        path: "service",
        element: <Service />,
    },
    {
        path: "stylist",
        element: <Stylist />,
    },
    {
        path: "stylist/:id",
        element: <StylistProfile />,
    },
    {
        path: "contact",
        element: <Contact />,
    },
    {
        path: "staff",
        element: <Staff />,
    },
    {
        path: "profile",
        element: <Profile />,
    },
    {
        path: "booking",
        element: <BookingForm />,
    },
    {
        path: "service/:title",
        element: <Detail />,
    }
]);
