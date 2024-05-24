import { NavLink, Outlet } from 'react-router-dom'
import './setting.scss'

import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfomation } from '../../redux/features/user/userSlice'

export default function SettingTemplate() {
    const dispatch = useDispatch()
    const { userInformation } = useSelector(state => state.userSlice)
    const fetchData = useCallback(() => {
        dispatch(getUserInfomation());
    }, [dispatch]);
    useEffect(() => {
        fetchData()
    }, [fetchData])
    return (
        <div className='settingtemplate'>    <div className='container-fluid hometemplate'>
            <div className="row flex-nowrap" style={{ height: "100vh" }}>
                <div className="col-auto sidebar">
                    <div className='sidebar-inner'>
                        <NavLink to='/account' className="sidebar__user w-100">
                            <div className="avatar">
                                <img src="https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" alt='avatar' />
                            </div>
                            <div className="d-none d-sm-block sidebar__user-info">
                                <div className="sidebar__user-info-top">
                                    <div className="sidebar__user-name">{userInformation?.user?.user_name || "User Name"}</div>
                                    <i className="sidebar__user-icon fa-solid fa-angle-down"></i>
                                </div>
                                <div className="sidebar__user-email">{userInformation?.user?.email}</div>
                            </div>
                        </NavLink>



                        <div class="sidebar__nav">
                            <ul class="tree">
                                <li class="tree__item">
                                    <NavLink to='/account' className="tree__action sidebar__action">
                                        <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                                            <i className="tree__icon fa-solid fa-user"></i>

                                            <span className="tree__link-text d-none d-sm-block"><span className="sidebar__item-name">Account</span></span>
                                        </span>
                                    </NavLink>
                                </li>

                                <li class="tree__item">
                                    <NavLink to='/loginhistory' className="tree__action sidebar__action">
                                        <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                                            <i className="tree__icon fa-solid fa-clock-rotate-left"></i>
                                            <span className="tree__link-text d-none d-sm-block"><span className="sidebar__item-name">Login History</span></span>
                                        </span>
                                    </NavLink>
                                </li>
                                <li class="tree__item">
                                    <NavLink to='/recycle' className="tree__action sidebar__action">
                                        <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                                            <i className="tree__icon fa-solid fa-trash"></i>
                                            <span className="tree__link-text d-none d-sm-block"><span className="sidebar__item-name">Recycle Bin</span></span>
                                        </span>
                                    </NavLink>
                                </li>
                                <li class="tree__item" style={{ cursor: 'pointer' }}>
                                    <div className="tree__action sidebar__action">
                                        <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active" style={{ color: "rgb(235, 87, 87)" }}>
                                            <i style={{ color: "rgb(235, 87, 87)" }} className="tree__icon fa-solid fa-x"></i>
                                            <span className="tree__link-text d-none d-sm-block"><span className="sidebar__item-name">Delete Account</span></span>
                                        </span>
                                    </div>
                                </li>
                                <li class="tree__item">
                                    <NavLink to='/' className="tree__action sidebar__action">
                                        <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                                            <i className="tree__icon fa-solid fa-home"></i>
                                            <span className="tree__link-text d-none d-sm-block"><span className="sidebar__item-name">Daskboard</span></span>
                                        </span>
                                    </NavLink>
                                </li>


                            </ul>
                        </div>


                    </div>
                </div>
                <div className="col py-3 content">
                    <Outlet />
                </div>
            </div>



        </div></div>
    )
}
