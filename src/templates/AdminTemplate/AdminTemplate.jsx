import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "./admin.scss"
import { useDispatch, useSelector } from 'react-redux';
import anotepadlogo from "../../assests/img/anotepadicon.png"
import Profile from '../../pages/Profile/Profile';
import { getAllUser, getUserInfomation } from '../../redux/features/user/userSlice';
export default function AdminTemplate() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { userInformation } = useSelector(state => state.userSlice)
  useEffect(() => {
    dispatch(getUserInfomation())
    
  }, [])

  useEffect(() => {
    if(userInformation?.note){
      if(userInformation?.user?.role !== "ADMIN"){
        navigate('/')
      }
    }},[])
  return (
    <div className='container-fluid hometemplate'>
      <div className="row flex-nowrap">
        <div className="col-auto px-0 ">
          <div className="flex-column align-items-center px-3 pt-2 min-vh-100 sidebar d-none d-sm-flex">

            <div className="pb-3 mb-md-0 text-decoration-none">
              <NavLink to='/' className="fs-5 d-none d-sm-inline">
                <img className='img-fluid' width={30} src={anotepadlogo} alt="" />
                <span className="ms-2 d-none d-sm-inline">Anotepad</span>
              </NavLink>
            </div>

            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item">
                <NavLink to='/admin' className="nav-link align-middle px-0">
                  <i class="fa fa-home"></i> <span className="ms-3 d-none d-sm-inline">Dashboard</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to='/manageruser' className="nav-link align-middle px-0">
                  <i class="fa-solid fa-user"></i>
                  <span className="ms-3">Manager User</span>
                </NavLink>
              </li>
            </ul>

          </div>
        </div>
        <div className="col py-3 content">
          <Outlet />
        </div>
      </div>
      <Profile/>
    </div>

  )
}
