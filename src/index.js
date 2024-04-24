import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import LoginTemplate from './templates/LoginTemplate/LoginTemplate';
import Home from './pages/Home/Home';
import RichNote from './pages/RichNote/RichNote';
import TaskLists from './pages/TaskLists/TaskLists';
import Folder from './pages/Folder/Folder';
import Features from './pages/Features/Features';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import ManageUser from './pages/ManagerUser/ManageUser';
import UpdateRichNote from './pages/UpdateRichNote/UpdateRichNote';
import UpdateTaskList from './pages/UpdateTaskList/UpdateTaskList';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeTemplate/>,
    children:[
      {
        path: "/",
        element:<Home/>
      },
      {
        path: "/richnote",
        element:<RichNote/>
      },
      {
        path: "/tasklists",
        element:<TaskLists/>
      },
      {
        path: "/folder",
        element:<Folder/>
      },
      {
        path: "/features",
        element:<Features/>
      },
      {
        path: "/updaterichnote/:id",
        element:<UpdateRichNote/>
      },
      {
        path: "/updatetasklist/:id",
        element:<UpdateTaskList/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/",
    element: <AdminTemplate/>,
    children:[
      {
        path: "/admin",
        element: <Dashboard/>
      },
      {
        path: "/manageruser",
        element: <ManageUser/>
      },
    ]
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
  <RouterProvider router={router} />
</Provider>
);

reportWebVitals();
