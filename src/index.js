import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import 'antd/dist/antd.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import RichNote from "./pages/RichNote/RichNote";
import TaskLists from "./pages/TaskLists/TaskLists";
import Folder from "./pages/Folder/Folder";
import Features from "./pages/Features/Features";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageUser from "./pages/ManagerUser/ManageUser";
import UpdateRichNote from "./pages/UpdateRichNote/UpdateRichNote";
import UpdateTaskList from "./pages/UpdateTaskList/UpdateTaskList";
import SettingTemplate from "./templates/SettingTemplate/SettingTemplate";
import Profile from "./pages/Profile/Profile";
import LoginHistory from "./pages/LoginHistory/LoginHistory";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import RecycleBin from "./pages/RecycleBin/RecycleBin.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeTemplate />,
    children: [
      {
        path: "/",
        element: <RichNote />,
      },
      {
        path: "/folder",
        element: <Folder />,
      },
      {
        path: "/richnote/:folderid",
        element: <RichNote />,
      },
      {
        path: "/tasklists/:folderid",
        element: <TaskLists />,
      },
      {
        path: "/managernote",
        element: <Home />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/updaterichnote/:id",
        element: <UpdateRichNote />,
      },
      {
        path: "/updatetasklist/:id",
        element: <UpdateTaskList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <AdminTemplate />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/manageruser",
        element: <ManageUser />,
      },
    ],
  },
  {
    path: "/",
    element: <SettingTemplate />,
    children: [
      {
        path: "/account",
        element: <Profile />,
      },
      {
        path: "/loginhistory",
        element: <LoginHistory />,
      },
      {
        path: "/recycle",
        element: <RecycleBin/>
      }
    ],
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetpassword/:email/:token",
    element: <ResetPassword />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);

reportWebVitals();
