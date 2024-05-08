import React from 'react'
import './searchitem.scss'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
export default function SearchItem(props) {
    return (
        <div className='search_item'>
            {
                props?.item?.note_type === "RichNote" ? <NavLink to={`/updaterichnote/${props?.item?.id}`} type="button" data-bs-dismiss="modal" aria-label="Close" className="tree__item" >
                    <div className="tree__action sidebar__action">
                        <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                            <i className="tree__icon fa-solid fa-file"></i>

                            <span className="tree__link-text"><span className="sidebar__item-name">{props?.item?.title}</span></span>
                        </span>
                    </div>
                    <div className='group_edit'>
                        {moment(props?.item?.createdAt).format('MMM Do YY')}
                    </div>
                </NavLink> : <NavLink to={`/updatetasklist/${props?.item?.id}`} type="button" data-bs-dismiss="modal" aria-label="Close" className="tree__item" >
                    <div className="tree__action sidebar__action">
                        <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                            <i className="tree__icon fa-solid fa-file"></i>

                            <span className="tree__link-text"><span className="sidebar__item-name">{props?.item?.title}</span></span>
                        </span>
                    </div>
                    <div className='group_edit'>
                        {moment(props?.item?.createdAt).format('MMM Do YY')}
                    </div>
                </NavLink>
            }
        </div>
    )
}
