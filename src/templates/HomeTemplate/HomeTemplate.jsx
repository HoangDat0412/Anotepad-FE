import React, { useCallback, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import "./hometemplate.scss"
import { useSelector, useDispatch } from 'react-redux'
// import { setShowSidebar } from '../../redux/features/loading/loadingSlice'
import { getUserInfomation, logoutActionApi, registerCookieActionApi } from '../../redux/features/user/userSlice'

import logo from '../../assests/img/logo.png'
import Search from '../../pages/Search/Search'


export default function HomeTemplate() {

  const dispatch = useDispatch()
  // const { showSidebar } = useSelector(state => state.loadingSlice)
  const { userInformation } = useSelector(state => state.userSlice)
  const fetchData = useCallback(() => {
    dispatch(registerCookieActionApi());
    dispatch(getUserInfomation());
  }, [dispatch]);
  useEffect(() => {
    fetchData()
  }, [fetchData])
  return (
    <div className='hometemplate'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink to='/' className="fs-5 logo-nav">
            <img className='img-fluid' width={50} src={logo} alt="" />
            <span className="" style={{ fontWeight: 'lighter' }}>Smart Notes</span>
          </NavLink>
          <button className="navbar-toggler button-4" type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink to='/' className="tree__action sidebar__action">
                <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                  <i className="tree__icon fa-solid fa-house"></i>

                  <span className="tree__link-text"><span className="sidebar__item-name">Dashboard</span></span>
                </span>
              </NavLink>

              <NavLink to='/richnote/0' className="tree__action sidebar__action">
                <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                  <i className="tree__icon fa-solid fa-pen"></i>

                  <span className="tree__link-text"><span className="sidebar__item-name">Create Note</span></span>
                </span>
              </NavLink>

              <NavLink to='/tasklists/0' className="tree__action sidebar__action">
                <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                  <i className="tree__icon fa-solid fa-list-check"></i>
                  <span className="tree__link-text"><span className="sidebar__item-name">New TaskList</span></span>
                </span>
              </NavLink>

              <div role='button' data-bs-toggle="modal" data-bs-target="#modelSearch" className="tree__action sidebar__action">
                <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                  <i className="tree__icon fa-solid fa-search"></i>
                  <span className="tree__link-text"><span className="sidebar__item-name">Search</span></span>
                </span>
              </div>

              <NavLink to='/managernote' className="tree__action sidebar__action">
                <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                  <i className="tree__icon fa-solid fa-file"></i>
                  <span className="tree__link-text"><span className="sidebar__item-name">Manager Note</span></span>
                </span>
              </NavLink>

              <NavLink to='/features' className="tree__action sidebar__action">
                <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                  <i className="tree__icon fa-solid fa-fire"></i>
                  <span className="tree__link-text"><span className="sidebar__item-name">Features</span></span>
                </span>
              </NavLink>


            </div>
          </div>
          <div className='collapse navbar-collapse'>
            {userInformation?.user?.role === "GUEST" ? <div className="text-center mt-auto mb-2">
                <NavLink to='/login' className='button-4' style={{ padding: "7px 55px" }}><i class="fa-solid fa-right-to-bracket"></i> Login</NavLink>
              </div> : <div className="dropdown" style={{ marginTop: 'auto' }}>
                <span className="sidebar__user w-100 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <div className="avatar">
                    <img src="https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" alt='avatar' />
                  </div>
                  <div className="sidebar__user-info">
                    <div className="sidebar__user-info-top">
                      <div className="sidebar__user-name">{userInformation?.user?.user_name}</div>
                      <i className="sidebar__user-icon fa-solid fa-angle-down"></i>
                    </div>
                    <div className="sidebar__user-email">{userInformation?.user?.email}</div>
                  </div>
                </span>

                <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                  <li><NavLink to='/account' className="setting_btn"><i class="fa-solid fa-gear"></i> Setting</NavLink></li>
                  <li><button className="setting_btn" onClick={() => dispatch(logoutActionApi())}><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign out</button></li>
                </ul>
              </div>}
            </div>
        </div>
      </nav>
      <div className="col content" style={{ marginTop: "100px" }}>
        <Outlet />
      </div>
      <div
        className="offcanvas offcanvas-end d-lg-none"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{
          width: "270px",
          height: "100%",
          background: "#fafafa"
        }}
      >
        <div class="offcanvas-header mb-0">
          <button type="button" className='btn btn-default' data-bs-dismiss="offcanvas" aria-label="Close">
            <i style={{ fontSize: "20px" }} class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="offcanvas-body p-0 ">
          <div className="sidebar" style={{ border: "none" }}>
            <div className='sidebar-inner'>
              <div className='sidebar__header'>
                <div class="sidebar__logo">
                  <NavLink to='/' className="fs-5">
                    <img className='img-fluid' width={50} src={logo} alt="" />
                    <span className="" style={{ fontWeight: 'lighter' }}>Smart Notes</span>
                  </NavLink>
                </div>

              </div>
              <div class="sidebar__nav">
                <ul class="tree">
                  <li class="tree__item">
                    <NavLink to='/' className="tree__action sidebar__action">
                      <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                        <i className="tree__icon fa-solid fa-house"></i>

                        <span className="tree__link-text"><span className="sidebar__item-name">Dashboard</span></span>
                      </span>
                    </NavLink>
                  </li>
                  <li class="tree__item">
                    <NavLink to='/richnote/0' className="tree__action sidebar__action">
                      <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                        <i className="tree__icon fa-solid fa-pen"></i>

                        <span className="tree__link-text"><span className="sidebar__item-name">Create Note</span></span>
                      </span>
                    </NavLink>
                  </li>
                  <li class="tree__item">
                    <NavLink to='/tasklists/0' className="tree__action sidebar__action">
                      <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                        <i className="tree__icon fa-solid fa-list-check"></i>
                        <span className="tree__link-text"><span className="sidebar__item-name">New TaskList</span></span>
                      </span>
                    </NavLink>
                  </li>
                  <li class="tree__item">
                    <div role='button' data-bs-toggle="modal" data-bs-target="#modelSearch" className="tree__action sidebar__action" data-bs-dismiss="offcanvas" aria-label="Close">
                      <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                        <i className="tree__icon fa-solid fa-search"></i>
                        <span className="tree__link-text"><span className="sidebar__item-name">Search</span></span>
                      </span>
                    </div>
                  </li>
                  <li class="tree__item">
                    <NavLink to='/managernote' className="tree__action sidebar__action">
                      <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                        <i className="tree__icon fa-solid fa-file"></i>
                        <span className="tree__link-text"><span className="sidebar__item-name">Manager Note</span></span>
                      </span>
                    </NavLink>
                  </li>
                  <li class="tree__item">
                    <NavLink to='/features' className="tree__action sidebar__action">
                      <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                        <i className="tree__icon fa-solid fa-fire"></i>
                        <span className="tree__link-text"><span className="sidebar__item-name">Features</span></span>
                      </span>
                    </NavLink>
                  </li>

                </ul>
              </div>
              {userInformation?.user?.role === "GUEST" ? <div className="text-center mt-auto mb-2">
                <NavLink to='/login' className='button-4' style={{ padding: "7px 55px" }}><i class="fa-solid fa-right-to-bracket"></i> Login</NavLink>
              </div> : <div className="dropdown" style={{ marginTop: 'auto' }}>
                <span className="sidebar__user w-100 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <div className="avatar">
                    <img src="https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" alt='avatar' />
                  </div>
                  <div className="sidebar__user-info">
                    <div className="sidebar__user-info-top">
                      <div className="sidebar__user-name">Hoang Dat</div>
                      <i className="sidebar__user-icon fa-solid fa-angle-down"></i>
                    </div>
                    <div className="sidebar__user-email">hoang2811dat@gmail.com</div>
                  </div>
                </span>

                <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                  <li><NavLink to='/account' className="setting_btn"><i class="fa-solid fa-gear"></i> Setting</NavLink></li>
                  <li><button className="setting_btn" onClick={() => dispatch(logoutActionApi())}><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign out</button></li>
                </ul>
              </div>}
            </div>
          </div>
        </div>
      </div>

      <Search />
    </div>
  )
}
