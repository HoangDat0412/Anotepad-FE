import React, { useState } from 'react'
import './foldername.scss'
import { checkNull } from '../../validation/validation'
import { useDispatch } from 'react-redux'
import { deleteFolder, updateFolder } from '../../redux/features/folder/folderSlice'
import { getNoteInFolder } from '../../redux/features/note/noteSlice'
export default function FolderName(props) {
    const dispatch = useDispatch()
    const [folderName,setFolderName] = useState(props?.folder?.name)
    const [errFolder,setErrFolder] = useState()
    const handleUpdateFolderName = ()=>{
        !checkNull(folderName) ? setErrFolder("Folder không được bỏ trống") : setErrFolder(false)
        const flag = checkNull(folderName) 
        if(flag){
          dispatch(updateFolder(props?.folder?.id,{name:folderName}))
          setIsEdit(false)
        }
    }
    const [isEdit, setIsEdit] = useState(false)
    return (
        <div>
            {
                !isEdit ? <li class="tree__item" >
                    <div to='/' className="tree__action sidebar__action" onClick={() => dispatch(getNoteInFolder(props?.folder?.id))}>
                        <span aria-current="page" className="tree__link nuxt-link-exact-active nuxt-link-active">
                            <i className="tree__icon fa-solid fa-folder"></i>

                            <span className="tree__link-text"><span className="sidebar__item-name">{props?.folder?.name}</span></span>
                        </span>
                    </div>
                    <div className='group_edit'>
                        <i className="fa-solid fa-pen-to-square" onClick={() => setIsEdit(true)} />
                        <i className="fa-solid fa-trash" onClick={() => dispatch(deleteFolder(props?.folder?.id))} />
                    </div>
                </li> : <li class="tree__item">
                    <div class="me-auto">
                        <input
                            type="text"
                            class="form-control form_input_title"
                            onChange={(e)=> setFolderName(e.target.value)} value={folderName}
                        />

                    </div>
                    <div className='group_edit'>
                        <i className="fa-solid fa-check" onClick={() => handleUpdateFolderName()} />
                        <i className="fa-solid fa-trash" onClick={() => dispatch(deleteFolder(props?.folder?.id))}/>
                    </div>
                </li>
            }
            {errFolder ? <p className='mb-3' style={{color:"red",fontSize:"14px",marginBottom:0}}>{errFolder}</p> : null}
        </div>
    )
}
