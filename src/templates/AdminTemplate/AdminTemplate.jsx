import React, { useCallback, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "./admin.scss"
import { useDispatch, useSelector } from 'react-redux';
import {  getUserInfomation, logoutActionApi } from '../../redux/features/user/userSlice';
import logo from '../../assests/img/logo.png'
export default function AdminTemplate() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { userInformation } = useSelector(state => state.userSlice)
  const fetchUserInformation = useCallback(() => {
    dispatch(getUserInfomation());
  }, [dispatch]);
  
  useEffect(() => {
    fetchUserInformation();
  }, [fetchUserInformation]);

  useEffect(() => {
    if(userInformation?.note){
      if(userInformation?.user?.role !== "ADMIN"){
        navigate('/')
      }
    }})
  return (
    <div className='container-fluid hometemplate'>
      <div className="row flex-nowrap">
      <div className="d-none d-md-block col-auto sidebar" style={{height:"100vh"}}>
            <div className='sidebar-inner'>
              <div className='sidebar__header'>
                <div class="sidebar__logo mt-1">
                  <NavLink to='/' className="fs-5">
                    <img className='img-fluid' width={50} src={logo} alt="" />
                    <span style={{ fontWeight: 'lighter', fontSize: '18px' }}>Smart Notes</span>
                  </NavLink>
                </div>
              </div>
              <div class="sidebar__nav">
                <ul class="tree">
                  <li class="tree__item">
                    <NavLink to='/admin' className="tree__action sidebar__action">
                      <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                        <i className="tree__icon fa-solid fa-house"></i>
                        <span className="tree__link-text"><span className="sidebar__item-name">Dashboard</span></span>
                      </span>
                    </NavLink>
                  </li>
                  <li class="tree__item">
                    <NavLink to='/manageruser' className="tree__action sidebar__action">
                      <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                        <i className="tree__icon fa-solid fa-user"></i>

                        <span className="tree__link-text"><span className="sidebar__item-name">Manager User</span></span>
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>

               <div className="dropdown" style={{ marginTop: 'auto' }}>
                <span className="sidebar__user w-100 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <div className="avatar">
                    <img src="https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" alt='avatar' />
                  </div>
                  <div className="sidebar__user-info">
                    <div className="sidebar__user-info-top">
                      <div className="sidebar__user-name">{userInformation?.user?.user_name || 'User Name'}</div>
                      <i className="sidebar__user-icon fa-solid fa-angle-down"></i>
                    </div>
                    <div className="sidebar__user-email">{userInformation?.user?.email}</div>
                  </div>
                </span>

                <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                  <li><NavLink to='/account' className="setting_btn"><i class="fa-solid fa-gear"></i> Setting</NavLink></li>
                  <li><button className="setting_btn" onClick={() => dispatch(logoutActionApi())}><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign out</button></li>
                </ul>
              </div>


            </div>
          </div>

        <div className="col py-3 content">
          <Outlet />
        </div>
      </div>
    </div>

  )
}
