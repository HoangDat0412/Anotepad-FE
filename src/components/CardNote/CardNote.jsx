import React from 'react'
import './cardnote.scss'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteNote } from '../../redux/features/note/noteSlice'
export default function CardNote(props) {
    const dispatch = useDispatch()
    if(props?.note?.note_type === "RichNote"){
        return (
            <div role="button" className="d-flex align-items-start prompt-container p-3">
                <NavLink to={`/updaterichnote/${props?.note?.id}`}  className="prompt-text-content ">{props?.note?.title}</NavLink>
                <div className='d-flex align-items-center justify-content-between w-100 mt-auto'>
                    <p className='' style={{ margin: "0", fontSize: "14px" }}>{moment(props?.note?.createdAt).format("DD/MM/YYYY")}</p>
                    <div className="prompt-icon-container ng-star-inserted ">
                        <i onClick={()=> dispatch(deleteNote(props?.note?.id))} className="fa fa-trash-alt"></i>
                    </div>
                </div>
            </div>
        )
    }else if(props?.note?.note_type === "TaskList"){
        return (
            <div to={`/updatetasklist/${props?.note?.id}`} role="button" className="prompt-container d-block d-flex align-items-start p-3">
                 <NavLink to={`/updatetasklist/${props?.note?.id}`} className="prompt-text-content ">{props?.note?.title}</NavLink>
                <div className='d-flex align-items-center justify-content-between w-100 mt-auto'>
                    <p  style={{ margin: "0", fontSize: "14px" }}>{moment(props?.note?.createdAt).format("DD/MM/YYYY")}</p>
                    <div className="prompt-icon-container ng-star-inserted">
                        <i onClick={()=> dispatch(deleteNote(props?.note?.id))} className="fa fa-trash-alt"></i>
                    </div>
                </div>
            </div>
        )
    }

}
