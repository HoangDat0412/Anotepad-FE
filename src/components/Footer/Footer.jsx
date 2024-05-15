import React from 'react'
import './footer.scss'
import { NavLink } from 'react-router-dom'
export default function Footer() {
    return (
        <footer class="footer mt-5 bg-light text-dark">
            <div class="container">
                <div class="row footer_content">

                    <div class="col-md-4">
                        <h5>About Smart Note</h5>
                        <p>Smart Note is your ultimate solution for taking notes and managing task lists efficiently. Stay organized and boost your productivity with our user-friendly interface.</p>
                    </div>

                    <div className='col-md-8 row' >
                        <div class="col-md-4">
                            <h5>Quick Links</h5>

                            <ul className="list-unstyled">
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
                                <NavLink to='/features' className="tree__action sidebar__action">
                                    <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                                        <i className="tree__icon fa-solid fa-fire"></i>
                                        <span className="tree__link-text"><span className="sidebar__item-name">Features</span></span>
                                    </span>
                                </NavLink>



                            </ul>


                        </div>

                        <div class="col-md-4">
                            <h5>Contact Us</h5>
                            <ul className="list-unstyled">
                                <li><i class="fa-solid fa-map-location-dot"></i> Thanh Xuân, Hà Nội</li>
                                <li><i class="fa fa-phone"></i><a href="tel:+1234567890">+1 (234) 567-890</a></li>
                                <li><i class="fa fa-envelope"></i> <a href="mailto:support@smartnote.com">support@smartnote.com</a> </li>


                            </ul>
                        </div>
                        <div className='col-md-4'>
                            <h5>Follow Us</h5>
                            <div class="social-icons">
                                <a><i class="fa-brands fa-facebook"></i></a>
                                <a><i class="fa-brands fa-instagram"></i></a>
                                <a><i class="fa-brands fa-square-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center mt-3">
                        <p>&copy; 2024 Smart Note. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
