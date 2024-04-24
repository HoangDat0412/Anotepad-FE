import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import "./hometemplate.scss"
import { useSelector, useDispatch } from 'react-redux'
import { setShowSidebar } from '../../redux/features/loading/loadingSlice'
import anotepadlogo from "../../assests/img/anotepadicon.png"
import Profile from '../../pages/Profile/Profile'
import { getUserInfomation, logoutAction, registerCookieActionApi } from '../../redux/features/user/userSlice'
import LoginHistory from '../../components/LoginHistory/LoginHistory'

export default function HomeTemplate() {

  const dispatch = useDispatch()
  const { showSidebar } = useSelector(state => state.loadingSlice)
  const { userInformation } = useSelector(state => state.userSlice)
  useEffect(() => {
    dispatch(registerCookieActionApi())
    dispatch(getUserInfomation())
  }, [])
  return (
    <div className='container-fluid hometemplate'>
      <div className="row flex-nowrap">
        <div className="col-auto px-0 " style={{position:"relative"}}>
          <div className="flex-column align-items-center px-3 pt-2 min-vh-100 sidebar d-none d-sm-flex">
            <div className="pb-1 mb-md-0 text-decoration-none" >
              {showSidebar ? <span > <i style={{ fontSize: "20px",position:"absolute",right:15,top:15 }} onClick={() => { dispatch(setShowSidebar(false)) }} class="fa-solid fa-xmark"></i></span> : <span> <i style={{ fontSize: "20px" }} onClick={() => { dispatch(setShowSidebar(true)) }} class="fa-solid fa-bars"></i></span>}
            </div>
            <div className="mt-5 pb-3 mb-md-0 text-decoration-none">
              <NavLink to='/' className="fs-5 d-none d-sm-inline">
                <img className='img-fluid' width={30} src={anotepadlogo} alt="" />
                {showSidebar ? <span className="ms-2 d-none d-sm-inline">Anotepad</span> : ""}
              </NavLink>
            </div>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item w-100">
                <NavLink to='/' className="nav-link align-middle px-0 ">
                  <i class="fa fa-home"></i> {showSidebar ? <span className="ms-3 d-none d-sm-inline">Home</span> : ""}
                </NavLink>
              </li>
              <li className="nav-item w-100">
                <NavLink to='/tasklists' className="nav-link align-middle px-0">
                <i class="fa-solid fa-list-check"></i> {showSidebar ? <span className="ms-3 d-none d-sm-inline">Task List</span> : ""}
                </NavLink>
              </li>
              <li className="nav-item w-100">
                <NavLink to='/richnote' className="nav-link align-middle px-0">
                <i class="fa-solid fa-pen"></i> {showSidebar ? <span className="ms-3 d-none d-sm-inline">Rich Note</span> : ""}
                </NavLink>
              </li>
              <li className="nav-item w-100">
                <NavLink to='/folder' className="nav-link align-center px-0">
                  <i class="fa-solid fa-folder"></i>
                  {showSidebar ? <span className="ms-3 ">Folder</span> : ""}
                </NavLink>
              </li>
              <li className="nav-item w-100">
                <NavLink to='/features' className="nav-link align-middle px-0">
                  <i class="fa-solid fa-fire"></i>
                  {showSidebar ? <span className="ms-3">Features</span> : ""}
                </NavLink>
              </li>
            </ul>
            <hr />
            { userInformation?.user?.role === "GUEST" ?  <div>
              <NavLink to='/login' className='btn btn-default'>Login</NavLink>
            </div> : <div class="dropdown pb-4 mt-auto">
              <a className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" alt="hugenerd" width="30" height="30" class="rounded-circle"/>
              {showSidebar ? (userInformation?.user?.email.length ? <span class="ms-1">{userInformation?.user?.email.split('@')[0]}</span> : "") : ""}
                
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              <li><button style={{ color: "white" }} className="setting_btn" data-bs-toggle="modal" data-bs-target="#modelhistory">Login History</button></li>
                <li><button style={{ color: "white" }} className="setting_btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Profile</button></li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li><button class="dropdown-item btn btn-default" onClick={() => dispatch(logoutAction())}>Sign out</button></li>
              </ul>
            </div>}
          </div>
        </div>
        <div className="col py-3 content">
          <nav
            class="navbar navbar-expand-md d-sm-none"
          >
            <div class="container-fluid">
              <NavLink to='/' className="fs-5">
                <img className='img-fluid' width={40} src={anotepadlogo} alt="" />
                <span className="ms-2">Anotepad</span>
              </NavLink>
              {/* <a class="navbar-brand" href="#">Anotepad</a> */}

              <a
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                role="button"
                aria-controls="offcanvasRight"
              >
                <i style={{ fontSize: "20px" }} class="fa-solid fa-bars"></i>
              </a>
            </div>
          </nav>
          <Outlet />
        </div>
      </div>


      <div
        className="offcanvas offcanvas-end d-sm-none"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{
          width: "200px",
          height: "100%"
        }}
      >
        <div class="offcanvas-header mb-0">
          <button type="button" className='btn btn-default' data-bs-dismiss="offcanvas" aria-label="Close">
            <i style={{ fontSize: "20px" }} class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="offcanvas-body p-0 ">
          <div className="d-flex flex-column align-items-center px-3 pt-2 sidebar" style={{backgroundColor:"#fff"}}>
            <div className="pb-3 mb-md-0 text-decoration-none">
              <NavLink to='/' className="fs-5">
                <img className='img-fluid' width={30} src={anotepadlogo} alt="" />
                <span className="ms-2">Anotepad</span>
              </NavLink>
            </div>

            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
              <li className="nav-item w-100">
                <NavLink to='/' className="nav-link align-middle px-0">
                  <i class="fa fa-home"></i>  <span className="ms-3 ">Home</span>
                </NavLink>
              </li>
              <li className="nav-item w-100">
                <NavLink to='/tasklists' className="nav-link align-middle px-0">
                <i class="fa-solid fa-list-check"></i> <span className="ms-3 ">Task List</span> 
                </NavLink>
              </li>
              <li className="nav-item w-100">
                <NavLink to='/richnote' className="nav-link align-middle px-0">
                <i class="fa-solid fa-pen"></i>  <span className="ms-3 ">Rich Note</span> 
                </NavLink>
              </li>
              <li className="nav-item w-100">
                <NavLink to='/folder' className="nav-link align-center px-0">
                  <i class="fa-solid fa-folder"></i>
                  <span className="ms-3 ">Folder</span>

                </NavLink>
              </li>
              <li className="nav-item w-100">
                <NavLink to='/features' className="nav-link align-middle px-0">
                  <i class="fa-solid fa-fire"></i>
                  <span className="ms-3">Features</span>

                </NavLink>
              </li>
            </ul>
            <hr />

            { userInformation?.user?.role === "GUEST" ?  <div>
              <button className='btn btn-default'>Login</button>
            </div> :             <div class="dropdown pb-4 mt-auto">
              <a className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">

                <span class="mx-1">{userInformation?.user?.email.split('@')[0]}</span>

              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              <li><button style={{ color: "white" }} className="setting_btn dropdown-item" data-bs-toggle="modal" data-bs-target="#modelhistory">Login History</button></li>
                <li><button  style={{ color: "white" }} className="setting_btn dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">Profile</button></li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li><a class="dropdown-item">Sign out</a></li>
              </ul>
            </div>}


          </div>
        </div>
      </div>

      <Profile information={userInformation}/>
      <LoginHistory/>
    </div>
  )
}
